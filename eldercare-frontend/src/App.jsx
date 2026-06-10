import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompleteProfile from "./pages/CompleteProfile";
import ChildDashboard from "./pages/ChildDashboard";
import BookService from "./pages/BookService";
import Complaints from "./pages/Complaints";
import Emergency from "./pages/Emergency";
import Profile from "./pages/Profile";
import CaretakerDashboard from "./pages/CaretakerDashboard";

function App() {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/complete-profile" element={<CompleteProfile />} />

  <Route path="/child-dashboard" element={<ChildDashboard />} />
  <Route path="/caretaker-dashboard" element={<CaretakerDashboard />} />

  <Route path="/book-service" element={<BookService />} />
  <Route path="/complaints" element={<Complaints />} />
  <Route path="/emergency" element={<Emergency />} />

  <Route path="/profile" element={<Profile />} />
  
</Routes>
  );
}

export default App;
