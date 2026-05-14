import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
//@ts-ignore
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
      <Route path="/admin-secret-2026" element={<Admin />} />
    </Routes>
  );
};

export default App;