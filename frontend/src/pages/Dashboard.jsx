import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI, enrollmentAPI } from '../api/api';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, enrollmentRes] = await Promise.all([
          courseAPI.getAll(),
          isAdmin ? { data: [] } : enrollmentAPI.getMyEnrollments()
        ]);
        setCourses(courseRes.data);
        if (!isAdmin) {
          setEnrolledCourses(enrollmentRes.data.map(e => e.course?._id || e.course));
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load courses. Please make sure the server is running.');
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.role]);

  const handleEnroll = async (courseId) => {
    if (isAdmin) {
      alert('Admins cannot enroll in courses. Use the Admin Panel to manage them.');
      return;
    }
    try {
      await enrollmentAPI.enroll(courseId);
      setEnrolledCourses([...enrolledCourses, courseId]);
      alert('Successfully enrolled!');
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) return <div style={{ padding: '60px', textAlign: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>Loading your courses...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px',
        background: 'var(--surface)',
        padding: '24px 32px',
        borderRadius: '20px',
        boxShadow: 'var(--shadow)',
        border: '1px solid #e8f5e9'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--primary-dark)' }}>Hello, {user?.name}!</h1>
          <p style={{ color: 'var(--text-dim)', margin: '5px 0 0 0' }}>
            {isAdmin ? 'Admin View: Browsing Course Catalog' : 'Manage your education in the SimpleLMS Portal.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          {isAdmin && (
            <button 
              onClick={() => navigate('/admin')}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: '2px solid var(--primary)',
                background: 'white',
                color: 'var(--primary)',
                fontWeight: '700',
                fontSize: '0.95rem'
              }}
            >
              Admin Dashboard
            </button>
          )}
          <button 
            onClick={handleLogout}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: '#f5f5f5',
              color: '#666',
              fontWeight: '700',
              fontSize: '0.95rem'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {error && (
        <div style={{ padding: '20px', background: '#ffebee', color: 'var(--error)', borderRadius: '12px', marginBottom: '30px', fontWeight: '600' }}>
          ⚠️ {error}
        </div>
      )}

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ fontSize: '1.6rem' }}>Course Catalog</h2>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Showing {courses.length} courses</span>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {courses.map(course => {
            const isEnrolled = enrolledCourses.includes(course._id);
            return (
              <div key={course._id} style={{
                background: 'var(--surface)',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: 'var(--shadow)',
                border: '1px solid #e8f5e9',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '800', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    color: 'var(--primary)',
                    background: '#e8f5e9',
                    padding: '4px 12px',
                    borderRadius: '20px'
                  }}>
                    {course.category || 'General'}
                  </span>
                  {!isAdmin && isEnrolled && (
                    <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 'bold' }}>✓ Enrolled</span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--primary-dark)' }}>{course.title}</h3>
                <p style={{ 
                  color: 'var(--text-dim)', 
                  fontSize: '0.95rem', 
                  lineHeight: '1.6',
                  marginBottom: '25px',
                  display: '-webkit-box',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {course.description}
                </p>

                <div style={{ marginTop: 'auto' }}>
                  {isAdmin ? (
                    <button
                      onClick={() => navigate('/admin')}
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        border: '1px solid var(--primary)',
                        background: 'white',
                        color: 'var(--primary)',
                        fontWeight: '800',
                        fontSize: '1rem'
                      }}
                    >
                      Manage in Admin Panel
                    </button>
                  ) : (
                    <button
                      disabled={isEnrolled}
                      onClick={() => handleEnroll(course._id)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        border: 'none',
                        background: isEnrolled ? '#f1f8e9' : 'var(--primary)',
                        color: isEnrolled ? 'var(--primary)' : 'white',
                        fontWeight: '800',
                        fontSize: '1rem',
                        cursor: isEnrolled ? 'default' : 'pointer',
                        boxShadow: isEnrolled ? 'none' : '0 4px 12px rgba(46, 125, 50, 0.2)'
                      }}
                    >
                      {isEnrolled ? 'Go to Course' : 'Enroll Now'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
