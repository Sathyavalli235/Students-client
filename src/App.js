import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', course: '' });

  useEffect(()=>{
    fetchStudents();
  },[]);
  
  const fetchStudents=async()=>{
    const res=await axios.get('http://localhost:5000/api/students');
    setStudents(res.data);
  }

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    await axios.post('http://localhost:5000/api/students/register',form);
    setForm({name:'',email:'',course:''});
    fetchStudents();
  }
  
  return (
    <div style={{ margin: 40 }}>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name='name' value={form.name} onChange={handleChange} placeholder='Enter Name'></input>
        <input name='email' value={form.email} onChange={handleChange} placeholder='Enter Email'></input>
        <input name='course' value={form.course} onChange={handleChange} placeholder='Enter Course'></input>
        <button type="submit">Register</button>
      </form>
      <h3>Registered Students</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s)=>{
            return(
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;