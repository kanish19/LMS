import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, enrollmentRes] = await Promise.all([
          API.get("/courses"),
          isAdmin ? { data: [] } : API.get("/enrollments/my-courses"),
        ]);

        setCourses(courseRes.data);

        if (!isAdmin) {
          setEnrolledCourses(
            enrollmentRes.data.map((e) => e.course?._id || e.course)
          );
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load courses.");
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.role]);

  const handleEnroll = async (courseId) => {
    if (isAdmin) {
      alert("Admins cannot enroll.");
      return;
    }

    try {
      await API.post(`/enrollments/${courseId}`);
      setEnrolledCourses([...enrolledCourses, courseId]);
      alert("Enrolled successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Enrollment failed ❌");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Hello, {user?.name}</h1>

      <button onClick={handleLogout}>Logout</button>

      <h2>Courses</h2>

      {error && <p>{error}</p>}

      <div>
        {courses.map((course) => {
          const isEnrolled = enrolledCourses.includes(course._id);

          return (
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

              {isAdmin ? (
                <button onClick={() => navigate("/admin")}>
                  Manage Course
                </button>
              ) : (
                <button
                  disabled={isEnrolled}
                  onClick={() => handleEnroll(course._id)}
                >
                  {isEnrolled ? "Enrolled" : "Enroll"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}