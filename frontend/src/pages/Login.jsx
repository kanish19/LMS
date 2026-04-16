import API from "../api/api";

const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
  } catch (err) {
    console.error(err);
  }
};