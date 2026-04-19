export default async function Home() {
  // This runs on the server in your K8s pod
  const dbUrl = process.env.DATABASE_URL || "Secret not found in environment";

  // Mask the sensitive part of the URL (DevOps best practice!)
  const maskedUrl = dbUrl.replace(/:([^:@]+)@/, ':****@');

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', padding: '40px' }}>
      <header>
        <h1 style={{ color: '#ffcc00' }}>Epiroc Machine Dashboard</h1>
        <div style={{ 
          backgroundColor: '#333', 
          padding: '10px', 
          borderRadius: '5px', 
          marginTop: '10px',
          border: '1px solid #555' 
        }}>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#aaa' }}>Infrastructure Debug Info:</p>
          <code style={{ color: '#00ff00' }}>DB_URL: {maskedUrl}</code>
        </div>
      </header>
      
      <main style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
        <div style={{ border: '2px solid #333', padding: '20px', borderRadius: '10px' }}>
          <h3>Motor RPM</h3>
          <p style={{ fontSize: '2rem' }}>0</p>
        </div>
        {/* ... rest of your UI ... */}
      </main>
    </div>
  );
}