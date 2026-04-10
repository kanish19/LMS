import api from '../api/axios';

export default function EnrollmentModal({
  course,
  onClose,
  enrolledCourses,
  onEnterClassroom
}) {
  if (!course) return null;

  const isEnrolled = enrolledCourses.includes(course._id);

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem('token');

      await api.post(
        `/enrollments/${course._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Enrolled successfully!');
      onClose();
      window.location.reload();

    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        zIndex: 10
      }}
    >
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      {isEnrolled ? (
        <button
          onClick={() => {
            onEnterClassroom(course);
            onClose();
          }}
        >
          Enter Classroom
        </button>
      ) : (
        <button onClick={handleEnroll}>Enroll</button>
      )}

      <button onClick={onClose}>Close</button>
    </div>
  );
}