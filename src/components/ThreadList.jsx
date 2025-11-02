import { MessageSquare } from 'lucide-react';

function ThreadCard({ thread }) {
  return (
    <div className="group rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 transition-colors overflow-hidden">
      <div className="p-5 flex items-start gap-4">
        <div className="h-10 w-10 rounded-md bg-gradient-to-br from-lime-400 to-emerald-500 text-zinc-900 font-bold flex items-center justify-center shadow-md">
          {thread.author.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-lime-500/15 border border-lime-400/30 text-lime-300 text-xs font-medium">{thread.tag}</span>
            <h3 className="text-zinc-100 font-semibold text-lg truncate">{thread.title}</h3>
          </div>
          <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{thread.content}</p>
          <div className="mt-3 flex items-center gap-3 text-xs text-zinc-400">
            <span>Автор: <span className="text-zinc-300">{thread.author}</span></span>
            <span>•</span>
            <span>{new Date(thread.lastReplyAt).toLocaleString()}</span>
          </div>
        </div>
        <div className="ml-auto shrink-0 text-zinc-300 flex items-center gap-1">
          <MessageSquare size={16} className="text-zinc-400" />
          <span className="text-sm">{thread.replies}</span>
        </div>
      </div>
    </div>
  );
}

export default function ThreadList({ threads }) {
  if (!threads.length) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-10 text-center">
        <p className="text-zinc-300">Тем не найдено. Попробуйте изменить фильтры или создать новую тему.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {threads.map((t) => (
        <ThreadCard key={t.id} thread={t} />
      ))}
    </div>
  );
}
