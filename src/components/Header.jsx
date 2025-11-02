import { useState } from 'react';
import { Search, User, Home } from 'lucide-react';

export default function Header({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 bg-zinc-900/80 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-green-500 via-lime-400 to-emerald-500 shadow-md flex items-center justify-center text-zinc-900 font-black">
            S
          </div>
          <div className="leading-tight">
            <p className="text-sm text-zinc-300">The Zone Forum</p>
            <h1 className="text-lg font-semibold text-zinc-100 tracking-wide">S.T.A.L.K.E.R RP</h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-3 ml-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-800/70 text-zinc-300 text-sm"><Home size={16}/> Главная</span>
        </nav>

        <form onSubmit={handleSubmit} className="ml-auto flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Искать темы, авторов, фракции..."
              className="w-full pl-9 pr-3 py-2 rounded-md bg-zinc-800/60 border border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-400/40 focus:border-lime-400/40"
            />
          </div>
        </form>

        <button className="ml-4 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-800/70 border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition-colors">
          <User size={16} /> Войти
        </button>
      </div>
    </header>
  );
}
