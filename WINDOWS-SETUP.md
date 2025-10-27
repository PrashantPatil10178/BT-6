# 🪟 Windows Setup Guide

Quick guide for Windows users to get the Fabric client running.

## ✅ Prerequisites

1. **Node.js** - Download from [nodejs.org](https://nodejs.org/)
2. **Docker Desktop** - Download from [docker.com](https://www.docker.com/products/docker-desktop/)
3. **Git for Windows** - Download from [gitforwindows.org](https://gitforwindows.org/)

## 📝 Step-by-Step Instructions

### 1. Install Required Software

Install all three programs above. When installing Git, use default options.

### 2. Open Git Bash

**Important**: Use Git Bash, NOT PowerShell or CMD!

- Press `Windows Key`
- Type "Git Bash"
- Click "Git Bash" application

### 3. Clone the Repository

```bash
cd /c/Users/YourUsername/Desktop
git clone <your-repo-url>
cd client
npm install
```

### 4. Setup Fabric Network

```bash
# Go to parent directory
cd ..

# Download Fabric (takes 5-10 minutes)
curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh | bash -s -- binary samples

# Navigate to test network
cd fabric-samples/test-network

# Start network (takes 1-2 minutes)
./network.sh up createChannel -ca -c mychannel

# Deploy chaincode
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript
```

### 5. Copy Connection File

```bash
# Still in test-network directory
cp organizations/peerOrganizations/org1.example.com/connection-org1.json ../../client/

# Go back to client
cd ../../client
```

### 6. Start the App

```bash
npm start
```

### 7. Open Browser

Go to: **http://localhost:3000**

## 🎯 Common Windows Issues

### ❌ "Docker not running"
- Open Docker Desktop
- Wait for the whale icon to stop animating
- Try again

### ❌ "Permission denied"
```bash
# Run Git Bash as Administrator
# Right-click Git Bash → Run as administrator
```

### ❌ "network.sh: command not found"
```bash
# Make sure you're in the right directory
cd /c/Users/YourUsername/Desktop/fabric-samples/test-network
ls  # Should show network.sh
```

### ❌ "Port 3000 already in use"
```bash
# In Git Bash:
taskkill //F //IM node.exe
```

## 💡 Tips for Windows Users

1. **Always use Git Bash** for Fabric commands
2. **Use forward slashes** (`/`) not backslashes (`\`)
3. **Keep Docker Desktop running** in the background
4. **Use Windows paths** in Git Bash like: `/c/Users/YourName/`

## 🔄 Cleanup (When Done)

```bash
# Stop the app (Ctrl+C)

# Stop network
cd ../fabric-samples/test-network
./network.sh down
```

---

**Need help?** Check the main [README.md](README.md) for more details!
