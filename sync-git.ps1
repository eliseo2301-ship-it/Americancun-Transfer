# Americancun Transfer - Git Push PowerShell Script
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Americancun Transfer - Git Repository Synchronization" -ForegroundColor Yellow
Write-Host "  Remote: https://github.com/eliseo2301-ship-it/Americancun-Transfer" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

git status
git add .
$commitMsg = "feat: complete Americancun Transfer platform, booking engine, SPEI checkout, and 60-min WhatsApp alarms"
git commit -m $commitMsg
git branch -M main
git push -u origin main

Write-Host "`nGit synchronization finished successfully!" -ForegroundColor Green
