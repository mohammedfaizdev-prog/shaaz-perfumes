// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the ShopProvider
jest.mock('./components/ShopContext', () => ({
  ShopProvider: ({ children }) => <>{children}</>,
  useShop: () => ({
    cartItems: [],
    wishlistItems: [],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    addToWishlist: jest.fn(),
    removeFromWishlist: jest.fn(),
    isInWishlist: jest.fn().mockReturnValue(false),
    applyCoupon: jest.fn(),
    getCartTotal: jest.fn().mockReturnValue(0),
    getCartTotalPrice: jest.fn().mockReturnValue(0),
    updateOrderSummary: jest.fn(),
    orderSummary: {
      subtotal: 0,
      discount: 0,
      couponDiscount: 0,
      tax: 0,
      shipping: 0,
      grandTotal: 0
    }
  })
}));

// No need to mock react-router-dom here - it's done globally in setupTests.js

// Mock Header and Footer
jest.mock('./header-footer/Header', () => {
  return function MockHeader() {
    return <header data-testid="mock-header">Header</header>;
  };
});

jest.mock('./header-footer/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="mock-footer">Footer</footer>;
  };
});

// Mock all page components
jest.mock('./components/Home', () => {
  return function MockHome() {
    return <div data-testid="mock-home">Home Page</div>;
  };
});

jest.mock('./components/Shop', () => {
  return function MockShop() {
    return <div data-testid="mock-shop">Shop Page</div>;
  };
});

jest.mock('./components/Cart', () => {
  return function MockCart() {
    return <div data-testid="mock-cart">Cart Page</div>;
  };
});

jest.mock('./components/CheckOut', () => {
  return function MockCheckOut() {
    return <div data-testid="mock-checkout">Checkout Page</div>;
  };
});

jest.mock('./components/Wishlist', () => {
  return function MockWishlist() {
    return <div data-testid="mock-wishlist">Wishlist Page</div>;
  };
});

jest.mock('./components/ShopDetails', () => {
  return function MockShopDetails() {
    return <div data-testid="mock-shop-details">Shop Details Page</div>;
  };
});

jest.mock('./components/Contact', () => {
  return function MockContact() {
    return <div data-testid="mock-contact">Contact Page</div>;
  };
});

jest.mock('./components/About', () => {
  return function MockAbout() {
    return <div data-testid="mock-about">About Page</div>;
  };
});

jest.mock('./components/Service', () => {
  return function MockService() {
    return <div data-testid="mock-service">Service Page</div>;
  };
});

jest.mock('./components/MyAccount', () => {
  return function MockMyAccount() {
    return <div data-testid="mock-my-account">My Account Page</div>;
  };
});

describe('App Component Tests', () => {
  test('renders header and footer', () => {
    render(<App />);
    
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });
});