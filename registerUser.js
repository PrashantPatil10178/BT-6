"use strict";

const fs = require("fs");
const path = require("path");
const { Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");

async function main() {
  try {
    const ccpPath = path.resolve(__dirname, "connection-org1.json");
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    const caInfo = ccp.certificateAuthorities["ca.org1.example.com"];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(
      caInfo.url,
      {
        trustedRoots: Array.isArray(caTLSCACerts)
          ? caTLSCACerts[0]
          : caTLSCACerts,
        verify: false,
      },
      caInfo.caName
    );

    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check if user already exists
    const userIdentity = await wallet.get("appUser");
    if (userIdentity) {
      console.log("appUser identity already exists in the wallet");
      return;
    }

    // Check if admin identity exists
    const adminIdentity = await wallet.get("admin");
    if (!adminIdentity) {
      console.log("Admin identity not found. Please enroll admin first.");
      return;
    }

    // Build a user object for authenticating with CA
    const provider = wallet
      .getProviderRegistry()
      .getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, "admin");

    // Register and enroll new user
    const secret = await ca.register(
      {
        affiliation: "org1.department1",
        enrollmentID: "appUser",
        role: "client",
      },
      adminUser
    );
    const enrollment = await ca.enroll({
      enrollmentID: "appUser",
      enrollmentSecret: secret,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org1MSP",
      type: "X.509",
    };
    await wallet.put("appUser", x509Identity);
    console.log("✅ Successfully registered and enrolled appUser");
  } catch (error) {
    console.error(`Failed to register user: ${error}`);
    process.exit(1);
  }
}

main();
