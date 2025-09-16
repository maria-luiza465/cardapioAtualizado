import React, { useState } from 'react';
import { CreditCard, DollarSign, Smartphone, QrCode } from 'lucide-react';
import { CartItem, CustomerInfo, Page } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  onPlaceOrder: (customerInfo: CustomerInfo, paymentMethod: 'card' | 'cash' | 'pix') => void;
  setCurrentPage: (page: Page) => void;
}

export function Checkout({ cartItems, onPlaceOrder, setCurrentPage }: CheckoutProps) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'pix'>('card');
  const [showPixQR, setShowPixQR] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'pix') {
      setShowPixQR(true);
    } else {
      onPlaceOrder(customerInfo, paymentMethod);
      setCurrentPage('confirmation');
    }
  };

  const handlePixConfirm = () => {
    onPlaceOrder(customerInfo, paymentMethod);
    setCurrentPage('confirmation');
  };

  if (showPixQR) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Pagamento PIX</h2>
          
          <div className="bg-gray-100 p-8 rounded-lg mb-6">
            <QrCode className="h-32 w-32 mx-auto mb-4 text-gray-600" />
            <p className="text-sm text-gray-600 mb-2">Escaneie o QR Code com seu app bancário</p>
            <p className="font-semibold text-amber-900">Chave PIX: ge.bolos@email.com</p>
            <p className="font-semibold text-amber-900">Favorecido: Ge Bolos Gourmet</p>
            <p className="text-lg font-bold text-rose-600 mt-4">
              Valor: R$ {total.toFixed(2)}
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowPixQR(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={handlePixConfirm}
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Confirmar Pagamento
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-amber-900 mb-8">Finalizar Compra</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resumo do Pedido */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-amber-900 mb-4">Resumo do Pedido</h3>
          
          <div className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold text-rose-600">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-amber-900 mb-6">Dados de Entrega</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input
                type="text"
                required
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                type="tel"
                required
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço de Entrega</label>
              <textarea
                required
                rows={3}
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Forma de Pagamento</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center space-y-2 transition-colors ${
                    paymentMethod === 'card' 
                      ? 'border-rose-500 bg-rose-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="h-6 w-6" />
                  <span className="text-sm font-medium">Cartão</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center space-y-2 transition-colors ${
                    paymentMethod === 'cash' 
                      ? 'border-rose-500 bg-rose-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <DollarSign className="h-6 w-6" />
                  <span className="text-sm font-medium">Dinheiro</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center space-y-2 transition-colors ${
                    paymentMethod === 'pix' 
                      ? 'border-rose-500 bg-rose-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="h-6 w-6" />
                  <span className="text-sm font-medium">PIX</span>
                </button>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={() => setCurrentPage('cart')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
              >
                Voltar ao Carrinho
              </button>
              <button
                type="submit"
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {paymentMethod === 'pix' ? 'Gerar PIX' : 'Confirmar Pedido'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}