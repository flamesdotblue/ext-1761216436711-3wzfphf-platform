import { Plus } from 'lucide-react';

export default function SneakerGrid({ products = [], onAddToCart }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <div
          key={p.id}
          className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={p.image}
              alt={p.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-zinc-700 shadow-sm">
              In stock
            </div>
          </div>
          <div className="space-y-3 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold leading-tight tracking-tight">{p.name}</h3>
                <p className="text-xs text-zinc-500">Men/Women • Multiple colors</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-zinc-500">Price</div>
                <div className="text-lg font-semibold">${p.price.toFixed(0)}</div>
              </div>
            </div>
            <button
              onClick={() => onAddToCart?.(p)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-white active:scale-[0.99]"
            >
              <Plus className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
