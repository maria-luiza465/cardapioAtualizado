import React from 'react';
import { ShoppingCart, Shield } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartItemCount: number;
}

export function Header({ currentPage, setCurrentPage, cartItemCount }: HeaderProps) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <img 
              src="/849297ce-29f4-4481-adcb-9154ffa3b5f3.webp" 
              alt="Ge Bolos Gourmet" 
              className="h-16 w-16 mr-3"
            />
            <div>
              <h1 className="text-2xl font-bold text-amber-900">Ge Bolos Gourmet</h1>
              <p className="text-sm text-rose-600">Confeitaria Artesanal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`text-lg font-medium transition-colors ${
                currentPage === 'home' 
                  ? 'text-rose-600' 
                  : 'text-amber-900 hover:text-rose-600'
              }`}
            >
              Produtos
            </button>

            <button
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 text-amber-900 hover:text-rose-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentPage('admin')}
              className="p-2 text-amber-900 hover:text-rose-600 transition-colors"
            >
              <Shield className="h-6 w-6" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}