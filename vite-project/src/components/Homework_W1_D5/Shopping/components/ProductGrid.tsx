// ProductGrid.tsx
import React from 'react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

export const ProductGrid: React.FC = () => {
  return (
    <div className={styles.productGrid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};