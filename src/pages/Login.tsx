import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const sucesso = login(username, password);
    if (sucesso) {
      navigate("/dashboard");
    } else {
      alert("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">Login do Administrador</h1>
      
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded mb-2 w-full max-w-xs"
      />
      
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded mb-4 w-full max-w-xs"
      />
      
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded w-full max-w-xs">
        Entrar
      </button>
    </div>
  );
}
