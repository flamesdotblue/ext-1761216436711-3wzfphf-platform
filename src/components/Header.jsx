import { ShoppingCart, Search, Star } from 'lucide-react';

export default function Header({ cartCount = 0, onCartToggle }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-900 text-white">
              <Star className="h-5 w-5" />
            </div>
            <span className="font-semibold tracking-tight">SneakPeak</span>
          </div>

          <div className="hidden flex-1 items-center justify-center sm:flex">
            <div className="relative w-full max-w-lg">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search sneakers, brands, colors..."
                className="w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 py-2 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onCartToggle}
              className="relative inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:border-zinc-300 active:scale-[0.99]"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
