import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, useCart } from './contexts/CartContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './styles/App.css';

function Header() {
    const { getItemCount } = useCart();
    const itemCount = getItemCount();

    return (
        <header className="app-header">
            <h1 className="app-title">🛍️ Мой магазин</h1>
            <nav className="app-nav">
                <Link to="/" className="nav-link">Каталог</Link>
                <Link to="/cart" className="cart-icon">
                    🛒 Корзина 
                    {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                </Link>
            </nav>
        </header>
    );
}

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <div className="app-container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;