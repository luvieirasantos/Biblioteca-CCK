import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  tema: string;
  classificacao: string;
  status: string;
  imagem: string;
  criadoPor: string;
}

export function DetalheLivro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState<Livro | null>(null);

  useEffect(() => {
    async function fetchLivro() {
      const { data, error } = await supabase
        .from("livros")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setLivro(data);
      } else {
        console.error("Erro ao buscar livro:", error);
      }
    }

    fetchLivro();
  }, [id]);

  if (!livro) {
    return <p className="text-center py-10 text-gray-500">Carregando livro...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-10 max-w-3xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-sm text-blue-600 hover:underline"
      >
        ⬅ Voltar
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <img
          src={livro.imagem}
          alt={livro.titulo}
          className="w-full max-h-96 object-contain mb-6 border rounded bg-gray-100"
        />

        <h1 className="text-2xl font-bold mb-2">{livro.titulo}</h1>
        <p className="text-gray-700">Autor: {livro.autor}</p>
        <p className="text-gray-600">Tema: {livro.tema}</p>
        <p className="text-sm text-gray-600">Classificação: {livro.classificacao}</p>
        <p className="text-sm text-gray-600">Status: {livro.status}</p>
        <p className="text-xs text-gray-400 mt-4">Adicionado por: {livro.criadoPor}</p>
      </div>
    </div>
  );
}
