import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LivroCard } from "../components/LivroCard";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  imagem: string;
}

export function Home() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const livrosSalvos = localStorage.getItem("livrosKalunguinha");
    if (livrosSalvos) {
      setLivros(JSON.parse(livrosSalvos));
    }
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-blue-700">📚 Centro Cultural Kalunguinha</h1>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Login do Administrador
        </button>
      </div>

      {livros.length === 0 ? (
        <p className="text-gray-600">Nenhum livro cadastrado ainda.</p>
      ) : (
        <div className="grid gap-4">
          {livros.map((livro) => (
            <LivroCard key={livro.id} livro={livro} onDelete={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
