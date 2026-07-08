import './Cart.css';

const Cart = ({ cart, onRemoveFromCart }) => {
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalss = cart.length;
  return (
    <div className="cart-container">
      <h2 className="cart-title">
        Mon Panier ({totalss})
      </h2>
      
      {cart.length === 0 ? (
        <p className="cart-empty-msg">Le panier est vide.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <div>
                  <span className="cart-item-name">{item.name}</span>
                  <div className="cart-item-details">{item.price} € x {item.quantity}</div>
                </div>
                <button 
                  onClick={() => onRemoveFromCart(item.id)}
                  className="btn-remove-item"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          
          <div className="cart-total-container">
            <span>Montant Total :</span>
            <span className="cart-total-price">{totalPrice.toFixed(2)} €</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;