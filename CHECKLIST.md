# ✅ Pre-Upload Checklist

Before uploading to GitHub, verify this checklist:

## 📂 Files to Include (Committed)

- [x] `server.js` - Backend API
- [x] `enrol.js` - Admin enrollment script
- [x] `registerUser.js` - User registration script
- [x] `package.json` - Dependencies
- [x] `README.md` - Main documentation
- [x] `WINDOWS-SETUP.md` - Windows-specific guide
- [x] `.gitignore` - Git exclusions
- [x] `public/` - Frontend files
  - [x] `index.html`
  - [x] `style.css`
  - [x] `app.js`
- [x] `chaincode/` - Smart contract source (reference)

## 🚫 Files to Exclude (Not Committed)

- [ ] `node_modules/` - Will be installed with `npm install`
- [ ] `wallet/` - Generated at runtime
- [ ] `connection-org1.json` - Copied from fabric-samples
- [ ] `package-lock.json` - Auto-generated
- [ ] `pnpm-lock.yaml` - Auto-generated

## 📝 What Users Need to Do

When someone clones your repo, they need to:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Fabric Network** (separate from this repo)
   ```bash
   cd ..
   curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh | bash -s -- binary samples
   cd fabric-samples/test-network
   ./network.sh up createChannel -ca -c mychannel
   ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript
   ```

3. **Copy Connection Profile**
   ```bash
   cp organizations/peerOrganizations/org1.example.com/connection-org1.json ../../client/
   cd ../../client
   ```

4. **Start the App**
   ```bash
   npm start
   ```

## 🎯 Final Project Structure

```
client/
├── README.md              ← Main documentation
├── WINDOWS-SETUP.md       ← Windows guide
├── package.json           ← Dependencies
├── .gitignore            ← Git exclusions
├── server.js             ← Backend
├── enrol.js              ← Admin enrollment
├── registerUser.js       ← User registration
├── public/               ← Frontend
│   ├── index.html
│   ├── style.css
│   └── app.js
└── chaincode/           ← Smart contract (reference only)
    ├── index.js
    ├── package.json
    └── lib/
        └── assetTransfer.js
```

## ✨ Repository Requirements

Your GitHub repository should have:

1. **Clear README.md** ✅ (Already created)
2. **Cross-platform support** ✅ (Works on Windows, Mac, Linux)
3. **Simple setup** ✅ (Just npm install + copy connection file)
4. **Clean structure** ✅ (No unnecessary files)
5. **Good .gitignore** ✅ (Excludes runtime files)

## 🚀 Upload to GitHub

```bash
cd /Users/prashant178/Desktop/Backend/client

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Hyperledger Fabric Client"

# Add remote
git remote add origin <your-github-repo-url>

# Push
git push -u origin main
```

## 🧪 Test After Upload

1. Clone your repo on a fresh machine/folder
2. Follow the README.md instructions
3. Verify it works end-to-end

---

**Ready to upload!** 🎉
