import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import OrderForm from './OrderForm';
import '../styles/Cart.css';
import '../styles/OrderForm.css';

function Cart() {
    const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const [showOrderForm, setShowOrderForm] = useState(false);

    if (cart.length === 0) {
        return (
            <div className="cart-empty">
                <h2>🛒 Корзина пуста</h2>
                <p>Добавьте товары из каталога</p>
            </div>
        );
    }

    return (
        <div className="cart">
            <h2>Корзина</h2>
            <div className="cart-items">
                {cart.map(({ product, quantity }) => (
                    <div key={product._id} className="cart-item">
                        <div className="cart-item-image">
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.name} />
                            ) : (
                                <div className="no-image">🖼️</div>
                            )}
                        </div>
                        <div className="cart-item-info">
                            <h3>{product.name}</h3>
                            <p className="cart-item-price">{product.price} ₽</p>
                        </div>
                        <div className="cart-item-quantity">
                            <button 
                                onClick={() => updateQuantity(product._id, quantity - 1)}
                                className="quantity-btn"
                            >
                                −
                            </button>
                            <span className="quantity">{quantity}</span>
                            <button 
                                onClick={() => updateQuantity(product._id, quantity + 1)}
                                className="quantity-btn"
                            >
                                +
                            </button>
                        </div>
                        <div className="cart-item-total">
                            {product.price * quantity} ₽
                        </div>
                        <button 
                            onClick={() => removeFromCart(product._id)}
                            className="remove-btn"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            <div className="cart-footer">
                <div className="cart-total">
                    <span>Итого:</span>
                    <span className="total-price">{getTotalPrice()} ₽</span>
                </div>
                <div className="cart-actions">
                    <button onClick={clearCart} className="clear-btn">
                        Очистить корзину
                    </button>
                    <button 
                        className="checkout-btn"
                        onClick={() => setShowOrderForm(true)}
                    >
                        Оформить заказ
                    </button>
                </div>
            </div>
            
            {showOrderForm && (
                <OrderForm onClose={() => setShowOrderForm(false)} />
            )}
        </div>
    );
}

export default Cart;