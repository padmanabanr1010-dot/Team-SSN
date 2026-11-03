import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Eye,
  Copy,
  Check,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Lock,
  Hash
} from 'lucide-react';

export default function AuditTab({ onShowToast }) {
  const [copiedId, setCopiedId] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const auditLogs = [
    {
      id: 'AUDIT-89410',
      timestamp: '2026-11-03T14:44:12.821Z',
      eventType: 'RULE_TRIGGER_SUCCESS',
      ruleId: 'RULE-101',
      actor: 'System.DeterministicEngine',
      ip: '10.240.0.14',
      status: 'SUCCESS',
      hash: 'e83a91b2c4819d28f001bfa',
      payload: {
        event: 'RULE_TRIGGER',
        rule_id: 'RULE-101',
        trigger_variable: 'rolling_volatility_15d',
        evaluated_value: 0.421,
        threshold: 0.40,
        result: true,
        action: 'HALT_TRADING_ORDER',
        target: 'Internal Execution Router',
        status_code: 200,
        latency_ms: 14.2
      }
    },
    {
      id: 'AUDIT-89409',
      timestamp: '2026-11-03T14:38:50.412Z',
      eventType: 'CIRCUIT_BREAKER_EMITTED',
      ruleId: 'RULE-102',
      actor: 'System.DeterministicEngine',
      ip: '10.240.0.14',
      status: 'WARNING',
      hash: '7c90b144fae981298dc1408',
      payload: {
        event: 'CIRCUIT_BREAKER',
        rule_id: 'RULE-102',
        trigger_variable: 'rsi_14',
        evaluated_value: 28.4,
        threshold: 30.0,
        result: true,
        action: 'DISPATCH_WEBHOOK',
        target: 'https://api.vault.io/v1/alerts',
        status_code: 200,
        latency_ms: 18.5
      }
    },
    {
      id: 'AUDIT-89408',
      timestamp: '2026-11-03T14:31:18.990Z',
      eventType: 'ORDER_EXECUTION_BLOCKED',
      ruleId: 'RULE-103',
      actor: 'Router.PreTradeCompliance',
      ip: '10.240.0.88',
      status: 'CRITICAL',
      hash: '5d21a89c0901e12903bbca1',
      payload: {
        event: 'ORDER_BLOCKED',
        rule_id: 'RULE-103',
        trigger_variable: 'execution_slippage_bps',
        evaluated_value: 28.2,
        threshold: 25.0,
        result: true,
        action: 'LOG_AUDIT_VIOLATION',
        target: 'Security Compliance Ledger',
        rejection_reason: 'Max allowable slippage exceeded',
        latency_ms: 11.0
      }
    },
    {
      id: 'AUDIT-89407',
      timestamp: '2026-11-03T14:24:00.000Z',
      eventType: 'STATE_SYNCHRONIZED',
      ruleId: 'RULE-104',
      actor: 'Cron.ReconciliationDaemon',
      ip: '10.240.0.12',
      status: 'SUCCESS',
      hash: '91f0c2a88e7b1a030491dd8',
      payload: {
        event: 'STATE_SYNC',
        rule_id: 'RULE-104',
        trigger_variable: 'exchange_clock_utc',
        evaluated_value: '14:24:00',
        threshold: '14:24:00',
        result: true,
        action: 'SYNC_LEDGER_STORAGE',
        target: 'AWS S3 Cold Bucket',
        records_flushed: 1420,
        latency_ms: 42.1
      }
    },
    {
      id: 'AUDIT-89406',
      timestamp: '2026-11-03T14:15:22.108Z',
      eventType: 'USER_RULE_CONFIGURATION',
      ruleId: 'USER-ADMIN',
      actor: 'Operator: Kisho (Console)',
      ip: '192.168.1.104',
      status: 'SUCCESS',
      hash: '12a9ef007b8192a0149bbfa',
      payload: {
        action: 'UPDATE_RULE',
        rule_id: 'RULE-101',
        changes: {
          threshold_from: 0.45,
          threshold_to: 0.40
        },
        signature_verified: true
      }
    }
  ];

  const filteredLogs = auditLogs.filter(log => {
    if (filterStatus === 'ALL') return true;
    return log.status === filterStatus;
  });

  const handleCopyPayload = (payload, id) => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedId(id);
    onShowToast(`Payload for ${id} copied to clipboard.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header & Immutability Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Immutable Audit Ledger
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Sequential, append-only chronological log of all deterministic rule firings, payloads, and state transitions.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span className="badge badge-mint font-mono">
            <Lock size={12} />
            CHAIN-HASH: VERIFIED
          </span>
          <span className="badge badge-slate font-mono">
            SHA-256 APPEND-ONLY
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="elevated-card" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['ALL', 'SUCCESS', 'WARNING', 'CRITICAL'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              style={{
                border: 'none',
                background: filterStatus === st ? 'var(--text-main)' : 'transparent',
                color: filterStatus === st ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.75rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              {st}
            </button>
          ))}
        </div>

        <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {filteredLogs.length} verified events logged
        </span>
      </div>

      {/* Audit Table */}
      <div className="elevated-card" style={{ padding: '0.5rem' }}>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Audit ID</th>
                <th>Timestamp (ISO UTC)</th>
                <th>Event Type</th>
                <th>Rule ID</th>
                <th>Actor / Source</th>
                <th>Status</th>
                <th>Block Hash</th>
                <th style={{ textAlign: 'right' }}>Payload Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="font-mono" style={{ fontWeight: 600, color: 'var(--primary)' }}>
                    {log.id}
                  </td>
                  <td className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {log.timestamp}
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                    {log.eventType}
                  </td>
                  <td>
                    <span className="badge badge-slate font-mono">{log.ruleId}</span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {log.actor}
                  </td>
                  <td>
                    {log.status === 'SUCCESS' && (
                      <span className="badge badge-mint font-mono">
                        <CheckCircle2 size={11} /> SUCCESS
                      </span>
                    )}
                    {log.status === 'WARNING' && (
                      <span className="badge badge-amber font-mono">
                        <AlertTriangle size={11} /> WARNING
                      </span>
                    )}
                    {log.status === 'CRITICAL' && (
                      <span className="badge badge-red font-mono">
                        <XCircle size={11} /> CRITICAL
                      </span>
                    )}
                  </td>
                  <td className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                    {log.hash.substring(0, 10)}...
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="btn-secondary"
                        style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem' }}
                        title="View exact JSON payload"
                      >
                        <Eye size={12} />
                        <span>Inspect</span>
                      </button>
                      <button
                        onClick={() => handleCopyPayload(log.payload, log.id)}
                        className="btn-secondary"
                        style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem' }}
                        title="Copy JSON to clipboard"
                      >
                        {copiedId === log.id ? <Check size={12} color="var(--success)" /> : <Copy size={12} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Payload Modal */}
      {selectedLog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="elevated-card" style={{ maxWidth: '640px', width: '90%', padding: '1.5rem', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  Payload Telemetry: {selectedLog.id}
                </h3>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {selectedLog.timestamp}
                </span>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="btn-secondary"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
              >
                Close
              </button>
            </div>

            <div style={{
              background: '#0F172A',
              color: '#F8FAFC',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              overflowX: 'auto',
              marginBottom: '1rem'
            }}>
              <pre className="font-mono" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                {JSON.stringify(selectedLog.payload, null, 2)}
              </pre>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                onClick={() => handleCopyPayload(selectedLog.payload, selectedLog.id)}
                className="btn-primary"
              >
                <Copy size={14} />
                <span>Copy Payload JSON</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

