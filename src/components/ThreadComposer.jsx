import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function ThreadComposer({ onCreate, availableTags }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tag, setTag] = useState(availableTags[0] || 'Ролевка');
  const [content, setContent] = useState('');

  const canPost = title.trim() && author.trim() && content.trim();

  const handlePost = () => {
    if (!canPost) return;
    onCreate({ title, author, tag, content });
    setTitle('');
    setAuthor('');
    setContent('');
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <h2 className="text-zinc-100 font-semibold">Создать тему</h2>
        <span className="text-xs text-zinc-400">Поделитесь историей из Зоны</span>
      </div>
      <div className="p-4 grid gap-3">
        <div className="grid md:grid-cols-2 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-zinc-800/60 border border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-400/40 focus:border-lime-400/40"
            placeholder="Заголовок темы"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-zinc-800/60 border border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-400/40 focus:border-lime-400/40"
              placeholder="Ник автора"
            />
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-zinc-800/60 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-lime-400/40 focus:border-lime-400/40"
            >
              {(availableTags.length ? availableTags : ['Ролевка','Обсуждение','Гайды']).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 rounded-md bg-zinc-800/60 border border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-400/40 focus:border-lime-400/40"
          placeholder="Текст вашей истории, объявления или вопроса..."
        />
        <div className="flex justify-end">
          <button
            disabled={!canPost}
            onClick={handlePost}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
              canPost
                ? 'bg-lime-500/20 border-lime-500/40 text-lime-200 hover:bg-lime-500/30'
                : 'bg-zinc-800/60 border-zinc-700 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <Plus size={16} /> Опубликовать
          </button>
        </div>
      </div>
    </div>
  );
}
