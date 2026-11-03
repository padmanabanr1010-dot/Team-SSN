import React, { useState, useMemo } from 'react';
import {
  Download,
  Search,
  ArrowUpDown,
  Filter,
  FileSpreadsheet,
  FileJson,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export default function DataTab({ onShowToast }) {
  // Mock institutional clean market & execution records
  const initialData = useMemo(() => {
    const assets = ['BTC-USD', 'NVDA', 'GC=F', 'SPY'];
    const rows = [];
    const basePrices = { 'BTC-USD': 68250, 'NVDA': 142.5, 'GC=F': 2740.0, 'SPY': 585.2 };

    for (let i = 0; i < 60; i++) {
      const asset = assets[i % assets.length];
      const base = basePrices[asset];
      const date = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
      const close = +(base * (1 + Math.sin(i * 0.4) * 0.04)).toFixed(2);
      const open = +(close * (1 - Math.cos(i * 0.3) * 0.01)).toFixed(2);
      const high = +(Math.max(open, close) * 1.015).toFixed(2);
      const low = +(Math.min(open, close) * 0.985).toFixed(2);
      const volume = Math.floor(1250000 + Math.abs(Math.sin(i)) * 5000000);
      const status = i % 7 === 0 ? 'LOCKED' : 'VERIFIED';

      rows.push({
        id: `REC-${1000 + i}`,
        date,
        asset,
        open,
        high,
        low,
        close,
        volume,
        status
      });
    }
    return rows;
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('ALL');
  const [sortField, setSortField] = useState('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  // Filter & Regex search
  const filteredData = useMemo(() => {
    let result = [...initialData];

    if (selectedAsset !== 'ALL') {
      result = result.filter(d => d.asset === selectedAsset);
    }

    if (searchQuery.trim()) {
      try {
        const regex = new RegExp(searchQuery.trim(), 'i');
        result = result.filter(d => 
          regex.test(d.id) ||
          regex.test(d.date) ||
          regex.test(d.asset) ||
          regex.test(String(d.close)) ||
          regex.test(d.status)
        );
      } catch (err) {
        // Fallback to substring match if invalid regex
        const query = searchQuery.toLowerCase();
        result = result.filter(d => 
          d.id.toLowerCase().includes(query) ||
          d.date.includes(query) ||
          d.asset.toLowerCase().includes(query)
        );
      }
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });

    return result;
  }, [initialData, searchQuery, selectedAsset, sortField, sortAsc]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Record ID', 'Date', 'Asset', 'Open', 'High', 'Low', 'Close', 'Volume', 'Status'];
    const rows = filteredData.map(d => [
      d.id, d.date, d.asset, d.open, d.high, d.low, d.close, d.volume, d.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zeroth_data_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`Exported ${filteredData.length} records as CSV.`);
  };

  // JSON Export
  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(filteredData, null, 2))}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `zeroth_data_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`Exported ${filteredData.length} records as JSON.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header & Export Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Raw Data Explorer
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            High-performance paginated data grid with multi-column sorting, regex search, and manual export.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button onClick={handleExportCSV} className="btn-secondary">
            <FileSpreadsheet size={15} color="var(--success)" />
            <span>Export CSV</span>
          </button>
          <button onClick={handleExportJSON} className="btn-secondary">
            <FileJson size={15} color="var(--primary)" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar Card */}
      <div className="elevated-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Search / Regex */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1, minWidth: '260px' }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Filter records (e.g. BTC.* or 68250 or VERIFIED)..."
            className="input-field"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Asset Filter Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>ASSET:</span>
          <select
            className="select-field"
            value={selectedAsset}
            onChange={(e) => {
              setSelectedAsset(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">All Assets (Unified)</option>
            <option value="BTC-USD">BTC-USD</option>
            <option value="NVDA">NVDA</option>
            <option value="GC=F">GC=F (Gold)</option>
            <option value="SPY">SPY (S&P 500)</option>
          </select>
        </div>

        {/* Counter Info */}
        <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Showing {paginatedData.length} of {filteredData.length} rows
        </span>
      </div>

      {/* Data Table */}
      <div className="elevated-card" style={{ padding: '0.5rem' }}>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    Record ID <ArrowUpDown size={12} />
                  </div>
                </th>
                <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    Date <ArrowUpDown size={12} />
                  </div>
                </th>
                <th onClick={() => handleSort('asset')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    Asset <ArrowUpDown size={12} />
                  </div>
                </th>
                <th onClick={() => handleSort('open')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                    Open ($) <ArrowUpDown size={12} />
                  </div>
                </th>
                <th onClick={() => handleSort('high')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                    High ($) <ArrowUpDown size={12} />
                  </div>
                </th>
                <th onClick={() => handleSort('low')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                    Low ($) <ArrowUpDown size={12} />
                  </div>
                </th>
                <th onClick={() => handleSort('close')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                    Close ($) <ArrowUpDown size={12} />
                  </div>
                </th>
                <th onClick={() => handleSort('volume')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                    Volume <ArrowUpDown size={12} />
                  </div>
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.id}>
                  <td className="font-mono" style={{ fontWeight: 600, color: 'var(--primary)' }}>
                    {row.id}
                  </td>
                  <td className="font-mono" style={{ color: 'var(--text-muted)' }}>
                    {row.date}
                  </td>
                  <td>
                    <span className="badge badge-slate font-mono" style={{ fontWeight: 600 }}>
                      {row.asset}
                    </span>
                  </td>
                  <td className="font-mono" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>
                    {row.open.toLocaleString()}
                  </td>
                  <td className="font-mono" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>
                    {row.high.toLocaleString()}
                  </td>
                  <td className="font-mono" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>
                    {row.low.toLocaleString()}
                  </td>
                  <td className="font-mono" style={{ textAlign: 'right', fontWeight: 600, color: 'var(--text-main)' }}>
                    ${row.close.toLocaleString()}
                  </td>
                  <td className="font-mono" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>
                    {row.volume.toLocaleString()}
                  </td>
                  <td>
                    {row.status === 'VERIFIED' ? (
                      <span className="badge badge-mint font-mono">
                        <CheckCircle2 size={11} /> VERIFIED
                      </span>
                    ) : (
                      <span className="badge badge-slate font-mono">
                        LOCKED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Page {currentPage} of {totalPages}
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn-secondary"
              style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn-secondary"
              style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
            >
              Next
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

