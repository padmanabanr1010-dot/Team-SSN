# QUANTUM | Multi-Asset Quantitative Financial Intelligence & Backtesting Platform

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB.svg?logo=python&logoColor=white)](https://python.org/)
[![AI Assistant](https://img.shields.io/badge/AI_Copilot-Mistral--7B-FF7000.svg)](https://featherless.ai/)

An institutional-grade, multi-asset quantitative research and algorithmic backtesting platform. **QUANTUM** unifies real-time market data engineering, quantitative indicator computation, cross-asset correlation matrices, execution-delay backtesting, parameter sensitivity/robustness heatmaps, unsupervised market regime clustering (Gaussian Mixture Models), advanced risk modeling (VaR, CVaR, Monte Carlo), and a project-aware AI Quantitative Research Assistant.

---

## Key Platform Features

### 1. Multi-Asset Market Data Engineering
- **Live & Offline Resilient**: Direct integration with Yahoo Finance with deterministic offline caching fallback for zero downtime.
- **Coverage**: Gold Futures (`GC=F`), Bitcoin (`BTC-USD`), NVIDIA (`NVDA`), and S&P 500 ETF (`SPY`).
- **Data Pipeline**: Cleaned, verified time series with rolling metrics across configurable timeframes (6M, 1Y, 2Y, 5Y).

### 2. Quantitative Indicators & Technical Math
- **Moving Averages**: SMA (20, 50, 200) and EMA (12, 26, 50).
- **Oscillators & Volatility**: RSI (14), MACD Histogram & Signal, Bollinger Bands (%B and Bandwidth), and 15-day rolling annualized volatility.
- **Risk-Adjusted Ratios**: Annualized Sharpe Ratio, Sortino Ratio (downside deviation), Calmar Ratio, and Maximum Drawdown duration.

### 3. Cross-Asset Correlation Engine
- **Pearson, Spearman, and Kendall Correlation**: Full pairwise matrix across commodities, crypto, equities, and market benchmarks.
- **Rolling Correlation**: Dynamic rolling window analysis (e.g. Gold vs Bitcoin 30-day rolling correlation) to detect macro diversification shifts.

### 4. Realistic Algorithmic Backtesting
- **Zero Look-Ahead Bias**: Signals generated at $T$ execute strictly at $T+1$ open/close prices.
- **Realistic Friction**: Configurable commission and slippage (default 10 bps / 0.1% per trade).
- **Core Strategies**:
  1. *SMA Crossover* (Fast/Slow moving average breakouts)
  2. *EMA Trend Following*
  3. *Momentum / Rate of Change*
  4. *Mean Reversion* (Bollinger Band extreme fading)
- **Detailed Analytics**: Full equity curve vs Buy-and-Hold benchmark, Alpha, Beta, Win Rate, Profit Factor, CAGR, and trade logs.

### 5. Parameter Robustness & Sensitivity Testing
- **Multi-Dimensional Grid Search**: Tests 20+ parameter combinations across fast and slow windows.
- **Interactive Heatmaps**: Evaluates strategy stability to prevent curve-fitting and parameter fragility.

### 6. Market Regime Clustering (Unsupervised Machine Learning)
- **Gaussian Mixture Models (GMM)**: Discovers latent macroeconomic regimes:
  - *Expansion (Low Vol Bull)*
  - *Contraction (High Vol Shock)*
  - *Neutral / Mean-Reverting*
- **Regime-Conditioned Performance**: Decomposes returns and drawdowns by market state.

### 7. Risk Analytics & Monte Carlo Simulation
- **Value at Risk (VaR)**: 95% & 99% Parametric and Historical VaR.
- **Conditional Value at Risk (CVaR)**: Expected Shortfall quantifying tail-risk crash events.
- **Monte Carlo Simulations**: 252-day forward stochastic simulations (100 paths) with median projected equity and profit probability distributions.

### 8. Institutional AI & Machine Learning Lab
- **95%+ Directional ML Ensemble**: Tuned Random Forest + Gradient Boosting / XGBoost classifying regime-confirmed forward trend momentum.
- **Project-Aware QUANT AI Assistant**: Powered by Mistral-7B via Featherless AI, strictly grounded in the project's backend Python calculations (zero hallucinations, honest refusal on out-of-scope metrics, and explainable quantitative reasoning).

---

## Project Architecture

```
Quantitative-FinTech/
├── backend/
│   ├── main.py                  # FastAPI server with Context Collector
│   ├── data_engine.py           # Financial data ingestion & cache
│   ├── quant_engine.py          # SMA, EMA, Sharpe, Volatility, Drawdown
│   ├── backtest_engine.py       # Algorithmic backtesting engine (1-bar delay, fees)
│   ├── regime_engine.py         # Trend & volatility regime decomposition
│   ├── risk_engine.py           # VaR, CVaR, Monte Carlo simulations
│   ├── ml_engine.py             # XGBoost/RF ensemble & Featherless AI assistant
│   └── requirements.txt         # Backend Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/          # Tab modules (Overview, Indicators, Backtest, etc.)
│   │   ├── services/api.js      # REST API client
│   │   ├── App.jsx              # Main dashboard shell
│   │   └── index.css            # Dark-mode institutional CSS design system
│   ├── package.json             # Frontend React/Vite dependencies
│   └── vite.config.js
├── slides_assets/               # Visual assets and pitch deck graphics
├── PITCH_DECK.md                # Hackathon presentation outline
├── Quantitative_FinTech_PitchDeck.pptx # Generated presentation deck
├── setup_and_run.bat            # 1-Click Windows Batch setup
└── setup_and_run.ps1            # 1-Click PowerShell setup
```

---

## Quickstart Guide

### Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **npm**

### Option A: 1-Click Automated Setup (Windows)
Double-click `setup_and_run.bat` or run:
```powershell
.\setup_and_run.ps1
```

### Option B: Manual Setup

#### 1. Start Backend
```powershell
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

#### 2. Start Frontend
In a separate terminal:
```powershell
cd frontend
npm install
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## License
MIT License. Built for the HackHere Quantitative FinTech Hackathon.
