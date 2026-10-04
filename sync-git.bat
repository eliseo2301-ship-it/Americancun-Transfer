@echo off
echo ========================================================
echo   Americancun Transfer - Git Repository Synchronization
echo   Remote: https://github.com/eliseo2301-ship-it/Americancun-Transfer
echo ========================================================

git status
git add .
git commit -m "feat: complete Americancun Transfer platform, booking engine, SPEI checkout, and 60-min WhatsApp alarms"
git branch -M main
git push -u origin main

echo.
echo Synchronization completed successfully!
pause
