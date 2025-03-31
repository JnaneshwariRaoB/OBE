import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [departments, setDepartments] = useState([]);
  const [departmentCode, setDepartmentCode] = useState('');
  const [departmentName, setDepartmentName] = useState('');
 
  const [editingDepartment, setEditingDepartment] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleSaveDepartment = async (e) => {
    e.preventDefault();
    if (!departmentCode || !departmentName) {
      alert('Please fill in all fields');
      return;
    }

    try {
      if (editingDepartment) {
        await axios.put(`http://localhost:5000/api/departments/${editingDepartment.id}`, {
          department_code: departmentCode,
          department_name: departmentName,
        });
      } else {
        await axios.post('http://localhost:5000/api/departments', {
          department_code: departmentCode,
          department_name: departmentName,
        });
      }

      setDepartmentCode('');
      setDepartmentName('');
      setEditingDepartment(null);
      fetchDepartments();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleDeleteDepartment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      alert('Error deleting department:', error);
    }
  };

  const handleEditDepartment = (dept) => {
    setEditingDepartment(dept);
    setDepartmentCode(dept.department_code);
    setDepartmentName(dept.department_name);
  };




  const handleCardClick = (dept) => {
    router.push({ pathname: '/hod', query: { departmentId: dept.id } });
  };


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Dashboard</h2>
        <div style={styles.departmentGrid}>
          {departments.length === 0 ? (
            <p>No departments added</p>
          ) : (
            departments.map((dept) => (
              <div key={dept.id} style={styles.departmentCard} onClick={() => handleCardClick(dept)}>
                <h3>{dept.department_code}</h3>
                <p>{dept.department_name}</p>
                <div style={styles.buttonGroup}>
                  <button onClick={(e) => { e.stopPropagation(); handleEditDepartment(dept); }} style={styles.editButton}>✏️ Edit</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteDepartment(dept.id); }} style={styles.deleteButton}>❌ Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={styles.formContainer}>
          <h3>{editingDepartment ? 'Edit' : 'Add'} Department</h3>
          <input type="text" placeholder="Department Code" value={departmentCode} onChange={(e) => setDepartmentCode(e.target.value)} style={styles.input} />
          <input type="text" placeholder="Department Name" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} style={styles.input} />
          <button onClick={handleSaveDepartment} style={styles.button}>{editingDepartment ? 'Update' : 'Save'}</button>
          {editingDepartment && <button onClick={() => setEditingDepartment(null)} style={styles.cancelButton}>Cancel</button>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#F3E8C8',
    minHeight: '100vh',
    padding: '20px',
  },
  card: {
    background: '#FAF3E0',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '800px',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#5B4636',
  },
  departmentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  departmentCard: {
    background: '#F9E9D2',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
  },
  departmentCardHover: {
    transform: 'scale(1.05)',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    background: '#8B5E3C',
    color: 'white',
    border: 'none',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    background: '#d9534f',
    color: 'white',
    border: 'none',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  editButton: {
    background: '#FFC107',
    color: 'black',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    background: '#D9534F',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};