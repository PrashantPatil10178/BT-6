"use strict";

const express = require("express");
const path = require("path");
const fs = require("fs");
const { Gateway, Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const ccpPath = path.resolve(
  __dirname,
  "fabric-samples",
  "test-network",
  "organizations",
  "peerOrganizations",
  "org1.example.com",
  "connection-org1.json"
);

const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
const walletPath = path.join(process.cwd(), "wallet");

app.post("/api/enroll-admin", async (req, res) => {
  try {
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

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const adminIdentity = await wallet.get("admin");
    if (adminIdentity) {
      return res.json({
        success: true,
        message: "Admin identity already enrolled",
      });
    }

    const enrollment = await ca.enroll({
      enrollmentID: "admin",
      enrollmentSecret: "adminpw",
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org1MSP",
      type: "X.509",
    };
    await wallet.put("admin", x509Identity);

    res.json({ success: true, message: "Successfully enrolled admin user" });
  } catch (error) {
    console.error(`Failed to enroll admin: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/register-user", async (req, res) => {
  try {
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

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const userIdentity = await wallet.get("appUser");
    if (userIdentity) {
      return res.json({
        success: true,
        message: "appUser identity already exists",
      });
    }

    const adminIdentity = await wallet.get("admin");
    if (!adminIdentity) {
      return res.status(400).json({
        success: false,
        error: "Admin identity not found. Please enroll admin first.",
      });
    }

    const provider = wallet
      .getProviderRegistry()
      .getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, "admin");

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
    res.json({
      success: true,
      message: "Successfully registered and enrolled appUser",
    });
  } catch (error) {
    console.error(`Failed to register user: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/query-assets", async (req, res) => {
  try {
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const identity = await wallet.get("appUser");

    if (!identity) {
      return res.status(400).json({
        success: false,
        error: "User identity not found. Register appUser first.",
      });
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "appUser",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");
    const contract = network.getContract("basic");

    const result = await contract.evaluateTransaction("GetAllAssets");
    await gateway.disconnect();

    res.json({ success: true, data: JSON.parse(result.toString()) });
  } catch (error) {
    console.error(`Query failed: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/create-asset", async (req, res) => {
  try {
    const { id, color, size, owner, appraisedValue } = req.body;

    if (!id || !color || !size || !owner || !appraisedValue) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const identity = await wallet.get("appUser");

    if (!identity) {
      return res.status(400).json({
        success: false,
        error: "User identity not found. Register appUser first.",
      });
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "appUser",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");
    const contract = network.getContract("basic");

    await contract.submitTransaction(
      "CreateAsset",
      id,
      color,
      size,
      owner,
      appraisedValue
    );
    await gateway.disconnect();

    res.json({ success: true, message: "Asset created successfully" });
  } catch (error) {
    console.error(`Create asset failed: ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Check wallet status
app.get("/api/wallet-status", async (req, res) => {
  try {
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const adminIdentity = await wallet.get("admin");
    const userIdentity = await wallet.get("appUser");

    res.json({
      success: true,
      admin: !!adminIdentity,
      appUser: !!userIdentity,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
