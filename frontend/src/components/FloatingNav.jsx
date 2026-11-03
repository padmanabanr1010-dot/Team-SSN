import React from 'react';
import {
  LayoutDashboard,
  GitBranch,
  Database,
  ShieldCheck,
  Settings,
  RefreshCw,
  Radio,
  SlidersHorizontal
} from 'lucide-react';

export default function FloatingNav({
  activeTab,
  onSelectTab,
  environment,
  onToggleEnvironment,
  timeframe,
  onSelectTimeframe,
  lastSyncTime,
  onManualSync,
  syncing
}) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> },
    { id: 'workflows', label: 'Workflows', icon: <GitBranch size={15} /> },
    { id: 'data', label: 'Data', icon: <Database size={15} /> },
    { id: 'audit', label: 'Audit Ledger', icon: <ShieldCheck size={15} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={15} /> }
  ];

  const timeframes = ['1H', '24H', '7D', '30D'];

  return (
    <div className="floating-nav-container">
      <nav className="floating-nav-island">
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.85rem'
          }}>
            Z
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
                ZEROTH
              </span>
              <span className="badge badge-slate" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                DETERMINISTIC
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Global Deterministic Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Explicit Timeframe Selector */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-surface-subtle)',
            borderRadius: 'var(--radius-pill)',
            padding: '0.2rem',
            gap: '0.15rem'
          }}>
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => onSelectTimeframe(tf)}
                style={{
                  border: 'none',
                  background: timeframe === tf ? '#FFFFFF' : 'transparent',
                  color: timeframe === tf ? 'var(--text-main)' : 'var(--text-muted)',
                  fontWeight: timeframe === tf ? 600 : 500,
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.55rem',
                  borderRadius: 'var(--radius-pill)',
                  cursor: 'pointer',
                  boxShadow: timeframe === tf ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
                  transition: 'var(--transition-fast)'
                }}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Environment Switcher: Test vs Live */}
          <button
            onClick={onToggleEnvironment}
            style={{
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.3rem 0.65rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              color: environment === 'LIVE' ? 'var(--success)' : 'var(--warning)',
              transition: 'var(--transition-fast)'
            }}
            title="Toggle between Test and Live deterministic environment"
          >
            <Radio size={12} />
            <span>{environment}</span>
          </button>

          {/* Manual Deterministic Sync Button */}
          <button
            onClick={onManualSync}
            disabled={syncing}
            className="btn-secondary"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--radius-pill)'
            }}
            title={`Last explicit sync: ${lastSyncTime}`}
          >
            <RefreshCw size={12} className={syncing ? 'animate-spin' : ''} />
            <span className="font-mono">{lastSyncTime}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

