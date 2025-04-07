import { useNavigate } from "react-router-dom";
import logo from '../assets/logo_cck.jpg.jpg';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
      <div
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-800">
          Centro Cultural Kalunguinha
        </h1>
      </div>

      <button
        onClick={() => navigate("/login")}
        className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:opacity-90 transition"
      >
        Login do Administrador
      </button>
    </header>
  );
}
