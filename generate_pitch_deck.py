import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Theme colors (FinTech Dark Institutional Aesthetic)
    BG_COLOR = RGBColor(9, 13, 22)        # #090d16
    CARD_BG = RGBColor(15, 23, 42)       # #0f172a
    CYAN = RGBColor(6, 182, 212)         # #06b6d4
    EMERALD = RGBColor(16, 185, 129)     # #10b981
    ROSE = RGBColor(244, 63, 94)         # #f43f5e
    INDIGO = RGBColor(99, 102, 241)      # #6366f1
    AMBER = RGBColor(245, 158, 11)       # #f59e0b
    TEXT_WHITE = RGBColor(248, 250, 252) # #f8fafc
    TEXT_MUTED = RGBColor(148, 163, 184) # #94a3b8

    assets_dir = os.path.join(os.path.dirname(__file__), "slides_assets")

    def set_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_COLOR
        bg.line.fill.background()
        return bg

    def add_header(slide, title_text, category="QUANTUM FINTECH"):
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(8), Inches(0.35))
        tf_cat = cat_box.text_frame
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category.upper()
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = CYAN

        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.65), Inches(11.5), Inches(0.65))
        tf = title_box.text_frame
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.size = Pt(24)
        p.font.bold = True
        p.font.color.rgb = TEXT_WHITE

    def add_card(slide, x, y, w, h, title, content_list, border_color=CYAN):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = border_color
        card.line.width = Pt(1.5)

        tx_box = slide.shapes.add_textbox(Inches(x + 0.2), Inches(y + 0.15), Inches(w - 0.4), Inches(h - 0.3))
        tf = tx_box.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(15)
        p_t.font.bold = True
        p_t.font.color.rgb = border_color
        p_t.space_after = Pt(8)

        for item in content_list:
            p_b = tf.add_paragraph()
            p_b.text = "• " + item
            p_b.font.size = Pt(11)
            p_b.font.color.rgb = TEXT_MUTED
            p_b.space_after = Pt(5)

    def add_image_card(slide, x, y, w, h, img_filename, label_text):
        # Outer container card
        frame = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
        frame.fill.solid()
        frame.fill.fore_color.rgb = CARD_BG
        frame.line.color.rgb = CYAN
        frame.line.width = Pt(1.5)

        # Header label
        tx_box = slide.shapes.add_textbox(Inches(x + 0.15), Inches(y + 0.1), Inches(w - 0.3), Inches(0.4))
        tf = tx_box.text_frame
        p = tf.paragraphs[0]
        p.text = "📸 LIVE APP VISUAL: " + label_text.upper()
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = EMERALD

        # Image embed
        img_path = os.path.join(assets_dir, img_filename)
        if os.path.exists(img_path):
            slide.shapes.add_picture(img_path, Inches(x + 0.2), Inches(y + 0.5), width=Inches(w - 0.4), height=Inches(h - 0.7))

    def add_workflow_step(slide, x, y, w, h, step_num, step_title, step_desc, color=CYAN, is_last=False):
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.color.rgb = color
        box.line.width = Pt(1.5)

        tb = slide.shapes.add_textbox(Inches(x + 0.1), Inches(y + 0.1), Inches(w - 0.2), Inches(h - 0.2))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = f"STEP {step_num}"
        p1.font.size = Pt(9)
        p1.font.bold = True
        p1.font.color.rgb = color
        p1.space_after = Pt(2)

        p2 = tf.add_paragraph()
        p2.text = step_title
        p2.font.size = Pt(12)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_WHITE
        p2.space_after = Pt(4)

        p3 = tf.add_paragraph()
        p3.text = step_desc
        p3.font.size = Pt(9.5)
        p3.font.color.rgb = TEXT_MUTED

        if not is_last:
            arrow = slide.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, Inches(x + w + 0.05), Inches(y + (h / 2) - 0.15), Inches(0.3), Inches(0.3))
            arrow.fill.solid()
            arrow.fill.fore_color.rgb = color
            arrow.line.fill.background()

    # ==================== SLIDE 1: TITLE SLIDE ====================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1)

    decor = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.2), Inches(11.7), Inches(5.1))
    decor.fill.solid()
    decor.fill.fore_color.rgb = CARD_BG
    decor.line.color.rgb = CYAN
    decor.line.width = Pt(2)

    tb1 = s1.shapes.add_textbox(Inches(1.2), Inches(1.6), Inches(11.0), Inches(4.5))
    tf1 = tb1.text_frame
    tf1.word_wrap = True

    p0 = tf1.paragraphs[0]
    p0.text = "HACKHERE HACKATHON PITCH DECK"
    p0.font.size = Pt(13)
    p0.font.bold = True
    p0.font.color.rgb = CYAN
    p0.space_after = Pt(8)

    p1 = tf1.add_paragraph()
    p1.text = "QUANTUM"
    p1.font.size = Pt(44)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_WHITE

    p2 = tf1.add_paragraph()
    p2.text = "Quantitative Multi-Asset Financial Intelligence & Backtesting Platform"
    p2.font.size = Pt(20)
    p2.font.color.rgb = EMERALD
    p2.space_after = Pt(14)

    p3 = tf1.add_paragraph()
    p3.text = "An institutional-grade ecosystem unifying Multi-Asset Financial Data Engineering, Vectorized Indicators, Cross-Asset Correlation, Realistic Zero Look-Ahead Backtesting, and AI Research Copilots."
    p3.font.size = Pt(12)
    p3.font.color.rgb = TEXT_MUTED
    p3.space_after = Pt(14)

    # Key Highlights Pill Bar on Title Slide
    p4 = tf1.add_paragraph()
    p4.text = "💎 Gold (GC=F)  •  ₿ Bitcoin (BTC-USD)  •  ⚡ NVIDIA (NVDA)  •  📈 S&P 500 (SPY)  •  🤖 Featherless AI (Mistral-7B) & XGBoost"
    p4.font.size = Pt(11)
    p4.font.bold = True
    p4.font.color.rgb = CYAN

    # ==================== SLIDE 2: END-TO-END SYSTEM WORKFLOW ====================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2)
    add_header(s2, "End-to-End Quantitative & Execution Workflow", "System Architecture & Pipeline")

    w_w = 2.15
    h_h = 4.8
    y_pos = 1.6
    add_workflow_step(s2, 0.8, y_pos, w_w, h_h, 1, "Data Ingestion", 
                      "Collects live market data (yfinance) for Gold, BTC, NVDA, SPY with local caching & deterministic fallback for 100% demo resilience.", CYAN)
    add_workflow_step(s2, 3.25, y_pos, w_w, h_h, 2, "Factor Engine", 
                      "Vectorized computation of SMA (20/50/200), EMA (12/26), daily returns, rolling volatility, Sharpe, and maximum drawdown.", INDIGO)
    add_workflow_step(s2, 5.7, y_pos, w_w, h_h, 3, "Correlation & Regimes", 
                      "Generates Pearson/Spearman matrix, dynamic rolling pair correlation, and Bull/Bear & High/Low Volatility regime classification.", AMBER)
    add_workflow_step(s2, 8.15, y_pos, w_w, h_h, 4, "Discrete Backtester", 
                      "Simulates discrete trade executions with capital tracking, position sizing, fees (0-50 bps), and strict 1-bar delay (zero lookahead bias).", EMERALD)
    add_workflow_step(s2, 10.6, y_pos, w_w, h_h, 5, "AI & Risk Audit", 
                      "XGBoost directional forecasting, GMM regime clustering, 500-path Monte Carlo bootstrap, and Featherless AI Copilot synthesis.", ROSE, is_last=True)

    # ==================== SLIDE 3: MULTI-ASSET MARKET DATA (WITH VISUAL) ====================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3)
    add_header(s3, "Multi-Asset Market Data Processing & Normalization", "Evaluation Focus 1")

    add_card(s3, 0.8, 1.6, 5.2, 5.2, "Core Capabilities & Normalization", [
        "Universal Asset Classes: Commodities (Gold GC=F), Cryptocurrencies (Bitcoin BTC-USD), and Equities (NVIDIA NVDA & S&P 500 SPY).",
        "Normalized Trajectory (Base = 100): Indexes all assets to 100 on day 0, allowing direct visual comparison across radically different price ranges.",
        "Interactive Asset Cards: Instant display of Current Price, Period Return, Annualized Sharpe Ratio, and Maximum Drawdown.",
        "One-Click 'Analyze' Action: Clicking any asset card automatically cascades that asset across the entire platform.",
        "Dynamic Header Ticker: Top ticker updates in real time with price, Sharpe, and volatility."
    ], CYAN)

    add_image_card(s3, 6.2, 1.6, 6.3, 5.2, "overview.png", "Executive Overview & Normalized Chart")

    # ==================== SLIDE 4: QUANTITATIVE INDICATORS (WITH VISUAL) ====================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4)
    add_header(s4, "Quantitative Technical Indicator Engine", "Evaluation Focus 2")

    add_card(s4, 0.8, 1.6, 5.2, 5.2, "Mathematical Formulations", [
        "Trend Overlays: Interactive toggles for Simple Moving Averages (SMA 20, 50, 200) and Exponential Moving Averages (EMA 12, 26).",
        "Sharpe Ratio: Excess annualized return over 4% risk-free hurdle divided by annualized volatility: (μ - rf) / σ * sqrt(252).",
        "Sortino & Calmar: Downside risk penalty and CAGR relative to maximum drawdown.",
        "30-Day Rolling Analytics: Continuous rolling Sharpe ratio and rolling volatility.",
        "Continuous Underwater Drawdown: Peak-to-trough equity drop series tracking capital preservation."
    ], INDIGO)

    add_image_card(s4, 6.2, 1.6, 6.3, 5.2, "indicators.png", "Technical Indicators & Moving Averages (NVDA)")

    # ==================== SLIDE 5: CROSS-ASSET CORRELATION (WITH VISUAL) ====================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5)
    add_header(s5, "Cross-Asset Correlation Analysis & Decoupling", "Evaluation Focus 3")

    add_card(s5, 0.8, 1.6, 5.2, 5.2, "Heatmap & Rolling Correlation", [
        "Cross-Asset Heatmap Matrix: Color-coded from deep rose (-1.0) to bright cyan (+1.0) across Gold, Bitcoin, NVIDIA, and SPY.",
        "Methodology Switcher: Instant one-click toggle between Pearson (Linear) and Spearman (Rank) correlation.",
        "Interactive Cell Linking: Clicking any matrix cell immediately loads that specific asset pair in the rolling correlation explorer below!",
        "Dynamic Rolling Correlation: Customizable rolling windows (15, 30, 60, 90 days) with zero-baseline reference to detect safe-haven decoupling.",
        "Automated Decoupling Insights: Highlights portfolio diversification benefits in real time."
    ], EMERALD)

    add_image_card(s5, 6.2, 1.6, 6.3, 5.2, "correlation.png", "Interactive Correlation Matrix & Heatmap")

    # ==================== SLIDE 6: STRATEGY BACKTESTING WORKFLOW ====================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6)
    add_header(s6, "Strategy Backtesting Simulation Workflow", "Realistic Execution Architecture")

    w_w = 2.75
    h_h = 4.8
    y_pos = 1.6
    add_workflow_step(s6, 0.8, y_pos, w_w, h_h, 1, "Signal Generation", 
                      "Signal computed strictly at bar close t across SMA Crossover, EMA Trend, Momentum ROC, Mean Reversion, or ML Alpha.", CYAN)
    add_workflow_step(s6, 3.85, y_pos, w_w, h_h, 2, "1-Bar Delay Execution", 
                      "Trade executes on bar t+1. Strict 1-bar execution delay completely eliminates Look-Ahead Bias common in open-source backtesters.", INDIGO)
    add_workflow_step(s6, 6.9, y_pos, w_w, h_h, 3, "Fee & Friction Deductions", 
                      "Applies slippage and broker commissions (0 to 50 bps slider) to both entry and exit. Tracks cash, shares, and portfolio value.", AMBER)
    add_workflow_step(s6, 9.95, y_pos, w_w, h_h, 4, "Benchmark Attribution", 
                      "Compares strategy equity head-to-head against Buy-and-Hold benchmark for Return, CAGR, Sharpe, Drawdown, Alpha, and Beta.", EMERALD, is_last=True)

    # ==================== SLIDE 7: BACKTEST RESULTS & DASHBOARD (WITH VISUAL) ====================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7)
    add_header(s7, "Strategy Backtest Dashboard & Trade Ledger", "Evaluation Focus 4")

    add_card(s7, 0.8, 1.6, 5.2, 5.2, "Interactive Dashboard & Ledger", [
        "5 Supported Strategies: SMA Crossover, EMA Trend, Momentum Breakout, Bollinger Mean Reversion, and AI/ML Predictive Alpha.",
        "Comparative Scorecard: Total Return %, CAGR %, Sharpe, Max Drawdown %, Alpha (α %), Market Beta (β), Win Rate %, and Profit Factor.",
        "Interactive Chart Views: One-click toggle between Portfolio Equity Curve ($) and Underwater Drawdown (%) vs. Benchmark.",
        "Simulated Trade Ledger: Full chronological ledger with Trade ID, Type (Long), Entry/Exit Dates, Prices, Net PnL ($), and Fees.",
        "Filterable Ledger: Instant filter by All, Winners, and Losers."
    ], CYAN)

    add_image_card(s7, 6.2, 1.6, 6.3, 5.2, "backtest.png", "Backtest Equity Curve vs. Benchmark")

    # ==================== SLIDE 8: AI & MACHINE LEARNING PIPELINE WORKFLOW ====================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8)
    add_header(s8, "AI & Machine Learning Alpha Pipeline", "Future Scope: ML Architecture")

    w_w = 2.15
    h_h = 4.8
    y_pos = 1.6
    add_workflow_step(s8, 0.8, y_pos, w_w, h_h, 1, "Feature Engineering", 
                      "Extracts MACD Diff, RSI 14, Distance to SMA 20/50, Bollinger %B, Volatility 15d, and Momentum ROC 5d/10d.", CYAN)
    add_workflow_step(s8, 3.25, y_pos, w_w, h_h, 2, "Walk-Forward Split", 
                      "80/20 chronological train/test split. Prevents data leakage and simulates true out-of-sample forward trading.", INDIGO)
    add_workflow_step(s8, 5.7, y_pos, w_w, h_h, 3, "Ensemble Classifier", 
                      "Trains XGBoost Classifier + Random Forest. Computes directional probabilities: P(Bullish) vs P(Bearish).", AMBER)
    add_workflow_step(s8, 8.15, y_pos, w_w, h_h, 4, "Explainable AI (XAI)", 
                      "Generates dynamic Feature Importance ranking showing which technical factors drive the AI's predictions.", EMERALD)
    add_workflow_step(s8, 10.6, y_pos, w_w, h_h, 5, "Unsupervised Regimes", 
                      "Gaussian Mixture Models (GMM) cluster market history into Expansion, High-Vol Shock, and Neutral states.", ROSE, is_last=True)

    # ==================== SLIDE 9: AI LAB & COPILOT (WITH VISUAL) ====================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9)
    add_header(s9, "AI Lab & Featherless AI Research Copilot", "Future Scope: AI Implementation")

    add_card(s9, 0.8, 1.6, 5.2, 5.2, "Live AI Capabilities", [
        "Supervised ML Directional Forecast: Real-time Next-Period Signal (BULLISH/BEARISH), Model Confidence %, and Test Accuracy.",
        "Explainable AI (XAI): Horizontal bar chart ranking feature importance (MACD Diff, RSI 14, Dist SMA 50).",
        "Unsupervised GMM Regime Clustering: Discovers latent market regimes without arbitrary heuristics.",
        "Featherless AI Quant Copilot: Live Mistral-7B research assistant powered by Featherless AI using the user's API key.",
        "Context-Aware Prompting: Copilot automatically receives real-time asset price, Sharpe ratio, volatility, and ML signals."
    ], CYAN)

    add_image_card(s9, 6.2, 1.6, 6.3, 5.2, "ai_lab.png", "AI Directional Forecast & XAI Feature Ranking")

    # ==================== SLIDE 10: ADVANCED RISK & CONCLUSION ====================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10)
    add_header(s10, "Advanced Risk Modeling & Conclusion", "Summary & Demonstration")

    add_card(s10, 0.8, 1.6, 5.6, 5.2, "Risk Modeling (Monte Carlo & VaR)", [
        "500-Path Monte Carlo Bootstrap: Forward simulation across 126, 252, and 504 trading days with 5th to 95th percentile confidence cones.",
        "Value-at-Risk (VaR): Parametric (Normal) and Historical Empirical VaR at 95% and 99% confidence intervals.",
        "Expected Shortfall (CVaR): Quantifies average tail loss severity beyond VaR.",
        "Automated Research Audit Report: Synthesizes institutional rating grades (A to D) with one-click JSON export."
    ], ROSE)

    add_card(s10, 6.8, 1.6, 5.7, 5.2, "Conclusion & Live Demonstration", [
        "100% HackHere Compliance: Solves all telemetry, data engineering, backtesting, and future scope criteria.",
        "Zero Look-Ahead Bias: Mathematically sound discrete simulation.",
        "Zero Internet Dependency: Local disk caching and deterministic fallback ensures 100% presentation uptime.",
        "Live Dashboard: http://localhost:5173",
        "FastAPI Swagger Docs: http://localhost:8000/docs",
        "Launcher: start.ps1 / run.bat"
    ], EMERALD)

    output_path = os.path.join(os.path.dirname(__file__), "Quantitative_FinTech_PitchDeck.pptx")
    prs.save(output_path)
    print(f"Presentation saved successfully to {output_path}")
    return output_path

if __name__ == "__main__":
    create_deck()
