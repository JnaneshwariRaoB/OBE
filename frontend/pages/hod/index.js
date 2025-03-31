import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function HeadOfDepartments() {
  const [hod, setHod] = useState(null); // Store only one HOD (if exists)
  const [departmentName, setDepartmentName] = useState(''); // Store department name
  const [form, setForm] = useState({
    name: '',
    department_id: '',
    email: '',
    phone_number: '',
    qualification: '',
    experience: '',
    date_joined: '',
    password: ''
  });
  const [departments, setDepartments] = useState([]);
  const router = useRouter();
  const { departmentId } = router.query; // Get departmentId from URL query
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
    if (departmentId) {
      fetchHod();
    }
  }, [departmentId]);

  const fetchHod = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/hods');
      const hodForDept = data.find(hod => hod.Department_ID?.toString() === departmentId?.toString());
      setHod(hodForDept || null);
    } catch (error) {
      console.error("Error fetching HOD:", error);
    } finally {
      setLoading(false);  // Stop loading once fetch is done
    }
  };

  const fetchDepartments = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/departments');
      setDepartments(data);

      // Find department name for the current departmentId
      const dept = data.find(d => d.id?.toString() === departmentId?.toString());
      setDepartmentName(dept ? dept.department_name : 'Unknown Department');
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/hods', { ...form, department_id: departmentId });
      fetchHod();
    } catch (error) {
      console.error("Error adding HOD:", error);
    }
  };

  return (
    <div className="container">
      <h2>Head of Department</h2>

      {/* If an HOD exists for this department, show details */}
      {hod ? (
        <div className="card">
          <h3>{hod.Name}</h3>
          <p><strong>Department:</strong> {departmentName}</p> {/* Display Department Name */}
          <p><strong>Email:</strong> {hod.Email}</p>
          <p><strong>Phone:</strong> {hod.Phone_Number}</p>
          <p><strong>Experience:</strong> {hod.Experience} years</p>
        </div>
      ) : (
        // If no HOD exists for this department, show form to add one
        <form onSubmit={handleSubmit} className="form">
          <input className="input" name="name" placeholder="Name" onChange={handleChange} required />
          <input className="input" name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input className="input" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
          <input className="input" name="qualification" placeholder="Qualification" onChange={handleChange} />
          <input className="input" name="experience" type="number" placeholder="Experience" onChange={handleChange} />
          <input className="input" name="date_joined" type="date" onChange={handleChange} />
          <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button className="button" type="submit">Add HOD</button>
        </form>
      )}
    </div>
  );
}
