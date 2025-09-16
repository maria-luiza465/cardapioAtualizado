import React from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem, Page } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateCartItemQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  setCurrentPage: (page: Page) => void;
}

export function Cart({ cartItems, updateCartItemQuantity, removeFromCart, setCurrentPage }: CartProps) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Carrinho vazio</h3>
          <p className="mt-1 text-gray-500">Adicione alguns produtos deliciosos ao seu carrinho!</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="mt-6 bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-amber-900 mb-8">Meu Carrinho</h2>

      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-900">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="text-lg font-bold text-rose-600">R$ {item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateCartItemQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              
              <button
                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-amber-900">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-cream-100 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold text-amber-900">Total:</span>
          <span className="text-2xl font-bold text-rose-600">R$ {total.toFixed(2)}</span>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
          >
            Continuar Comprando
          </button>
          
          <button
            onClick={() => setCurrentPage('checkout')}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}