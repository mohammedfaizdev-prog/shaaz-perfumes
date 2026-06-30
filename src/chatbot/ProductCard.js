// src/chatbot/ProductCard.jsx
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

const ProductCard = ({ product, compact = false }) => {
    const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useShop();
    const [isAdding, setIsAdding] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product.id));

    const handleAddToCart = async () => {
        setIsAdding(true);
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
        }, 1);
        
        // Visual feedback
        setTimeout(() => setIsAdding(false), 600);
    };

    const handleToggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
            setIsWishlisted(false);
        } else {
            addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category
            });
            setIsWishlisted(true);
        }
    };

    const handleViewDetails = () => {
        // Store product in session for detail page
        sessionStorage.setItem('viewProduct', JSON.stringify(product));
        window.location.href = '/#/cart';
    };

    // Render stars
    const renderStars = () => {
        const rating = product.rating || 4.5;
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        let stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }
        if (hasHalfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="far fa-star" style={{ opacity: 0.3 }}></i>);
        }
        return stars;
    };

    // Get badge
    const getBadge = () => {
        if (product.badge) return product.badge;
        if (product.category === 'best-seller') return 'bestseller';
        if (product.price > 15) return 'premium';
        if (product.longevity === 'very long') return 'long lasting';
        return null;
    };

    const badge = getBadge();

    if (compact) {
        return (
            <div className="product-card-in-chat compact">
                <div className="compact-layout">
                    <img 
                        src={product.image || 'images/default-product.jpg'} 
                        alt={product.name}
                        className="compact-image"
                        onError={(e) => {
                            e.target.src = 'images/default-product.jpg';
                        }}
                    />
                    <div className="compact-info">
                        <div className="product-name-chat">{product.name}</div>
                        <div className="product-rating-chat">
                            {renderStars()} ({product.rating || 4.5})
                        </div>
                        <div className="product-price-chat">
                            ${product.price}
                        </div>
                    </div>
                    <button 
                        className="product-btn-chat add-cart compact-btn"
                        onClick={handleAddToCart}
                        disabled={isAdding}
                    >
                        {isAdding ? (
                            <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                            <i className="fas fa-cart-plus"></i>
                        )}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-card-in-chat">
            <div className="product-image-wrapper">
                <img 
                    src={product.image || 'images/default-product.jpg'} 
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                        e.target.src = 'images/default-product.jpg';
                    }}
                />
                {badge && (
                    <span className={`product-badge-chat ${badge.toLowerCase().replace(' ', '')}`}>
                        {badge}
                    </span>
                )}
            </div>
            <div className="product-info-chat">
                <div className="product-name-chat">{product.name}</div>
                {product.description && (
                    <div className="product-desc-chat">{product.description}</div>
                )}
                <div className="product-price-chat">
                    ${product.price}
                    {product.oldPrice && (
                        <span className="old-price">${product.oldPrice}</span>
                    )}
                </div>
                <div className="product-rating-chat">
                    {renderStars()} ({product.rating || 4.5})
                </div>
                <div className="product-actions-chat">
                    <button 
                        className="product-btn-chat view"
                        onClick={handleViewDetails}
                    >
                        <i className="fas fa-eye"></i> View
                    </button>
                    <button 
                        className="product-btn-chat add-cart"
                        onClick={handleAddToCart}
                        disabled={isAdding}
                    >
                        {isAdding ? (
                            <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                            <><i className="fas fa-cart-plus"></i> Add</>
                        )}
                    </button>
                    <button 
                        className={`product-btn-chat wishlist ${isWishlisted ? 'active' : ''}`}
                        onClick={handleToggleWishlist}
                    >
                        <i className={`fas fa-heart ${isWishlisted ? 'active' : ''}`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;