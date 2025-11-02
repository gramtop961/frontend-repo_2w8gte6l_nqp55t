import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import ThreadList from './components/ThreadList.jsx';
import ThreadComposer from './components/ThreadComposer.jsx';

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [threads, setThreads] = useState(() => [
    {
      id: crypto.randomUUID(),
      title: 'Первый выход к Гарду: нашли артефакт «Медуза»',
      author: 'Лис',
      tag: 'Ролевка',
      content:
        'Отчёт группы: вышли на кордон через рассветный туман. Нейтрализовали двух слепых псов. На старом бетонном блоке, у облучённой берёзки, засветился артефакт. Добыча чистая, без радиофона. Кому сдаём?',
      replies: 12,
      views: 340,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
      lastReplyAt: Date.now() - 1000 * 60 * 37,
    },
    {
      id: crypto.randomUUID(),
      title: 'Гайд: как пройти Аномальную Рощу после выброса',
      author: 'Сова',
      tag: 'Гайды',
      content:
        'После выброса тропы сдвигаются. Держитесь правого ряда бетонных шпал, считайте до восьми, потом шаг влево. Маркеры: рваная сетка, ржавый бочонок, трещина в плите. Не бегите — только шаг.',
      replies: 4,
      views: 129,
      createdAt: Date.now() - 1000 * 60 * 60 * 8,
      lastReplyAt: Date.now() - 1000 * 60 * 20,
    },
    {
      id: crypto.randomUUID(),
      title: 'Обсуждение: чьи частоты слушают на Свалке?',
      author: 'Крот',
      tag: 'Обсуждение',
      content:
        'Кто на каких диапазонах сидит после последних рейдов? Похоже, «Долг» сменили ключи. Делимся наблюдениями без палевы.',
      replies: 23,
      views: 512,
      createdAt: Date.now() - 1000 * 60 * 60 * 36,
      lastReplyAt: Date.now() - 1000 * 60 * 5,
    },
    {
      id: crypto.randomUUID(),
      title: 'Монолит у Болот? Встретили странников в чёрном',
      author: 'Ворон',
      tag: 'Слухи',
      content:
        'На подступах к Болотам двое в чёрных плащах, тихие, с северным акцентом. Метки не заметил. Возможен выход «Монолита» к югу. Кто подтверждает?',
      replies: 9,
      views: 221,
      createdAt: Date.now() - 1000 * 60 * 60 * 18,
      lastReplyAt: Date.now() - 1000 * 60 * 55,
    },
  ]);

  const allTags = useMemo(() => {
    const set = new Set(threads.map((t) => t.tag));
    return Array.from(set);
  }, [threads]);

  const visibleThreads = useMemo(() => {
    return threads
      .filter((t) =>
        [t.title, t.author, t.tag, t.content].join(' ').toLowerCase().includes(search.toLowerCase()),
      )
      .filter((t) => (selectedTag ? t.tag === selectedTag : true))
      .sort((a, b) => b.lastReplyAt - a.lastReplyAt);
  }, [threads, search, selectedTag]);

  const handleCreate = ({ title, author, tag, content }) => {
    const now = Date.now();
    const newThread = {
      id: crypto.randomUUID(),
      title,
      author,
      tag,
      content,
      replies: 0,
      views: 0,
      createdAt: now,
      lastReplyAt: now,
    };
    setThreads((prev) => [newThread, ...prev]);
    if (!allTags.includes(tag)) {
      // Trigger recompute by changing state; tags list uses threads state
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* Glow background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-lime-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <Header onSearch={setSearch} />

      <main className="relative z-0 max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-[16rem,1fr] gap-6">
        <Sidebar tags={allTags} selectedTag={selectedTag} onSelectTag={setSelectedTag} />

        <section className="space-y-6">
          <ThreadComposer onCreate={handleCreate} availableTags={allTags} />

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-100">Последние темы</h2>
            <span className="text-sm text-zinc-400">Найдено: {visibleThreads.length}</span>
          </div>

          <ThreadList threads={visibleThreads} />
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-sm text-zinc-500">
        Сделано для роли по мотивам S.T.A.L.K.E.R — берегите себя в Зоне.
      </footer>
    </div>
  );
}
