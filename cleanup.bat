@echo off
REM ========================================
REM Cleanup Hyperledger Fabric Network
REM ========================================

echo.
echo ========================================
echo  Fabric Network Cleanup
echo ========================================
echo.

set /p confirm="Are you sure you want to stop and clean the network? (Y/N): "
if /i not "%confirm%"=="Y" (
    echo Cleanup cancelled.
    pause
    exit /b 0
)

echo.
echo [INFO] Stopping Fabric network...

if exist "..\fabric-samples\test-network" (
    cd ..\fabric-samples\test-network
    call network.sh down
    cd ..\..\client
    echo [OK] Network stopped
) else (
    echo [WARNING] fabric-samples/test-network not found
)

echo.
echo [INFO] Cleaning local files...

if exist "wallet" (
    rmdir /s /q wallet
    echo [OK] Wallet removed
)

if exist "connection-org1.json" (
    del connection-org1.json
    echo [OK] Connection profile removed
)

echo.
echo [INFO] Cleanup complete!
echo.
echo To restart everything, run: setup.bat
echo.
pause
