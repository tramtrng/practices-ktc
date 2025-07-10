import React from 'react';
import { useCart } from './CartContext';
import styles from './CartDropdown.module.css';

interface CartDropdownProps {
  isOpen: boolean;
}

const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN') + ' ₫';
};

export const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className={styles.cartDropdown}>
      <div className={styles.cartDropdownHeader}>
        <h3>Giỏ hàng của bạn</h3>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.cartEmpty}> 
          <p>Giỏ hàng trống</p>
        </div>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginRight: '1rem'
                  }}
                />
                <div className={styles.cartItemInfo}>
                  <h4>{item.name}</h4>
                  <div className={styles.cartItemPrice}>
                    {formatPrice(item.price)} x {item.quantity}
                  </div>
                </div>
                <div className={styles.cartItemControls}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={styles.quantityBtn}>
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={styles.quantityBtn}>
                    +
                  </button>
                  <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartTotal}>
            <div className={styles.totalPrice}>
              <strong>Tổng cộng: {formatPrice(getTotalPrice())}</strong>
            </div>
            <button className={styles.viewCartBtn}>Xem giỏ hàng</button>
          </div>
        </>
      )}
    </div>
  );
};
