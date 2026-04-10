export default function CourseOverlay({ course, onClose }) {
  if (!course) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: '5%',
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        zIndex: 20,
        overflowY: 'auto'
      }}
    >
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <hr />

      <h3>Course Materials</h3>
      <ul>
        <li>📹 Intro Video</li>
        <li>📄 Lecture Notes PDF</li>
        <li>📝 Quiz 1</li>
        <li>💻 Assignment</li>
      </ul>

      <button onClick={onClose}>Exit Classroom</button>
    </div>
  );
}