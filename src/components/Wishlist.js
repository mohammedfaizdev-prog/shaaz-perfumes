// src/components/Wishlist.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Wishlist = () => {
    const { wishlistItems, addToCart, removeFromWishlist } = useShop();
    const [addedItems, setAddedItems] = useState({});
    const [notification, setNotification] = useState(null);

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
            quantity: 1
        });
        showNotification(`${product.name} added to cart!`, 'success');
        
        setAddedItems(prev => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setAddedItems(prev => ({ ...prev, [product.id]: false }));
        }, 2000);
    };

    const handleRemoveItem = (productId, productName) => {
        removeFromWishlist(productId);
        showNotification(`${productName} removed from wishlist`, 'info');
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="wishlist-box-main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center py-5">
                            <i className="fas fa-heart fa-4x mb-3" style={{ color: '#CAA968' }}></i>
                            <h3>Your wishlist is empty</h3>
                            <p style={{textAlign:'center'}}>Browse our collection and add your favorite fragrances</p>
                            <Link to="/shop" className="btn hvr-hover" style={{color: 'white'}}>Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
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
                .wishlist-box-main {
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
                .price-pr p {
                    transition: all 0.3s ease;
                    display: inline-block;
                }
                tr:hover .price-pr p {
                    color: #CAA968;
                    transform: scale(1.05);
                }
                .quantity-box {
                    transition: all 0.3s ease;
                }
                tr:hover .quantity-box {
                    color: #28a745;
                    font-weight: 600;
                }
                .add-pr a {
                    transition: all 0.3s ease;
                    display: inline-block;
                }
                .add-pr a:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(202,169,104,0.3);
                    background: #CAA968 !important;
                }
                .add-pr a.added {
                    background: #28a745 !important;
                    color: white !important;
                }
                .remove-pr a {
                    transition: all 0.3s ease;
                    display: inline-block;
                    cursor: pointer;
                }
                .remove-pr a:hover {
                    transform: scale(1.2);
                    color: #dc3545 !important;
                }
                tbody tr.removing {
                    animation: slideOutRight 0.4s ease forwards;
                }
                @keyframes slideOutRight {
                    from { opacity: 1; transform: translateX(0); }
                    to { opacity: 0; transform: translateX(100px); }
                }
                thead tr th {
                    animation: fadeInUp 0.4s ease backwards;
                }
                thead tr th:nth-child(1) { animation-delay: 0.02s; }
                thead tr th:nth-child(2) { animation-delay: 0.04s; }
                thead tr th:nth-child(3) { animation-delay: 0.06s; }
                thead tr th:nth-child(4) { animation-delay: 0.08s; }
                thead tr th:nth-child(5) { animation-delay: 0.1s; }
                thead tr th:nth-child(6) { animation-delay: 0.12s; }
                .btn.hvr-hover {
                    transition: all 0.3s ease;
                    background: #CAA968;
                    color: #06140d;
                    padding: 10px 25px;
                    border-radius: 5px;
                    text-decoration: none;
                    display: inline-block;
                }
                .btn.hvr-hover:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(202,169,104,0.3);
                    color: white;
                }
            `}</style>

            <div className="all-title-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Wishlist</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active">Wishlist</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="wishlist-box-main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="table-main table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Images</th>
                                            <th>Product Name</th>
                                            <th>Unit Price</th>
                                            <th>Stock</th>
                                            <th>Add Item</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wishlistItems.map((item) => (
                                            <tr key={item.id}>
                                                <td className="thumbnail-img">
                                                    <Link to={`/shop-detail/${item.id}`}>
                                                        <img className="img-fluid" src={item.image} alt={item.name} style={{width: '80px', height: '80px', objectFit: 'cover'}} />
                                                    </Link>
                                                </td>
                                                <td className="name-pr">
                                                    <Link to={`/shop-detail/${item.id}`}>
                                                        {item.name}
                                                    </Link>
                                                </td>
                                                <td className="price-pr">
                                                    <p>$ {item.price.toFixed(2)}</p>
                                                </td>
                                                <td className="quantity-box">In Stock</td>
                                                <td className="add-pr">
                                                    <a 
                                                        className={`btn hvr-hover ${addedItems[item.id] ? 'added' : ''}`}
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleAddToCart(item);
                                                        }}
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: addedItems[item.id] ? '#28a745' : '',
                                                            color: addedItems[item.id] ? 'white' : ''
                                                        }}
                                                    >
                                                        {addedItems[item.id] ? (
                                                            <><i className="fas fa-check"></i> Added!</>
                                                        ) : (
                                                            'Add to Cart'
                                                        )}
                                                    </a>
                                                </td>
                                                <td className="remove-pr">
                                                    <a 
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleRemoveItem(item.id, item.name);
                                                        }}
                                                        title="Remove from wishlist"
                                                    >
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
                </div>
            </div>
        </>
    );
};

export default Wishlist;