import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PlayerControls from './PlayerControls';
import Hallway from './Hallway';
import CourseDoor from './CourseDoor';
import CourseDetailsOverlay from './CourseDetailsOverlay';

export default function CampusScene() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.getaxios.get("https://lms-yyu4.onrender.com/...")
        setCourses(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please check if the backend is running and MongoDB is connected.');
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnterCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseOverlay = () => {
    setSelectedCourse(null);
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Canvas camera={{ position: [0, 1.7, 10], fov: 75 }}>
        <Hallway />
        
        {!loading && !error && courses.map((course, index) => {
          const side = index % 2 === 0 ? -1 : 1;
          const zPos = -index * 10 + 5;
          const xPos = 4.8 * side;
          const rotationY = side === -1 ? Math.PI / 2 : -Math.PI / 2;

          return (
            <group key={course._id} rotation-y={rotationY} position={[xPos, 0, zPos]}>
              <CourseDoor 
                course={course} 
                position={[0, 0, 0]} 
                onEnter={handleEnterCourse} 
              />
            </group>
          );
        })}

        <PlayerControls />
      </Canvas>

      {/* Navigation UI */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        gap: '15px',
        zIndex: 10
      }}>
        {user?.role === 'admin' && (
          <button 
            onClick={() => navigate('/admin')}
            style={{
              padding: '12px 24px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(99, 102, 241, 0.4)',
              color: 'white',
              backdropFilter: 'blur(20px)',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '0.9rem',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(99, 102, 241, 0.6)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(99, 102, 241, 0.4)'}
          >
            Admin Dashboard
          </button>
        )}
        <button 
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
          style={{
            padding: '12px 24px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
        >
          Logout
        </button>
      </div>

      {/* Instructions Overlay */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontFamily: "'Outfit', sans-serif",
        pointerEvents: 'none',
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '15px 25px',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '0.9rem'
      }}>
        <div style={{ marginBottom: '5px', fontWeight: 'bold', color: '#00ffff' }}>CONTROLS</div>
        <div>WASD to walk. Click to lock mouse view.</div>
        <div>ESC to unlock mouse. Walk into a door to enter.</div>
        {error && (
          <div style={{ marginTop: '10px', color: '#f87171', fontWeight: 'bold' }}>
            ⚠️ {error}
          </div>
        )}
        {!loading && !error && courses.length === 0 && (
          <div style={{ marginTop: '10px', color: '#fbbf24', fontWeight: 'bold' }}>
            📭 No courses found. Use Admin Dashboard to add some!
          </div>
        )}
      </div>

      {/* Course Details Overlay */}
      {selectedCourse && (
        <CourseDetailsOverlay 
          course={selectedCourse} 
          onClose={handleCloseOverlay} 
        />
      )}
    </>
  );
}