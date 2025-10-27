@echo off
REM ========================================
REM Hyperledger Fabric Client Setup
REM Windows Batch Script
REM ========================================

echo.
echo ========================================
echo  Hyperledger Fabric Client Setup
echo ========================================
echo.

REM Check if running in administrator mode
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [WARNING] Not running as Administrator
    echo Some operations may fail without admin rights
    echo.
    pause
)

REM Step 1: Check Node.js
echo [1/7] Checking Node.js...
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install from: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo [OK] Node.js is installed
)
echo.

REM Step 2: Check Docker
echo [2/7] Checking Docker...
docker --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] Docker is not installed!
    echo Please download and install Docker Desktop from: https://www.docker.com/
    pause
    exit /b 1
) else (
    echo [OK] Docker is installed
)
echo.

REM Step 3: Install Node.js dependencies
echo [3/7] Installing Node.js dependencies...
call npm install
if %errorLevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

REM Step 4: Check if fabric-samples exists
echo [4/7] Checking for Hyperledger Fabric installation...
if not exist "..\fabric-samples" (
    echo [INFO] Fabric not found. Would you like to download it? (This takes 5-10 minutes^)
    set /p download="Download Fabric? (Y/N): "
    if /i "%download%"=="Y" (
        echo [INFO] Downloading Hyperledger Fabric...
        cd ..
        curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh -o install-fabric.sh
        bash install-fabric.sh binary samples
        cd client
        if %errorLevel% neq 0 (
            echo [ERROR] Failed to download Fabric
            pause
            exit /b 1
        )
        echo [OK] Fabric downloaded
    ) else (
        echo [WARNING] Fabric not downloaded. You'll need to set it up manually.
        echo Please see README.md for instructions.
        pause
        exit /b 1
    )
) else (
    echo [OK] Fabric samples found
)
echo.

REM Step 5: Start Fabric network
echo [5/7] Starting Fabric network...
echo [INFO] This may take 1-2 minutes...
cd ..\fabric-samples\test-network
call network.sh down >nul 2>&1
call network.sh up createChannel -ca -c mychannel
if %errorLevel% neq 0 (
    echo [ERROR] Failed to start network
    echo Make sure Docker Desktop is running!
    cd ..\..\client
    pause
    exit /b 1
)
echo [OK] Network started
echo.

REM Step 6: Deploy chaincode
echo [6/7] Deploying chaincode...
call network.sh deployCC -ccn basic -ccp ..\asset-transfer-basic\chaincode-javascript -ccl javascript
if %errorLevel% neq 0 (
    echo [ERROR] Failed to deploy chaincode
    cd ..\..\client
    pause
    exit /b 1
)
echo [OK] Chaincode deployed
echo.

REM Step 7: Copy connection profile
echo [7/7] Copying connection profile...
copy organizations\peerOrganizations\org1.example.com\connection-org1.json ..\..\client\ >nul
if %errorLevel% neq 0 (
    echo [ERROR] Failed to copy connection profile
    cd ..\..\client
    pause
    exit /b 1
)
cd ..\..\client
echo [OK] Connection profile copied
echo.

REM All done!
echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo You can now start the application:
echo    npm start
echo.
echo Then open your browser to:
echo    http://localhost:3000
echo.
pause
