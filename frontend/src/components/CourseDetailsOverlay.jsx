import React from 'react';

export default function CourseDetailsOverlay({ course, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease-in-out'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        maxWidth: '600px',
        width: '90%',
        color: 'white',
        fontFamily: "'Outfit', sans-serif",
        textAlign: 'center',
        position: 'relative',
        animation: 'slideUp 0.5s ease-out'
      }}>
        <style>
          {`
            @keyframes slideUp {
              from { transform: translateY(50px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}
        </style>
        
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '25px',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '28px',
            cursor: 'pointer',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.color = 'white'}
          onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
        >
          &times;
        </button>

        <h1 style={{ 
          fontSize: '3rem', 
          margin: '0 0 20px 0', 
          background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '800'
        }}>
          {course.title}
        </h1>

        <p style={{ 
          fontSize: '1.2rem', 
          lineHeight: '1.6', 
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '40px'
        }}>
          {course.description}
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button style={{
            padding: '12px 32px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4)';
          }}
          >
            Enroll Now
          </button>
          
          <button style={{
            padding: '12px 32px',
            borderRadius: '12px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            background: 'transparent',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
          onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}
