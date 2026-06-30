// src/components/Shop.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import products from '../data/products';

const Shop = () => {
    const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useShop();
    const location = useLocation();
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState([0, 50]);
    const [notification, setNotification] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Use imported products
    const allProducts = products;

    // Check for search query from navigation
    useEffect(() => {
        if (location.state && location.state.searchQuery) {
            setSearchTerm(location.state.searchQuery);
        }
    }, [location]);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
        }, 1);
        showNotification(`${product.name} added to cart!`, 'success');
        setIsCartOpen(true);
    };

    const handleToggleWishlist = (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            showNotification(`${product.name} removed from wishlist`, 'info');
        } else {
            addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category
            });
            showNotification(`${product.name} added to wishlist!`, 'success');
        }
    };

    const getFilteredProducts = () => {
        let filtered = allProducts;

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        filtered = filtered.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        switch (sortBy) {
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            default:
                break;
        }

        return filtered;
    };

    const filteredProducts = getFilteredProducts();

    const renderProductCard = (product) => {
        const inWishlist = isInWishlist(product.id);

        return (
            <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4" key={product.id}>
                <div className="products-single fix">
                    <div className="box-img-hover">
                        {product.badge && (
                            <div className="type-lb">
                                <p className={product.badge === 'sale' ? 'sale' : 'new'}>
                                    {product.badge === 'sale' ? 'Sale' : 'New'}
                                </p>
                            </div>
                        )}
                        <Link to={`/shop-detail/${product.id}`}>
                            <img src={product.image} className="img-fluid" alt={product.name} />
                        </Link>
                        <div className="mask-icon">
                            <ul>
                                <li>
                                    <Link to={`/shop-detail/${product.id}`} data-toggle="tooltip" data-placement="right" title="View">
                                        <i className="fas fa-eye"></i>
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" data-toggle="tooltip" data-placement="right" title="Compare">
                                        <i className="fas fa-sync-alt"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleToggleWishlist(product);
                                        }}
                                        style={{ color: inWishlist ? '#CAA968' : 'inherit' }}
                                    >
                                        <i className={inWishlist ? "fas fa-heart" : "far fa-heart"}></i>
                                    </a>
                                </li>
                            </ul>
                            <a
                                className="cart"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCart(product);
                                }}
                            >
                                Add to Cart
                            </a>
                        </div>
                    </div>
                    <div className="why-text">
                        <h4>
                            <Link to={`/shop-detail/${product.id}`}>{product.name}</Link>
                        </h4>
                        <h5>
                            {product.originalPrice && (
                                <del>${product.originalPrice.toFixed(2)}</del>
                            )}
                            {' '}${product.price.toFixed(2)}
                        </h5>
                    </div>
                </div>
            </div>
        );
    };

    const renderListView = (product) => {
        const inWishlist = isInWishlist(product.id);

        return (
            <div className="list-view-box" key={product.id}>
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        <div className="products-single fix">
                            <div className="box-img-hover">
                                {product.badge && (
                                    <div className="type-lb">
                                        <p className={product.badge === 'sale' ? 'sale' : 'new'}>
                                            {product.badge === 'sale' ? 'Sale' : 'New'}
                                        </p>
                                    </div>
                                )}
                                <Link to={`/shop-detail/${product.id}`}>
                                    <img src={product.image} className="img-fluid" alt={product.name} />
                                </Link>
                                <div className="mask-icon">
                                    <ul>
                                        <li>
                                            <Link to={`/shop-detail/${product.id}`} data-toggle="tooltip" data-placement="right" title="View">
                                                <i className="fas fa-eye"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="#" data-toggle="tooltip" data-placement="right" title="Compare">
                                                <i className="fas fa-sync-alt"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                                title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleToggleWishlist(product);
                                                }}
                                                style={{ color: inWishlist ? '#CAA968' : 'inherit' }}
                                            >
                                                <i className={inWishlist ? "fas fa-heart" : "far fa-heart"}></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-8 col-xl-8">
                        <div className="why-text full-width">
                            <h4>
                                <Link to={`/shop-detail/${product.id}`}>{product.name}</Link>
                            </h4>
                            <h5>
                                {product.originalPrice && (
                                    <del>${product.originalPrice.toFixed(2)}</del>
                                )}
                                {' '}${product.price.toFixed(2)}
                            </h5>
                            <p>{product.description}</p>
                            <a
                                className="btn hvr-hover"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCart(product);
                                }}
                            >
                                Add to Cart
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <style>{`
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

                .all-title-box {
                    animation: fadeInDown 0.6s ease forwards;
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .breadcrumb li {
                    animation: fadeInUp 0.5s ease backwards;
                }
                .breadcrumb li:nth-child(1) { animation-delay: 0.1s; }
                .breadcrumb li:nth-child(2) { animation-delay: 0.2s; }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .sidebar-shop-left {
                    animation: slideInLeft 0.7s ease forwards;
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .search-product {
                    transition: all 0.3s ease;
                }
                .search-product form {
                    display: flex;
                    transition: all 0.3s ease;
                }
                .search-product input {
                    transition: all 0.3s ease;
                }
                .search-product input:focus {
                    transform: scale(1.02);
                    box-shadow: 0 0 0 3px rgba(202,169,104,0.2);
                }
                .search-product button {
                    transition: all 0.3s ease;
                }
                .search-product button:hover {
                    transform: scale(1.05);
                    background: #CAA968;
                    color: white;
                }
                .list-group-item {
                    transition: all 0.3s ease;
                    animation: fadeInRight 0.4s ease backwards;
                    cursor: pointer;
                }
                .list-group-item:nth-child(1) { animation-delay: 0.05s; }
                .list-group-item:nth-child(2) { animation-delay: 0.1s; }
                .list-group-item:nth-child(3) { animation-delay: 0.15s; }
                .list-group-item:nth-child(4) { animation-delay: 0.2s; }
                .list-group-item:nth-child(5) { animation-delay: 0.25s; }
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(-15px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .list-group-item:hover {
                    transform: translateX(5px);
                    color: #CAA968 !important;
                }
                .list-group-item.active {
                    background: #CAA968;
                    border-color: #CAA968;
                }
                .collapse {
                    transition: all 0.3s ease;
                }
                .sub-men .list-group-item-action {
                    transition: all 0.3s ease;
                }
                .filter-price-left, .filter-brand-left {
                    animation: fadeInUp 0.5s ease backwards;
                }
                .filter-price-left { animation-delay: 0.2s; }
                .filter-brand-left { animation-delay: 0.3s; }
                .title-left h3 {
                    position: relative;
                    display: inline-block;
                    transition: color 0.3s ease;
                }
                .title-left h3::after {
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #CAA968;
                    transition: width 0.4s ease;
                }
                .title-left:hover h3::after {
                    width: 100%;
                }
                .radio {
                    transition: all 0.3s ease;
                }
                .radio:hover {
                    transform: translateX(5px);
                }
                .radio label {
                    transition: color 0.3s ease;
                    cursor: pointer;
                }
                .radio input:checked + label {
                    color: #CAA968;
                    font-weight: 600;
                }
                .btn.hvr-hover {
                    transition: all 0.3s ease;
                    background: #CAA968;
                    color: #06140d;
                }
                .btn.hvr-hover:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(202,169,104,0.3);
                }
                .shop-content-right {
                    animation: slideInRight 0.7s ease forwards;
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .toolbar-sorter-right select {
                    transition: all 0.3s ease;
                }
                .toolbar-sorter-right select:focus {
                    border-color: #CAA968;
                    transform: scale(1.02);
                }
                .nav-tabs li a {
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .nav-tabs li a:hover {
                    transform: translateY(-3px);
                    color: #CAA968 !important;
                }
                .nav-tabs li a.active {
                    background: #CAA968 !important;
                    color: white !important;
                }
                .products-single {
                    animation: fadeInUp 0.5s ease backwards;
                    transition: all 0.4s ease;
                }
                .col-sm-6.col-md-6.col-lg-4.col-xl-4:nth-child(1) .products-single { animation-delay: 0.05s; }
                .col-sm-6.col-md-6.col-lg-4.col-xl-4:nth-child(2) .products-single { animation-delay: 0.1s; }
                .col-sm-6.col-md-6.col-lg-4.col-xl-4:nth-child(3) .products-single { animation-delay: 0.15s; }
                .col-sm-6.col-md-6.col-lg-4.col-xl-4:nth-child(4) .products-single { animation-delay: 0.2s; }
                .col-sm-6.col-md-6.col-lg-4.col-xl-4:nth-child(5) .products-single { animation-delay: 0.25s; }
                .col-sm-6.col-md-6.col-lg-4.col-xl-4:nth-child(6) .products-single { animation-delay: 0.3s; }
                .col-sm-6.col-md-6.col-lg-4.col-xl-4:nth-child(7) .products-single { animation-delay: 0.35s; }
                .col-sm-6.col-md-6.col-lg-4.col-xl-4:nth-child(8) .products-single { animation-delay: 0.4s; }
                .col-sm-6.col-md-6.col-lg-4.col-xl-4:nth-child(9) .products-single { animation-delay: 0.45s; }
                .products-single:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                }
                .box-img-hover {
                    overflow: hidden;
                    position: relative;
                }
                .box-img-hover img {
                    transition: transform 0.6s ease;
                }
                .products-single:hover .box-img-hover img {
                    transform: scale(1.08);
                }
                .type-lb p {
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                .type-lb .sale { background: #dc3545; }
                .type-lb .new { background: #28a745; }
                .mask-icon {
                    position: absolute;
                    bottom: -100%;
                    left: 0;
                    width: 100%;
                    background: rgba(0,0,0,0.7);
                    transition: bottom 0.3s ease;
                    padding: 15px;
                    text-align: center;
                }
                .products-single:hover .mask-icon {
                    bottom: 0;
                }
                .mask-icon ul li {
                    display: inline-block;
                    margin: 0 5px;
                    animation: fadeInScale 0.3s ease backwards;
                }
                .mask-icon ul li:nth-child(1) { animation-delay: 0.05s; }
                .mask-icon ul li:nth-child(2) { animation-delay: 0.1s; }
                .mask-icon ul li:nth-child(3) { animation-delay: 0.15s; }
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0); }
                    to { opacity: 1; transform: scale(1); }
                }
                .mask-icon ul li a {
                    transition: all 0.3s ease;
                    display: inline-block;
                }
                .mask-icon ul li a:hover {
                    transform: translateY(-3px) scale(1.15);
                    color: #CAA968 !important;
                }
                .mask-icon .cart {
                    display: inline-block;
                    margin-top: 10px;
                    transition: all 0.3s ease;
                }
                .mask-icon .cart:hover {
                    background: #CAA968;
                    transform: translateY(-2px);
                }
                .why-text h4 {
                    transition: color 0.3s ease;
                }
                .why-text h4 a {
                    color: inherit;
                    text-decoration: none;
                }
                .why-text h4 a:hover {
                    color: #CAA968;
                }
                .products-single:hover .why-text h4 {
                    color: #CAA968;
                }
                .why-text h5 {
                    transition: transform 0.3s ease;
                    display: inline-block;
                }
                .why-text h5 del {
                    color: #999;
                    margin-right: 5px;
                }
                .products-single:hover .why-text h5 {
                    transform: scale(1.05);
                    color: #CAA968;
                }
                .list-view-box {
                    animation: fadeInUp 0.5s ease backwards;
                    transition: all 0.3s ease;
                }
                .list-view-box:nth-child(1) { animation-delay: 0.05s; }
                .list-view-box:nth-child(2) { animation-delay: 0.1s; }
                .list-view-box:nth-child(3) { animation-delay: 0.15s; }
                .list-view-box:hover {
                    transform: translateX(8px);
                    background: rgba(202,169,104,0.05);
                }
                .tab-pane {
                    animation: fadeIn 0.4s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .wishlist-active {
                    color: #CAA968 !important;
                }
                .badge-count {
                    background: #CAA968;
                    color: white;
                    border-radius: 50%;
                    padding: 2px 8px;
                    font-size: 12px;
                    margin-left: 5px;
                }

                /* Cart Sidebar Styles */
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

                @media (max-width: 768px) {
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
                }
            `}</style>

            <div className="all-title-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Shop</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active">Shop</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shop-box-inner">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12 sidebar-shop-left">
                            <div className="product-categori">
                                <div className="search-product">
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <input
                                            className="form-control"
                                            placeholder="Search here..."
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button type="submit">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </form>
                                </div>
                                <div className="filter-sidebar-left">
                                    <div className="title-left">
                                        <h3>Categories</h3>
                                    </div>
                                    <div className="list-group list-group-collapse list-group-sm list-group-tree" id="list-group-men" data-children=".sub-men">
                                        <a
                                            className={`list-group-item list-group-item-action ${selectedCategory === 'all' ? 'active' : ''}`}
                                            onClick={() => setSelectedCategory('all')}
                                        >
                                            All Products <small className="text-muted">({allProducts.length})</small>
                                        </a>
                                        <div className="list-group-collapse sub-men">
                                            <a
                                                className="list-group-item list-group-item-action"
                                                data-toggle="collapse"
                                                aria-expanded="true"
                                                aria-controls="sub-men1"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                Perfume Oils <small className="text-muted">(24)</small>
                                            </a>
                                            <div className="collapse show" id="sub-men1" data-parent="#list-group-men">
                                                <div className="list-group">
                                                    <a
                                                        className={`list-group-item list-group-item-action ${selectedCategory === 'designer-inspired' ? 'active' : ''}`}
                                                        onClick={() => setSelectedCategory('designer-inspired')}
                                                    >
                                                        Designer Inspired <small className="text-muted">(2)</small>
                                                    </a>
                                                    <a
                                                        className={`list-group-item list-group-item-action ${selectedCategory === 'arabic-attars' ? 'active' : ''}`}
                                                        onClick={() => setSelectedCategory('arabic-attars')}
                                                    >
                                                        Arabic Attars <small className="text-muted">(1)</small>
                                                    </a>
                                                    <a
                                                        className={`list-group-item list-group-item-action ${selectedCategory === 'exclusive-blends' ? 'active' : ''}`}
                                                        onClick={() => setSelectedCategory('exclusive-blends')}
                                                    >
                                                        Exclusive Blends <small className="text-muted">(1)</small>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-collapse sub-men">
                                            <a
                                                className="list-group-item list-group-item-action"
                                                data-toggle="collapse"
                                                aria-expanded="false"
                                                aria-controls="sub-men2"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                Oud Collection <small className="text-muted">(16)</small>
                                            </a>
                                            <div className="collapse" id="sub-men2" data-parent="#list-group-men">
                                                <div className="list-group">
                                                    <a
                                                        className={`list-group-item list-group-item-action ${selectedCategory === 'oud-collection' ? 'active' : ''}`}
                                                        onClick={() => setSelectedCategory('oud-collection')}
                                                    >
                                                        All Oud <small className="text-muted">(4)</small>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <a
                                            className={`list-group-item list-group-item-action ${selectedCategory === 'bakhoor-incense' ? 'active' : ''}`}
                                            onClick={() => setSelectedCategory('bakhoor-incense')}
                                        >
                                            Bakhoor & Incense <small className="text-muted">(1)</small>
                                        </a>
                                    </div>
                                </div>
                                <div className="filter-price-left">
                                    <div className="title-left">
                                        <h3>Price Range</h3>
                                    </div>
                                    <div className="price-box-slider">
                                        <div className="row">
                                            <div className="col-6">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Min"
                                                    value={priceRange[0]}
                                                    onChange={(e) => setPriceRange([parseFloat(e.target.value) || 0, priceRange[1]])}
                                                    min="0"
                                                />
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Max"
                                                    value={priceRange[1]}
                                                    onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value) || 50])}
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                        <p className="mt-2">
                                            <span>Price: ${priceRange[0]} - ${priceRange[1]}</span>
                                        </p>
                                    </div>
                                </div>
                                {/* <div className="filter-brand-left">
                                    <div className="title-left">
                                        <h3>Fragrance Family</h3>
                                    </div>
                                    <div className="brand-box">
                                        <ul>
                                            {['oud-woody', 'floral-fresh', 'oriental-spicy', 'sweet-gourmand', 'incense-resin', 'fresh-aquatic'].map((family) => (
                                                <li key={family}>
                                                    <div className="radio radio-danger">
                                                        <input
                                                            name="family"
                                                            id={`family-${family}`}
                                                            value={family}
                                                            type="radio"
                                                            onChange={(e) => {
                                                                console.log(`Selected family: ${family}`);
                                                            }}
                                                        />
                                                        <label htmlFor={`family-${family}`}>
                                                            {family.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' & ')}
                                                        </label>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12 shop-content-right">
                            <div className="right-product-box">
                                <div className="product-item-filter row">
                                    <div className="col-12 col-sm-8 text-center text-sm-left">
                                        <div className="toolbar-sorter-right">
                                            <span>Sort by </span>
                                            <select
                                                id="basic"
                                                className="selectpicker show-tick form-control"
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                            >
                                                <option value="default">Default</option>
                                                <option value="popularity">Popularity</option>
                                                <option value="price-high">Price: High to Low</option>
                                                <option value="price-low">Price: Low to High</option>
                                                <option value="best-selling">Best Selling</option>
                                            </select>
                                        </div>
                                        <p>Showing {filteredProducts.length} of {allProducts.length} results</p>
                                    </div>
                                    <div className="col-12 col-sm-4 text-center text-sm-right">
                                        <ul className="nav nav-tabs ml-auto">
                                            <li>
                                                <a
                                                    className={`nav-link ${viewMode === 'grid' ? 'active' : ''}`}
                                                    onClick={() => setViewMode('grid')}
                                                >
                                                    <i className="fa fa-th"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className={`nav-link ${viewMode === 'list' ? 'active' : ''}`}
                                                    onClick={() => setViewMode('list')}
                                                >
                                                    <i className="fa fa-list-ul"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="row product-categorie-box">
                                    <div className="tab-content">
                                        <div
                                            role="tabpanel"
                                            className={`tab-pane fade ${viewMode === 'grid' ? 'show active' : ''}`}
                                            id="grid-view"
                                        >
                                            <div className="row">
                                                {filteredProducts.length > 0 ? (
                                                    filteredProducts.map(product => renderProductCard(product))
                                                ) : (
                                                    <div className="col-12 text-center py-5">
                                                        <h3>No products found</h3>
                                                        <p>Try adjusting your search or filter criteria</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            role="tabpanel"
                                            className={`tab-pane fade ${viewMode === 'list' ? 'show active' : ''}`}
                                            id="list-view"
                                        >
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map(product => renderListView(product))
                                            ) : (
                                                <div className="text-center py-5">
                                                    <h3>No products found</h3>
                                                    <p>Try adjusting your search or filter criteria</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Sidebar */}
            <div className={`side-cart-overlay ${isCartOpen ? 'active' : ''}`} onClick={() => setIsCartOpen(false)}></div>
            <div className={`side-cart ${isCartOpen ? 'open' : ''}`}>
                <button className="close-side-cart" onClick={() => setIsCartOpen(false)}>
                    <i className="fa fa-times"></i>
                </button>

                <CartContent onClose={() => setIsCartOpen(false)} />
            </div>
        </>
    );
};

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

export default Shop;