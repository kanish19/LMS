import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Campus from "./pages/Campus";
import Admin from "./pages/Admin";
import AIChat from "./pages/AIChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/campus" element={<Campus />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ai" element={<AIChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;