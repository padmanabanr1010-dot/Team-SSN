import pandas as pd
import numpy as np
from data_engine import fetch_historical_data
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score

for sym in ['BTC-USD', 'NVDA', 'GC=F', 'SPY']:
    df = fetch_historical_data(sym, '2y')
    closes = df['close']
    
    # Trend Momentum Directional Target
    ema_fast = closes.ewm(span=5, adjust=False).mean()
    ema_slow = closes.ewm(span=20, adjust=False).mean()
    target_trend = (ema_fast.shift(-1) > ema_slow.shift(-1)).astype(int)
    
    # Enhanced Institutional Feature Matrix
    features = pd.DataFrame()
    delta = closes.diff()
    gain = delta.clip(lower=0).rolling(14).mean()
    loss = (-delta.clip(upper=0)).rolling(14).mean()
    features['rsi_14'] = (100 - (100 / (1 + (gain / (loss + 1e-9))))).fillna(50)
    features['ema_ratio'] = (ema_fast / (ema_slow + 1e-9)) - 1.0
    features['dist_sma_20'] = (closes / closes.rolling(20).mean()) - 1.0
    features['dist_sma_50'] = (closes / closes.rolling(50).mean()) - 1.0
    features['dist_sma_200'] = (closes / closes.rolling(200, min_periods=20).mean()) - 1.0
    features['roc_5d'] = closes.pct_change(5)
    features['roc_10d'] = closes.pct_change(10)
    features['volatility_15d'] = closes.pct_change().rolling(15).std() * np.sqrt(252)
    macd = closes.ewm(span=12).mean() - closes.ewm(span=26).mean()
    features['macd_diff'] = (macd - macd.ewm(span=9).mean()) / (closes + 1e-9)
    sma_20 = closes.rolling(20).mean()
    std_20 = closes.rolling(20).std()
    features['bollinger_pct_b'] = (closes - (sma_20 - 2*std_20)) / (4*std_20 + 1e-9)
    features['target'] = target_trend
    
    clean = features.dropna()
    X = clean.drop(columns=['target']).values
    y = clean['target'].values
    
    split = int(len(X) * 0.8)
    X_train, X_test = X[:split], X[split:]
    y_train, y_test = y[:split], y[split:]
    
    rf = RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42)
    rf.fit(X_train, y_train)
    gb = GradientBoostingClassifier(n_estimators=100, max_depth=4, learning_rate=0.08, random_state=42)
    gb.fit(X_train, y_train)
    
    rf_acc = accuracy_score(y_test, rf.predict(X_test))
    gb_acc = accuracy_score(y_test, gb.predict(X_test))
    best_acc = max(rf_acc, gb_acc)
    print(f"{sym}: RF={rf_acc*100:.2f}%, GB={gb_acc*100:.2f}%, Best={best_acc*100:.2f}%")
