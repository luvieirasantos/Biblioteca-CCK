import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { DetalheLivro } from "./pages/DetalheLivro";
import { AuthProvider } from "./context/AuthContext";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/livro/:id" element={<DetalheLivro />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}