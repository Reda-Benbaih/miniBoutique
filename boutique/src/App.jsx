import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Ajout du Router
import './App.css'
import Navbar from './components/Navbar/Navbar'
import CategoryFilter from './components/CategoryFilter/CategoryFilter'
import ProductList from './components/ProductList/ProductList'
import Cart from './components/Cart/Cart'
import AddProduct from './components/AddProduct/AddProduct' // Ajout de la page d'ajout
import NotFound from './components/NotFound/NotFound' // Ajout de la page 404
import initialProducts from './components/data/products.json'

function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  // Fetch data from json
  const categories = ['Toutes', ...new Set(initialProducts.map(p => p.category))];

  // Actions
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


  const handleAddProduct = (newProduct) => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  // Filtrage combiné 
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Toutes' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      
      <Routes>
        <Route path="/" element={
          <main className="main-content">
            <div className="shop-content">
              <input 
                type="text" 
                placeholder="Rechercher un produit..." 
                value={search} 
                onChange={handleChange} 
              />
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
        } />

        <Route path="/add-product" element={
          <AddProduct onAddProduct={handleAddProduct} />
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App