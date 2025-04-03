import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LivroCard } from "../components/LivroCard";
import { LivroForm } from "../components/LivroForm";
import { collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../services/firebase";

interface Livro {
  id: string;
  titulo: string;
  autor: string;
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
    imagem: "",
    criadoPor: currentUser || "desconhecido",
  });

  useEffect(() => {
    async function fetchLivros() {
      const snapshot = await getDocs(collection(db, "livros"));
      const livrosDB = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as Livro[];
      setLivros(livrosDB);
    }

    fetchLivros();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adicionarLivro = async () => {
    if (!novoLivro.titulo || !novoLivro.autor || !novoLivro.imagem) {
      alert("Preencha todos os campos!");
      return;
    }

    const livroParaSalvar = {
      ...novoLivro,
      criadoPor: currentUser || "desconhecido",
    };

    const docRef = await addDoc(collection(db, "livros"), livroParaSalvar);
    setLivros([...livros, { ...livroParaSalvar, id: docRef.id }]);

    setNovoLivro({
      titulo: "",
      autor: "",
      imagem: "",
      criadoPor: currentUser || "desconhecido",
    });
  };

  const excluirLivro = async (id: string) => {
    await deleteDoc(doc(db, "livros", id));
    setLivros(livros.filter((livro) => livro.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="flex justify-between items-center px-6 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold tracking-tight">📖 Painel de Administração</h2>
        <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
          Sair
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <LivroForm livro={novoLivro} setLivro={setNovoLivro} onSubmit={adicionarLivro} />

        <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3">
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
