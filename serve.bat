@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required to run the offline game.
  echo Download it from https://nodejs.org and install, then run this again.
  pause
  exit /b 1
)
node serve.mjs
pause
