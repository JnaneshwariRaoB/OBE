'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const styles = {
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
    transition: 'background 0.3s ease',
  },
  activeButton: {
    background: '#8B5E3C',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default function ButtonGroup() {
  const router = useRouter();
  const [userType, setUserType] = useState('');

  // Load user type from localStorage (persists highlight)
  useEffect(() => {
    const savedUserType = localStorage.getItem('userType');
    if (savedUserType) {
      setUserType(savedUserType);
    }
  }, []);

  const handleUserTypeClick = (type) => {
    setUserType(type);
    localStorage.setItem('userType', type); // Save selection

    // Navigate after a slight delay for visual effect
    setTimeout(() => {
      if (type === 'Admin') {
        router.push('/auth/login');
      } else if (type === 'Faculty') {
        router.push('/auth/faculty_login');
      } else if (type === 'Student') {
        router.push('/auth/student_login');
      }
    }, 200);
  };

  return (
    <div style={styles.buttonGroup}>
      <button
        style={userType === 'Admin' ? styles.activeButton : styles.button}
        onClick={() => handleUserTypeClick('Admin')}
      >
        Admin
      </button>
      <button
        style={userType === 'Faculty' ? styles.activeButton : styles.button}
        onClick={() => handleUserTypeClick('Faculty')}
      >
        Faculty
      </button>
      <button
        style={userType === 'Student' ? styles.activeButton : styles.button}
        onClick={() => handleUserTypeClick('Student')}
      >
        Student
      </button>
    </div>
  );
}
