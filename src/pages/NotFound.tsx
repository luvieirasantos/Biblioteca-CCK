import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-extrabold text-black mb-2 tracking-tight">404</h1>
      <p className="text-gray-600 text-lg mb-6">Página não encontrada 😥</p>

      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
      >
        Voltar para a Home
      </button>
    </div>
  );
}
