import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function CartDrawer({ isOpen, items = [], subtotal = 0, onClose, onInc, onDec, onRemove }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l bg-white shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 hover:bg-zinc-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="p-6 text-sm text-zinc-500">Your cart is empty.</div>
            ) : (
              <div className="flex h-[calc(100%-64px)] flex-col">
                <ul className="flex-1 divide-y">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3 p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="text-xs text-zinc-500">{formatter.format(item.price)}</div>
                          </div>
                          <button
                            onClick={() => onRemove?.(item.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-50"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 inline-flex w-max items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1">
                          <button
                            className="rounded-full p-1 text-zinc-700 transition hover:bg-white"
                            onClick={() => onDec?.(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[2ch] text-center text-sm">{item.quantity}</span>
                          <button
                            className="rounded-full p-1 text-zinc-700 transition hover:bg-white"
                            onClick={() => onInc?.(item.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="font-semibold">{formatter.format(subtotal)}</span>
                  </div>
                  <button
                    onClick={() => alert('Checkout flow is mocked for this demo')}
                    className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
