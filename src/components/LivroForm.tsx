type LivroInput = {
  titulo: string;
  autor: string;
  imagem: string;
  criadoPor: string;
};

interface Props {
  livro: LivroInput;
  setLivro: (livro: LivroInput) => void;
  onSubmit: () => void;
}

export function LivroForm({ livro, setLivro, onSubmit }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Cadastrar novo livro</h3>
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Título"
          value={livro.titulo}
          onChange={(e) => setLivro({ ...livro, titulo: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="text"
          placeholder="Autor"
          value={livro.autor}
          onChange={(e) => setLivro({ ...livro, autor: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="text"
          placeholder="URL da imagem"
          value={livro.imagem}
          onChange={(e) => setLivro({ ...livro, imagem: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={onSubmit}
          className="bg-black text-white py-3 px-6 rounded-lg hover:opacity-90 transition"
        >
          Adicionar Livro
        </button>
      </div>
    </div>
  );
}
