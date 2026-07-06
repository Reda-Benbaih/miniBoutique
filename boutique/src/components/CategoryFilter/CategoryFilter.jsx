import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter-container">
      <label className="category-filter-label">Filtrer par catégorie : </label>
      <select 
        value={selectedCategory} 
        onChange={(e) => onSelectCategory(e.target.value)}
        className="category-filter-select"
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;