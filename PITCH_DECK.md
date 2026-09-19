# QUANTUM | Hackathon Pitch Deck & Slide Outline (With Visuals & Workflows)

**File Location:** [`Quantitative_FinTech_PitchDeck.pptx`](file:///c:/Users/kisho/OneDrive/Documents/Quantitative-FinTech/Quantitative_FinTech_PitchDeck.pptx)  
**Aspect Ratio:** 16:9 Widescreen Institutional Dark Theme  
**Target Event:** HackHere Hackathon  
**Visual Content:** Embedded real app screenshots + 3 structured workflow architecture diagrams.

---

### Slide 1: Title Slide (Brand & Mission)
- **Title:** QUANTUM
- **Subtitle:** Quantitative Multi-Asset Financial Intelligence & Backtesting Platform
- **Tagline:** An institutional-grade ecosystem unifying Multi-Asset Financial Data Engineering, Vectorized Indicators, Cross-Asset Correlation, Realistic Zero Look-Ahead Backtesting, and AI Research Copilots.
- **Badge:** HackHere Hackathon Edition • Gold • Bitcoin • NVIDIA • S&P 500 • Featherless AI & XGBoost

---

### Slide 2: End-to-End Quantitative & Execution Workflow (Diagram)
*A structured 5-step visual pipeline showing the journey from raw market data to AI risk synthesis:*
- **Step 1: Data Ingestion:** Live `yfinance` connector for Gold, BTC, NVDA, SPY + local disk caching + deterministic stochastic fallback.
- **Step 2: Factor Engine:** Vectorized computation of SMA (20/50/200), EMA (12/26), daily returns, rolling volatility, Sharpe, and drawdown.
- **Step 3: Correlation & Regimes:** Pearson/Spearman matrix, dynamic rolling pair correlation, and dual-factor regime classification.
- **Step 4: Discrete Backtester:** Discrete event simulation with capital tracking, position sizing, fees (0-50 bps), and strict 1-bar execution delay.
- **Step 5: AI & Risk Audit:** XGBoost directional forecasting, GMM regime clustering, 500-path Monte Carlo, and Featherless AI Copilot.

---

### Slide 3: Multi-Asset Market Data Processing & Normalization
- **Left Column:** Core capabilities across Gold (`GC=F`), Bitcoin (`BTC-USD`), NVIDIA (`NVDA`), and `SPY`, with normalized trajectory (Base = 100) and top dynamic ticker banner.
- **Right Column (Visual):** **Embedded Screenshot of Executive Overview Tab** showing the normalized comparative trajectory chart and live asset scorecards.

---

### Slide 4: Quantitative Technical Indicator Engine
- **Left Column:** Mathematical formulations for SMA (20, 50, 200), EMA (12, 26), Annualized Sharpe, Sortino, Calmar, and Continuous Underwater Drawdown.
- **Right Column (Visual):** **Embedded Screenshot of Technical Indicators Tab** showing the price chart with moving average overlays and the sub-indicator panel.

---

### Slide 5: Cross-Asset Correlation Analysis & Decoupling
- **Left Column:** Cross-Asset Heatmap Matrix (Pearson vs. Spearman), cell-click interactive pairing, and dynamic rolling correlation explorer (15-90d) with zero-baseline reference.
- **Right Column (Visual):** **Embedded Screenshot of Correlation Tab** showing the color-coded matrix and rolling correlation series.

---

### Slide 6: Strategy Backtesting Simulation Workflow (Diagram)
*A 4-step execution workflow diagram illustrating zero look-ahead bias:*
- **Step 1: Signal Generation:** Signal evaluated strictly at bar close $t$.
- **Step 2: 1-Bar Delay Execution:** Order submitted and filled on bar $t+1$ (eliminates look-ahead bias).
- **Step 3: Friction & Fee Deduction:** Deducts slippage and broker commissions (0-50 bps slider).
- **Step 4: Benchmark Attribution:** Evaluates Alpha ($\alpha$), Beta ($\beta$), Sharpe, Drawdown, and Win Rate against Buy-and-Hold.

---

### Slide 7: Strategy Backtest Dashboard & Trade Ledger
- **Left Column:** 5 supported strategies (including AI Alpha), comparative scorecards, equity curve vs. drawdown chart views, and filterable trade ledger.
- **Right Column (Visual):** **Embedded Screenshot of Backtester Tab** showing the Strategy Equity Curve outperforming the Buy-and-Hold benchmark.

---

### Slide 8: AI & Machine Learning Alpha Pipeline (Diagram)
*A 5-step ML pipeline workflow diagram:*
- **Step 1: Feature Engineering:** Extraction of MACD Diff, RSI 14, Dist SMA 20/50, Bollinger %B, Volatility 15d, and ROC 5d/10d.
- **Step 2: Walk-Forward Split:** 80/20 chronological train/test split to prevent data leakage.
- **Step 3: Ensemble Classifier:** Training XGBoost + Random Forest to compute directional probabilities ($P > 51\%$).
- **Step 4: Explainable AI (XAI):** Dynamic Feature Importance ranking ranking top predictors.
- **Step 5: Unsupervised Regimes:** Gaussian Mixture Models (GMM) clustering latent macro states.

---

### Slide 9: AI Lab & Featherless AI Research Copilot
- **Left Column:** Supervised ML Directional Forecast (Bullish/Bearish signal & confidence), XAI Feature Importance ranking, and Featherless AI (Mistral-7B) Quant Copilot.
- **Right Column (Visual):** **Embedded Screenshot of AI Lab Tab** showing the ML Directional Forecast gauge and Explainable AI Feature Importance bar chart.

---

### Slide 10: Advanced Risk Modeling & Conclusion
- **Left Column:** 500-Path Monte Carlo forward simulation (5th to 95th percentile cones), 95%/99% Parametric & Historical VaR, and Expected Shortfall (CVaR).
- **Right Column:** Conclusion, 100% HackHere telemetry compliance, zero internet dependency, and live demonstration links (`http://localhost:5173` & `http://localhost:8000/docs`).
