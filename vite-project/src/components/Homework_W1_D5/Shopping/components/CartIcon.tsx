import React from 'react';
import styles from './CartIcon.module.css';
import { useCart } from './CartContext';

interface CartIconProps {
  onClick: () => void;
}

export const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div className={styles.cartIcon} onClick={onClick}>
      <span className={styles.cartSymbol}>🛒</span>
      {totalItems > 0 && (
        <span className={styles.cartBadge}>{totalItems}</span>
      )}
    </div>
  );
};