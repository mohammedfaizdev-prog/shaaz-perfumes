// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaSearch,
    FaUser,
    FaShoppingCart,
    FaBars,
    FaTimes,
    FaHeart
} from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { useShop } from '../context/ShopContext';
import products from '../data/products';

const Header = () => {
    const { cartItems, getCartTotal, removeFromCart, updateQuantity, wishlistItems } = useShop();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    
    // Search states
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const searchRef = useRef(null);

    // Close search on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter products based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts([]);
            return;
        }
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.family.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            handleRemoveItem(productId);
            return;
        }
        updateQuantity(productId, newQuantity);
    };

    const handleRemoveItem = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        if (item) {
            removeFromCart(productId);
            showNotification(`${item.name} removed from cart`, 'info');
        }
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setShowSearch(false);
            navigate('/shop', { state: { searchQuery: searchTerm } });
        }
    };

    const handleSuggestionClick = (productName) => {
        setSearchTerm(productName);
        setShowSearch(false);
        navigate('/shop', { state: { searchQuery: productName } });
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = getCartTotal();
    const wishlistCount = wishlistItems ? wishlistItems.length : 0;

    return (
        <>
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <div className="main-top">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="text-slid-box">
                                <div id="offer-box" className="carouselTicker">
                                    <div className="led-ticker">
                                        <div className="led-ticker-track">
                                            <span className="ticker-item">
                                                <i className="fab fa-opencart"></i> Off 20%! Shop Now
                                            </span>
                                            <span className="ticker-item">
                                                <i className="fab fa-opencart"></i> Authentic Arabian Oud Collections
                                            </span>
                                            <span className="ticker-item">
                                                <i className="fab fa-opencart"></i> Designer Inspired Oils & Bakhoor
                                            </span>
                                            <span className="ticker-item">
                                                <i className="fab fa-opencart"></i> Premium Gift Collections Available
                                            </span>
                                            <span className="ticker-item">
                                                <i className="fab fa-opencart"></i> Crafted For Timeless Fragrance
                                            </span>
                                            <span className="ticker-item">
                                                <i className="fab fa-opencart"></i> Off 20%! Shop Now
                                            </span>
                                            <span className="ticker-item">
                                                <i className="fab fa-opencart"></i> Off 20%! Shop Now
                                            </span>
                                            <span className="ticker-item">
                                                <i className="fab fa-opencart"></i> Authentic Arabian Oud Collections
                                            </span>
                                            <span className="ticker-item">
                                                <i className="fab fa-opencart"></i> Designer Inspired Oils & Bakhoor
                                            </span>
                                            <span className="ticker-item">
                                                <i className="fab fa-opencart"></i> Premium Gift Collections Available
                                            </span>
                                            <span className="ticker-item">
                                                <i className="fab fa-opencart"></i> Crafted For Timeless Fragrance
                                            </span>
                                            <span className="ticker-item">
                                                <i className="fab fa-opencart"></i> Off 20%! Shop Now
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"><br />
                            <div className="right-phone-box">
                                <p>Call US :- <a href="#"> +11 900 800 100</a></p>
                            </div>
                            <div className="our-link">
                                <ul>
                                    <li><a href="#">My Account</a></li>
                                    <li><a href="#">Our location</a></li>
                                    <li><a href="#">Customer Care</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <header className="main-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav">
                    <div className="container">
                        <div className="navbar-header">
                            <button 
                                className="navbar-toggler mobile-menu-toggle" 
                                type="button" 
                                onClick={toggleMobileMenu}
                                aria-label="Toggle navigation"
                            >
                                <FaBars />
                            </button>
                            <a className="navbar-brand" href="/" style={{ display: 'flex', alignItems: 'center' }}>
                                <img src="images/logo2-b.png" className="logo" alt="" style={{ height: '130px' }} />
                            </a>
                        </div>

                        <div className="collapse navbar-collapse desktop-menu" id="navbar-menu">
                            <ul className="nav navbar-nav ml-auto" data-in="fadeInDown" data-out="fadeOutUp">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">
                                        About Us
                                    </Link>
                                </li>
                                <li className="dropdown megamenu-fw">
                                    <a href="#" className="nav-link dropdown-toggle arrow">Product</a>
                                    <ul className="dropdown-menu megamenu-content" role="menu">
                                        <li>
                                            <div className="row">
                                                <div className="col-menu col-md-3">
                                                    <h6 className="title">Perfume Oils</h6>
                                                    <div className="content">
                                                        <ul className="menu-col">
                                                            <li><Link to="/shop">Designer Inspired Oils</Link></li>
                                                            <li><Link to="/shop">Premium Musk Oils</Link></li>
                                                            <li><Link to="/shop">Arabic Attars</Link></li>
                                                            <li><Link to="/shop">Exclusive Blends</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="col-menu col-md-3">
                                                    <h6 className="title">Oud Collection</h6>
                                                    <div className="content">
                                                        <ul className="menu-col">
                                                            <li><Link to="/shop">Imperial Oud</Link></li>
                                                            <li><Link to="/shop">Noor Al Oud</Link></li>
                                                            <li><Link to="/shop">Taif Oud</Link></li>
                                                            <li><Link to="/shop">Desert Oud</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="col-menu col-md-3">
                                                    <h6 className="title">Bakhoor & Incense</h6>
                                                    <div className="content">
                                                        <ul className="menu-col">
                                                            <li><Link to="/shop">Luxury Bakhoor</Link></li>
                                                            <li><Link to="/shop">Oud Wood Chips</Link></li>
                                                            <li><Link to="/shop">Incense Burners</Link></li>
                                                            <li><Link to="/shop">Gift Sets</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="col-menu col-md-3">
                                                    <h6 className="title">Signature Collection</h6>
                                                    <div className="content">
                                                        <ul className="menu-col">
                                                            <li><Link to="/shop">Royal Collection</Link></li>
                                                            <li><Link to="/shop">Luxury Gifts</Link></li>
                                                            <li><Link to="/shop">Limited Edition</Link></li>
                                                            <li><Link to="/shop">Best Sellers</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <Link to="/shop" className="nav-link dropdown-toggle arrow">Shop</Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/cart">Cart</Link></li>
                                        <li><Link to="/checkout">Checkout</Link></li>
                                        <li><Link to="/my-account">My Account</Link></li>
                                        <li><Link to="/wishlist">Wishlist</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item"><Link className="nav-link" to="/service">Our Service</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/contact">Customer Care</Link></li>
                            </ul>
                        </div>

                        <div className="attr-nav">
                            <ul>
                                <li className="search">
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        document.querySelector('.top-search')?.classList.toggle('active');
                                        document.querySelector('.top-search input')?.focus();
                                    }}>
                                        <i className="fa fa-search"></i>
                                    </a>
                                </li>
                                {/* Wishlist Icon - Separate from side-menu, navigates to wishlist page */}
                                <li className="wishlist-nav">
                                    <Link to="/wishlist" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <i className="fa fa-heart"></i>
                                        <span className="badge wishlist-badge">{wishlistCount}</span>
                                    </Link>
                                </li>
                                {/* Cart Icon - Opens Sidebar */}
                                <li className="side-menu" onClick={toggleCart} style={{ cursor: 'pointer' }}>
                                    <a href="#">
                                        <i className="fa fa-shopping-bag"></i>
                                        <span className="badge">{cartCount}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Mobile Menu Overlay */}
                    <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
                        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
                            <div className="mobile-menu-header">
                                <button className="close-mobile-menu" onClick={toggleMobileMenu}>×</button>
                            </div>
                            <ul className="mobile-nav-links">
                                <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
                                <li><Link to="/about" onClick={toggleMobileMenu}>About Us</Link></li>
                                <li className="mobile-dropdown">
                                    <div className="mobile-dropdown-toggle">Product</div>
                                    <ul className="mobile-submenu">
                                        <li><strong>Perfume Oils</strong></li>
                                        <li><Link to="/shop" onClick={toggleMobileMenu}>Designer Inspired Oils</Link></li>
                                        <li><Link to="/shop" onClick={toggleMobileMenu}>Premium Musk Oils</Link></li>
                                        <li><Link to="/shop" onClick={toggleMobileMenu}>Arabic Attars</Link></li>
                                        <li><strong>Oud Collection</strong></li>
                                        <li><Link to="/shop" onClick={toggleMobileMenu}>Imperial Oud</Link></li>
                                        <li><Link to="/shop" onClick={toggleMobileMenu}>Noor Al Oud</Link></li>
                                        <li><strong>Bakhoor & Incense</strong></li>
                                        <li><Link to="/shop" onClick={toggleMobileMenu}>Luxury Bakhoor</Link></li>
                                        <li><Link to="/shop" onClick={toggleMobileMenu}>Oud Wood Chips</Link></li>
                                        <li><strong>Signature Collection</strong></li>
                                        <li><Link to="/shop" onClick={toggleMobileMenu}>Royal Collection</Link></li>
                                        <li><Link to="/shop" onClick={toggleMobileMenu}>Best Sellers</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/shop" onClick={toggleMobileMenu}>Shop</Link></li>
                                <li><Link to="/cart" onClick={toggleMobileMenu}>Cart</Link></li>
                                <li><Link to="/checkout" onClick={toggleMobileMenu}>Checkout</Link></li>
                                <li><Link to="/my-account" onClick={toggleMobileMenu}>My Account</Link></li>
                                <li><Link to="/wishlist" onClick={toggleMobileMenu}>Wishlist</Link></li>
                                <li><Link to="/service" onClick={toggleMobileMenu}>Our Service</Link></li>
                                <li><Link to="/contact" onClick={toggleMobileMenu}>Customer Care</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Search Bar */}
            <div className="top-search" ref={searchRef}>
                <div className="container">
                    <form onSubmit={handleSearchSubmit} className="search-wrapper">
                        <div className="input-group">
                            <span className="input-group-addon search-icon">
                                <i className="fa fa-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search for perfumes, oils, bakhoor..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowSearch(true);
                                }}
                                onFocus={() => {
                                    if (searchTerm.trim()) {
                                        setShowSearch(true);
                                    }
                                }}
                            />
                            {searchTerm && (
                                <span 
                                    className="input-group-addon clear-search"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setShowSearch(false);
                                    }}
                                >
                                    <FaTimes />
                                </span>
                            )}
                            <span 
                                className="input-group-addon close-search"
                                onClick={() => {
                                    document.querySelector('.top-search')?.classList.remove('active');
                                    setShowSearch(false);
                                }}
                            >
                                <i className="fa fa-times"></i>
                            </span>
                        </div>

                        {/* Search Dropdown */}
                        {showSearch && searchTerm.trim() && (
                            <div className="search-dropdown">
                                {filteredProducts.length > 0 ? (
                                    <>
                                        <div className="suggestions">
                                            {filteredProducts.slice(0, 6).map(product => (
                                                <span
                                                    key={product.id}
                                                    className="suggestion-chip"
                                                    onClick={() => handleSuggestionClick(product.name)}
                                                >
                                                    {product.name}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="product-results">
                                            {filteredProducts.slice(0, 5).map(product => (
                                                <Link
                                                    key={product.id}
                                                    to={`/shop-detail/${product.id}`}
                                                    className="search-product"
                                                    onClick={() => {
                                                        setShowSearch(false);
                                                        setSearchTerm('');
                                                    }}
                                                >
                                                    <img src={product.image} alt={product.name} />
                                                    <div className="search-product-info">
                                                        <span className="search-product-name">{product.name}</span>
                                                        <span className="search-product-price">${product.price.toFixed(2)}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        {filteredProducts.length > 5 && (
                                            <div className="view-all-results">
                                                <Link 
                                                    to="/shop" 
                                                    state={{ searchQuery: searchTerm }}
                                                    onClick={() => {
                                                        setShowSearch(false);
                                                        setSearchTerm('');
                                                    }}
                                                >
                                                    View all {filteredProducts.length} results
                                                </Link>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="no-results">
                                        <p>No products found for "{searchTerm}"</p>
                                        <Link 
                                            to="/shop"
                                            onClick={() => {
                                                setShowSearch(false);
                                                setSearchTerm('');
                                            }}
                                        >
                                            Browse all products
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Cart Sidebar */}
            <div className={`side-cart-overlay ${isCartOpen ? 'active' : ''}`} onClick={closeCart}></div>
            <div className={`side-cart ${isCartOpen ? 'open' : ''}`}>
                <button className="close-side-cart" onClick={closeCart}>
                    <i className="fa fa-times"></i>
                </button>
                <CartContent onClose={closeCart} />
            </div>

            <style>{`
                /* Notification styles */
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 25px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    z-index: 9999999;
                    animation: slideInRight 0.5s ease forwards;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    max-width: 400px;
                }

                .notification.success {
                    background: linear-gradient(135deg, #28a745, #20c997);
                }

                .notification.info {
                    background: linear-gradient(135deg, #17a2b8, #0dcaf0);
                }

                .notification.error {
                    background: linear-gradient(135deg, #dc3545, #f8d7da);
                }

                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(100px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                /* Search Styles */
                .top-search {
                    background: #f8f9fa;
                    padding: 15px 0;
                    border-bottom: 1px solid #e9ecef;
                    display: none;
                }

                .top-search.active {
                    display: block;
                    animation: slideDown 0.3s ease forwards;
                }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .search-wrapper {
                    position: relative;
                    width: 100%;
                }

                .search-wrapper .input-group {
                    position: relative;
                    display: flex;
                    align-items: center;
                    background: white;
                    border-radius: 30px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
                    overflow: hidden;
                }

                .search-wrapper .input-group .form-control {
                    flex: 1;
                    height: 50px;
                    border: none;
                    padding: 0 20px;
                    font-size: 15px;
                    background: transparent;
                    outline: none;
                }

                .search-wrapper .input-group .form-control:focus {
                    box-shadow: none;
                }

                .search-icon {
                    padding: 0 15px 0 20px;
                    color: white;
                    font-size: 16px;
                }

                .clear-search {
                    padding: 0 10px;
                    color: #999;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.3s ease;
                }

                .clear-search:hover {
                    color: #333;
                    transform: scale(1.1);
                }

                .close-search {
                    padding: 0 20px 0 15px;
                    color: #999;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .close-search:hover {
                    color: #333;
                    transform: rotate(90deg);
                }

                .search-dropdown {
                    position: absolute;
                    top: 60px;
                    left: 0;
                    width: 100%;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                    z-index: 99999;
                    padding: 20px;
                    max-height: 500px;
                    overflow-y: auto;
                    animation: fadeInUp 0.3s ease forwards;
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .search-dropdown::-webkit-scrollbar {
                    width: 4px;
                }

                .search-dropdown::-webkit-scrollbar-thumb {
                    background: #CAA968;
                    border-radius: 2px;
                }

                .suggestions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 20px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #f0f0f0;
                }

                .suggestion-chip {
                    padding: 8px 18px;
                    background: #f5f5f5;
                    border-radius: 20px;
                    font-size: 13px;
                    color: #333;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 1px solid transparent;
                }

                .suggestion-chip:hover {
                    background: #CAA968;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(202,169,104,0.3);
                }

                .product-results {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .search-product {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 12px 15px;
                    border-radius: 8px;
                    text-decoration: none;
                    color: #333;
                    transition: all 0.3s ease;
                    animation: fadeInScale 0.3s ease backwards;
                }

                .search-product:nth-child(1) { animation-delay: 0.05s; }
                .search-product:nth-child(2) { animation-delay: 0.1s; }
                .search-product:nth-child(3) { animation-delay: 0.15s; }
                .search-product:nth-child(4) { animation-delay: 0.2s; }
                .search-product:nth-child(5) { animation-delay: 0.25s; }

                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }

                .search-product:hover {
                    background: #f8f5f0;
                    transform: translateX(5px);
                }

                .search-product img {
                    width: 50px;
                    height: 50px;
                    object-fit: cover;
                    border-radius: 8px;
                    border: 1px solid #f0f0f0;
                }

                .search-product-info {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }

                .search-product-name {
                    font-size: 14px;
                    font-weight: 500;
                    color: #0B1F14;
                    line-height: 1.4;
                }

                .search-product-price {
                    font-size: 13px;
                    font-weight: 600;
                    color: #CAA968;
                    margin-top: 2px;
                }

                .view-all-results {
                    text-align: center;
                    padding-top: 15px;
                    margin-top: 15px;
                    border-top: 1px solid #f0f0f0;
                }

                .view-all-results a {
                    color: #CAA968;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.3s ease;
                }

                .view-all-results a:hover {
                    color: #0B1F14;
                    text-decoration: underline;
                }

                .no-results {
                    text-align: center;
                    padding: 30px 0;
                }

                .no-results p {
                    color: #666;
                    margin-bottom: 10px;
                    font-size: 15px;
                }

                .no-results a {
                    color: #CAA968;
                    text-decoration: none;
                    font-weight: 600;
                }

                .no-results a:hover {
                    text-decoration: underline;
                }

                /* CRITICAL DROPDOWN FIX */
                .main-header {
                    position: relative;
                    z-index: 999999 !important;
                    overflow: visible !important;
                }
                
                .navbar {
                    overflow: visible !important;
                    z-index: 999999 !important;
                }
                
                .container {
                    overflow: visible !important;
                }
                
                .navbar-collapse {
                    overflow: visible !important;
                }
                
                .nav.navbar-nav {
                    overflow: visible !important;
                }
                
                .dropdown {
                    position: relative !important;
                    overflow: visible !important;
                }
                
                .dropdown-menu {
                    position: absolute !important;
                    top: 100% !important;
                    left: 0 !important;
                    display: block !important;
                    opacity: 0 !important;
                    visibility: hidden !important;
                    transform: translateY(-10px) !important;
                    transition: all 0.3s ease !important;
                    z-index: 999999 !important;
                    min-width: 200px !important;
                    background: #fff !important;
                    border-radius: 8px !important;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
                    margin-top: 0 !important;
                    padding: 10px 0 !important;
                    pointer-events: none !important;
                }
                
                .dropdown:hover > .dropdown-menu {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: translateY(0) !important;
                    pointer-events: auto !important;
                }
                
                .megamenu-fw {
                    position: static !important;
                    overflow: visible !important;
                }
                
                .megamenu-content {
                    position: absolute !important;
                    left: 0 !important;
                    right: 0 !important;
                    width: 100% !important;
                    display: block !important;
                    opacity: 0 !important;
                    visibility: hidden !important;
                    transform: translateY(-10px) !important;
                    transition: all 0.3s ease !important;
                    z-index: 999999 !important;
                    background: #fff !important;
                    padding: 30px !important;
                    margin-top: 0 !important;
                    border-radius: 0 0 8px 8px !important;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.15) !important;
                    pointer-events: none !important;
                }
                
                .megamenu-fw:hover .megamenu-content {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: translateY(0) !important;
                    pointer-events: auto !important;
                }
                
                .dropdown-menu li, 
                .megamenu-content li {
                    pointer-events: auto !important;
                    background: #125212;
                }
                
                body, html {
                    overflow-x: hidden !important;
                    overflow-y: auto !important;
                }

                .main-top {
                    animation: fadeInSlideDown 0.6s ease-out;
                }
                
                @keyframes fadeInSlideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .led-ticker {
                    width: 100%;
                    overflow: hidden;
                    background: transparent;
                    position: relative;
                }
                
                .led-ticker-track {
                    display: inline-flex;
                    white-space: nowrap;
                    animation: ledScroll 25s linear infinite;
                }
                
                .ticker-item {
                    display: inline-flex;
                    align-items: center;
                    padding: 8px 30px;
                    font-size: 20px;
                    font-weight: 500;
                    color: #104829;
                    letter-spacing: 0.5px;
                    position: relative;
                    font-style: italic;
                    font-family: 'Montserrat';
                }
                
                .ticker-item i {
                    margin-right: 8px;
                    color: #000000;
                    font-size: 20px;
                }
                
                .ticker-item::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 2px;
                    height: 20px;
                    background: linear-gradient(to bottom, transparent, #CAA968, transparent);
                    opacity: 0.6;
                }
                
                .ticker-item:first-child::before {
                    display: none;
                }
                
                @keyframes ledScroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                .led-ticker:hover .led-ticker-track {
                    animation-play-state: paused;
                }

                .right-phone-box a, .our-link li a {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: inline-block;
                }
                
                .right-phone-box a:hover, .our-link li a:hover {
                    color: #CAA968 !important;
                    transform: translateX(3px);
                }

                .logo {
                    transition: transform 0.4s ease;
                }
                
                .logo:hover {
                    transform: scale(1.02);
                }

                .nav-link {
                    position: relative;
                    transition: all 0.3s ease;
                }
                
                .nav-link:hover {
                    color: #CAA968 !important;
                    transform: translateY(-1px);
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: #CAA968;
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                }
                
                .nav-link:hover::after {
                    width: 80%;
                }

                .col-menu {
                    transition: all 0.3s ease;
                }
                
                .col-menu:hover {
                    transform: translateY(-5px);
                }
                
                .menu-col li a {
                    transition: all 0.3s ease;
                    display: inline-block;
                }
                
                .menu-col li a:hover {
                    transform: translateX(8px);
                    color: #CAA968 !important;
                }

                /* Wishlist Nav Styles - Separate from side-menu */
                .wishlist-nav {
                    display: inline-block;
                    position: relative;
                    padding: 0 8px;
                }

                .wishlist-nav a {
                    display: flex;
                    align-items: center;
                    color: #333;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .wishlist-nav a:hover {
                    color: #CAA968;
                }

                .wishlist-nav a:hover i {
                    transform: scale(1.1);
                }

                .wishlist-nav i {
                    font-size: 20px;
                    transition: all 0.3s ease;
                }

                .fa-shopping-bag, .fa-heart {
                    transition: all 0.3s ease;
                }
                
                .side-menu:hover .fa-shopping-bag {
                    transform: scale(1.1);
                    color: #CAA968;
                }

                .wishlist-nav:hover .fa-heart {
                    transform: scale(1.1);
                    color: #e74c3c;
                }
                
                .badge {
                    transition: all 0.2s ease;
                    animation: pulseBadge 2s infinite;
                }
                
                @keyframes pulseBadge {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); background-color: #CAA968; }
                }

                .badge.wishlist-badge {
                    background: #e74c3c;
                }

                .wishlist-nav .badge.wishlist-badge {
                    animation: pulseBadgeWishlist 2s infinite;
                }

                @keyframes pulseBadgeWishlist {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); background-color: #e74c3c; }
                }

                .search a {
                    display: inline-block;
                    transition: all 0.3s ease;
                }
                
                .search a:hover i {
                    transform: scale(1.15);
                    color: #CAA968;
                }
                
                .search a i {
                    transition: all 0.3s ease;
                }

                /* Cart Sidebar */
                .side-cart-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 999998;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }

                .side-cart-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }

                .side-cart {
                    position: fixed;
                    top: 0;
                    right: -420px;
                    width: 420px;
                    height: 100vh;
                    background: #ffffff;
                    padding: 25px 30px;
                    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 999999;
                    overflow-y: auto;
                    box-shadow: -5px 0 30px rgba(0,0,0,0.1);
                }

                .side-cart.open {
                    right: 0;
                }

                .side-cart::-webkit-scrollbar {
                    width: 4px;
                }

                .side-cart::-webkit-scrollbar-thumb {
                    background: #CAA968;
                    border-radius: 2px;
                }

                .close-side-cart {
                    position: absolute;
                    top: 20px;
                    right: 25px;
                    font-size: 28px;
                    color: #333;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    text-decoration: none;
                    background: none;
                    border: none;
                }

                .close-side-cart:hover {
                    transform: rotate(90deg);
                    color: #CAA968;
                }

                .cart-header-section {
                    margin-top: 40px;
                    margin-bottom: 30px;
                }

                .cart-header-section h3 {
                    font-size: 28px;
                    font-weight: 700;
                    color: #0B1F14;
                    margin-bottom: 5px;
                }

                .cart-header-section p {
                    color: #777;
                    font-size: 16px;
                    margin: 0;
                }

                .cart-items-list {
                    max-height: 400px;
                    overflow-y: auto;
                    margin-bottom: 20px;
                }

                .cart-items-list::-webkit-scrollbar {
                    width: 4px;
                }

                .cart-items-list::-webkit-scrollbar-thumb {
                    background: #CAA968;
                    border-radius: 2px;
                }

                .cart-item-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                    padding: 20px 0;
                    border-bottom: 1px solid #eee;
                    position: relative;
                    animation: slideInRight 0.4s ease-out backwards;
                }

                .cart-item-row:nth-child(1) { animation-delay: 0.05s; }
                .cart-item-row:nth-child(2) { animation-delay: 0.1s; }
                .cart-item-row:nth-child(3) { animation-delay: 0.15s; }

                .cart-item-row img {
                    width: 85px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 8px;
                    border: 1px solid #f0f0f0;
                }

                .cart-item-info {
                    flex: 1;
                }

                .cart-item-info h5 {
                    font-size: 16px;
                    font-weight: 600;
                    color: #0B1F14;
                    line-height: 1.5;
                    margin-bottom: 8px;
                    margin-top: 0;
                }

                .cart-item-price {
                    font-weight: 600;
                    color: #CAA968;
                    margin-top: 5px;
                    font-size: 14px;
                }

                .cart-qty-box {
                    display: flex;
                    align-items: center;
                    border: 1px solid #e0e0e0;
                    border-radius: 6px;
                    width: 110px;
                    height: 40px;
                    overflow: hidden;
                    background: #f9f9f9;
                }

                .cart-qty-btn {
                    border: none;
                    background: transparent;
                    width: 35px;
                    height: 100%;
                    font-size: 20px;
                    cursor: pointer;
                    color: #333;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .cart-qty-btn:hover {
                    background: #CAA968;
                    color: #fff;
                }

                .cart-qty-box span {
                    flex: 1;
                    text-align: center;
                    font-weight: 600;
                    font-size: 16px;
                    color: #0B1F14;
                }

                .cart-remove-item {
                    border: none;
                    background: none;
                    font-size: 20px;
                    color: #999;
                    cursor: pointer;
                    padding: 5px;
                    transition: all 0.3s ease;
                    margin-top: -5px;
                }

                .cart-remove-item:hover {
                    color: #e74c3c;
                    transform: rotate(90deg);
                }

                .cart-footer-section {
                    padding-top: 20px;
                    border-top: 2px solid #f0f0f0;
                    margin-top: 10px;
                }

                .subtotal-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                    font-size: 20px;
                    font-weight: 600;
                    color: #0B1F14;
                }

                .subtotal-row strong {
                    color: #CAA968;
                    font-size: 22px;
                }

                .cart-note-text {
                    color: #888;
                    font-size: 13px;
                    margin-bottom: 20px;
                    line-height: 1.4;
                }

                .checkout-btn-cart {
                    width: 100%;
                    display: block;
                    text-align: center;
                    padding: 16px;
                    background: #0B1F14;
                    color: #ffffff;
                    font-weight: 700;
                    font-size: 15px;
                    letter-spacing: 1px;
                    margin-bottom: 12px;
                    text-decoration: none;
                    border-radius: 6px;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                }

                .checkout-btn-cart:hover {
                    background: #CAA968;
                    color: #0B1F14;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 20px rgba(202,169,104,0.3);
                }

                .viewcart-btn-cart {
                    width: 100%;
                    display: block;
                    text-align: center;
                    padding: 16px;
                    border: 2px solid #e0e0e0;
                    color: #0B1F14;
                    font-weight: 700;
                    font-size: 15px;
                    letter-spacing: 1px;
                    text-decoration: none;
                    border-radius: 6px;
                    transition: all 0.3s ease;
                    background: transparent;
                    cursor: pointer;
                }

                .viewcart-btn-cart:hover {
                    border-color: #CAA968;
                    color: #CAA968;
                    transform: translateY(-2px);
                }

                .empty-cart-msg {
                    text-align: center;
                    padding: 30px 0;
                }

                .empty-cart-msg p {
                    font-size: 18px;
                    color: #666;
                    margin-bottom: 15px;
                }

                .empty-cart-msg a {
                    color: #CAA968;
                    text-decoration: none;
                    font-weight: 600;
                }

                .empty-cart-msg a:hover {
                    text-decoration: underline;
                }

                /* Mobile Menu */
                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 99999;
                    transition: left 0.3s ease;
                }

                .mobile-menu-overlay.active {
                    left: 0;
                }

                .mobile-menu-content {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 80%;
                    max-width: 350px;
                    height: 100vh;
                    background: linear-gradient(135deg, #061b0f 0%, #0a2a18 100%);
                    overflow-y: auto;
                    padding: 20px;
                    box-shadow: 2px 0 10px rgba(0,0,0,0.2);
                }

                .mobile-menu-header {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 20px;
                }

                .close-mobile-menu {
                    background: none;
                    border: none;
                    font-size: 30px;
                    color: #CAA968;
                    cursor: pointer;
                    padding: 0;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mobile-nav-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .mobile-nav-links li {
                    margin-bottom: 15px;
                }

                .mobile-nav-links li a,
                .mobile-dropdown-toggle {
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 16px;
                    font-weight: 500;
                    display: block;
                    padding: 10px 0;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .mobile-nav-links li a:hover,
                .mobile-dropdown-toggle:hover {
                    color: #CAA968;
                    padding-left: 10px;
                }

                .mobile-submenu {
                    list-style: none;
                    padding-left: 20px;
                    margin-top: 10px;
                    margin-bottom: 10px;
                }

                .mobile-submenu li {
                    margin-bottom: 8px;
                }

                .mobile-submenu li strong {
                    color: #CAA968;
                    font-size: 14px;
                    display: block;
                    margin-top: 10px;
                    margin-bottom: 5px;
                }

                .mobile-submenu li a {
                    font-size: 14px;
                    padding: 5px 0;
                }

                .mobile-menu-toggle {
                    background: none;
                    border: none;
                    font-size: 24px;
                    color: #CAA968;
                    cursor: pointer;
                    display: none;
                }

                /* Mobile Bottom Navigation */
                .mobile-bottom-nav {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: linear-gradient(135deg, #061b0f 0%, #0a2a18 100%);
                    border-top: 1px solid rgba(202,169,104,0.3);
                    display: none;
                    justify-content: space-around;
                    align-items: center;
                    padding: 8px 0;
                    z-index: 99998;
                    box-shadow: 0 -2px 10px rgba(0,0,0,0.08);
                }

                .mobile-bottom-nav a {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    color: #ffffff;
                    font-size: 11px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    z-index: 99999;
                    background: transparent;
                    position: relative;
                }

                .mobile-bottom-nav a svg {
                    font-size: 20px;
                    margin-bottom: 4px;
                    pointer-events: none;
                }

                .mobile-bottom-nav a:hover,
                .mobile-bottom-nav a:active {
                    color: #CAA968;
                    transform: translateY(-2px);
                }

                .mobile-bottom-nav .cart-icon {
                    color: #CAA968;
                }

                .mobile-bottom-nav .wishlist-count {
                    position: absolute;
                    top: -6px;
                    right: -10px;
                    background: #e74c3c;
                    color: white;
                    border-radius: 50%;
                    font-size: 10px;
                    padding: 2px 6px;
                    min-width: 18px;
                    text-align: center;
                    line-height: 1.4;
                }

                /* Mobile Only Styles */
                @media (max-width: 768px) {
                    .mobile-bottom-nav {
                        display: flex !important;
                    }
                    
                    body {
                        padding-bottom: 70px;
                    }
                    
                    .desktop-menu {
                        display: none !important;
                    }
                    
                    .attr-nav {
                        display: none !important;
                    }
                    
                    .mobile-menu-toggle {
                        display: block !important;
                    }
                    
                    .navbar-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                    }
                    
                    .navbar-brand {
                        margin-left: 10px;
                    }
                    
                    .dropdown-menu,
                    .megamenu-content {
                        display: none !important;
                    }

                    .side-cart {
                        width: 100%;
                        right: -100%;
                        padding: 20px;
                    }

                    .cart-item-row img {
                        width: 70px;
                        height: 85px;
                    }

                    .cart-header-section h3 {
                        font-size: 24px;
                    }

                    .subtotal-row {
                        font-size: 18px;
                    }

                    .subtotal-row strong {
                        font-size: 20px;
                    }

                    .search-dropdown {
                        top: 55px;
                        padding: 15px;
                        max-height: 400px;
                    }

                    .suggestions {
                        gap: 8px;
                    }

                    .suggestion-chip {
                        font-size: 12px;
                        padding: 6px 14px;
                    }

                    .search-product img {
                        width: 40px;
                        height: 40px;
                    }

                    .search-product-name {
                        font-size: 13px;
                    }
                }

                /* Desktop Only */
                @media (min-width: 769px) {
                    .mobile-menu-overlay {
                        display: none;
                    }
                    
                    .mobile-menu-toggle {
                        display: none !important;
                    }
                }
            `}</style>

            {/* Mobile Bottom Navigation */}
            <div className="mobile-bottom-nav">
                <Link to="/">
                    <FaHome />
                    <span>Home</span>
                </Link>

                <Link to="/shop">
                    <FaSearch />
                    <span>Search</span>
                </Link>

                <Link to="/shop">
                    <BsGridFill />
                    <span>Shop</span>
                </Link>

                <Link to="/my-account">
                    <FaUser />
                    <span>Account</span>
                </Link>

                <Link to="/wishlist" style={{ position: 'relative' }}>
                    <FaHeart />
                    <span>Wishlist</span>
                    {wishlistCount > 0 && (
                        <span className="wishlist-count">{wishlistCount}</span>
                    )}
                </Link>

                <Link to="/cart" className="cart-icon">
                    <FaShoppingCart />
                    <span>Cart</span>
                </Link>
            </div>
        </>
    )
}

// Cart Content Component
const CartContent = ({ onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useShop();

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = getCartTotal();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        updateQuantity(productId, newQuantity);
    };

    const handleRemoveItem = (productId) => {
        removeFromCart(productId);
    };

    return (
        <>
            <div className="cart-header-section">
                <h3>Shopping Cart</h3>
                <p>{cartCount} Items</p>
            </div>

            <div className="cart-items-list">
                {cartItems.length === 0 ? (
                    <div className="empty-cart-msg">
                        <p>Your cart is empty</p>
                        <Link to="/shop" onClick={onClose}>Continue Shopping</Link>
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div className="cart-item-row" key={item.id}>
                            <img src={item.image || 'images/default-product.jpg'} alt={item.name} />
                            <div className="cart-item-info">
                                <h5>{item.name}</h5>
                                <div className="cart-qty-box">
                                    <button 
                                        className="cart-qty-btn minus" 
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    >
                                        −
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button 
                                        className="cart-qty-btn plus" 
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="cart-item-price">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                            <button 
                                className="cart-remove-item"
                                onClick={() => handleRemoveItem(item.id)}
                            >
                                <i className="fa fa-times"></i>
                            </button>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="cart-footer-section">
                    <div className="subtotal-row">
                        <span>Subtotal:</span>
                        <strong>${cartTotal.toFixed(2)}</strong>
                    </div>

                    <p className="cart-note-text">
                        Tax included and shipping calculated at checkout
                    </p>

                    <Link to="/checkout" className="checkout-btn-cart" onClick={onClose}>
                        CHECKOUT
                    </Link>

                    <Link to="/cart" className="viewcart-btn-cart" onClick={onClose}>
                        VIEW CART
                    </Link>
                </div>
            )}
        </>
    );
};

export default Header;