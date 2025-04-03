export function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-8 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h2 className="text-lg font-semibold">Centro Cultural Kalunguinha</h2>
          <p className="text-sm text-gray-400 mt-1">Construindo pontes através da leitura 📖</p>
        </div>

        <div className="text-sm">
          <p className="mb-1">📧 contato@kalunguinha.org</p>
          <p className="mb-1">📞 (11) 99999-0000</p>
          <p>📸 <a href="https://instagram.com/centroculturalkalunguinha" target="_blank" className="underline hover:opacity-80">@centroculturalkalunguinha</a></p>
        </div>
      </div>
    </footer>
  );
}
