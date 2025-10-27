
curl -sSL https://bit.ly/2ysbOFE | bash -s

cd fabric-samples/test-network

./network.sh down

./network.sh up createChannel -ca

# Deploy the basic chaincode
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript
