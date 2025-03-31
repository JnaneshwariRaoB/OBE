import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function EditHOD() {
  const router = useRouter();
  const { id } = router.query; // Get HOD ID from the URL

  // Form states
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [deptPic, setDeptPic] = useState(null);

  // Fetch HOD details when the page loads
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/hod/${id}`)
        .then((res) => {
          const hod = res.data;
          setName(hod.Name || "");
          setEmail(hod.Email || "");
          setPhone(hod.Phone_Number || "");
          setQualification(hod.Qualification || "");
          setExperience(hod.Experience || "");
          setDateJoined(hod.Date_Joined || "");
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching HOD details:", error);
          setLoading(false);
        });
    }
  }, [id]);

  // Handle form submission
  const updateHOD = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("qualification", qualification);
    formData.append("experience", experience);
    formData.append("dateJoined", dateJoined);
    if (deptPic) formData.append("deptPic", deptPic);

    try {
      await axios.put(`http://localhost:5000/api/hod/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("HOD Updated Successfully!");
      router.push("/hod");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update HOD. Try again.");
    }
  };

  if (loading) {
    return <p>Loading HOD details...</p>;
  }

  return (
    <form onSubmit={updateHOD} style={styles.form}>
      <h2>Edit HOD</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
      <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} placeholder="Qualification" />
      <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Experience (years)" />
      <input type="date" value={dateJoined} onChange={(e) => setDateJoined(e.target.value)} />
      <input type="file" onChange={(e) => setDeptPic(e.target.files[0])} />

      <button type="submit">Update</button>
    </form>
  );
}

// Basic styles
const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    background: "#FAF3E0",
    borderRadius: "10px",
  },
};
