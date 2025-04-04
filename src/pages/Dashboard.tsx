import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LivroCard } from "../components/LivroCard";
import { LivroForm } from "../components/LivroForm";
import { supabase } from "../services/supabaseClient";
import Papa from "papaparse";


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

  useEffect(() => {
    async function fetchLivros() {
      const { data } = await supabase.from("livros").select("*");
      if (data) setLivros(data as Livro[]);
    }

    fetchLivros();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

const exportarCSV = async () => {
  const { data, error } = await supabase.from("livros").select("*");

  if (error || !data) {
    alert("Erro ao exportar os livros.");
    return;
  }

  const csv = Papa.unparse(data); // converte JSON para CSV

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "livros.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  const adicionarLivro = async () => {
    if (!novoLivro.titulo || !novoLivro.autor || !novoLivro.tema || !novoLivro.imagem) {
      alert("Preencha todos os campos!");
      return;
    }

    const livroParaSalvar = {
      ...novoLivro,
      criadoPor: currentUser || "desconhecido",
    };

    const { data, error } = await supabase.from("livros").insert([livroParaSalvar]).select();
    if (!error && data) {
      setLivros([...livros, data[0] as Livro]);
      setNovoLivro({
        titulo: "",
        autor: "",
        tema: "",
        classificacao: "adulto",
        status: "disponível",
        imagem: "",
        criadoPor: currentUser || "desconhecido",
      });
    }
  };

  const excluirLivro = async (id: string) => {
    await supabase.from("livros").delete().eq("id", id);
    setLivros(livros.filter((livro) => livro.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center px-4 sm:px-6 py-6 border-b border-gray-200 gap-4">
  <h2 className="text-2xl font-bold tracking-tight">📖 Painel de Administração</h2>
  <div className="flex gap-2">
    <button
      onClick={exportarCSV}
      className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      📥 Exportar CSV
    </button>
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 hover:underline"
    >
      Sair
    </button>
  </div>
</header>


      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <LivroForm livro={novoLivro} setLivro={setNovoLivro} onSubmit={adicionarLivro} />

        <div className="grid gap-6 mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
