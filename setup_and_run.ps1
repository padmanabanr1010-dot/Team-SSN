# Automated Setup & Run for Friend's Computer
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  QUANTUM Platform - First-Time Setup & Launcher          " -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 1. Check Python
Write-Host "`n[Step 1/4] Checking Python installation..." -ForegroundColor Yellow
$py = Get-Command python -ErrorAction SilentlyContinue
if (-not $py) {
    Write-Host "ERROR: Python is not installed or not in PATH! Please install Python 3.10+ from python.org" -ForegroundColor Red
    Pause
    Exit
}
Write-Host "Python detected: $(python --version)" -ForegroundColor Green

# 2. Check Node.js & npm
Write-Host "`n[Step 2/4] Checking Node.js installation..." -ForegroundColor Yellow
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
    Write-Host "ERROR: Node.js is not installed or not in PATH! Please install Node.js from nodejs.org" -ForegroundColor Red
    Pause
    Exit
}
Write-Host "Node.js detected: $(node --version)" -ForegroundColor Green

# 3. Install Python Dependencies
Write-Host "`n[Step 3/4] Installing Python quantitative & AI packages..." -ForegroundColor Yellow
python -m pip install --upgrade pip
python -m pip install -r "$rootDir\backend\requirements.txt" scikit-learn xgboost requests

# 4. Install Node.js Frontend Dependencies
Write-Host "`n[Step 4/4] Installing Frontend NPM dependencies..." -ForegroundColor Yellow
cd "$rootDir\frontend"
npm.cmd install

# 5. Launch Backend & Frontend
Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "  Launching QUANTUM Application...                       " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

# Start Backend Window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\backend'; Write-Host 'QUANTUM Backend Active on http://localhost:8000' -ForegroundColor Green; python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

# Start Frontend Window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\frontend'; Write-Host 'QUANTUM Frontend Active on http://localhost:5173' -ForegroundColor Cyan; npm.cmd run dev"

# Wait & Open Browser
Start-Sleep -Seconds 4
Write-Host "Opening Dashboard in Browser..." -ForegroundColor Green
Start-Process "http://localhost:5173"

Write-Host "`nAll set! Both servers are running." -ForegroundColor Green
