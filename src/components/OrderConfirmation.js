// src/pages/OrderConfirmation.js
import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <>
      <style>{`
        .confirmation-box {
          animation: fadeInUp 0.6s ease forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .check-mark {
          animation: scaleIn 0.5s ease 0.3s forwards;
          transform: scale(0);
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
      `}</style>

      <div className="cart-box-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="confirmation-box text-center py-5">
                <div className="check-mark mb-4">
                  <i className="fas fa-check-circle fa-5x" style={{ color: '#28a745' }}></i>
                </div>
                <h2 className="mb-3">Order Confirmed!</h2>
                <p className="lead">Thank you for your purchase. Your order has been confirmed.</p>
                <p>Order Number: <strong>#{orderNumber}</strong></p>
                <p className="text-muted">We'll send you a confirmation email with your order details.</p>
                <div className="mt-4">
                  <Link to="/shop" className="btn hvr-hover mr-2">Continue Shopping</Link>
                  <Link to="/" className="btn hvr-hover">Go to Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;