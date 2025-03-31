import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// now yhese code not used
export default function AdminPage() {
  const router = useRouter();
  const { departmentName } = router.query;
  const [name, setName] = useState('');

  useEffect(() => {
    if (departmentName) {
      setName(departmentName);
    }
  }, [departmentName]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Department Details</h2>
        <p style={styles.departmentName}>{name ? name : 'Loading...'}</p>
        <button onClick={() => router.push('/')} style={styles.button}>Back to Dashboard</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#F3E8C8',
  },
  card: {
    background: '#FAF3E0',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#5B4636',
  },
  departmentName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#8B5E3C',
    marginTop: '10px',
  },
  button: {
    background: '#A0765C',
    color: 'white',
    border: 'none',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};