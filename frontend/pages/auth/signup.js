import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from "../../app/styles/Login.module.css"; // Corrected import path

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard'); // Redirect to dashboard instead of separate admin/faculty routes
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Admin Signup</h2>
        <form onSubmit={handleSignup}>
          <label className={styles.label}>Email Address</label>
          <input 
            type="email" 
            className={styles.input} 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          
          <label className={styles.label}>Password</label>
          <input 
            type="password" 
            className={styles.input} 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
        <p className={styles.footerText}>
          Already have an account? <a href="/auth/login" className={styles.link}>Login</a>
        </p>
      </div>
    </div>
  );
}
