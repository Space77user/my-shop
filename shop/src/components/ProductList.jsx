import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import '../styles/ProductList.css'


function ProductList() {
    const [products, setProducts] = useState([]);    
    const [loading, setLoading] = useState(true);    
    const [error, setError] = useState(null);        

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data.data);
                setError(null);
            } catch (err) {
                setError('Не удалось загрузить товары');
                console.error('Ошибка загрузки:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="loading-state">Загрузка товаров...</div>;
    }

    if (error) {
        return <div className="error-state">Ошибка: {error}</div>;
    }

    if (products.length === 0) {
        return <div className="empty-state">Товаров пока нет</div>;
    }

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">Наши товары</h2>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard 
                        key={product._id} 
                        product={product} 
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
