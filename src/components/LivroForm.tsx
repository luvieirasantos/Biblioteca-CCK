interface LivroFormProps {
  livro: {
    titulo: string;
    autor: string;
    tema: string;
    classificacao: "adulto" | "infantojuvenil";
    status: "disponível" | "não encontrado" | "emprestado";
    imagem: string;
    criadoPor: string;
  };
  setLivro: (livro: LivroFormProps["livro"]) => void;
  onSubmit: () => void;
}

export function LivroForm({ livro, setLivro, onSubmit }: LivroFormProps) {
  return (
    <div className="bg-white p-6 rounded shadow-md mb-10">
      <h2 className="text-xl font-semibold mb-4">Adicionar novo livro</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Título"
          value={livro.titulo}
          onChange={(e) => setLivro({ ...livro, titulo: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Autor"
          value={livro.autor}
          onChange={(e) => setLivro({ ...livro, autor: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Tema"
          value={livro.tema}
          onChange={(e) => setLivro({ ...livro, tema: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="URL da imagem"
          value={livro.imagem}
          onChange={(e) => setLivro({ ...livro, imagem: e.target.value })}
          className="border p-2 rounded"
        />

        <select
          value={livro.classificacao}
          onChange={(e) => setLivro({ ...livro, classificacao: e.target.value as any })}
          className="border p-2 rounded"
        >
          <option value="adulto">Adulto</option>
          <option value="infantojuvenil">Infantojuvenil</option>
        </select>

        <select
          value={livro.status}
          onChange={(e) => setLivro({ ...livro, status: e.target.value as any })}
          className="border p-2 rounded"
        >
          <option value="disponível">Disponível</option>
          <option value="não encontrado">Não encontrado</option>
          <option value="emprestado">Emprestado</option>
        </select>
      </div>

      <button
        onClick={onSubmit}
        className="mt-6 bg-black text-white px-6 py-2 rounded hover:opacity-90 transition"
      >
        Adicionar Livro
      </button>
    </div>
  );
}
