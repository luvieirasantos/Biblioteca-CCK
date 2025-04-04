interface LivroInput {
  titulo: string;
  autor: string;
  tema: string;
  classificacao: "adulto" | "infantojuvenil";
  status: "disponível" | "não encontrado" | "emprestado";
  imagem: string;
  criadoPor: string;
}

interface Props {
  livro: LivroInput;
  setLivro: (livro: LivroInput) => void;
  onSubmit: () => void;
}

export function LivroForm({ livro, setLivro, onSubmit }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Adicionar novo livro</h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <input
          className="border p-2 rounded text-sm"
          type="text"
          placeholder="Título"
          value={livro.titulo}
          onChange={(e) => setLivro({ ...livro, titulo: e.target.value })}
        />
        <input
          className="border p-2 rounded text-sm"
          type="text"
          placeholder="Autor"
          value={livro.autor}
          onChange={(e) => setLivro({ ...livro, autor: e.target.value })}
        />
        <input
          className="border p-2 rounded text-sm"
          type="text"
          placeholder="Tema"
          value={livro.tema}
          onChange={(e) => setLivro({ ...livro, tema: e.target.value })}
        />
        <input
          className="border p-2 rounded text-sm"
          type="text"
          placeholder="URL da imagem"
          value={livro.imagem}
          onChange={(e) => setLivro({ ...livro, imagem: e.target.value })}
        />
        <select
          className="border p-2 rounded text-sm"
          value={livro.classificacao}
          onChange={(e) =>
            setLivro({ ...livro, classificacao: e.target.value as any })
          }
        >
          <option value="adulto">Classificação: Adulto</option>
          <option value="infantojuvenil">Classificação: Infantojuvenil</option>
        </select>
        <select
          className="border p-2 rounded text-sm"
          value={livro.status}
          onChange={(e) =>
            setLivro({ ...livro, status: e.target.value as any })
          }
        >
          <option value="disponível">Status: Disponível</option>
          <option value="não encontrado">Status: Não encontrado</option>
          <option value="emprestado">Status: Emprestado</option>
        </select>
      </div>

      <button
        onClick={onSubmit}
        className="mt-6 bg-black text-white px-6 py-2 rounded hover:opacity-90 transition text-sm"
      >
        Adicionar livro
      </button>
    </div>
  );
}
