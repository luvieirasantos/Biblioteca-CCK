import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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

interface Props {
  livro: Livro;
  onDelete?: (id: string) => void;
  onEdit?: () => void;
}

export function LivroCard({ livro, onDelete, onEdit }: Props) {
  const { currentUser } = useAuth();
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ ...livro });
  const navigate = useNavigate();

  const handleSalvar = async () => {
    const { error } = await supabase
      .from("livros")
      .update({ ...form })
      .eq("id", livro.id);

    if (!error) {
      setEditando(false);
      onEdit && onEdit();
    } else {
      alert("Erro ao salvar alterações.");
    }
  };

  return (
    <div
      className="flex flex-col gap-4 border p-4 rounded shadow-sm bg-white cursor-pointer hover:shadow-md transition"
      onClick={() => !editando && navigate(`/livro/${livro.id}`)}
    >
      {!editando ? (
        <>
          <div className="w-full h-48 bg-gray-50 rounded border flex items-center justify-center">
            <img
              src={livro.imagem}
              alt={livro.titulo}
              className="h-full max-h-48 object-contain"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold">{livro.titulo}</h3>
            <p className="text-gray-700">Autor: {livro.autor}</p>
            <p className="text-sm text-gray-600">Tema: {livro.tema}</p>
            <p className="text-sm text-gray-600">Classificação: {livro.classificacao}</p>
            <p className="text-sm text-gray-600">Status: {livro.status}</p>
            <p className="text-xs text-gray-400 mt-1">Adicionado por: {livro.criadoPor}</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            className="border p-2 rounded"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            value={form.autor}
            onChange={(e) => setForm({ ...form, autor: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            value={form.tema}
            onChange={(e) => setForm({ ...form, tema: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            value={form.imagem}
            onChange={(e) => setForm({ ...form, imagem: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={form.classificacao}
            onChange={(e) => setForm({ ...form, classificacao: e.target.value as any })}
          >
            <option value="adulto">Adulto</option>
            <option value="infantojuvenil">Infantojuvenil</option>
          </select>
          <select
            className="border p-2 rounded"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as any })}
          >
            <option value="disponível">Disponível</option>
            <option value="não encontrado">Não encontrado</option>
            <option value="emprestado">Emprestado</option>
          </select>
        </div>
      )}

      {currentUser && (
        <div className="flex justify-between mt-2 text-sm">
          {editando ? (
            <>
              <button
                onClick={handleSalvar}
                className="text-green-600 hover:underline"
              >
                Salvar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditando(false);
                }}
                className="text-gray-500 hover:underline"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditando(true);
                }}
                className="text-blue-600 hover:underline"
              >
                ✏️ Editar
              </button>
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(livro.id);
                  }}
                  className="text-red-500 hover:underline"
                >
                  🗑️ Excluir
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
