import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { ConfirmationPage } from './components/ConfirmationPage';
import { Admin } from './components/Admin';
import { products as initialProducts } from './data/products';
import { Product, CartItem, Order, CustomerInfo, Page } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bakery-cart');
    const savedOrders = localStorage.getItem('bakery-orders');
    const savedProducts = localStorage.getItem('bakery-products');

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      setOrders(parsedOrders.map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt)
      })));
    }
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bakery-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bakery-orders', JSON.stringify(orders));
  }, [orders]);

  // Save products to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bakery-products', JSON.stringify(products));
  }, [products]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const placeOrder = (customerInfo: CustomerInfo, paymentMethod: 'card' | 'cash' | 'pix') => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...cartItems],
      total,
      customer: customerInfo,
      status: 'pending',
      createdAt: new Date(),
      paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const removeProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartItemCount={cartItemCount}
      />

      {currentPage === 'home' && (
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Delícias Artesanais
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sabores únicos preparados com ingredientes selecionados e muito carinho. 
              Cada doce é uma experiência especial para momentos inesquecíveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </main>
      )}

      {currentPage === 'cart' && (
        <Cart
          cartItems={cartItems}
          updateCartItemQuantity={updateCartItemQuantity}
          removeFromCart={removeFromCart}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'checkout' && (
        <Checkout
          cartItems={cartItems}
          onPlaceOrder={placeOrder}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'confirmation' && (
        <ConfirmationPage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'admin' && (
        <Admin
          orders={orders}
          products={products}
          updateOrderStatus={updateOrderStatus}
          addProduct={addProduct}
          removeProduct={removeProduct}
        />
      )}
    </div>
  );
}

export default App;