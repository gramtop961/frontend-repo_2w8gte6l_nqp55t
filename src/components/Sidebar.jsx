import { Shield, Tag } from 'lucide-react';

export default function Sidebar({ tags, selectedTag, onSelectTag }) {
  const factions = [
    { name: 'Свобода', color: 'from-emerald-400 to-emerald-600' },
    { name: 'Долг', color: 'from-rose-400 to-rose-600' },
    { name: 'Наёмники', color: 'from-sky-400 to-blue-600' },
    { name: 'Монолит', color: 'from-indigo-400 to-indigo-700' },
    { name: 'Чистое Небо', color: 'from-cyan-400 to-teal-600' },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="space-y-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
          <div className="p-4 border-b border-zinc-800 flex items-center gap-2 text-zinc-200">
            <Shield size={18} /> Фракции
          </div>
          <div className="p-3 grid grid-cols-2 gap-2">
            {factions.map((f) => (
              <div key={f.name} className={`rounded-md p-3 text-center text-sm text-zinc-900 font-semibold bg-gradient-to-br ${f.color}`}>
                {f.name}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
          <div className="p-4 border-b border-zinc-800 flex items-center gap-2 text-zinc-200">
            <Tag size={18} /> Тематики
          </div>
          <div className="p-3 flex flex-wrap gap-2">
            <button
              onClick={() => onSelectTag(null)}
              className={`px-3 py-1.5 rounded-md text-sm border ${
                selectedTag === null ? 'bg-lime-500/20 border-lime-500/40 text-lime-300' : 'bg-zinc-800/60 border-zinc-700 text-zinc-300'
              }`}
            >
              Все
            </button>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => onSelectTag(t)}
                className={`px-3 py-1.5 rounded-md text-sm border ${
                  selectedTag === t ? 'bg-lime-500/20 border-lime-500/40 text-lime-300' : 'bg-zinc-800/60 border-zinc-700 text-zinc-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
