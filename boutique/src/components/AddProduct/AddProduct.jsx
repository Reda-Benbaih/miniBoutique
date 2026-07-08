import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css'; 

// Définition du schéma de validation avec Yup
const productSchema = yup.object().shape({
  name: yup.string().required("Le nom du produit est obligatoire."),
  price: yup.number()
    .transform((value, originalValue) => originalValue === "" ? undefined : value)
    .typeError("Le prix doit être un nombre.")
    .positive("Le prix doit être supérieur à 0.")
    .required("Le prix est obligatoire."),
  category: yup.string().required("La catégorie est obligatoire."),
  image: yup.string().url("L'URL de l'image n'est pas valide.").required("L'URL de l'image est obligatoire.")
});

const AddProduct = ({ onAddProduct }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema)
  });

  const onSubmit = (data) => {
    // Générer un ID unique pour le nouveau produit
    const newProduct = {
      id: Date.now(),
      ...data
    };
    
    onAddProduct(newProduct);
    // Redirection automatique vers la page d'accueil (catalogue)
    navigate('/');
  };

  return (
    <div className="add-product-container">
      <h2>Ajouter un Nouveau Produit</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
        
        <div className="form-group">
          <label>Nom du produit</label>
          <input type="text" {...register('name')} />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Prix (€)</label>
          <input type="number" step="0.01" {...register('price')} />
          {errors.price && <p className="error-message">{errors.price.message}</p>}
        </div>

        <div className="form-group">
          <label>Catégorie</label>
          <input type="text" {...register('category')} />
          {errors.category && <p className="error-message">{errors.category.message}</p>}
        </div>

        <div className="form-group">
          <label>URL de l'image</label>
          <input type="text" {...register('image')} />
          {errors.image && <p className="error-message">{errors.image.message}</p>}
        </div>

        <button type="submit" className="btn-submit">Ajouter au catalogue</button>
      </form>
    </div>
  );
};

export default AddProduct;