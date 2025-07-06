import React from "react";
import type { Product } from "../types/Product";
import { useCart } from "./CartContext";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number): string => {
  return price.toLocaleString("vi-VN") + " ₫";
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity === 0) {
      addToCart(product);
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };

  return (
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "contain", 
          borderRadius: "6px",
          marginBottom: "1rem",
          backgroundColor: "#ffffff", 
        }}
      />

      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <div className={styles.productPrice}>{formatPrice(product.price)}</div>
      </div>
      <div className={styles.productActions}>
        <div className={styles.quantitySelector}>
          <button
            onClick={handleDecrease}
            className={styles.quantityBtn}
            disabled={quantity === 0}
          >
            -
          </button>
          <span className={styles.quantityDisplay}>{quantity}</span>
          <button onClick={handleIncrease} className={styles.quantityBtn}>
            +
          </button>
        </div>
        {quantity === 0 && (
          <button
            onClick={() => addToCart(product)}
            className={styles.addToCartBtn}
          >
            Thêm vào giỏ hàng
          </button>
        )}
      </div>
    </div>
  );
};
