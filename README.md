# 🔗 Hyperledger Fabric Client Application# 🔗 Hyperledger Fabric Client Application

A lightweight web application for interacting with Hyperledger Fabric blockchain networks. **Works on Windows, Mac, and Linux!**A full-stack web application for interacting with Hyperledger Fabric blockchain network. This application provides a user-friendly interface to manage blockchain identities and perform asset operations on the ledger.

## ✨ Features![Hyperledger Fabric](https://img.shields.io/badge/Hyperledger-Fabric-2F3134?logo=hyperledger&logoColor=white)

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

- 🌐 Modern web interface for blockchain operations![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)

- 👤 User identity management (enroll/register)

- 📦 Asset management (query/create)## 📋 Table of Contents

- 🔐 Secure wallet system

- 🎨 Responsive UI with real-time feedback- [Overview](#overview)

- 🖥️ Cross-platform compatible- [Prerequisites](#prerequisites)

- [Installation & Setup](#installation--setup)

## 📋 Prerequisites- [Project Structure](#project-structure)

- [Running the Application](#running-the-application)

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)- [Features](#features)

2. **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)- [API Endpoints](#api-endpoints)

3. **Git** - [Download](https://git-scm.com/)- [Usage Guide](#usage-guide)

- [Troubleshooting](#troubleshooting)

### Platform-Specific:- [Architecture](#architecture)

- **Windows**: Install [Git Bash](https://gitforwindows.org/) (comes with Git)

- **Mac/Linux**: No additional tools needed## 🌟 Overview

## 🚀 Quick StartThis application serves as a client interface for Hyperledger Fabric blockchain network. It allows users to:

### Step 1: Clone and Install Dependencies- ✅ Enroll admin users

- ✅ Register application users

````bash- ✅ Query assets from the blockchain ledger

git clone <your-repo-url>- ✅ Create new assets on the blockchain

cd client- ✅ Monitor wallet status in real-time

npm install

```The application consists of:



### Step 2: Setup Hyperledger Fabric Network- **Backend**: Node.js/Express REST API server

- **Frontend**: Vanilla JavaScript with modern HTML5/CSS3

Open a **new terminal** and run:- **Blockchain Integration**: Hyperledger Fabric SDK



```bash## 🔧 Prerequisites

# Go to parent directory

cd ..Before you begin, ensure you have the following installed:



# Download Fabric (one-time setup)- **Node.js** (v14.x or higher)

curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh | bash -s -- binary samples- **npm** or **pnpm** (v6.x or higher)

- **Docker** and **Docker Compose**

# Navigate to test network- **Git**

cd fabric-samples/test-network- **Hyperledger Fabric** (v2.2 or higher)



# Start network + create channel (takes 1-2 minutes)### System Requirements

./network.sh up createChannel -ca -c mychannel

- macOS, Linux, or Windows (with WSL2)

# Deploy chaincode- Minimum 8GB RAM

./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript- 20GB free disk space

````

## 🚀 Installation & Setup

**Windows Users**: Run these commands in **Git Bash** (not CMD or PowerShell)

### Step 1: Install Hyperledger Fabric

### Step 3: Copy Connection Profile

Download and install Hyperledger Fabric samples, binaries, and Docker images:

````bash

# Still in test-network directory:```bash

cp organizations/peerOrganizations/org1.example.com/connection-org1.json ../../client/curl -sSL https://bit.ly/2ysbOFE | bash -s

````

# Go back to client

cd ../../clientThis command will:

````

- Download fabric-samples repository

### Step 4: Start the Application- Install Hyperledger Fabric binaries

- Pull necessary Docker images

```bash

npm start### Step 2: Start the Test Network

````

Navigate to the test network directory and start the network:

Open your browser: **http://localhost:3000** 🎉

```````bash

## 📁 Project Structurecd fabric-samples/test-network

./network.sh down

```./network.sh up createChannel -c mychannel -ca

client/```

├── server.js              # Express API server

├── enrol.js              # Admin enrollmentThis will:

├── registerUser.js       # User registration

├── package.json          # Dependencies- Start the Hyperledger Fabric network

├── connection-org1.json  # Network config (copy from fabric-samples)- Create a channel named `mychannel`

├── wallet/               # Identity storage (auto-created)- Start Certificate Authorities (CAs)

├── public/               # Frontend

│   ├── index.html### Step 3: Deploy Chaincode

│   ├── style.css

│   └── app.jsDeploy the basic asset-transfer chaincode:

└── chaincode/           # Smart contract (reference)

``````bash

./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript

## 🎯 How to Use```



1. **Enroll Admin** → Click button (first time only)### Step 4: Set Up the Client Application

2. **Register User** → Click button

3. **Query Assets** → See blockchain dataClone or navigate to your client application directory:

4. **Create Asset** → Add new asset with ID, Color, Size, Owner, Value

```bash

## 🌍 Cross-Platform Guidecd /path/to/your/client

```````

### Windows

Install dependencies:

**Option 1: Git Bash** ✅ Recommended

`bash`bash

# All commands work the same as Linux# Using npm

cd fabric-samples/test-networknpm install

./network.sh up createChannel -ca -c mychannel

````# OR using pnpm (recommended)

pnpm install

**Option 2: WSL2** (Advanced)```

```bash

# Full Linux environment### Step 5: Copy Connection Profile

wsl

cd /mnt/c/Users/YourName/clientCopy the connection profile from the Fabric network to your client directory:

````

````bash

**Important**: Always use **Docker Desktop for Windows** and ensure it's running!# Navigate to your client directory

cd /path/to/client

### Mac

```bash# Copy the connection profile

# Native support - everything works as-iscp ../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json .

./network.sh up createChannel -ca -c mychannel```

````

This file contains:

### Linux

````bash- Peer endpoints

# Native support- Orderer endpoints

./network.sh up createChannel -ca -c mychannel- Certificate Authority information

```- TLS certificates



## ❗ Troubleshooting**Note**: The start.sh script does this automatically for you.



### ❌ "connection-org1.json not found"## 📁 Project Structure

```bash

cp ../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json .```

```client/

├── server.js                 # Express backend server with API endpoints

### ❌ "Network not reachable"├── app.js                    # CLI script for querying assets

```bash├── enrol.js                  # CLI script for enrolling admin

# Check containers are running:├── registerUser.js           # CLI script for registering users

docker ps├── connection-org1.json      # Fabric network connection profile (copied from fabric-samples)

# Should show: orderer, peer0.org1, peer0.org2, ca_org1, ca_org2, ca_orderer├── package.json              # Node.js dependencies and scripts

```├── pnpm-lock.yaml           # Lock file for dependencies

├── start.sh                 # Automated startup script

### ❌ "Port 3000 in use"├── README.md                # Main documentation

**Windows:**├── DOCKER.md                # Docker reference (optional)

```cmd├── wallet/                  # Stores user identities/credentials

taskkill /F /IM node.exe│   ├── admin.id             # Admin identity

```│   └── appUser.id           # Application user identity

└── public/                   # Frontend static files

**Mac/Linux:**    ├── index.html           # Main HTML interface

```bash    ├── style.css            # Styles and responsive design

pkill node    └── app.js               # Frontend JavaScript logic

````

### ❌ "Docker not running" (Windows)## 🎮 Running the Application

1. Open Docker Desktop app

2. Wait for whale icon to stop animating### Quick Start

3. Try command again

4. **Start Hyperledger Fabric Network:**

## 🔌 API Endpoints

````bash

| Endpoint | Method | Description |   docker compose up -d

|----------|--------|-------------|   ```

| `/` | GET | Web UI |

| `/api/wallet-status` | GET | Check identities |2. **Create Channel and Deploy Chaincode** (First time only):

| `/api/enroll-admin` | POST | Enroll admin |

| `/api/register-user` | POST | Register user |   ```bash

| `/api/query-assets` | GET | Get all assets |   cd ../fabric-samples/test-network

| `/api/create-asset` | POST | Create asset |   ./network.sh createChannel -c mychannel

./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript

## 🧹 Cleanup   cd ../../client

````

````bash

# Stop app (Ctrl+C)3. **Start the Client Application:**



# Stop network   ```bash

cd ../fabric-samples/test-network   npm run dev

./network.sh down   ```



# Clean Docker (optional)4. **Access the application:**

docker system prune   Open your browser to http://localhost:3000

````

### Detailed Commands

## 📦 Git Repository

**Start Fabric Network:**

**Committed:**

- ✅ Source code```bash

- ✅ Frontend files docker compose up -d

- ✅ Chaincode```

- ✅ package.json

- ✅ README.md**Stop Fabric Network:**

**Not Committed:**```bash

- ❌ node_modules (install with `npm install`)docker compose down

- ❌ wallet (generated at runtime)```

- ❌ connection-org1.json (copy from fabric-samples)

**View Fabric Logs:**

## 🛠️ Tech Stack

````bash

- **Backend**: Node.js, Express, Fabric SDKdocker compose logs -f

- **Frontend**: HTML5, CSS3, Vanilla JS```

- **Blockchain**: Hyperledger Fabric v2.5

- **Chaincode**: JavaScript**Start Client App:**



## 📚 Resources```bash

# Using npm

- [Fabric Docs](https://hyperledger-fabric.readthedocs.io/)npm run dev

- [Fabric SDK](https://hyperledger.github.io/fabric-sdk-node/)

- [Tutorial](https://hyperledger-fabric.readthedocs.io/en/latest/write_first_app.html)# OR using pnpm

pnpm dev

---```



**Made with ❤️ for Blockchain**### Alternative: Using CLI Scripts


You can also use the individual CLI scripts:

**Enroll Admin:**

```bash
node enrol.js
````

**Register Application User:**

```bash
node registerUser.js
```

**Query Assets:**

```bash
node app.js
```

## ✨ Features

### 1. **Wallet Status Dashboard**

- Real-time monitoring of enrolled identities
- Visual indicators for admin and appUser status
- Automatic status refresh

### 2. **User Management**

- **Enroll Admin**: Enrolls the admin user with Certificate Authority
- **Register App User**: Registers application user using admin credentials

### 3. **Asset Operations**

- **Query Assets**: Retrieve all assets from the blockchain ledger
- **Create Assets**: Add new assets with properties:
  - Asset ID
  - Color
  - Size
  - Owner
  - Appraised Value

### 4. **User Interface**

- Modern, responsive design
- Gradient color scheme
- Real-time feedback with loading states
- Success/Error message notifications
- Mobile-friendly layout

## 🔌 API Endpoints

### Check Wallet Status

```http
GET /api/wallet-status
```

**Response:**

```json
{
  "success": true,
  "admin": true,
  "appUser": true
}
```

### Enroll Admin

```http
POST /api/enroll-admin
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully enrolled admin user"
}
```

### Register User

```http
POST /api/register-user
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully registered and enrolled appUser"
}
```

### Query All Assets

```http
GET /api/query-assets
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "ID": "asset1",
      "Color": "blue",
      "Size": 5,
      "Owner": "Tom",
      "AppraisedValue": 300
    }
  ]
}
```

### Create Asset

```http
POST /api/create-asset
Content-Type: application/json

{
  "id": "asset7",
  "color": "red",
  "size": 10,
  "owner": "Alice",
  "appraisedValue": "500"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Asset created successfully"
}
```

## 📖 Usage Guide

### First-Time Setup Workflow

1. **Start the Application**

   - Run `pnpm start` or `npm start`
   - Open browser to `http://localhost:3000`

2. **Enroll Admin User**

   - Click "Enroll Admin" button
   - Wait for success message
   - Admin status should show ✅ Enrolled

3. **Register Application User**

   - Click "Register App User" button
   - Wait for success message
   - App User status should show ✅ Enrolled

4. **Query Existing Assets**

   - Click "Get All Assets" button
   - View the initial assets created by the chaincode

5. **Create New Asset**
   - Fill in the asset creation form:
     - Asset ID: e.g., "asset7"
     - Color: e.g., "purple"
     - Size: e.g., "15"
     - Owner: e.g., "Bob"
     - Appraised Value: e.g., "450"
   - Click "Create Asset"
   - Query assets again to see your new asset

### Example Asset Creation

```javascript
{
  "id": "asset10",
  "color": "green",
  "size": 20,
  "owner": "Charlie",
  "appraisedValue": "1000"
}
```

## 🐛 Troubleshooting

### Common Issues

#### 1. **Connection Refused Error**

**Problem**: Cannot connect to Fabric network

**Solution**:

```bash
# Check if Fabric network is running
cd fabric-samples/test-network
./network.sh down
./network.sh up createChannel -c mychannel -ca
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript
```

#### 2. **Admin Enrollment Failed**

**Problem**: Admin enrollment returns error

**Solution**:

- Verify the CA is running:
  ```bash
  docker ps | grep ca
  ```
- Check connection-org1.json has correct CA URL
- Ensure default admin credentials (admin/adminpw) are correct

#### 3. **User Already Exists**

**Problem**: Identity already exists in wallet

**Solution**:

```bash
# Remove existing identities
rm -rf wallet/admin.id
rm -rf wallet/appUser.id
```

Then re-enroll through the web interface.

#### 4. **Port 3000 Already in Use**

**Problem**: Server cannot start on port 3000

**Solution**:

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change the port in server.js
```

#### 5. **Chaincode Not Found**

**Problem**: Error invoking chaincode

**Solution**:

```bash
# Verify chaincode is deployed
cd fabric-samples/test-network
docker ps | grep basic

# Redeploy if needed
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript
```

### Logs and Debugging

**View Server Logs:**
The server console will show all API requests and errors.

**View Fabric Network Logs:**

```bash
# View peer logs
docker logs peer0.org1.example.com

# View CA logs
docker logs ca_org1

# View orderer logs
docker logs orderer.example.com
```

**Enable Debug Mode:**

```bash
# Set environment variable before starting
export HFC_LOGGING='{"debug":"console"}'
pnpm start
```

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │   HTML/CSS/JavaScript Frontend (Port 3000)           │   │
│  │   - User Interface                                    │   │
│  │   - Asset Management                                  │   │
│  │   - Wallet Status Display                             │   │
│  └─────────────────┬───────────────────────────────────┘   │
└────────────────────┼───────────────────────────────────────┘
                     │ HTTP/REST API
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              Express.js Server (server.js)                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │   API Endpoints                                       │   │
│  │   - /api/enroll-admin                                 │   │
│  │   - /api/register-user                                │   │
│  │   - /api/query-assets                                 │   │
│  │   - /api/create-asset                                 │   │
│  │   - /api/wallet-status                                │   │
│  └─────────────────┬───────────────────────────────────┘   │
└────────────────────┼───────────────────────────────────────┘
                     │ Fabric SDK
                     ↓
┌─────────────────────────────────────────────────────────────┐
│           Hyperledger Fabric Network                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │      CA      │  │    Peer      │  │   Orderer    │     │
│  │  (org1.ca)   │  │ (peer0.org1) │  │  (orderer)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │        Chaincode (basic)                             │   │
│  │        - CreateAsset                                  │   │
│  │        - GetAllAssets                                 │   │
│  │        - ReadAsset                                    │   │
│  │        - UpdateAsset                                  │   │
│  │        - DeleteAsset                                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**

- HTML5
- CSS3 (with gradients and animations)
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

**Backend:**

- Node.js (v14+)
- Express.js (v4.21+)
- Fabric Network SDK (v2.2.20)
- Fabric CA Client (v2.2.20)

**Blockchain:**

- Hyperledger Fabric v2.2
- Docker containers
- CouchDB (state database)

### Data Flow

1. **User Enrollment:**

   ```
   Browser → Express API → Fabric CA → Wallet Storage
   ```

2. **Asset Query:**

   ```
   Browser → Express API → Gateway → Channel → Chaincode → Ledger → Response
   ```

3. **Asset Creation:**
   ```
   Browser → Express API → Gateway → Transaction Proposal → Endorsement →
   Ordering → Commit → Ledger Update
   ```

## 🔒 Security Considerations

- Admin credentials are stored in the wallet directory (secure this in production)
- Connection profiles contain network topology (don't expose publicly)
- Use HTTPS in production environments
- Implement proper authentication/authorization for the web interface
- Never commit wallet files to version control

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions:

- Check the [Troubleshooting](#troubleshooting) section
- Review Hyperledger Fabric documentation: https://hyperledger-fabric.readthedocs.io/
- Open an issue in the repository

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Asset update and delete operations
- [ ] Transaction history viewer
- [ ] Multi-organization support
- [ ] Real-time blockchain event notifications
- [ ] Asset search and filtering
- [ ] Data visualization and analytics
- [ ] Export assets to CSV/JSON
- [ ] Docker containerization of the client app
- [ ] CI/CD pipeline setup

---

**Built with ❤️ using Hyperledger Fabric**

_Last Updated: October 2025_
