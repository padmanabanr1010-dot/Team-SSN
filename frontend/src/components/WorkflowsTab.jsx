import React, { useState } from 'react';
import {
  GitBranch,
  Plus,
  Play,
  Trash2,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Sliders,
  ArrowRight,
  ShieldAlert,
  Code
} from 'lucide-react';

export default function WorkflowsTab({ onShowToast }) {
  const [rules, setRules] = useState([
    {
      id: 'RULE-101',
      name: 'High Volatility Circuit Breaker',
      active: true,
      variable: 'rolling_volatility_15d',
      operator: '>',
      threshold: '0.40',
      secondaryVariable: 'max_drawdown_pct',
      secondaryOperator: '<',
      secondaryThreshold: '-0.10',
      combinator: 'AND',
      action: 'HALT_TRADING_ORDER',
      actionTarget: 'Internal Execution Router',
      lastTriggered: '2026-11-03 12:14:02 UTC'
    },
    {
      id: 'RULE-102',
      name: 'Mean Reversion Oversold Alert',
      active: true,
      variable: 'rsi_14',
      operator: '<',
      threshold: '30.0',
      secondaryVariable: 'bollinger_b_pct',
      secondaryOperator: '<',
      secondaryThreshold: '0.05',
      combinator: 'AND',
      action: 'DISPATCH_WEBHOOK',
      actionTarget: 'https://api.vault.io/v1/alerts',
      lastTriggered: '2026-11-03 08:30:11 UTC'
    },
    {
      id: 'RULE-103',
      name: 'Slippage Guard Deviation',
      active: true,
      variable: 'execution_slippage_bps',
      operator: '>=',
      threshold: '25.0',
      combinator: 'NONE',
      action: 'LOG_AUDIT_VIOLATION',
      actionTarget: 'Security Compliance Ledger',
      lastTriggered: 'Never'
    },
    {
      id: 'RULE-104',
      name: 'Cron End-of-Day Reconciliation',
      active: false,
      variable: 'exchange_clock_utc',
      operator: '==',
      threshold: '21:00:00',
      combinator: 'NONE',
      action: 'SYNC_LEDGER_STORAGE',
      actionTarget: 'AWS S3 Cold Bucket',
      lastTriggered: '2026-11-02 21:00:00 UTC'
    }
  ]);

  // New Rule Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    variable: 'asset_price',
    operator: '>',
    threshold: '',
    action: 'DISPATCH_WEBHOOK',
    actionTarget: ''
  });

  // Test Evaluation Result
  const [evaluatingRuleId, setEvaluatingRuleId] = useState(null);
  const [evalResult, setEvalResult] = useState(null);

  const toggleRuleActive = (id) => {
    setRules(prev => prev.map(r => {
      if (r.id === id) {
        const nextState = !r.active;
        onShowToast(`Rule ${r.id} is now ${nextState ? 'ACTIVE' : 'DISABLED'}`);
        return { ...r, active: nextState };
      }
      return r;
    }));
  };

  const deleteRule = (id) => {
    setRules(prev => prev.filter(r => r.id !== id));
    onShowToast(`Rule ${id} removed.`);
  };

  const handleTestEvaluation = (rule) => {
    setEvaluatingRuleId(rule.id);
    // Deterministic instantaneous evaluation simulation
    setTimeout(() => {
      const mockValues = {
        rolling_volatility_15d: 0.28,
        rsi_14: 42.5,
        execution_slippage_bps: 12.0,
        exchange_clock_utc: '14:35:00',
        asset_price: 68420.0
      };

      const currentVal = mockValues[rule.variable] ?? 50.0;
      let isTrue = false;
      const numThreshold = parseFloat(rule.threshold);

      if (rule.operator === '>') isTrue = currentVal > numThreshold;
      else if (rule.operator === '<') isTrue = currentVal < numThreshold;
      else if (rule.operator === '>=') isTrue = currentVal >= numThreshold;
      else if (rule.operator === '<=') isTrue = currentVal <= numThreshold;
      else if (rule.operator === '==') isTrue = currentVal === numThreshold;

      setEvalResult({
        ruleId: rule.id,
        currentVal,
        threshold: rule.threshold,
        isTrue,
        executionTimeMs: 0.12
      });
      setEvaluatingRuleId(null);
      onShowToast(`Evaluated ${rule.id}: Condition returned ${isTrue ? 'TRUE' : 'FALSE'}`);
    }, 150);
  };

  const handleCreateRule = (e) => {
    e.preventDefault();
    if (!newRule.name || !newRule.threshold) return;

    const created = {
      id: `RULE-${100 + rules.length + 1}`,
      name: newRule.name,
      active: true,
      variable: newRule.variable,
      operator: newRule.operator,
      threshold: newRule.threshold,
      combinator: 'NONE',
      action: newRule.action,
      actionTarget: newRule.actionTarget || 'Default Webhook',
      lastTriggered: 'Never'
    };

    setRules(prev => [created, ...prev]);
    setShowAddModal(false);
    setNewRule({
      name: '',
      variable: 'asset_price',
      operator: '>',
      threshold: '',
      action: 'DISPATCH_WEBHOOK',
      actionTarget: ''
    });
    onShowToast(`Rule ${created.id} created successfully.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header & Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Rule-Based Workflow Engine
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Deterministic IF / THEN / ELSE logic builder. Strict boolean thresholds without machine learning or heuristics.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus size={16} />
          <span>New Explicit Rule</span>
        </button>
      </div>

      {/* Modal / Add Rule Card */}
      {showAddModal && (
        <div className="elevated-card" style={{ padding: '1.5rem', border: '2px solid var(--primary)' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>
            Configure New Deterministic Rule
          </h2>
          <form onSubmit={handleCreateRule} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  RULE NAME / IDENTIFIER
                </label>
                <input
                  type="text"
                  placeholder="e.g. BTC Max Threshold Exit"
                  className="input-field"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  INPUT VARIABLE (TELEMETRY)
                </label>
                <select
                  className="input-field select-field"
                  value={newRule.variable}
                  onChange={(e) => setNewRule({ ...newRule, variable: e.target.value })}
                >
                  <option value="asset_price">asset_price (USD)</option>
                  <option value="rolling_volatility_15d">rolling_volatility_15d (Ratio)</option>
                  <option value="rsi_14">rsi_14 (0-100)</option>
                  <option value="execution_slippage_bps">execution_slippage_bps</option>
                  <option value="daily_volume_usd">daily_volume_usd</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  OPERATOR
                </label>
                <select
                  className="input-field select-field font-mono"
                  value={newRule.operator}
                  onChange={(e) => setNewRule({ ...newRule, operator: e.target.value })}
                >
                  <option value=">">&gt; (Greater Than)</option>
                  <option value="<">&lt; (Less Than)</option>
                  <option value=">=">&gt;= (Greater or Equal)</option>
                  <option value="<=">&lt;= (Less or Equal)</option>
                  <option value="==">== (Exact Match)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  LITERAL THRESHOLD VALUE
                </label>
                <input
                  type="text"
                  placeholder="e.g. 70000.00"
                  className="input-field font-mono"
                  value={newRule.threshold}
                  onChange={(e) => setNewRule({ ...newRule, threshold: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  DETERMINISTIC ACTION
                </label>
                <select
                  className="input-field select-field"
                  value={newRule.action}
                  onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
                >
                  <option value="DISPATCH_WEBHOOK">DISPATCH_WEBHOOK</option>
                  <option value="HALT_TRADING_ORDER">HALT_TRADING_ORDER</option>
                  <option value="LOG_AUDIT_VIOLATION">LOG_AUDIT_VIOLATION</option>
                  <option value="SYNC_LEDGER_STORAGE">SYNC_LEDGER_STORAGE</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                ACTION TARGET / ENDPOINT
              </label>
              <input
                type="text"
                placeholder="https://api.domain.io/v1/webhook"
                className="input-field font-mono"
                value={newRule.actionTarget}
                onChange={(e) => setNewRule({ ...newRule, actionTarget: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Save Deterministic Rule
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Rules List / Logic Builders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {rules.map((rule) => (
          <div key={rule.id} className="elevated-card" style={{ padding: '1.25rem' }}>
            
            {/* Rule Header Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="badge badge-slate font-mono" style={{ fontSize: '0.8rem' }}>
                  {rule.id}
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {rule.name}
                </span>
                {rule.active ? (
                  <span className="badge badge-mint">ACTIVE</span>
                ) : (
                  <span className="badge badge-slate">DISABLED</span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => handleTestEvaluation(rule)}
                  disabled={evaluatingRuleId === rule.id}
                  className="btn-secondary"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                  title="Run instantaneous deterministic dry-run evaluation"
                >
                  <Play size={12} />
                  <span>{evaluatingRuleId === rule.id ? 'Evaluating...' : 'Test Evaluation'}</span>
                </button>

                <button
                  onClick={() => toggleRuleActive(rule.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: rule.active ? 'var(--success)' : 'var(--text-muted)'
                  }}
                  title={rule.active ? 'Disable Rule' : 'Enable Rule'}
                >
                  {rule.active ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                </button>

                <button
                  onClick={() => deleteRule(rule.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-faint)'
                  }}
                  title="Remove Rule"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Visual Logic Block (IF / THEN / ELSE) */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}>
              {/* Primary Condition */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--primary)', letterSpacing: '0.05em' }}>
                  IF
                </span>
                <span className="badge badge-blue font-mono">
                  {rule.variable}
                </span>
                <span className="font-mono" style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                  {rule.operator}
                </span>
                <span className="font-mono" style={{ fontWeight: 600, color: 'var(--text-main)', background: '#FFFFFF', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                  {rule.threshold}
                </span>

                {rule.combinator && rule.combinator !== 'NONE' && (
                  <>
                    <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--warning)', letterSpacing: '0.05em' }}>
                      {rule.combinator}
                    </span>
                    <span className="badge badge-blue font-mono">
                      {rule.secondaryVariable}
                    </span>
                    <span className="font-mono" style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                      {rule.secondaryOperator}
                    </span>
                    <span className="font-mono" style={{ fontWeight: 600, color: 'var(--text-main)', background: '#FFFFFF', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                      {rule.secondaryThreshold}
                    </span>
                  </>
                )}
              </div>

              {/* Action Outcome */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--success)', letterSpacing: '0.05em' }}>
                  THEN
                </span>
                <span className="badge badge-mint font-mono">
                  {rule.action}
                </span>
                <ArrowRight size={14} color="var(--text-muted)" />
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Target: {rule.actionTarget}
                </span>
              </div>
            </div>

            {/* Test Evaluation Feedback Box */}
            {evalResult && evalResult.ruleId === rule.id && (
              <div style={{
                marginTop: '0.75rem',
                background: evalResult.isTrue ? 'var(--success-light)' : '#F1F5F9',
                border: `1px solid ${evalResult.isTrue ? 'var(--success-border)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '0.65rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {evalResult.isTrue ? (
                    <CheckCircle2 size={16} color="var(--success)" />
                  ) : (
                    <XCircle size={16} color="var(--text-muted)" />
                  )}
                  <span style={{ fontWeight: 600, color: evalResult.isTrue ? 'var(--success)' : 'var(--text-main)' }}>
                    Evaluation Result: {evalResult.isTrue ? 'CONDITION MET (TRUE)' : 'CONDITION UNMET (FALSE)'}
                  </span>
                  <span className="font-mono" style={{ color: 'var(--text-muted)' }}>
                    (Telemetry Value: {evalResult.currentVal} vs Threshold: {evalResult.threshold})
                  </span>
                </div>
                <span className="font-mono" style={{ color: 'var(--text-muted)' }}>
                  Latency: {evalResult.executionTimeMs} ms
                </span>
              </div>
            )}

            {/* Rule Footer Info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.85rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Deterministic Rule Execution Policy: Strict Synchronous</span>
              <span className="font-mono">Last Triggered: {rule.lastTriggered}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

