import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Admin() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  // 📥 Load courses
  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load courses ❌");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ➕ Create course
  const handleCreate = async () => {
    try {
      await API.post("/courses", { title, description });

      setTitle("");
      setDescription("");

      fetchCourses();
      alert("Course created ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to create course ❌");
    }
  };

  // ❌ Delete course
  const handleDelete = async (id) => {
    try {
      await API.delete(`/courses/${id}`);
      fetchCourses();
      alert("Deleted ✅");
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Panel</h1>

      <button onClick={() => navigate("/campus")}>
        Back to Dashboard
      </button>

      <h2>Create Course</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <button onClick={handleCreate}>Create Course</button>

      <h2 style={{ marginTop: "40px" }}>All Courses</h2>

      {courses.map((course) => (
        <div
          key={course._id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "10px",
          }}
        >
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          <button onClick={() => handleDelete(course._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}