
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ButtonGroup from './ButtonGroup'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Admin');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      
      if (userType === 'Admin') {
        router.push('/admin/hi');
      } else if (userType === 'Faculty') {
        router.push('/faculty_login');
      } else if (userType === 'Student') {
        router.push('/student_login');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };



  return (
    <div style={styles.container}>
      <div style={styles.card}>
       <ButtonGroup/>
        
        <h2 style={styles.title}>Student Login </h2>
        <form onSubmit={handleLogin}>
          <label style={styles.label}>Email Address</label>
          <input 
            type="email" 
            style={styles.input} 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          
          <label style={styles.label}>Password</label>
          <input 
            type="password" 
            style={styles.input} 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          <button type="submit" style={styles.button}>Login</button>
        </form>
       
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
    background: 'linear-gradient(to right, rgb(66, 54, 235), rgb(222, 138, 227))',
  },
  card: {
    background: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    background: '#ccc',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  activeButton: {
    background: '#8B5E3C',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  label: {
    display: 'block',
    fontWeight: '500',
    margin: '10px 0 5px',
    textAlign: 'left',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
  },
  footerText: {
    marginTop: '15px',
    fontSize: '14px',
  },
  link: {
    color: '#ff5c8a',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

