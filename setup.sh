

echo "📦 Updating system packages..."
sudo apt update

echo "🔧 Installing dependencies..."
sudo apt install -y curl git jq

echo "📦 Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

echo "🐹 Installing Go..."
wget https://go.dev/dl/go1.21.5.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz
rm go1.21.5.linux-amd64.tar.gz

export PATH=$PATH:/usr/local/go/bin
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc

echo "✅ Verifying installations..."
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"
echo "Docker version: $(docker --version)"
echo "Docker Compose version: $(docker-compose --version)"
echo "Go version: $(go version)"

echo "📥 Downloading Hyperledger Fabric samples and binaries..."
curl -sSL https://bit.ly/2ysbOFE | bash -s

cd fabric-samples/test-network

echo "🧹 Cleaning up existing network..."
./network.sh down

echo "🚀 Starting Fabric network and creating channel..."
./network.sh up createChannel -ca

echo "📦 Deploying basic chaincode..."
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript

echo "✅ Setup complete! You may need to log out and log back in for Docker permissions to take effect."
