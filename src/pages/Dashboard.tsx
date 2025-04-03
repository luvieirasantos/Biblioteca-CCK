import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LivroCard } from "../components/LivroCard";
import { LivroForm } from "../components/LivroForm";
import { supabase } from "../services/supabaseClient";

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  tema: string;
  classificacao: "adulto" | "infantojuvenil";
  status: "disponível" | "não encontrado" | "emprestado";
  imagem: string;
  criadoPor: string;
}

type LivroInput = Omit<Livro, "id">;

export function Dashboard() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [novoLivro, setNovoLivro] = useState<LivroInput>({
    titulo: "",
    autor: "",
    tema: "",
    classificacao: "adulto",
    status: "disponível",
    imagem: "",
    criadoPor: currentUser || "desconhecido",
  });

  async function fetchLivros() {
    const { data, error } = await supabase.from("livros").select("*");
    if (!error && data) setLivros(data as Livro[]);
  }

  useEffect(() => {
    fetchLivros();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adicionarLivro = async () => {
    const { data, error } = await supabase.from("livros").insert([
      { ...novoLivro, criadoPor: currentUser || "desconhecido" },
    ]);
    if (!error) fetchLivros();
  };

  const excluirLivro = async (id: string) => {
    await supabase.from("livros").delete().eq("id", id);
    setLivros(livros.filter((l) => l.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="flex justify-between items-center px-6 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold">📖 Painel de Administração</h2>
        <button onClick={handleLogout} className="text-red-500 text-sm hover:underline">
          Sair
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <LivroForm livro={novoLivro} setLivro={setNovoLivro} onSubmit={adicionarLivro} />

        <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3">
          {livros.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhum livro cadastrado ainda.</p>
          ) : (
            livros.map((livro) => (
              <LivroCard key={livro.id} livro={livro} onDelete={excluirLivro} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
