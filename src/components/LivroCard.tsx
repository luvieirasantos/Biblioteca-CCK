interface Livro {
  id: string;
  titulo: string;
  autor: string;
  imagem: string;
  criadoPor?: string;
}

interface Props {
  livro: Livro;
  onDelete?: (id: string) => void;
}

export function LivroCard({ livro, onDelete }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-md flex gap-4">
      <img
        src={livro.imagem}
        alt={livro.titulo}
        className="w-24 h-32 object-cover rounded-lg border border-gray-300"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{livro.titulo}</h3>
          <p className="text-sm text-gray-600">Autor: {livro.autor}</p>
          {livro.criadoPor && (
            <p className="text-xs text-gray-400 mt-1">Adicionado por: {livro.criadoPor}</p>
          )}
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(livro.id)}
            className="text-xs mt-2 self-start text-red-500 hover:underline"
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
}
