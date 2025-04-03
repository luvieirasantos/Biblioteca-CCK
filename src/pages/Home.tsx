import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LivroCard } from "../components/LivroCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  imagem: string;
  criadoPor: string;
}

export function Home() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLivros() {
      const snapshot = await getDocs(collection(db, "livros"));
      const livrosDB = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as Livro[];
      setLivros(livrosDB);
    }

    fetchLivros();
  }, []);

  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    livro.autor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="flex justify-between items-center px-6 py-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold tracking-tight">📚 Centro Cultural Kalunguinha</h1>
        <button
          onClick={() => navigate("/login")}
          className="bg-black text-white px-5 py-2 rounded-xl text-sm hover:opacity-80 transition"
        >
          Login do Administrador
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {livrosFiltrados.length === 0 ? (
          <p className="text-gray-500 text-lg text-center mt-10">Nenhum livro encontrado.</p>
        ) : (
          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {livrosFiltrados.map((livro) => (
              <LivroCard key={livro.id} livro={livro} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
