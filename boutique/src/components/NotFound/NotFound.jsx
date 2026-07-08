import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Non Trouvée</h1>
      <p>Désolé, la page que vous recherchez n'existe pas.</p>
      <Link to="/" style={{ color: '#ff3333', textDecoration: 'underline' }}>
        Retourner à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;