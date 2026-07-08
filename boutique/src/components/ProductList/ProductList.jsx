import './ProductList.css';

const ProductList = ({ products, onAddToCart, onDeleteProduct }) => {
  if (products.length === 0) {
    return <p className="product-list-empty">Aucun produit disponible.</p>;
  }

  return (
    <div className="product-list-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3 className="product-title">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <p className="product-price">{product.price.toFixed(2)} €</p>
          
          <div className="product-actions">
            <button 
              onClick={() => onAddToCart(product)}
              className="btn-add-to-cart"
            >
              Ajouter au panier
            </button>
            <button 
              onClick={() => onDeleteProduct(product.id)}
              className="btn-delete-product"
            >
              Supprimer du catalogue
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;