interface Livro {
  id: number;
  titulo: string;
  autor: string;
  imagem: string;
}

interface Props {
  livro: Livro;
  onDelete?: (id: number) => void;
}

export function LivroCard({ livro, onDelete }: Props) {
  return (
    <div className="flex gap-4 items-center border p-4 rounded shadow">
      <img src={livro.imagem} alt={livro.titulo} className="w-20 h-28 object-cover rounded" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{livro.titulo}</h3>
        <p className="text-gray-600">Autor: {livro.autor}</p>
      </div>
      {onDelete && (
        <button onClick={() => onDelete(livro.id)} className="text-red-500 text-sm">
          Excluir
        </button>
      )}
    </div>
  );
}
