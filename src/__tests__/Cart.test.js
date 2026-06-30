// src/__tests__/Cart.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from '../components/Cart';

// Mock the ShopContext with a proper implementation
jest.mock('../components/ShopContext', () => ({
  useShop: jest.fn().mockReturnValue({
    cartItems: [
      { id: 1, name: 'Test Product', price: 19.99, image: 'test.jpg', quantity: 1 },
      { id: 2, name: 'Another Product', price: 29.99, image: 'test2.jpg', quantity: 2 }
    ],
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    applyCoupon: jest.fn(),
    orderSummary: {
      subtotal: 79.97,
      discount: 0,
      couponDiscount: 0,
      tax: 4.00,
      shipping: 0,
      grandTotal: 83.97
    },
    clearCart: jest.fn(),
    updateOrderSummary: jest.fn(),
    getCartTotal: jest.fn().mockReturnValue(3),
    getCartTotalPrice: jest.fn().mockReturnValue(79.97)
  })
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  MemoryRouter: ({ children }) => <div>{children}</div>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
}));

describe('Cart Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const { useShop } = require('../components/ShopContext');
    useShop.mockReturnValue({
      cartItems: [
        { id: 1, name: 'Test Product', price: 19.99, image: 'test.jpg', quantity: 1 },
        { id: 2, name: 'Another Product', price: 29.99, image: 'test2.jpg', quantity: 2 }
      ],
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      applyCoupon: jest.fn(),
      orderSummary: {
        subtotal: 79.97,
        discount: 0,
        couponDiscount: 0,
        tax: 4.00,
        shipping: 0,
        grandTotal: 83.97
      },
      clearCart: jest.fn(),
      updateOrderSummary: jest.fn(),
      getCartTotal: jest.fn().mockReturnValue(3),
      getCartTotalPrice: jest.fn().mockReturnValue(79.97)
    });
  });

  test('renders cart items correctly', () => {
    render(<Cart />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Another Product')).toBeInTheDocument();
  });

  test('displays correct total for each item', () => {
    render(<Cart />);
    
    // Use getAllByText for prices since they might appear multiple times
    const priceElements = screen.getAllByText('$19.99');
    expect(priceElements.length).toBeGreaterThan(0);
    
    const totalElements = screen.getAllByText('$59.98');
    expect(totalElements.length).toBeGreaterThan(0);
  });

  test('shows order summary correctly', () => {
    render(<Cart />);
    
    // Use getAllByText for order summary values
    const subtotalElements = screen.getAllByText('$79.97');
    expect(subtotalElements.length).toBeGreaterThan(0);
    
    const grandTotalElements = screen.getAllByText('$83.97');
    expect(grandTotalElements.length).toBeGreaterThan(0);
  });

  test('renders empty cart message when no items', () => {
    const { useShop } = require('../components/ShopContext');
    useShop.mockReturnValue({
      cartItems: [],
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      applyCoupon: jest.fn(),
      orderSummary: {
        subtotal: 0,
        discount: 0,
        couponDiscount: 0,
        tax: 0,
        shipping: 0,
        grandTotal: 0
      },
      clearCart: jest.fn(),
      updateOrderSummary: jest.fn(),
      getCartTotal: jest.fn().mockReturnValue(0),
      getCartTotalPrice: jest.fn().mockReturnValue(0)
    });

    render(<Cart />);
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });
});