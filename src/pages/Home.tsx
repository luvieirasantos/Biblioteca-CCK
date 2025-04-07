import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LivroCard } from "../components/LivroCard";
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

const LIVROS_POR_PAGINA = 9;

export function Home() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const navigate = useNavigate();

  const fetchTotalLivros = async (termo: string) => {
    const { count } = await supabase
      .from("livros")
      .select("*", { count: "exact", head: true })
      .or(`titulo.ilike.%${termo}%,autor.ilike.%${termo}%`);
    return count ?? 0;
  };

  const fetchLivros = async (pagina: number, termo: string) => {
    setCarregando(true);

    const inicio = (pagina - 1) * LIVROS_POR_PAGINA;
    const fim = inicio + LIVROS_POR_PAGINA - 1;

    const { data, error } = await supabase
      .from("livros")
      .select("*")
      .or(`titulo.ilike.%${termo}%,autor.ilike.%${termo}%`)
      .range(inicio, fim);

    if (!error && data) {
      setLivros(data as Livro[]);
    }

    const total = await fetchTotalLivros(termo);
    setTotalPaginas(Math.ceil(total / LIVROS_POR_PAGINA));
    setCarregando(false);
  };

  useEffect(() => {
    fetchLivros(paginaAtual, busca);
  }, [paginaAtual, busca]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            value={busca}
            onChange={(e) => {
              setPaginaAtual(1);
              setBusca(e.target.value);
            }}
            className="w-full max-w-md p-2 sm:p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {carregando ? (
          <p className="text-center text-gray-600">Carregando livros...</p>
        ) : livros.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum livro encontrado.</p>
        ) : (
          <>
            <div className="grid gap-6 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {livros.map((livro) => (
                <LivroCard key={livro.id} livro={livro} />
              ))}
            </div>

            <div className="flex justify-center mt-10 gap-4">
              <button
                onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
                disabled={paginaAtual === 1}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                ⬅ Página anterior
              </button>
              <span className="text-sm text-gray-700 mt-2">
                Página {paginaAtual} de {totalPaginas}
              </span>
              <button
                onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
                disabled={paginaAtual === totalPaginas}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Próxima página ➡
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
