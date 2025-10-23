import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import SpotlightAuctions from './components/SpotlightAuctions.jsx';
import SneakerGrid from './components/SneakerGrid.jsx';
import CartDrawer from './components/CartDrawer.jsx';

const initialSpotlight = [
  {
    id: 'sp1',
    name: 'AeroVolt Prototype',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400&auto=format&fit=crop',
    endTime: Date.now() + 1000 * 60 * 30, // 30 min
    currentBid: 420,
  },
  {
    id: 'sp2',
    name: 'Nebula Runner X',
    image:
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1400&auto=format&fit=crop',
    endTime: Date.now() + 1000 * 60 * 45 + 1000 * 15, // 45:15
    currentBid: 560,
  },
  {
    id: 'sp3',
    name: 'Monolith Prime',
    image:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1400&auto=format&fit=crop',
    endTime: Date.now() + 1000 * 60 * 12 + 1000 * 40, // 12:40
    currentBid: 310,
  },
];

const catalog = [
  {
    id: 'p1',
    name: 'Pulse Knit V2',
    price: 129,
    image:
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1400&auto=format&fit=crop',
  },
  {
    id: 'p2',
    name: 'Carbon Glide',
    price: 149,
    image:
      'https://images.unsplash.com/photo-1733510548153-59a6cfcce427?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDYXJib24lMjBHbGlkZXxlbnwwfDB8fHwxNzYxMjE2NTI0fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'p3',
    name: 'Flux Trail',
    price: 139,
    image:
      'https://images.unsplash.com/photo-1693876240473-98308c83182e?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGbHV4JTIwVHJhaWx8ZW58MHwwfHx8MTc2MTIxNjUyNHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 'p4',
    name: 'Orbit City',
    price: 119,
    image:
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1400&auto=format&fit=crop',
  },
  {
    id: 'p5',
    name: 'Nimbus Foam Pro',
    price: 159,
    image:
      'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?q=80&w=1400&auto=format&fit=crop',
  },
  {
    id: 'p6',
    name: 'Hyperlace 3',
    price: 139,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400&auto=format&fit=crop',
  },
];

export default function App() {
  const [spotlight] = useState(initialSpotlight);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const increment = (id) =>
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const decrement = (id) =>
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  const removeItem = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const cartCount = useMemo(() => cartItems.reduce((n, i) => n + i.quantity, 0), [cartItems]);
  const subtotal = useMemo(() => cartItems.reduce((n, i) => n + i.price * i.quantity, 0), [cartItems]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900">
      <Header cartCount={cartCount} onCartToggle={() => setCartOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Spotlight Auctions</h1>
              <p className="text-zinc-500">Bid on limited releases. Timers are live.</p>
            </div>
          </div>
          <div className="mt-6">
            <SpotlightAuctions items={spotlight} />
          </div>
        </section>

        <section className="py-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Shop the Collection</h2>
            <p className="text-sm text-zinc-500">Add to cart is available for these models</p>
          </div>
          <div className="mt-6">
            <SneakerGrid products={catalog} onAddToCart={addToCart} />
          </div>
        </section>
      </main>

      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        subtotal={subtotal}
        onClose={() => setCartOpen(false)}
        onInc={increment}
        onDec={decrement}
        onRemove={removeItem}
      />

      <footer className="border-t bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-zinc-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} SneakPeak — Crafted for demo purposes
        </div>
      </footer>
    </div>
  );
}
