import React from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <div className="product-image">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} />
                ) : (
                    <div className="no-image">Нет фото</div>
                )}
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-price">{product.price} ₽</div>
            <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
            >
                В корзину
            </button>
        </div>
    );
}

export default ProductCard;