# QUANTUM Platform Launcher for PowerShell
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  QUANTUM | Multi-Asset FinTech Intelligence Platform    " -ForegroundColor White
Write-Host "=========================================================" -ForegroundColor Cyan

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 1. Launch FastAPI Backend
Write-Host "[1/2] Starting Python FastAPI Backend on http://localhost:8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\backend'; Write-Host 'QUANTUM Backend Active on http://localhost:8000' -ForegroundColor Green; python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

# 2. Launch Vite Frontend
Write-Host "[2/2] Starting React + Vite Frontend on http://localhost:5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\frontend'; Write-Host 'QUANTUM Frontend Active on http://localhost:5173' -ForegroundColor Cyan; npm.cmd run dev"

# 3. Open Browser
Start-Sleep -Seconds 3
Write-Host "Opening Dashboard in Browser..." -ForegroundColor Green
Start-Process "http://localhost:5173"

Write-Host "Platform successfully launched!" -ForegroundColor Green
