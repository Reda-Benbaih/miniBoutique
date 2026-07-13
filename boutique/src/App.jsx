import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import CategoryFilter from './components/CategoryFilter/CategoryFilter'
import ProductList from './components/ProductList/ProductList'
import Cart from './components/Cart/Cart'
import initialProducts from './components/data/products.json'

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  // Fetch data from json
  const categories = ['Toutes', ...new Set(initialProducts.map(p => p.category))];

  // Action
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };

  // Ffilter
  const filteredProducts = selectedCategory === 'Toutes'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <>
      <Navbar cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      <main className="main-content">
        
        <div className="shop-content">        <input type="text" onChange={handleChange} />
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <ProductList 
            products={filteredProducts} 
            onAddToCart={handleAddToCart}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>

        <aside className="cart-container">
          <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
        </aside>

      </main>
    </>
  )
}

export default App