#!/bin/bash
# Exit immediately if any command fails
set -e

echo "📦 Updating system packages..."
sudo apt update

echo "🔧 Installing dependencies (curl, git, jq, docker, dos2unix)..."
# Added docker.io, docker-compose, and dos2unix
sudo apt install -y curl git jq docker.io docker-compose dos2unix

echo "🐳 Configuring Docker permissions..."
# Add your user to the 'docker' group to run docker without sudo
sudo usermod -aG docker $USER

echo "📦 Installing Node.js (LTS)..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

echo "🐹 Installing Go..."
GO_VERSION="1.21.5"
wget "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go${GO_VERSION}.linux-amd64.tar.gz"
rm "go${GO_VERSION}.linux-amd64.tar.gz"

# Set up Go path for this script AND for future sessions
export PATH=$PATH:/usr/local/go/bin
# Add to .bashrc only if it's not already there
grep -qxF 'export PATH=$PATH:/usr/local/go/bin' ~/.bashrc || echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc

echo "==================================================================="
echo "IMPORTANT: Applying Docker group permissions..."
echo "This script will now restart in a new shell with Docker permissions."
echo "==================================================================="

newgrp docker << EOF

set -e # Re-enable 'exit on error' for the new sub-shell

echo "✅ Verifying installations (inside new Docker-enabled shell)..."
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"
echo "Go version: $(go version)"
echo "Docker version: $(docker --version)"
echo "Docker Compose version: $(docker-compose --version)"

echo "📥 Downloading Hyperledger Fabric samples and binaries..."
curl -sSL https://bit.ly/2ysbOFE | bash -s

cd fabric-samples/test-network

echo "Unix-ifying scripts (running dos2unix)..."
dos2unix ./network.sh

echo "🧹 Cleaning up existing network..."
./network.sh down

echo "🚀 Starting Fabric network and creating channel named 'channel'..."
./network.sh up createChannel -c channel

echo "📦 Deploying basic chaincode to channel 'channel'..."
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript -c channel

echo "✅ Setup complete! The Fabric network is up and running on channel 'channel'."

EOF

echo "🎉 All done."
