import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Page } from '../types';

interface ConfirmationPageProps {
  setCurrentPage: (page: Page) => void;
}

export function ConfirmationPage({ setCurrentPage }: ConfirmationPageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage('home');
    }, 5000);

    return () => clearTimeout(timer);
  }, [setCurrentPage]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          Pedido Confirmado!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Seu pedido foi recebido com sucesso e será preparado com muito carinho. 
          Em breve entraremos em contato para confirmar os detalhes da entrega.
        </p>
        
        <p className="text-sm text-gray-500 mb-8">
          Você será redirecionado automaticamente em alguns segundos...
        </p>
        
        <button
          onClick={() => setCurrentPage('home')}
          className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Continuar Navegando
        </button>
      </div>
    </div>
  );
}