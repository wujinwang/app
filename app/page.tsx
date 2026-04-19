export default function Home() {
  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', padding: '40px' }}>
      <header>
        <h1 style={{ color: '#ffcc00' }}>Epiroc Machine Dashboard</h1>
        <p>Status: <span style={{ color: '#00ff00' }}>Connected</span></p>
      </header>
      
      <main style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
        <div style={{ border: '2px solid #333', padding: '20px', borderRadius: '10px' }}>
          <h3>Motor RPM</h3>
          <p style={{ fontSize: '2rem' }}>0</p>
        </div>
        <div style={{ border: '2px solid #333', padding: '20px', borderRadius: '10px' }}>
          <h3>Battery</h3>
          <p style={{ fontSize: '2rem' }}>100%</p>
        </div>
      </main>
    </div>
  );
}