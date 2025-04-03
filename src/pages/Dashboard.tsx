import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LivroCard } from "../components/LivroCard";
import { LivroForm } from "../components/LivroForm";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  imagem: string;
}

export function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [livros, setLivros] = useState<Livro[]>([]);
  const [novoLivro, setNovoLivro] = useState<Livro>({
    id: Date.now(),
    titulo: "",
    autor: "",
    imagem: "",
  });

  // ⬇️ Carregar livros do localStorage ao abrir
  useEffect(() => {
    const livrosSalvos = localStorage.getItem("livrosKalunguinha");
    if (livrosSalvos) {
      setLivros(JSON.parse(livrosSalvos));
    }
  }, []);

  // ⬆️ Salvar no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem("livrosKalunguinha", JSON.stringify(livros));
  }, [livros]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adicionarLivro = () => {
    if (!novoLivro.titulo || !novoLivro.autor) return alert("Preencha os campos!");
    setLivros([...livros, { ...novoLivro, id: Date.now() }]);
    setNovoLivro({ id: 0, titulo: "", autor: "", imagem: "" });
  };

  const excluirLivro = (id: number) => {
    setLivros(livros.filter((livro) => livro.id !== id));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Gerenciar Livros</h2>
        <button onClick={handleLogout} className="text-sm text-red-500">Sair</button>
      </div>

      <LivroForm livro={novoLivro} setLivro={setNovoLivro} onSubmit={adicionarLivro} />

      <div className="grid gap-4">
        {livros.map((livro) => (
          <LivroCard key={livro.id} livro={livro} onDelete={excluirLivro} />
        ))}
      </div>
    </div>
  );
}
