import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { Order, Product } from '../types';

interface AdminProps {
  orders: Order[];
  products: Product[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (productId: string) => void;
}

export function Admin({ orders, products, updateOrderStatus, addProduct, removeProduct }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    image: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const statusColumns = [
    { status: 'pending', title: 'Novos Pedidos', color: 'bg-yellow-100 border-yellow-300' },
    { status: 'accepted', title: 'Aceitos', color: 'bg-blue-100 border-blue-300' },
    { status: 'preparing', title: 'Preparando', color: 'bg-orange-100 border-orange-300' },
    { status: 'delivery', title: 'Entrega', color: 'bg-purple-100 border-purple-300' },
    { status: 'completed', title: 'Concluídos', color: 'bg-green-100 border-green-300' }
  ];

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price > 0) {
      addProduct(newProduct);
      setNewProduct({ name: '', description: '', price: 0, image: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-amber-900 mb-8">Painel Administrativo</h2>

      {/* Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'orders'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Gerenciar Pedidos
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'products'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Gerenciar Produtos
          </button>
        </nav>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {statusColumns.map((column) => (
            <div key={column.status} className={`rounded-lg border-2 ${column.color} p-4`}>
              <h3 className="font-semibold text-gray-800 mb-4">{column.title}</h3>
              <div className="space-y-3">
                {orders
                  .filter((order) => order.status === column.status)
                  .map((order) => (
                    <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">#{order.id.slice(-6)}</span>
                        <span className="text-sm font-bold text-rose-600">
                          R$ {order.total.toFixed(2)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{order.customer.name}</p>
                      <p className="text-xs text-gray-500 mb-3">{order.customer.phone}</p>
                      
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-xs text-gray-600">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 space-y-1">
                        {column.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'accepted')}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 rounded transition-colors"
                          >
                            Aceitar
                          </button>
                        )}
                        {column.status === 'accepted' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-1 rounded transition-colors"
                          >
                            Preparar
                          </button>
                        )}
                        {column.status === 'preparing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivery')}
                            className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs py-1 rounded transition-colors"
                          >
                            Entregar
                          </button>
                        )}
                        {column.status === 'delivery' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className="w-full bg-green-500 hover:bg-green-600 text-white text-xs py-1 rounded transition-colors"
                          >
                            Concluir
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                
                {orders.filter((order) => order.status === column.status).length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-8">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    Nenhum pedido
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-amber-900">Produtos</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Adicionar Produto</span>
            </button>
          </div>

          {showAddForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h4 className="text-lg font-semibold text-amber-900 mb-4">Novo Produto</h4>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea
                    required
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                  <input
                    type="url"
                    required
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="md:col-span-2 flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-amber-900 mb-1">{product.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-rose-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="text-red-500 hover:text-red-700 p-1 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}