import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_query(prompt, symbol="BTC-USD", strategy="sma_crossover"):
    print(f"\n==========================================")
    print(f"QUERY: {prompt}")
    print(f"ASSET: {symbol} | STRATEGY: {strategy}")
    print(f"==========================================")
    payload = {
        "prompt": prompt,
        "symbol": symbol,
        "period": "2y",
        "strategy": strategy,
        "initial_capital": 100000.0,
        "transaction_cost_pct": 0.001
    }
    try:
        res = requests.post(f"{BASE_URL}/ai/chat", json=payload, timeout=40)
        res.raise_for_status()
        data = res.json()
        resp = data.get("response", "")
        print("RESPONSE:\n" + resp)
        return resp
    except Exception as e:
        print(f"ERROR: {e}")
        return None

if __name__ == "__main__":
    # 1. Backtest Question
    test_query("Why did this strategy make the returns it did? Explain the trades, drawdown, and transaction costs.", symbol="BTC-USD", strategy="sma_crossover")
    
    # 2. Risk Question
    test_query("What does my VaR and CVaR mean for our portfolio?", symbol="BTC-USD")
    
    # 3. Technical Question
    test_query("How is Sharpe Ratio calculated in this project?", symbol="NVDA")

    # 4. Comparison Question
    test_query("Compare Bitcoin and NVIDIA based on actual project metrics.", symbol="BTC-USD")

    # 5. Missing Data Refusal Test
    test_query("What is the P/E ratio, quarterly dividend yield, and board of directors for this asset?", symbol="BTC-USD")
