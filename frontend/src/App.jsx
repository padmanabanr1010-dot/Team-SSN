import React, { useState } from 'react';
import FloatingNav from './components/FloatingNav';
import DashboardTab from './components/DashboardTab';
import WorkflowsTab from './components/WorkflowsTab';
import DataTab from './components/DataTab';
import AuditTab from './components/AuditTab';
import SettingsTab from './components/SettingsTab';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [environment, setEnvironment] = useState('LIVE');
  const [timeframe, setTimeframe] = useState('24H');
  const [lastSyncTime, setLastSyncTime] = useState('14:48:10 UTC');
  const [syncing, setSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  const handleToggleEnvironment = () => {
    const nextEnv = environment === 'LIVE' ? 'TEST' : 'LIVE';
    setEnvironment(nextEnv);
    showToast(`Environment switched to ${nextEnv} mode.`);
  };

  const handleManualSync = () => {
    setSyncing(true);
    setTimeout(() => {
      const now = new Date().toTimeString().split(' ')[0] + ' UTC';
      setLastSyncTime(now);
      setSyncing(false);
      showToast(`Deterministic state synchronized at ${now}`);
    }, 200);
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Floating Island Navigation (24px from top) */}
      <FloatingNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        environment={environment}
        onToggleEnvironment={handleToggleEnvironment}
        timeframe={timeframe}
        onSelectTimeframe={(tf) => {
          setTimeframe(tf);
          showToast(`Telemetry window set to ${tf}`);
        }}
        lastSyncTime={lastSyncTime}
        onManualSync={handleManualSync}
        syncing={syncing}
      />

      {/* Main Active Content Area (1200px max-width, centrally aligned) */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.25rem' }}>
        {activeTab === 'dashboard' && (
          <DashboardTab
            environment={environment}
            timeframe={timeframe}
          />
        )}

        {activeTab === 'workflows' && (
          <WorkflowsTab onShowToast={showToast} />
        )}

        {activeTab === 'data' && (
          <DataTab onShowToast={showToast} />
        )}

        {activeTab === 'audit' && (
          <AuditTab onShowToast={showToast} />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            environment={environment}
            onToggleEnvironment={handleToggleEnvironment}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Crisp Toast Notification (Bottom Center) */}
      {toastMessage && (
        <div className="crisp-toast">
          <CheckCircle2 size={16} color="var(--success)" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
