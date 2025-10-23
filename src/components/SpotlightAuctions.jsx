import { useEffect, useMemo, useState } from 'react';
import { Clock, Heart, Plus, Minus } from 'lucide-react';

function useCountdown(endTime) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = Math.max(0, endTime - now);
  const time = useMemo(() => {
    const sec = Math.floor(remaining / 1000);
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return { h, m, s };
  }, [remaining]);
  return time;
}

export default function SpotlightAuctions({ items = [] }) {
  const [bids, setBids] = useState(() => Object.fromEntries(items.map((i) => [i.id, i.currentBid])));
  const [qty, setQty] = useState(() => Object.fromEntries(items.map((i) => [i.id, 1])));
  const [liked, setLiked] = useState(() => Object.fromEntries(items.map((i) => [i.id, false])));

  const placeBid = (id) => {
    setBids((prev) => ({ ...prev, [id]: Math.round((prev[id] + 10) * 100) / 100 }));
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const time = useCountdown(item.endTime);
        return (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-zinc-700 shadow-sm">
                <Clock className="h-3.5 w-3.5" />
                {String(time.h).padStart(2, '0')}:{String(time.m).padStart(2, '0')}:{String(time.s).padStart(2, '0')}
              </div>
              <button
                onClick={() => setLiked((p) => ({ ...p, [item.id]: !p[item.id] }))}
                aria-label="like"
                className={`absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm transition ${
                  liked[item.id] ? 'text-rose-600' : ''
                }`}
              >
                <Heart className={`h-4 w-4 ${liked[item.id] ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold leading-tight tracking-tight">{item.name}</h3>
                  <p className="text-xs text-zinc-500">Limited edition — Auction live</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-500">Current bid</div>
                  <div className="text-lg font-semibold">${bids[item.id].toFixed(0)}</div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1">
                  <button
                    className="rounded-full p-1 text-zinc-700 transition hover:bg-white"
                    onClick={() => setQty((p) => ({ ...p, [item.id]: Math.max(1, p[item.id] - 1) }))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[2ch] text-center text-sm">{qty[item.id]}</span>
                  <button
                    className="rounded-full p-1 text-zinc-700 transition hover:bg-white"
                    onClick={() => setQty((p) => ({ ...p, [item.id]: p[item.id] + 1 }))}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => placeBid(item.id)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99]"
                >
                  Place Bid +$10
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
