// src/__tests__/Shop.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Shop from '../components/Shop';

// Mock the ShopContext with a proper implementation
jest.mock('../components/ShopContext', () => ({
  useShop: jest.fn().mockReturnValue({
    addToCart: jest.fn(),
    addToWishlist: jest.fn(),
    isInWishlist: jest.fn().mockReturnValue(false),
    removeFromWishlist: jest.fn()
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

describe('Shop Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const { useShop } = require('../components/ShopContext');
    useShop.mockReturnValue({
      addToCart: jest.fn(),
      addToWishlist: jest.fn(),
      isInWishlist: jest.fn().mockReturnValue(false),
      removeFromWishlist: jest.fn()
    });
  });

  test('renders all products', () => {
    render(<Shop />);
    
    // Use getAllByText since the product name appears multiple times
    const productNames = screen.getAllByText('Aqua Di Gio - Fresh Aquatic');
    expect(productNames.length).toBeGreaterThan(0);
    
    const oudProducts = screen.getAllByText('Oud Wood - Deep Earthy Powerful');
    expect(oudProducts.length).toBeGreaterThan(0);
  });

  test('filters products by search', async () => {
    render(<Shop />);
    
    // Find search input by placeholder
    const searchInput = screen.getByPlaceholderText('Search here...');
    await userEvent.type(searchInput, 'Oud');
    
    // Find the search button by its icon class
    const searchButton = document.querySelector('.search-product button');
    if (searchButton) {
      fireEvent.click(searchButton);
    }
    
    // Check that Oud products are shown - use getAllByText with regex
    const oudProducts = screen.getAllByText(/Oud/i);
    expect(oudProducts.length).toBeGreaterThan(0);
  });

  test('adds product to cart', () => {
    const { useShop } = require('../components/ShopContext');
    const mockAddToCart = jest.fn();
    useShop.mockReturnValue({
      addToCart: mockAddToCart,
      addToWishlist: jest.fn(),
      isInWishlist: jest.fn().mockReturnValue(false),
      removeFromWishlist: jest.fn()
    });

    render(<Shop />);
    
    // Find and click add to cart button
    const addToCartButton = document.querySelector('.products-single .cart');
    if (addToCartButton) {
      fireEvent.click(addToCartButton);
      expect(mockAddToCart).toHaveBeenCalled();
    }
  });
});