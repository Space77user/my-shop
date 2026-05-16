import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

function OrderForm({ onClose }) {
    const { cart, getTotalPrice, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const orderData = {
                customer: formData,
                items: cart.map(item => ({
                    productId: item.product._id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity
                })),
                total: getTotalPrice()
            };

            await axios.post('/api/orders', orderData);
            setMessage(' Заказ оформлен!');
            clearCart();
            
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            setMessage(' Ошибка Попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="order-form-overlay">
            <div className="order-form">
                <h3>Оформление заказа</h3>
                <button className="close-form" onClick={onClose}>✕</button>
                
                {message && <div className="order-message">{message}</div>}
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Имя"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Телефон"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="address"
                        placeholder="Адрес доставки"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows="3"
                    />
                    <div className="order-total">
                        Итого: {getTotalPrice()} ₽
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Отправка...' : 'Подтвердить заказ'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default OrderForm;