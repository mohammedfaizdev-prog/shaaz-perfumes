// src/components/Home.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const Home = () => {
    const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useShop();
    const [activeFilter, setActiveFilter] = useState('all')
    const [currentSlide, setCurrentSlide] = useState(0)
    const [notification, setNotification] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const slides = [
        { img: 'images/hero-banner-1.png', title: 'Luxury Arabian Perfumes', subtitle: 'Discover Timeless Elegance' },
        { img: 'images/hero-banner2.png', title: 'Premium Oud Collection', subtitle: 'Authentic & Rich Aromas' },
        { img: 'images/hero-banner3.png', title: 'Exclusive Attars', subtitle: 'Handcrafted Perfection' }
    ]

    const products = [
        { id: 1, name: 'Aqua Di Gio', description: 'Fresh • Aquatic • Refined', price: 7.79, category: 'best-seller', badge: 'Sale', image: 'images/product1.jpeg' },
        { id: 2, name: 'Oud Wood', description: 'Deep • Earthy • Powerful', price: 9.79, category: 'top-featured', badge: 'New', image: 'images/product2.jpeg' },
        { id: 3, name: 'Imagination', description: 'Inspired • Bold • Limitless', price: 10.79, category: 'top-featured', badge: 'Sale', image: 'images/product3.jpeg' },
        { id: 4, name: 'Angel Share', description: 'Rich • Warm • Unforgettable', price: 15.79, category: 'best-seller', badge: 'Sale', image: 'images/product4.jpeg' },
        { id: 5, name: 'Royal Oud', description: 'Majestic • Woody • Intense', price: 18.99, category: 'top-featured', badge: 'Best', image: 'images/product5.jpeg' },
        { id: 6, name: 'Musk Al Tahara', description: 'Clean • Soft • Elegant', price: 12.49, category: 'best-seller', badge: 'New', image: 'images/product6.jpeg' },
        { id: 7, name: 'Bakhoor Malaki', description: 'Smoky • Rich • Traditional', price: 24.99, category: 'top-featured', badge: 'Hot', image: 'images/product1.jpeg' },
        { id: 8, name: 'Amber Oud', description: 'Sweet • Warm • Addictive', price: 14.99, category: 'best-seller', badge: 'Sale', image: 'images/product2.jpeg' }
    ]

    const filteredProducts = activeFilter === 'all'
        ? products
        : products.filter(p => p.category === activeFilter)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length])

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

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
        // Open cart sidebar after adding item
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

    return (
        <>
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <style jsx>{`
                /* ========== NOTIFICATION STYLES ========== */
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

                /* ========== GLOBAL RESET - PREVENT HORIZONTAL SCROLL ========== */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                html, body {
                    overflow-x: hidden !important;
                    width: 100%;
                    position: relative;
                }
                
                .home-container {
                    overflow-x: hidden !important;
                    width: 100%;
                    max-width: 100%;
                    position: relative;
                }
                
                /* Prevent any element from causing horizontal scroll */
                .home-container * {
                    max-width: 100%;
                }
                
                /* Fix for row margins causing horizontal scroll */
                .row {
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                }
                
                .container, .container-fluid {
                    overflow-x: hidden !important;
                    padding-left: 15px !important;
                    padding-right: 15px !important;
                }
                
                /* ========== ENHANCED ANIMATIONS ========== */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.3);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes glowPulse {
                    0%, 100% { box-shadow: 0 0 5px rgba(202,169,104,0.3); }
                    50% { box-shadow: 0 0 20px rgba(202,169,104,0.6); }
                }
                
                /* ========== SLIDESHOW ========== */
                .hero-slideshow {
                    position: relative;
                    width: 100%;
                    height: 85vh;
                    min-height: 600px;
                    overflow: hidden;
                }
                
                .slide-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                
                .slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity 1s ease-in-out;
                }
                
                .slide.active {
                    opacity: 1;
                    z-index: 1;
                }
                
                .slide-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: brightness(0.7);
                    transition: transform 8s ease;
                }
                
                .slide.active .slide-bg {
                    transform: scale(1.05);
                }
                
                .slide-content {
                    position: relative;
                    z-index: 2;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: white;
                    padding: 0 20px;
                }
                
                .slide-content h1 {
                    font-size: 4.5rem;
                    font-weight: 700;
                    color: rgb(202, 169, 104);
                    margin-bottom: 20px;
                    letter-spacing: 3px;
                    text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
                    animation: fadeInUp 0.8s ease forwards;
                }
                
                .slide-content p {
                    font-size: 1.4rem;
                    margin-bottom: 30px;
                    letter-spacing: 1px;
                    text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
                    animation: fadeInUp 0.8s ease 0.2s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .shop-btn {
                    background: #CAA968;
                    color: #06140d;
                    padding: 14px 42px;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 600;
                    letter-spacing: 2px;
                    transition: all 0.3s ease;
                    display: inline-block;
                    border: none;
                    cursor: pointer;
                    animation: fadeInUp 0.8s ease 0.4s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .shop-btn:hover {
                    background: #d4b87a;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                }
                
                .slide-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0,0,0,0.5);
                    color: white;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255,255,255,0.3);
                }
                
                .slide-nav:hover {
                    background: #CAA968;
                    transform: translateY(-50%) scale(1.1);
                }
                
                .slide-nav.prev { left: 30px; }
                .slide-nav.next { right: 30px; }
                
                .slide-dots {
                    position: absolute;
                    bottom: 30px;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    z-index: 10;
                }
                
                .dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.5);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .dot.active {
                    background: #CAA968;
                    width: 30px;
                    border-radius: 10px;
                }
                
                /* ========== HERO VIDEO SECTION ========== */
                .hero-video-section {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    min-height: 700px;
                    max-height: 900px;
                    overflow: hidden;
                    margin: 0;
                    padding: 0;
                }
                
                .hero-video {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    transition: transform 10s ease;
                }
                
                .hero-video-section:hover .hero-video {
                    transform: scale(1.03);
                }
                
                .hero-video-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.55);
                    z-index: 1;
                }
                
                .hero-video-content {
                    position: relative;
                    z-index: 2;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: white;
                    padding: 0 20px;
                }
                
                .hero-video-content h1 {
                    font-size: 5rem;
                    font-weight: 700;
                    color: rgb(202, 169, 104);
                    margin-bottom: 25px;
                    letter-spacing: 4px;
                    text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
                    animation: fadeInUp 1s ease forwards;
                }
                
                .hero-video-content p {
                    font-size: 1.6rem;
                    margin-bottom: 35px;
                    letter-spacing: 2px;
                    text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
                    max-width: 800px;
                    animation: fadeInUp 1s ease 0.3s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .hero-video-content .shop-btn {
                    animation: bounceIn 0.8s ease 0.6s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                /* ========== BRAND STORY ========== */
                .brand-story {
                    background: linear-gradient(135deg, #052105 0%, #3f9966 100%);
                    padding: 100px 0;
                    position: relative;
                    overflow: hidden;
                }
                
                .brand-story::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -30%;
                    width: 80%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(202,169,104,0.08) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: float 8s ease-in-out infinite;
                }
                
                .brand-story h2 {
                    color: #CAA968;
                    font-size: 3.5rem;
                    letter-spacing: 4px;
                    margin-bottom: 25px;
                    animation: fadeInUp 0.8s ease forwards;
                }
                
                .brand-story p {
                    color: #d6c7a1;
                    max-width: 800px;
                    margin: auto;
                    font-size: 1.2rem;
                    line-height: 1.8;
                    animation: fadeInUp 0.8s ease 0.2s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                /* ========== CATEGORIES ========== */
                .categories-shop {
                    padding: 80px 0;
                    background: #f8f6f2;
                }
                
                .shop-cat-box {
                    position: relative;
                    height: 450px;
                    margin-bottom: 30px;
                    border-radius: 20px;
                    overflow: hidden;
                    cursor: pointer;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    transition: all 0.4s ease;
                    animation: fadeInUp 0.6s ease backwards;
                }
                
                .shop-cat-box:nth-child(1) { animation-delay: 0.1s; }
                .shop-cat-box:nth-child(2) { animation-delay: 0.2s; }
                
                .shop-cat-box:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                }
                
                .shop-cat-box img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center;
                    transition: transform 0.6s ease;
                    background: #f8f6f2;
                }
                
                .shop-cat-box:hover img {
                    transform: scale(1.08);
                }
                
                .shop-cat-box .btn {
                    position: absolute;
                    bottom: 25px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: linear-gradient(135deg, #052105 0%, #3f9966 100%);
                    color: #fff;
                    padding: 12px 30px;
                    border-radius: 40px;
                    text-decoration: none;
                    font-weight: 600;
                    letter-spacing: 1px;
                    backdrop-filter: blur(5px);
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }
                
                .shop-cat-box .btn:hover {
                    background: linear-gradient(135deg, #052105 0%, #3f9966 100%);
                    color: #06140d;
                    transform: translateX(-50%) translateY(-3px);
                }
                
                /* ========== PRODUCTS SECTION ========== */
                .products-box {
                    padding: 80px 0;
                    background: #ffffff;
                }
                
                .title-all {
                    text-align: center;
                    margin-bottom: 50px;
                }
                
                .title-all h1 {
                    font-size: 3rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, #1a1a1a 0%, #CAA968 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 20px;
                    animation: fadeInDown 0.6s ease forwards;
                }
                
                .title-all p {
                    color: #666;
                    max-width: 700px;
                    margin: 0 auto;
                    font-size: 1.1rem;
                    line-height: 1.7;
                    animation: fadeInUp 0.6s ease 0.2s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .filter-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    flex-wrap: wrap;
                    margin-bottom: 50px;
                }
                
                .filter-btn {
                    background: transparent;
                    border: 2px solid #CAA968;
                    padding: 10px 32px;
                    border-radius: 50px;
                    font-weight: 600;
                    color: #333;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    animation: scaleIn 0.4s ease backwards;
                }
                
                .filter-btn:nth-child(1) { animation-delay: 0.05s; }
                .filter-btn:nth-child(2) { animation-delay: 0.1s; }
                .filter-btn:nth-child(3) { animation-delay: 0.15s; }
                
                .filter-btn.active,
                .filter-btn:hover {
                    background: #CAA968;
                    color: #fff;
                    transform: translateY(-2px);
                }
                
                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 30px;
                }
                
                .product-card {
                    background: #fff;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                    transition: all 0.4s ease;
                    animation: fadeInUp 0.5s ease backwards;
                    position: relative;
                }
                
                .product-card:nth-child(1) { animation-delay: 0.05s; }
                .product-card:nth-child(2) { animation-delay: 0.1s; }
                .product-card:nth-child(3) { animation-delay: 0.15s; }
                .product-card:nth-child(4) { animation-delay: 0.2s; }
                .product-card:nth-child(5) { animation-delay: 0.25s; }
                .product-card:nth-child(6) { animation-delay: 0.3s; }
                .product-card:nth-child(7) { animation-delay: 0.35s; }
                .product-card:nth-child(8) { animation-delay: 0.4s; }
                
                .product-card:hover {
                    transform: translateY(-12px);
                    box-shadow: 0 25px 45px rgba(0,0,0,0.15);
                }
                
                .product-image {
                    position: relative;
                    overflow: hidden;
                    height: 300px;
                }
                
                .product-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }
                
                .product-card:hover .product-image img {
                    transform: scale(1.1);
                }
                
                .product-badge {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: #CAA968;
                    color: #fff;
                    padding: 5px 15px;
                    border-radius: 25px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    z-index: 2;
                    animation: pulse 2s infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                .product-badge.new { background: #28a745; }
                .product-badge.sale { background: #dc3545; }
                .product-badge.best { background: #ffc107; color: #333; }
                .product-badge.hot { background: #fd7e14; }
                
                .product-overlay {
                    position: absolute;
                    bottom: -100%;
                    left: 0;
                    width: 100%;
                    background: rgba(0,0,0,0.85);
                    padding: 15px;
                    transition: bottom 0.3s ease;
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                }
                
                .product-card:hover .product-overlay {
                    bottom: 0;
                }
                
                .overlay-btn {
                    background: #CAA968;
                    color: #06140d;
                    padding: 8px 20px;
                    border-radius: 30px;
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .overlay-btn:hover {
                    background: #fff;
                    transform: scale(1.05);
                }
                
                .wishlist-btn {
                    background: rgba(255,255,255,0.2);
                    color: white;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .wishlist-btn:hover {
                    background: #dc3545;
                    transform: scale(1.1);
                }
                
                .wishlist-btn.active {
                    background: #CAA968;
                    color: #06140d;
                }
                
                .wishlist-btn.active:hover {
                    background: #dc3545;
                    color: white;
                }
                
                .product-info {
                    padding: 20px;
                    text-align: center;
                }
                
                .product-info h4 {
                    font-size: 1.1rem;
                    margin-bottom: 8px;
                    color: #333;
                    transition: color 0.3s ease;
                }
                
                .product-card:hover .product-info h4 {
                    color: #CAA968;
                }
                
                .product-info .price {
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: #CAA968;
                    transition: transform 0.3s ease;
                    display: inline-block;
                }
                
                .product-card:hover .price {
                    transform: scale(1.05);
                }
                
                .product-info .old-price {
                    font-size: 0.9rem;
                    color: #999;
                    text-decoration: line-through;
                    margin-left: 10px;
                }
                
                /* ========== WHY CHOOSE US ========== */
                .why-choose-section {
                    background: linear-gradient(135deg, #052105 0%, #3f9966 100%);
                    padding: 100px 0;
                    position: relative;
                }
                
                .section-badge {
                    color: #CAA968;
                    letter-spacing: 4px;
                    font-size: x-large;
                    text-transform: uppercase;
                    display: inline-block;
                    margin-bottom: 15px;
                    animation: fadeInUp 0.6s ease forwards;
                }
                
                .why-choose-section h2 {
                    animation: fadeInUp 0.6s ease 0.1s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .why-choose-section p {
                    animation: fadeInUp 0.6s ease 0.2s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .why-card {
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(10px);
                    padding: 40px 25px;
                    border-radius: 25px;
                    text-align: center;
                    transition: all 0.4s ease;
                    height: 100%;
                    border: 1px solid rgba(202,169,104,0.2);
                    animation: fadeInUp 0.6s ease backwards;
                }
                
                .why-card:nth-child(1) { animation-delay: 0.1s; }
                .why-card:nth-child(2) { animation-delay: 0.2s; }
                .why-card:nth-child(3) { animation-delay: 0.3s; }
                .why-card:nth-child(4) { animation-delay: 0.4s; }
                
                .why-card:hover {
                    transform: translateY(-10px);
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(202,169,104,0.5);
                    animation: glowPulse 0.5s ease;
                }
                
                .why-icon {
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, rgba(202,169,104,0.2) 0%, rgba(202,169,104,0.05) 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 25px;
                    font-size: 2.5rem;
                    color: #CAA968;
                    transition: all 0.3s ease;
                }
                
                .why-card:hover .why-icon {
                    transform: scale(1.1) rotate(360deg);
                    background: rgba(202,169,104,0.3);
                }
                
                .why-card h3 {
                    color: #fff;
                    font-size: 1.4rem;
                    margin-bottom: 15px;
                    transition: color 0.3s ease;
                }
                
                .why-card:hover h3 {
                    color: #CAA968;
                }
                
                .why-card p {
                    color: #cbb892;
                    line-height: 1.7;
                }
                
                /* ========== ABOUT SECTION ========== */
                .about-section {
                    padding: 100px 0;
                    background: #ffffff;
                }
                
                .about-image-wrapper {
                    position: relative;
                    border-radius: 30px;
                    overflow: hidden;
                    box-shadow: 0 30px 50px rgba(0,0,0,0.3);
                    animation: fadeInLeft 0.8s ease forwards;
                }
                
                .about-image-wrapper img {
                    width: 100%;
                    height: auto;
                    display: block;
                    transition: transform 0.5s ease;
                }
                
                .about-image-wrapper:hover img {
                    transform: scale(1.03);
                }
                
                .experience-badge {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    background: #CAA968;
                    padding: 15px 25px;
                    border-radius: 15px;
                    text-align: center;
                    animation: bounceIn 0.6s ease 0.5s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .experience-badge .years {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #06140d;
                    line-height: 1;
                }
                
                .experience-badge .text {
                    font-size: 0.75rem;
                    color: #06140d;
                    font-weight: 600;
                }
                
                .about-section .col-lg-6:last-child {
                    animation: fadeInRight 0.8s ease forwards;
                }
                
                .feature-list {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    margin: 30px 0;
                }
                
                .feature-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    transition: all 0.3s ease;
                }
                
                .feature-item:hover {
                    transform: translateX(5px);
                }
                
                .feature-icon-small {
                    width: 45px;
                    height: 45px;
                    background: rgba(202,169,104,0.15);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #CAA968;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                }
                
                .feature-item:hover .feature-icon-small {
                    background: rgba(202,169,104,0.3);
                    transform: rotate(360deg) scale(1.1);
                }
                
                .feature-item span {
                    color: #000000;
                    font-weight: 500;
                }
                
                .explore-btn {
                    background: #CAA968;
                    color: #06140d;
                    padding: 14px 40px;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 600;
                    letter-spacing: 1px;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.3s ease;
                    margin-top: 20px;
                }
                
                .explore-btn:hover {
                    background: #d4b87a;
                    transform: translateX(5px);
                    gap: 15px;
                }
                
                /* ========== NEWSLETTER ========== */
                .newsletter-section {
                    padding: 80px 0;
                    background: linear-gradient(135deg, #052105 0%, #3f9966 100%);
                    text-align: center;
                }
                
                .newsletter-content {
                    animation: scaleIn 0.6s ease forwards;
                }
                
                .newsletter-content h3 {
                    color: #CAA968;
                    font-size: 2rem;
                    margin-bottom: 15px;
                }
                
                .newsletter-content p {
                    color: #ccc;
                    margin-bottom: 30px;
                }
                
                .newsletter-form {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    flex-wrap: wrap;
                    max-width: 500px;
                    margin: 0 auto;
                }
                
                .newsletter-form input {
                    flex: 1;
                    padding: 15px 25px;
                    border: none;
                    border-radius: 50px;
                    background: rgba(255,255,255,0.1);
                    color: white;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }
                
                .newsletter-form input:focus {
                    outline: none;
                    background: rgba(255,255,255,0.2);
                    transform: scale(1.02);
                }
                
                .newsletter-form input::placeholder {
                    color: rgba(255,255,255,0.5);
                }
                
                .newsletter-form button {
                    background: #CAA968;
                    border: none;
                    padding: 15px 35px;
                    border-radius: 50px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .newsletter-form button:hover {
                    background: #d4b87a;
                    transform: scale(1.02);
                }

                /* ========== CART SIDEBAR STYLES ========== */
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
                
                /* ========== RESPONSIVE FIXES - PREVENT HORIZONTAL SCROLL ========== */
                @media (max-width: 1200px) {
                    .container {
                        max-width: 95% !important;
                    }
                }
                
                @media (max-width: 992px) {
                    .hero-slideshow, .hero-video-section { 
                        height: 70vh; 
                        min-height: 500px; 
                    }
                    .slide-content h1, .hero-video-content h1 { 
                        font-size: 3rem; 
                    }
                    .hero-video-content p { 
                        font-size: 1.2rem; 
                    }
                    .brand-story h2 { 
                        font-size: 2.5rem; 
                    }
                    .title-all h1 { 
                        font-size: 2.2rem; 
                    }
                    .about-section .row { 
                        flex-direction: column; 
                    }
                    .about-image-wrapper { 
                        margin-bottom: 40px; 
                    }
                    .products-grid {
                        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                        gap: 20px;
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
                }
                
                @media (max-width: 768px) {
                    .hero-slideshow, .hero-video-section { 
                        height: 60vh; 
                        min-height: 450px; 
                    }
                    .slide-content h1, .hero-video-content h1 { 
                        font-size: 2rem; 
                    }
                    .slide-content p, .hero-video-content p { 
                        font-size: 1rem; 
                    }
                    .hero-video-content h1 { 
                        font-size: 2.2rem; 
                    }
                    .hero-video-content p { 
                        font-size: 1rem; 
                    }
                    .slide-nav { 
                        width: 40px; 
                        height: 40px; 
                    }
                    .slide-nav.prev { 
                        left: 15px; 
                    }
                    .slide-nav.next { 
                        right: 15px; 
                    }
                    .filter-btn { 
                        padding: 8px 20px; 
                        font-size: 0.85rem; 
                    }
                    .products-grid { 
                        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                        gap: 15px;
                    }
                    .feature-list { 
                        grid-template-columns: 1fr; 
                    }
                    .shop-cat-box .btn {
                        padding: 8px 20px;
                        font-size: 0.85rem;
                        white-space: nowrap;
                    }
                    .shop-cat-box img {
                        height: 220px;
                    }
                    .why-card {
                        padding: 30px 20px;
                    }
                    .newsletter-form input,
                    .newsletter-form button {
                        width: 100%;
                    }
                }
                
                @media (max-width: 576px) {
                    .hero-slideshow, .hero-video-section { 
                        height: 50vh; 
                        min-height: 400px; 
                    }
                    .slide-content h1, .hero-video-content h1 { 
                        font-size: 1.5rem; 
                    }
                    .hero-video-content p { 
                        font-size: 0.9rem; 
                    }
                    .shop-btn { 
                        padding: 10px 25px; 
                        font-size: 0.85rem; 
                    }
                    .brand-story h2 { 
                        font-size: 1.8rem; 
                    }
                    .brand-story p { 
                        font-size: 1rem; 
                    }
                    .title-all h1 { 
                        font-size: 1.8rem; 
                    }
                    .title-all p {
                        font-size: 0.95rem;
                        padding: 0 15px;
                    }
                    .products-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    .product-image {
                        height: 250px;
                    }
                    .filter-buttons {
                        gap: 10px;
                    }
                    .filter-btn {
                        padding: 6px 16px;
                        font-size: 0.75rem;
                    }
                    .experience-badge {
                        padding: 10px 15px;
                    }
                    .experience-badge .years {
                        font-size: 1.5rem;
                    }
                    .why-card h3 {
                        font-size: 1.2rem;
                    }
                }
                
                /* Fix for any potential overflow from images */
                img {
                    max-width: 100%;
                    height: auto;
                }
                
                /* Fix for Bootstrap columns on mobile */
                [class*="col-"] {
                    padding-left: 15px;
                    padding-right: 15px;
                }
                
                /* Prevent touch swipe from revealing white space */
                body {
                    touch-action: pan-y pinch-zoom;
                }

                /* ========== CRITICAL HEADER FIX - Allow dropdowns to display ========== */
                .main-header,
                .navbar,
                .container,
                .container-fluid {
                    overflow: visible !important;
                }
                
                .main-header .container,
                .main-header .container-fluid {
                    overflow: visible !important;
                }
                
                .navbar .container {
                    overflow: visible !important;
                }
                
                .main-header .container,
                .main-header .container-fluid,
                header .container,
                header .container-fluid,
                .main-header > div > .container,
                .navbar > .container {
                    overflow-x: visible !important;
                }

                /* ========== CONNECT WITH US ========== */

.social-connect-section {
  padding: 90px 0;
  background: #f8f8f8;
}

.social-heading {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 50px;
  color: #1a1a1a;
}

.social-grid {
  display: flex;
  justify-content: center;
  gap: 35px;
  flex-wrap: wrap;
}

.social-card {
  width: 220px;
  height: 110px;
  border: 1px solid #d7d7d7;
  border-radius: 25px;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;
  transition: all 0.4s ease;
}

.social-card i {
  font-size: 50px;
  color: #000000;
  transition: all 0.4s ease;
}

.social-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.social-card:hover i {
  color: #fff;
}

.linkedin:hover {
  background: #0077b5;
}

.facebook:hover {
  background: #1877f2;
}

.instagram:hover {
  background: linear-gradient(
    45deg,
    #f09433,
    #e6683c,
    #dc2743,
    #cc2366,
    #bc1888
  );
}

.youtube:hover {
  background: #ff0000;
}

.twitter:hover {
  background: #1da1f2;
}
            `}</style>

            <div className="home-container">
                {/* Hero Slideshow */}
                <div className="hero-slideshow">
                    <div className="slide-container">
                        {slides.map((slide, index) => (
                            <div key={index} className={`slide ${currentSlide === index ? 'active' : ''}`}>
                                <img src={slide.img} alt="" className="slide-bg" />
                                <div className="slide-content">
                                    <h1>{slide.title}</h1>
                                    <p>{slide.subtitle}</p>
                                    <Link to="/shop" className="shop-btn">SHOP NOW →</Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="slide-nav prev" onClick={prevSlide}>
                        <i className="fas fa-chevron-left"></i>
                    </div>
                    <div className="slide-nav next" onClick={nextSlide}>
                        <i className="fas fa-chevron-right"></i>
                    </div>

                    <div className="slide-dots">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`dot ${currentSlide === index ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Brand Story */}
                <section className="brand-story">
                    <div className="container text-center">
                        <h2>Crafted For Timeless Luxury</h2>
                        <p>Discover authentic Arabian perfume oils, rich oud wood chips, bakhoor collections, and handcrafted attars designed to elevate every moment with elegance and tradition.</p>
                    </div>
                </section><br />

                {/* Hero Video Section */}
                <div className="hero-video-section">
                    <video className="hero-video" autoPlay loop muted playsInline>
                        <source src="video/hero.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="hero-video-overlay"></div>
                    <div className="hero-video-content">
                        <h1>Experience the Essence of Luxury</h1>
                        <p>Discover Our Exquisite Collection of Arabian Perfumes</p>
                        <Link to="/shop" className="shop-btn">DISCOVER MORE →</Link>
                    </div>
                </div>

                {/* Categories */}
                <div className="categories-shop">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <div className="shop-cat-box">
                                    <img src="images/product1.jpeg" alt="" />
                                    <Link to="/shop" className="btn" style={{ background: '#194a3f' }}>Designer Inspired Oils</Link>
                                </div>
                                <div className="shop-cat-box">
                                    <img src="images/product2.jpeg" alt="" />
                                    <Link to="/shop" className="btn" style={{ background: '#2a0808' }}>Premium Oud Chips</Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <div className="shop-cat-box">
                                    <img src="images/product3.jpeg" alt="" />
                                    <Link to="/shop" className="btn" style={{ background: '#1b8369' }}>Luxury Bakhoor</Link>
                                </div>
                                <div className="shop-cat-box">
                                    <img src="images/product4.jpeg" alt="" />
                                    <Link to="/shop" className="btn" style={{ background: '#962f2f' }}>Arabic Attars</Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <div className="shop-cat-box">
                                    <img src="images/product5.jpeg" alt="" />
                                    <Link to="/shop" className="btn">Designer Inspired Oils</Link>
                                    <Link to="/shop" className="btn" style={{ background: '#b57192' }}>Gift Collections</Link>
                                </div>
                                <div className="shop-cat-box">
                                    <img src="images/product6.jpeg" alt="" />
                                    <Link to="/shop" className="btn" style={{ background: '#2e0909' }}>Signature Musk Oils</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className="products-box">
                    <div className="container">
                        <div className="title-all">
                            <h1>Signature Fragrance Collection</h1>
                            <p>Discover our finest Arabian perfume oils, luxurious oud blends, and handcrafted fragrances inspired by timeless elegance and Middle Eastern heritage.</p>
                        </div>

                        <div className="filter-buttons">
                            <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
                            <button className={`filter-btn ${activeFilter === 'top-featured' ? 'active' : ''}`} onClick={() => setActiveFilter('top-featured')}>Top Featured</button>
                            <button className={`filter-btn ${activeFilter === 'best-seller' ? 'active' : ''}`} onClick={() => setActiveFilter('best-seller')}>Best Seller</button>
                        </div>

                        <div className="products-grid">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="product-card">
                                    <div className="product-image">
                                        <img src={product.image} alt={product.name} />
                                        <div className={`product-badge ${product.badge.toLowerCase()}`}>{product.badge}</div>
                                        <div className="product-overlay">
                                            <button
                                                className="overlay-btn"
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                Add to Cart
                                            </button>
                                            <button
                                                className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                                                onClick={() => handleToggleWishlist(product)}
                                            >
                                                <i className={isInWishlist(product.id) ? "fas fa-heart" : "far fa-heart"}></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h4>{product.name}</h4>
                                        <p style={{ fontSize: 'large', color: '#000000', marginBottom: '8px', textAlign: 'center' }}>{product.description}</p>
                                        <span className="price">${product.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Why Choose Us */}
                <section className="why-choose-section">
                    <div className="container">
                        <div className="text-center mb-5">
                            <span className="section-badge">Why Choose Us</span>
                            <h2 style={{ color: '#fff', fontSize: '3rem', fontWeight: '700' }}>Why Choose Shaaz</h2>
                            <p style={{ color: '#cbb892', maxWidth: '700px', margin: '15px auto 0', fontSize: '1.1rem' }}>Experience the richness of authentic Arabian fragrances crafted with premium ingredients, luxurious presentation, and timeless elegance.</p>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="why-card">
                                    <div className="why-icon" style={{ background: '#C7212F' }}><i className="fas fa-fire"></i></div>
                                    <h3>Long Lasting Fragrance</h3>
                                    <p>Rich concentrated perfume oils designed to leave a memorable impression throughout the day.</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="why-card">
                                    <div className="why-icon" style={{ background: '#F26A2E' }}><i className="fas fa-crown"></i></div>
                                    <h3>Authentic Arabian Oud</h3>
                                    <p>Carefully sourced oud wood and bakhoor inspired by traditional Middle Eastern fragrance heritage.</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="why-card">
                                    <div className="why-icon" style={{ background: '#E01483' }}><i className="fas fa-gift"></i></div>
                                    <h3>Luxury Gift Packaging</h3>
                                    <p>Elegant premium packaging crafted to create a refined and unforgettable gifting experience.</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="why-card">
                                    <div className="why-icon" style={{ background: '#14496B' }}><i className="fas fa-gem"></i></div>
                                    <h3>Premium Ingredients</h3>
                                    <p>Crafted using luxurious fragrance oils, musk blends, exotic oud, and carefully selected ingredients.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section><br />

                {/* About Section */}
                <section className="about-section">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                <div className="about-image-wrapper">
                                    <img src="images/about-luxury.png" alt="Shaaz Perfumes" />
                                    <div className="experience-badge">
                                        <div className="years">10+</div>
                                        <div className="text">Years of Excellence</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <span className="section-badge">About Shaaz</span>
                                <h2 style={{ color: '#000000', fontSize: '3rem', fontWeight: '700', lineHeight: '1.2', marginBottom: '20px' }}>The Essence Of <br />Arabian Luxury</h2>
                                <p style={{ color: '#000000', lineHeight: '1.8', marginBottom: '20px' }}>At Shaaz Perfumes, we craft luxurious Arabian fragrance experiences inspired by timeless traditions and premium ingredients. Our collection features authentic oud oils, bakhoor, musk blends, and handcrafted attars designed for those who appreciate elegance and sophistication.</p>
                                <p style={{ color: '#000000', lineHeight: '1.8', marginBottom: '25px' }}>Every fragrance is carefully curated to create a rich, long-lasting aroma that reflects royalty, luxury, and the deep heritage of Middle Eastern perfumery.</p>

                                <div className="feature-list">
                                    <div className="feature-item">
                                        <div className="feature-icon-small"><i className="fas fa-gem"></i></div>
                                        <span>Premium Ingredients</span>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon-small"><i className="fas fa-crown"></i></div>
                                        <span>Luxury Packaging</span>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon-small"><i className="fas fa-fire"></i></div>
                                        <span>Authentic Oud</span>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon-small"><i className="fas fa-star"></i></div>
                                        <span>Long Lasting</span>
                                    </div>
                                </div>

                                <a href="#" className="explore-btn">Explore Collection →</a>
                            </div>
                        </div>
                    </div>
                </section><br />

                {/* Connect With Us */}
                <section className="social-connect-section">
                    <div className="container">
                        <h2 className="social-heading">Connect with Us</h2>

                        <div className="social-grid">

                            <a href="#" className="social-card linkedin">
  <i className="fab fa-linkedin-in"></i>
</a>

<a href="#" className="social-card facebook">
  <i className="fab fa-facebook-f"></i>
</a>

<a href="#" className="social-card instagram">
  <i className="fab fa-instagram"></i>
</a>

<a href="#" className="social-card youtube">
  <i className="fab fa-youtube"></i>
</a>

{/* <a href="#" className="social-card twitter">
  <i className="fab fa-twitter"></i>
</a> */}

                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                {/* <section className="newsletter-section">
                    <div className="container">
                        <div className="newsletter-content">
                            <h3>Stay Updated With Latest Offers</h3>
                            <p style={{ textAlign: 'center' }}>Subscribe to our newsletter and get 10% off on your first order</p>
                            <div className="newsletter-form">
                                <input type="email" placeholder="Your email address" />
                                <button>Subscribe</button>
                            </div>
                        </div>
                    </div>
                </section><br /> */}
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

export default Home