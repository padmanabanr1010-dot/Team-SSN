import React, { useState } from 'react';
import {
  Key,
  Globe,
  Sliders,
  Shield,
  Clock,
  Save,
  Eye,
  EyeOff,
  RotateCcw,
  CheckCircle2,
  Server
} from 'lucide-react';

export default function SettingsTab({ environment, onToggleEnvironment, onShowToast }) {
  const [webhookUrl, setWebhookUrl] = useState('https://api.internal-vault.io/v1/telemetry');
  const [apiKey, setApiKey] = useState('ag_live_948f92b0c1e847a982df091b4');
  const [showKey, setShowKey] = useState(false);
  const [timeoutMs, setTimeoutMs] = useState(250);
  const [maxRetries, setMaxRetries] = useState(2);
  const [failoverMode, setFailoverMode] = useState('HALT_SYSTEM');
  const [retentionDays, setRetentionDays] = useState(90);

  const handleSave = (e) => {
    e.preventDefault();
    onShowToast('Settings and deterministic parameters saved successfully.');
  };

  const handleRegenerateKey = () => {
    const newRandomKey = 'ag_live_' + Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setApiKey(newRandomKey);
    onShowToast('New API Secret Key generated.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
          Direct Integrations & System Settings
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Manage webhook endpoints, explicit timeout limits, immutable retention rules, and cryptographic credentials.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Section 1: API & Webhook Endpoints */}
        <div className="elevated-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Globe size={18} color="var(--primary)" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Webhook Endpoint & Network Dispatch
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                PRIMARY WEBHOOK DISPATCH URL
              </label>
              <input
                type="url"
                className="input-field font-mono"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://api.yourdomain.com/v1/webhook"
                required
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
                All deterministic actions with type `DISPATCH_WEBHOOK` will POST to this exact endpoint with HMAC SHA-256 header.
              </span>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                SYSTEM API SECRET KEY
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input
                    type={showKey ? 'text' : 'password'}
                    className="input-field font-mono"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleRegenerateKey}
                  className="btn-secondary"
                  title="Generate new secret key"
                >
                  <RotateCcw size={14} />
                  <span>Rotate</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Deterministic Execution Limits */}
        <div className="elevated-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Sliders size={18} color="var(--primary)" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Deterministic Execution Boundaries
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Timeout Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  TIMEOUT PER EVALUATION
                </label>
                <span className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {timeoutMs} ms
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="25"
                value={timeoutMs}
                onChange={(e) => setTimeoutMs(+e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Maximum allowed millisecond window before an evaluation is forcibly halted as timed out.
              </span>
            </div>

            {/* Retries */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  SYNCHRONOUS RETRIES
                </label>
                <span className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {maxRetries} attempt(s)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={maxRetries}
                onChange={(e) => setMaxRetries(+e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Exact retry count on network timeout before writing CRITICAL to the audit ledger.
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Environment & Policies */}
        <div className="elevated-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Shield size={18} color="var(--primary)" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Policy & Failover Mode
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                UNHANDLED EXCEPTION FAILOVER
              </label>
              <select
                className="input-field select-field font-mono"
                value={failoverMode}
                onChange={(e) => setFailoverMode(e.target.value)}
              >
                <option value="HALT_SYSTEM">HALT_SYSTEM (Strict Determinism - Zero Risk)</option>
                <option value="FALLBACK_CACHE">FALLBACK_CACHE (Use Last Valid Snapshot)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                AUDIT LOG RETENTION
              </label>
              <select
                className="input-field select-field font-mono"
                value={retentionDays}
                onChange={(e) => setRetentionDays(+e.target.value)}
              >
                <option value={30}>30 Days (Fast Local Storage)</option>
                <option value={90}>90 Days (Recommended Compliance)</option>
                <option value={365}>365 Days (Institutional Archive)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
            <Save size={16} />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
}

