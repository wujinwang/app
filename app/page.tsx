export default async function Home() {
  const dbUrl = process.env.DATABASE_URL || "Secret not found in environment";
  const maskedUrl = dbUrl.replace(/:([^:@]+)@/, ':****@');

  const metrics = [
    { label: "Motor RPM", value: "3,240", unit: "rpm", status: "normal" },
    { label: "Hydraulic Pressure", value: "287", unit: "bar", status: "warning" },
    { label: "Engine Temp", value: "94", unit: "°C", status: "normal" },
    { label: "Fuel Level", value: "62", unit: "%", status: "normal" },
    { label: "Drill Depth", value: "18.4", unit: "m", status: "normal" },
    { label: "Vibration", value: "4.2", unit: "g", status: "critical" },
  ];

  const statusColor: Record<string, string> = {
    normal: "#22c55e",
    warning: "#f59e0b",
    critical: "#ef4444",
  };

  const statusBg: Record<string, string> = {
    normal: "rgba(34,197,94,0.08)",
    warning: "rgba(245,158,11,0.08)",
    critical: "rgba(239,68,68,0.08)",
  };

  return (
    <div style={{
      backgroundColor: '#0f1117',
      color: '#e2e8f0',
      minHeight: '100vh',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      padding: '0',
    }}>
      {/* Top bar */}
      <div style={{
        background: 'linear-gradient(135deg, #1e2230 0%, #161926 100%)',
        borderBottom: '1px solid #2d3148',
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #ffcc00, #f59e0b)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: 700, color: '#111',
          }}>E</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
              Epiroc Machine Dashboard
            </h1>
            <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748b' }}>Real-time telemetry · Unit #MX-047</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)',
            color: '#22c55e', borderRadius: '20px', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600,
          }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#22c55e', display: 'inline-block',
              boxShadow: '0 0 6px #22c55e',
            }} />
            ONLINE
          </span>
          <span style={{ fontSize: '0.75rem', color: '#475569' }}>v2.0.0</span>
        </div>
      </div>

      <div style={{ padding: '32px 40px' }}>
        {/* Metrics grid */}
        <h2 style={{ margin: '0 0 16px', fontSize: '0.8rem', fontWeight: 600, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Live Sensor Readings
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}>
          {metrics.map((m) => (
            <div key={m.label} style={{
              background: statusBg[m.status],
              border: `1px solid ${statusColor[m.status]}33`,
              borderRadius: '12px',
              padding: '20px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '3px',
                background: statusColor[m.status],
                borderRadius: '12px 12px 0 0',
              }} />
              <p style={{ margin: '0 0 8px', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>{m.label}</p>
              <p style={{ margin: '0 0 4px', fontSize: '2rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                {m.value}
                <span style={{ fontSize: '0.85rem', color: '#64748b', marginLeft: '4px', fontWeight: 400 }}>{m.unit}</span>
              </p>
              <span style={{
                fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase',
                color: statusColor[m.status], letterSpacing: '0.06em',
              }}>
                ● {m.status}
              </span>
            </div>
          ))}
        </div>

        {/* Activity / log placeholder */}
        <div style={{
          background: '#161926',
          border: '1px solid #2d3148',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
        }}>
          <h2 style={{ margin: '0 0 14px', fontSize: '0.8rem', fontWeight: 600, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Recent Events
          </h2>
          {[
            { time: '14:32:01', msg: 'Vibration threshold exceeded on drill head', level: 'critical' },
            { time: '14:31:44', msg: 'Hydraulic pressure approaching upper limit', level: 'warning' },
            { time: '14:28:10', msg: 'Drill depth target reached at 18.4 m', level: 'normal' },
            { time: '14:21:55', msg: 'Engine startup sequence completed', level: 'normal' },
          ].map((ev, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '12px',
              padding: '10px 0',
              borderBottom: i < 3 ? '1px solid #1e2230' : 'none',
            }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: statusColor[ev.level], marginTop: '5px', flexShrink: 0,
              }} />
              <code style={{ fontSize: '0.75rem', color: '#475569', flexShrink: 0 }}>{ev.time}</code>
              <span style={{ fontSize: '0.85rem', color: ev.level === 'normal' ? '#cbd5e1' : statusColor[ev.level] }}>{ev.msg}</span>
            </div>
          ))}
        </div>

        {/* Infra debug */}
        <div style={{
          background: '#0d1117',
          border: '1px solid #1e2230',
          borderRadius: '8px',
          padding: '14px 18px',
        }}>
          <p style={{ margin: '0 0 6px', fontSize: '0.7rem', color: '#374151', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Infrastructure Debug
          </p>
          <code style={{ fontSize: '0.78rem', color: '#22c55e' }}>DB_URL: {maskedUrl}</code>
        </div>
      </div>
    </div>
  );
}
