interface Livro {
  id: number;
  titulo: string;
  autor: string;
  imagem: string;
}

interface Props {
  livro: Livro;
  setLivro: (livro: Livro) => void;
  onSubmit: () => void;
}

export function LivroForm({ livro, setLivro, onSubmit }: Props) {
  return (
    <div className="grid gap-2 mb-4">
      <input
        type="text"
        placeholder="Título"
        value={livro.titulo}
        onChange={(e) => setLivro({ ...livro, titulo: e.target.value })}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Autor"
        value={livro.autor}
        onChange={(e) => setLivro({ ...livro, autor: e.target.value })}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="URL da imagem"
        value={livro.imagem}
        onChange={(e) => setLivro({ ...livro, imagem: e.target.value })}
        className="p-2 border rounded"
      />
      <button onClick={onSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
        Adicionar Livro
      </button>
    </div>
  );
}
