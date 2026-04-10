import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI, userAPI, enrollmentAPI } from '../api/api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Create/Edit Form State
  const [form, setForm] = useState({ title: '', description: '', category: 'General' });
  const [editId, setEditId] = useState(null);

  // Enrollees State
  const [enrollees, setEnrollees] = useState([]);
  const [viewingCourseEnrollees, setViewingCourseEnrollees] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'courses') {
        const res = await courseAPI.getAll();
        setCourses(res.data);
      } else {
        const res = await userAPI.getAll();
        setUsers(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      if (editId) {
        await courseAPI.update(editId, form);
        setMessage('Course updated successfully!');
      } else {
        await courseAPI.create(form);
        setMessage('Course created successfully!');
      }
      setForm({ title: '', description: '', category: 'General' });
      setEditId(null);
      fetchData();
    } catch (err) {
      setMessage('Error saving course. Check permissions.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setForm({ title: course.title, description: course.description, category: course.category || 'General' });
    setEditId(course._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseAPI.delete(id);
        fetchData();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const loadEnrollees = async (course) => {
    setLoading(true);
    try {
      const res = await enrollmentAPI.getEnrollees(course._id);
      setEnrollees(res.data);
      setViewingCourseEnrollees(course);
    } catch (err) {
      alert('Failed to load enrollees');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ margin: 0 }}>LMS Admin</h1>
          <p style={{ color: 'var(--text-dim)', margin: 0 }}>Role: Administrator ({JSON.parse(localStorage.getItem('user'))?.name})</p>
        </div>
        <button onClick={() => navigate('/campus')} style={{ padding: '8px 16px', background: '#eee', border: 'none', borderRadius: '8px' }}>
          Back to Catalog
        </button>
      </header>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #e8f5e9' }}>
        <button 
          onClick={() => { setActiveTab('courses'); setViewingCourseEnrollees(null); }}
          style={{
            padding: '10px 20px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'courses' ? '3px solid var(--primary)' : 'none',
            color: activeTab === 'courses' ? 'var(--primary)' : 'var(--text-dim)',
            fontWeight: 'bold'
          }}
        >
          Courses
        </button>
        <button 
          onClick={() => { setActiveTab('users'); setViewingCourseEnrollees(null); }}
          style={{
            padding: '10px 20px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'users' ? '3px solid var(--primary)' : 'none',
            color: activeTab === 'users' ? 'var(--primary)' : 'var(--text-dim)',
            fontWeight: 'bold'
          }}
        >
          Users
        </button>
      </div>

      {activeTab === 'courses' && !viewingCourseEnrollees && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '40px' }}>
          {/* Form Section */}
          <div style={{ background: 'var(--surface)', padding: '30px', borderRadius: '16px', boxShadow: 'var(--shadow)', height: 'fit-content' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>{editId ? 'Edit Course' : 'Add New Course'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input name="title" value={form.title} onChange={handleFormChange} placeholder="Course Title" required />
              <textarea name="description" value={form.description} onChange={handleFormChange} placeholder="Description" rows="4" required />
              <select name="category" value={form.category} onChange={handleFormChange}>
                <option value="General">General</option>
                <option value="Programming">Programming</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Healthcare">Healthcare</option>
              </select>
              <button type="submit" disabled={loading} style={{ background: 'var(--primary)', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                {editId ? 'Update Course' : 'Create Course'}
              </button>
              {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', description: '', category: 'General' }); }} style={{ background: 'none', border: 'none', color: 'var(--error)' }}>Cancel Edit</button>}
            </form>
            {message && <p style={{ marginTop: '15px', color: 'var(--success)', textAlign: 'center' }}>{message}</p>}
          </div>

          {/* List Section */}
          <div>
            <h2 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>Existing Courses</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {courses.map(course => (
                <div key={course._id} style={{ background: 'var(--surface)', padding: '20px', borderRadius: '12px', border: '1px solid #e8f5e9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{course.title}</h3>
                    <span style={{ fontSize: '0.8rem', background: '#e8f5e9', padding: '2px 8px', borderRadius: '10px', marginRight: '10px' }}>{course.category}</span>
                    <button 
                      onClick={() => loadEnrollees(course)}
                      style={{ border: 'none', background: 'none', color: 'var(--primary)', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      View Enrollees
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEdit(course)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold' }}>Edit</button>
                    <button onClick={() => handleDelete(course._id)} style={{ background: 'none', border: 'none', color: 'var(--error)', fontWeight: 'bold' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enrollees View */}
      {viewingCourseEnrollees && (
        <div style={{ background: 'var(--surface)', padding: '30px', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>Enrollees for: {viewingCourseEnrollees.title}</h2>
            <button onClick={() => setViewingCourseEnrollees(null)} style={{ border: 'none', background: '#eee', padding: '8px 15px', borderRadius: '8px' }}>Back to Courses</button>
          </div>
          {enrollees.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '30px', color: 'var(--text-dim)' }}>No students enrolled in this course yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #e8f5e9' }}>
                  <th style={{ padding: '12px' }}>Student Name</th>
                  <th style={{ padding: '12px' }}>Email</th>
                  <th style={{ padding: '12px' }}>Enrollment Date</th>
                </tr>
              </thead>
              <tbody>
                {enrollees.map(enrollment => (
                  <tr key={enrollment._id} style={{ borderBottom: '1px solid #f1f8e9' }}>
                    <td style={{ padding: '12px' }}>{enrollment.user?.name}</td>
                    <td style={{ padding: '12px' }}>{enrollment.user?.email}</td>
                    <td style={{ padding: '12px' }}>{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        /* Users Tab */
        <div style={{ background: 'var(--surface)', padding: '30px', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
          <h2 style={{ marginBottom: '20px' }}>System Users</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #e8f5e9' }}>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Email</th>
                <th style={{ padding: '12px' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} style={{ borderBottom: '1px solid #f1f8e9' }}>
                  <td style={{ padding: '12px' }}>{user.name}</td>
                  <td style={{ padding: '12px' }}>{user.email}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem',
                      background: user.role === 'admin' ? '#fff3e0' : '#e8f5e9',
                      color: user.role === 'admin' ? '#e65100' : '#2e7d32'
                    }}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
