// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Cart = () => {
    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        applyCoupon,
        removeCoupon,
        getCouponInfo,
        orderSummary,
        clearCart,
        updateOrderSummary,
        getCartTotalPrice
    } = useShop();
    
    const [couponCode, setCouponCode] = useState('');
    const [notification, setNotification] = useState(null);
    const [couponApplied, setCouponApplied] = useState(false);

    useEffect(() => {
        updateOrderSummary();
        // Check if coupon is already applied
        const couponInfo = getCouponInfo();
        if (couponInfo.isApplied) {
            setCouponApplied(true);
        }
    }, [cartItems]);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            const item = cartItems.find(item => item.id === productId);
            removeFromCart(productId);
            showNotification(`${item?.name || 'Item'} removed from cart`, 'info');
            return;
        }
        updateQuantity(productId, newQuantity);
    };

    const handleRemoveItem = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        removeFromCart(productId);
        showNotification(`${item?.name || 'Item'} removed from cart`, 'info');
    };

    const handleApplyCoupon = () => {
        if (couponApplied) {
            showNotification('Coupon already applied!', 'info');
            return;
        }

        if (!couponCode.trim()) {
            showNotification('Please enter a coupon code', 'error');
            return;
        }

        const success = applyCoupon(couponCode);
        if (success) {
            const couponInfo = getCouponInfo();
            let discountMessage = '';
            if (couponInfo.code === 'FREESHIP') {
                discountMessage = 'Free Shipping applied!';
            } else {
                const discountPercent = couponInfo.code === 'SAVE10' ? '10%' : 
                                       couponInfo.code === 'SAVE20' ? '20%' : 
                                       couponInfo.code === 'SAVE30' ? '30%' : '';
                discountMessage = `${discountPercent} off applied!`;
            }
            showNotification(`Coupon applied successfully! ${discountMessage}`, 'success');
            setCouponApplied(true);
            setCouponCode('');
        } else {
            showNotification('Invalid coupon code. Try SAVE10, SAVE20, SAVE30, or FREESHIP', 'error');
        }
    };

    const handleRemoveCoupon = () => {
        removeCoupon();
        setCouponApplied(false);
        showNotification('Coupon removed successfully', 'info');
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            clearCart();
            setCouponApplied(false);
            showNotification('Cart cleared successfully', 'info');
        }
    };

    const getDiscountPercent = () => {
        if (orderSummary.couponDiscount > 0 && orderSummary.subtotal > 0) {
            return ((orderSummary.couponDiscount / orderSummary.subtotal) * 100).toFixed(0);
        }
        return 0;
    };

    const getTieredDiscountPercent = () => {
        if (orderSummary.discount > 0 && orderSummary.subtotal > 0) {
            return ((orderSummary.discount / (orderSummary.subtotal - orderSummary.couponDiscount)) * 100).toFixed(0);
        }
        return 0;
    };

    if (cartItems.length === 0) {
        return (
            <>
                {notification && (
                    <div className={`notification ${notification.type}`}>
                        {notification.message}
                    </div>
                )}
                <div className="cart-box-main">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center py-5">
                                <i className="fas fa-shopping-cart fa-4x mb-3" style={{ color: '#CAA968' }}></i>
                                <h3>Your cart is empty</h3>
                                <p style={{textAlign:'center'}}>Browse our collection and find your perfect fragrance</p>
                                <Link to="/shop" className="btn hvr-hover" style={{color:'white'}}>Continue Shopping</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`
                    .notification {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        padding: 15px 25px;
                        border-radius: 8px;
                        color: white;
                        font-weight: 500;
                        z-index: 9999;
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
                    .btn.hvr-hover {
                        background: #CAA968;
                        color: #0B1F14;
                        padding: 10px 25px;
                        border-radius: 5px;
                        text-decoration: none;
                        display: inline-block;
                        transition: all 0.3s ease;
                    }
                    .btn.hvr-hover:hover {
                        background: #b8962e;
                        transform: translateY(-3px);
                        box-shadow: 0 5px 15px rgba(202,169,104,0.3);
                    }
                `}</style>
            </>
        );
    }

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
                    z-index: 9999;
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
                .cart-box-main {
                    animation: fadeIn 0.6s ease forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .table {
                    animation: fadeInUp 0.5s ease forwards;
                }
                tbody tr {
                    animation: slideInRight 0.4s ease backwards;
                    transition: all 0.3s ease;
                }
                tbody tr:nth-child(1) { animation-delay: 0.05s; }
                tbody tr:nth-child(2) { animation-delay: 0.1s; }
                tbody tr:nth-child(3) { animation-delay: 0.15s; }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                tbody tr:hover {
                    background: rgba(202,169,104,0.05);
                    transform: scale(1.01);
                }
                .thumbnail-img a {
                    display: inline-block;
                    overflow: hidden;
                    border-radius: 10px;
                }
                .thumbnail-img img {
                    transition: transform 0.4s ease;
                }
                .thumbnail-img:hover img {
                    transform: scale(1.1);
                }
                .name-pr a {
                    transition: all 0.3s ease;
                    display: inline-block;
                }
                .name-pr a:hover {
                    color: #CAA968 !important;
                    transform: translateX(5px);
                }
                .price-pr p, .total-pr p {
                    transition: all 0.3s ease;
                }
                tr:hover .price-pr p, tr:hover .total-pr p {
                    color: #CAA968;
                    font-weight: 600;
                }
                
                /* Quantity controls with plus/minus buttons */
                .quantity-controls {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .qty-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 1px solid #ddd;
                    background: #f9f9f9;
                    color: #333;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .qty-btn:hover {
                    background: #CAA968;
                    color: #fff;
                    border-color: #CAA968;
                    transform: scale(1.05);
                }

                .qty-btn:active {
                    transform: scale(0.95);
                }

                .qty-value {
                    min-width: 40px;
                    text-align: center;
                    font-weight: 600;
                    font-size: 16px;
                    color: #0B1F14;
                }

                .remove-pr a {
                    transition: all 0.3s ease;
                    display: inline-block;
                }
                .remove-pr a:hover {
                    transform: scale(1.2);
                    color: #dc3545 !important;
                }

                /* Coupon Box - Improved Mobile Responsive */
                .coupon-box {
                    animation: fadeInUp 0.5s ease backwards;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 10px;
                }
                .coupon-box { animation-delay: 0.2s; }
                
                .coupon-box .input-group {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    width: 100%;
                }
                
                .coupon-box .input-group input {
                    flex: 1;
                    min-width: 200px;
                    height: 45px;
                    padding: 10px 15px;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    background: white;
                }
                
                .coupon-box .input-group input:focus {
                    border-color: #CAA968;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(202,169,104,0.1);
                }
                
                .coupon-box .input-group input:disabled {
                    background: #f0f0f0;
                    cursor: not-allowed;
                    opacity: 0.6;
                }
                
                .coupon-box .input-group-append {
                    display: flex;
                    align-items: center;
                }
                
                .coupon-box .btn-theme {
                    height: 45px;
                    padding: 0 30px;
                    background: #0B1F14;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                    cursor: pointer;
                }
                
                .coupon-box .btn-theme:hover:not(:disabled) {
                    background: #CAA968 !important;
                    transform: translateY(-2px);
                    color: #0B1F14;
                    box-shadow: 0 5px 15px rgba(202,169,104,0.3);
                }
                
                .coupon-box .btn-theme:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none !important;
                }

                .coupon-status {
                    margin-top: 12px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 10px;
                }

                .coupon-applied-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #28a745;
                    color: white;
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 13px;
                    font-weight: 600;
                    animation: fadeIn 0.3s ease;
                    flex-wrap: wrap;
                }

                .btn-remove-coupon {
                    background: rgba(255,255,255,0.2);
                    color: white;
                    border: none;
                    padding: 2px 8px;
                    border-radius: 50%;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-left: 4px;
                }
                .btn-remove-coupon:hover {
                    background: rgba(255,255,255,0.4);
                    transform: scale(1.1);
                }

                .coupon-hint {
                    display: block;
                    font-size: 12px;
                    color: #6c757d;
                    margin-top: 5px;
                }

                /* Clear Cart Button */
                .clear-cart-wrapper {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    height: 100%;
                }

                .btn-clear-cart {
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 10px 25px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 14px;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    height: 45px;
                }
                .btn-clear-cart:hover {
                    background: #c82333;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(220,53,69,0.3);
                }

                /* Order Box */
                .order-box {
                    animation: slideInRight 0.6s ease 0.3s backwards;
                    padding: 25px;
                    background: #f9f9f9;
                    border-radius: 15px;
                    transition: all 0.3s ease;
                }
                .order-box:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(202,169,104,0.1);
                }
                .d-flex {
                    transition: all 0.3s ease;
                }
                .d-flex:hover {
                    transform: translateX(5px);
                }
                .gr-total h5 {
                    transition: color 0.3s ease;
                }
                .order-box:hover .gr-total h5 {
                    color: #CAA968;
                }
                
                .btn.hvr-hover {
                    background: #CAA968;
                    color: #0B1F14;
                    padding: 12px 25px;
                    border-radius: 5px;
                    text-decoration: none;
                    display: inline-block;
                    transition: all 0.3s ease;
                    font-weight: 600;
                    width: 100%;
                    text-align: center;
                }
                .btn.hvr-hover:hover {
                    background: #b8962e;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(202,169,104,0.3);
                }

                .btn-continue-shopping {
                    background: transparent;
                    color: #0B1F14;
                    padding: 12px 25px;
                    border-radius: 5px;
                    text-decoration: none;
                    display: inline-block;
                    transition: all 0.3s ease;
                    font-weight: 600;
                    border: 2px solid #0B1F14;
                    width: 100%;
                    text-align: center;
                    margin-top: 10px;
                }
                .btn-continue-shopping:hover {
                    background: #0B1F14;
                    color: #fff;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }

                .coupon-discount-amount {
                    color: #28a745;
                    font-weight: 600;
                }

                .shipping-free {
                    color: #28a745;
                    font-weight: 600;
                }

                .no-discount-text {
                    color: #999;
                    font-size: 13px;
                }

                /* Mobile Responsive Styles */
                @media (max-width: 768px) {
                    .quantity-controls {
                        justify-content: center;
                    }
                    .qty-btn {
                        width: 28px;
                        height: 28px;
                        font-size: 14px;
                    }
                    .qty-value {
                        min-width: 30px;
                        font-size: 14px;
                    }
                    .btn-continue-shopping {
                        font-size: 14px;
                        padding: 10px 20px;
                    }
                    .order-box {
                        padding: 20px;
                    }

                    .coupon-box {
                        padding: 12px;
                    }

                    .coupon-box .input-group {
                        flex-direction: column;
                        gap: 8px;
                    }

                    .coupon-box .input-group input {
                        min-width: unset;
                        width: 100%;
                        height: 42px;
                        font-size: 13px;
                    }

                    .coupon-box .input-group-append {
                        width: 100%;
                    }

                    .coupon-box .btn-theme {
                        width: 100%;
                        height: 42px;
                        font-size: 13px;
                    }

                    .coupon-status {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                    }

                    .coupon-applied-badge {
                        font-size: 12px;
                        padding: 5px 12px;
                        width: 100%;
                        justify-content: center;
                    }

                    .coupon-hint {
                        font-size: 11px;
                    }

                    .clear-cart-wrapper {
                        justify-content: center;
                        margin-top: 15px;
                    }

                    .btn-clear-cart {
                        width: 100%;
                        justify-content: center;
                        height: 42px;
                        font-size: 13px;
                    }

                    .order-box .d-flex {
                        font-size: 14px;
                    }

                    .order-box h3 {
                        font-size: 20px;
                    }

                    .order-box .gr-total h5 {
                        font-size: 18px;
                    }
                }

                @media (max-width: 576px) {
                    .coupon-box {
                        padding: 10px;
                    }

                    .coupon-box .input-group input {
                        height: 38px;
                        font-size: 12px;
                        padding: 8px 12px;
                    }

                    .coupon-box .btn-theme {
                        height: 38px;
                        font-size: 12px;
                        padding: 0 15px;
                    }

                    .coupon-applied-badge {
                        font-size: 11px;
                        padding: 4px 10px;
                    }

                    .btn-clear-cart {
                        height: 38px;
                        font-size: 12px;
                        padding: 0 15px;
                    }

                    .order-box {
                        padding: 15px;
                    }

                    .order-box .d-flex {
                        font-size: 13px;
                    }

                    .order-box h3 {
                        font-size: 18px;
                    }

                    .order-box .gr-total h5 {
                        font-size: 16px;
                    }

                    .btn.hvr-hover {
                        font-size: 13px;
                        padding: 10px 20px;
                    }

                    .btn-continue-shopping {
                        font-size: 13px;
                        padding: 8px 15px;
                    }
                }
            `}</style>

            <div className="all-title-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Cart</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
                                <li className="breadcrumb-item active">Cart</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cart-box-main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="table-main table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Images</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id}>
                                                <td className="thumbnail-img">
                                                    <Link to={`/shop-detail/${item.id}`}>
                                                        <img className="img-fluid" src={item.image} alt={item.name} style={{width: '80px', height: '80px', objectFit: 'cover'}} />
                                                    </Link>
                                                </td>
                                                <td className="name-pr">
                                                    <Link to={`/shop-detail/${item.id}`}>
                                                        {item.name}
                                                        {item.size && <small className="d-block text-muted">Size: {item.size}</small>}
                                                    </Link>
                                                </td>
                                                <td className="price-pr">
                                                    <p>${item.price.toFixed(2)}</p>
                                                </td>
                                                <td className="quantity-box">
                                                    <div className="quantity-controls">
                                                        <button 
                                                            className="qty-btn minus"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="qty-value">{item.quantity}</span>
                                                        <button 
                                                            className="qty-btn plus"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="total-pr">
                                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                                </td>
                                                <td className="remove-pr">
                                                    <a href="#" onClick={(e) => {
                                                        e.preventDefault();
                                                        handleRemoveItem(item.id);
                                                    }}>
                                                        <i className="fas fa-times"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="row my-5">
                        <div className="col-lg-6 col-sm-12">
                            <div className="coupon-box">
                                <div className="input-group">
                                    <input 
                                        className="form-control" 
                                        placeholder="Enter your coupon code" 
                                        aria-label="Coupon code" 
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        disabled={couponApplied}
                                    />
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-theme" 
                                            type="button"
                                            onClick={handleApplyCoupon}
                                            disabled={couponApplied}
                                        >
                                            Apply Coupon
                                        </button>
                                    </div>
                                </div>
                                <div className="coupon-status">
                                    {couponApplied ? (
                                        <span className="coupon-applied-badge">
                                            ✓ {orderSummary.couponCode} Applied!
                                            {orderSummary.couponDiscount > 0 ? 
                                                ` (${getDiscountPercent()}% off - $${orderSummary.couponDiscount.toFixed(2)})` : 
                                                ' (Free Shipping)'
                                            }
                                            <button 
                                                className="btn-remove-coupon"
                                                onClick={handleRemoveCoupon}
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    ) : (
                                        <span className="coupon-hint">
                                            Try: SAVE10 (10% off), SAVE20 (20% off), SAVE30 (30% off), or FREESHIP
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-12"></div>
                        <div className="col-lg-3 col-sm-12">
                            <div className="clear-cart-wrapper">
                                <button 
                                    className="btn-clear-cart"
                                    onClick={handleClearCart}
                                >
                                    <i className="fas fa-trash-alt"></i> Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row my-5">
                        <div className="col-lg-8 col-sm-12"></div>
                        <div className="col-lg-4 col-sm-12">
                            <div className="order-box">
                                <h3>Order Summary</h3>
                                <div className="d-flex">
                                    <h4>Sub Total</h4>
                                    <div className="ml-auto font-weight-bold">${orderSummary.subtotal.toFixed(2)}</div>
                                </div>
                                {orderSummary.discount > 0 ? (
                                    <div className="d-flex">
                                        <h4>Discount ({getTieredDiscountPercent()}%)</h4>
                                        <div className="ml-auto font-weight-bold text-danger">-${orderSummary.discount.toFixed(2)}</div>
                                    </div>
                                ) : (
                                    <div className="d-flex" style={{ opacity: 0.6 }}>
                                        <h4>Discount</h4>
                                        <div className="ml-auto no-discount-text">$0.00</div>
                                    </div>
                                )}
                                <hr className="my-1" />
                                {orderSummary.couponDiscount > 0 ? (
                                    <div className="d-flex">
                                        <h4>Coupon Discount ({getDiscountPercent()}%)</h4>
                                        <div className="ml-auto font-weight-bold coupon-discount-amount">-${orderSummary.couponDiscount.toFixed(2)}</div>
                                    </div>
                                ) : (
                                    <div className="d-flex" style={{ opacity: 0.6 }}>
                                        <h4>Coupon Discount</h4>
                                        <div className="ml-auto no-discount-text">$0.00</div>
                                    </div>
                                )}
                                <div className="d-flex">
                                    <h4>Tax (5%)</h4>
                                    <div className="ml-auto font-weight-bold">${orderSummary.tax.toFixed(2)}</div>
                                </div>
                                <div className="d-flex">
                                    <h4>Shipping Cost</h4>
                                    <div className="ml-auto font-weight-bold">
                                        {orderSummary.shipping === 0 ? 
                                            <span className="shipping-free">Free</span> : 
                                            `$${orderSummary.shipping.toFixed(2)}`
                                        }
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex gr-total">
                                    <h5>Grand Total</h5>
                                    <div className="ml-auto h5" style={{color: '#CAA968'}}>
                                        ${orderSummary.grandTotal.toFixed(2)}
                                    </div>
                                </div>
                                <hr />
                                <div className="text-center mt-3">
                                    <Link to="/checkout" className="btn hvr-hover">
                                        Proceed to Checkout
                                    </Link>
                                </div>
                                <div className="text-center mt-2">
                                    <Link to="/shop" className="btn-continue-shopping">
                                        <i className="fas fa-arrow-left"></i> Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;