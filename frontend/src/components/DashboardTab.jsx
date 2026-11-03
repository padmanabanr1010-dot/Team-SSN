import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Layers,
  ArrowUpRight,
  Server,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardTab({ environment, timeframe }) {
  // Deterministic KPI Metrics (No AI jargon, no confidence scores)
  const kpis = [
    {
      label: 'TOTAL EXECUTIONS',
      value: '142,850',
      detail: '+1,240 in current window',
      badge: 'STABLE',
      badgeClass: 'badge-mint',
      icon: <Layers size={18} color="var(--primary)" />
    },
    {
      label: 'DETERMINISTIC SUCCESS',
      value: '99.84%',
      detail: '228 failed / 142,622 valid',
      badge: 'VERIFIED',
      badgeClass: 'badge-mint',
      icon: <CheckCircle2 size={18} color="var(--success)" />
    },
    {
      label: 'MEAN EXECUTION LATENCY',
      value: '18.4 ms',
      detail: 'p99: 42.1 ms | p50: 14.2 ms',
      badge: 'OPTIMAL',
      badgeClass: 'badge-blue',
      icon: <Clock size={18} color="var(--primary)" />
    },
    {
      label: 'ACTIVE RULE TRIGGERS',
      value: '14 / 16',
      detail: '2 disabled manually',
      badge: 'ACTIVE',
      badgeClass: 'badge-slate',
      icon: <Zap size={18} color="var(--warning)" />
    },
    {
      label: 'SYSTEM UPTIME',
      value: '99.99%',
      detail: '0 unexpected halts',
      badge: 'NORMAL',
      badgeClass: 'badge-mint',
      icon: <Server size={18} color="var(--success)" />
    }
  ];

  // Raw Time-Series: Hourly Executions (Deterministic, no forecast lines)
  const timeLabels = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  const executionCounts = [5200, 4800, 3900, 4100, 9400, 14200, 15800, 14900, 16100, 13800, 9100, 6400];
  const latencyDistribution = [15.2, 14.8, 14.1, 14.5, 18.2, 21.4, 22.8, 19.5, 20.1, 18.6, 16.3, 15.7];

  const executionsChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Evaluations / Hour',
        data: executionCounts,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        borderWidth: 2,
        tension: 0.1,
        fill: true,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#3B82F6',
        pointBorderWidth: 2,
        pointRadius: 3
      }
    ]
  };

  const latencyChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Mean Latency (ms)',
        data: latencyDistribution,
        backgroundColor: '#10B981',
        borderRadius: 4,
        barPercentage: 0.55
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Inter', size: 12 },
        bodyFont: { family: 'SF Mono, monospace', size: 12 },
        padding: 10,
        cornerRadius: 6
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: '#64748B'
        }
      },
      y: {
        grid: {
          color: '#F1F5F9'
        },
        ticks: {
          font: { family: 'SF Mono, monospace', size: 11 },
          color: '#64748B'
        }
      }
    }
  };

  // Recent Trigger Events Feed
  const recentEvents = [
    {
      id: 'EVT-9041',
      timestamp: '14:44:12.821',
      ruleId: 'RULE-01',
      condition: 'price > 67500.00',
      action: 'Webhook Dispatched (200 OK)',
      status: 'Triggered',
      latency: '14 ms'
    },
    {
      id: 'EVT-9040',
      timestamp: '14:42:05.109',
      ruleId: 'RULE-03',
      condition: 'drawdown_pct < -0.05',
      action: 'Evaluated False (No Action)',
      status: 'Pass',
      latency: '12 ms'
    },
    {
      id: 'EVT-9039',
      timestamp: '14:38:50.412',
      ruleId: 'RULE-02',
      condition: 'volatility_15d > 0.45',
      action: 'Circuit Breaker Alert Emitted',
      status: 'Triggered',
      latency: '22 ms'
    },
    {
      id: 'EVT-9038',
      timestamp: '14:31:18.990',
      ruleId: 'RULE-05',
      condition: 'slippage_bps >= 25',
      action: 'Execution Blocked (Limit Exceeded)',
      status: 'Blocked',
      latency: '18 ms'
    },
    {
      id: 'EVT-9037',
      timestamp: '14:24:00.000',
      ruleId: 'RULE-04',
      condition: 'scheduled_cron == true',
      action: 'State Synchronized (Clean)',
      status: 'Triggered',
      latency: '31 ms'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner Context */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.25rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Deterministic Dashboard
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Raw execution telemetry, system health, and rule evaluation status in {environment} mode.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-mint">
            <ShieldCheck size={13} />
            ZERO PROBABILISTIC NOISE
          </span>
          <span className="badge badge-blue font-mono">
            WINDOW: {timeframe}
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1rem'
      }}>
        {kpis.map((kpi, idx) => (
          <div key={idx} className="elevated-card-interactive" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                {kpi.label}
              </span>
              <span className={`badge ${kpi.badgeClass}`} style={{ fontSize: '0.65rem' }}>
                {kpi.badge}
              </span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {kpi.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid: Executions Time-Series & Latency Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        
        {/* Executions Over Time */}
        <div className="elevated-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Rule Evaluations Over Time
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Hourly discrete count of boolean conditions tested
              </span>
            </div>
            <span className="badge badge-blue font-mono">COUNT / HR</span>
          </div>
          <div style={{ height: '220px' }}>
            <Line data={executionsChartData} options={chartOptions} />
          </div>
        </div>

        {/* Latency Distribution */}
        <div className="elevated-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                System Evaluation Latency
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Mean execution time in milliseconds (sub-25ms target)
              </span>
            </div>
            <span className="badge badge-mint font-mono">LATENCY (MS)</span>
          </div>
          <div style={{ height: '220px' }}>
            <Bar data={latencyChartData} options={chartOptions} />
          </div>
        </div>

      </div>

      {/* Recent Deterministic Executions Feed */}
      <div className="elevated-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Recent Execution Ledger
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Sequential log of chronological rule outcomes
            </span>
          </div>
          <span className="badge badge-slate font-mono">IMMUTABLE LOG</span>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Timestamp (UTC)</th>
                <th>Rule ID</th>
                <th>Exact Evaluated Condition</th>
                <th>Deterministic Action</th>
                <th>Outcome</th>
                <th>Latency</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((evt) => (
                <tr key={evt.id}>
                  <td className="font-mono" style={{ fontWeight: 600, color: 'var(--primary)' }}>
                    {evt.id}
                  </td>
                  <td className="font-mono" style={{ color: 'var(--text-muted)' }}>
                    {evt.timestamp}
                  </td>
                  <td>
                    <span className="badge badge-slate font-mono">{evt.ruleId}</span>
                  </td>
                  <td className="font-mono" style={{ color: 'var(--text-main)' }}>
                    {evt.condition}
                  </td>
                  <td>{evt.action}</td>
                  <td>
                    {evt.status === 'Triggered' && (
                      <span className="badge badge-mint">
                        <CheckCircle2 size={11} /> Triggered
                      </span>
                    )}
                    {evt.status === 'Pass' && (
                      <span className="badge badge-slate">Pass</span>
                    )}
                    {evt.status === 'Blocked' && (
                      <span className="badge badge-red">
                        <XCircle size={11} /> Blocked
                      </span>
                    )}
                  </td>
                  <td className="font-mono" style={{ color: 'var(--text-muted)' }}>
                    {evt.latency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

