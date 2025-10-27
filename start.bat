@echo off
REM ========================================
REM Start Hyperledger Fabric Client
REM ========================================

echo.
echo ========================================
echo  Starting Fabric Client Application
echo ========================================
echo.

REM Check if connection file exists
if not exist "connection-org1.json" (
    echo [ERROR] connection-org1.json not found!
    echo.
    echo Please run setup.bat first, or copy the file manually:
    echo    copy ..\fabric-samples\test-network\organizations\peerOrganizations\org1.example.com\connection-org1.json .
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo [WARNING] Dependencies not installed. Installing now...
    call npm install
    if %errorLevel% neq 0 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Start the application
echo [INFO] Starting server on http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
call npm start
