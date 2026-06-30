import React, { createContext, useState, useContext, useEffect } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    discount: 0,
    couponDiscount: 0,
    couponCode: '',
    tax: 0,
    shipping: 0,
    grandTotal: 0
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
    const savedCoupon = localStorage.getItem('coupon');
    if (savedCoupon) {
      const couponData = JSON.parse(savedCoupon);
      setOrderSummary(prev => ({
        ...prev,
        couponDiscount: couponData.discount || 0,
        couponCode: couponData.code || ''
      }));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Update order summary whenever cart changes
  useEffect(() => {
    updateOrderSummary();
  }, [cartItems]);

  // Update order summary whenever coupon changes
  useEffect(() => {
    updateOrderSummary();
  }, [orderSummary.couponDiscount, orderSummary.couponCode]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Save coupon to localStorage
  useEffect(() => {
    if (orderSummary.couponDiscount > 0 && orderSummary.couponCode) {
      localStorage.setItem('coupon', JSON.stringify({
        discount: orderSummary.couponDiscount,
        code: orderSummary.couponCode
      }));
    } else if (orderSummary.couponCode === 'FREESHIP') {
      localStorage.setItem('coupon', JSON.stringify({
        discount: 0,
        code: orderSummary.couponCode
      }));
    } else {
      localStorage.removeItem('coupon');
    }
  }, [orderSummary.couponDiscount, orderSummary.couponCode]);

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    // Clear coupon when cart is cleared
    setOrderSummary(prev => ({
      ...prev,
      couponDiscount: 0,
      couponCode: '',
      discount: 0,
      tax: 0,
      shipping: 0,
      grandTotal: 0
    }));
    localStorage.removeItem('coupon');
  };

  // Add to wishlist
  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems;
      } else {
        return [...prevItems, product];
      }
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Get total items in cart
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get cart total price
  const getCartTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Update order summary - FIXED VERSION
  const updateOrderSummary = () => {
    // Calculate subtotal from cart items
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Get current coupon discount from state
    const couponDiscount = orderSummary.couponDiscount || 0;
    const couponCode = orderSummary.couponCode || '';
    
    // Check if FREESHIP coupon is applied
    const isFreeShipping = couponCode === 'FREESHIP';
    
    // Calculate subtotal after coupon discount
    const subtotalAfterCoupon = subtotal - couponDiscount;
    
    // Calculate tiered discount based on subtotal AFTER coupon
    let discount = 0;
    if (subtotalAfterCoupon > 200) {
      discount = subtotalAfterCoupon * 0.15; // 15% off for orders over $200
    } else if (subtotalAfterCoupon > 100) {
      discount = subtotalAfterCoupon * 0.10; // 10% off for orders over $100
    } else if (subtotalAfterCoupon > 50) {
      discount = subtotalAfterCoupon * 0.05; // 5% off for orders over $50
    }
    
    // Calculate amount after all discounts
    const amountAfterDiscounts = subtotalAfterCoupon - discount;
    
    // Calculate tax on the amount after all discounts
    const tax = amountAfterDiscounts * 0.05;
    
    // Calculate shipping
    let shipping = 5.99; // Default shipping
    if (isFreeShipping) {
      shipping = 0; // Free shipping with FREESHIP coupon
    } else if (amountAfterDiscounts > 50) {
      shipping = 0; // Free shipping for orders over $50
    }
    
    // Calculate grand total
    const grandTotal = amountAfterDiscounts + tax + shipping;

    console.log('Update Order Summary:', {
      subtotal,
      couponDiscount,
      couponCode,
      isFreeShipping,
      subtotalAfterCoupon,
      discount,
      amountAfterDiscounts,
      tax,
      shipping,
      grandTotal
    });

    setOrderSummary({
      subtotal: subtotal,
      discount: discount,
      couponDiscount: couponDiscount,
      couponCode: couponCode,
      tax: tax,
      shipping: shipping,
      grandTotal: Math.max(0, grandTotal) // Ensure grand total is never negative
    });
  };

  // Apply coupon - Percentage based
  const applyCoupon = (couponCode) => {
    // If couponCode is empty, remove the coupon
    if (!couponCode || couponCode.trim() === '') {
      setOrderSummary(prev => ({
        ...prev,
        couponDiscount: 0,
        couponCode: ''
      }));
      localStorage.removeItem('coupon');
      return true;
    }

    const subtotal = getCartTotalPrice();
    let couponDiscount = 0;
    let code = couponCode.toUpperCase().trim();

    if (code === 'SAVE10') {
      couponDiscount = subtotal * 0.10; // 10% off
    } else if (code === 'SAVE20') {
      couponDiscount = subtotal * 0.20; // 20% off
    } else if (code === 'SAVE30') {
      couponDiscount = subtotal * 0.30; // 30% off
    } else if (code === 'FREESHIP') {
      // Special coupon for free shipping
      setOrderSummary(prev => ({
        ...prev,
        couponCode: code,
        couponDiscount: 0
      }));
      return true;
    } else {
      return false; // Invalid coupon
    }

    // Cap coupon discount at 50% of subtotal to prevent abuse
    const maxDiscount = subtotal * 0.50;
    couponDiscount = Math.min(couponDiscount, maxDiscount);

    setOrderSummary(prev => ({
      ...prev,
      couponDiscount: couponDiscount,
      couponCode: code
    }));
    
    return couponDiscount > 0;
  };

  // Get coupon info
  const getCouponInfo = () => {
    return {
      code: orderSummary.couponCode,
      discount: orderSummary.couponDiscount,
      isApplied: orderSummary.couponDiscount > 0 || orderSummary.couponCode === 'FREESHIP'
    };
  };

  // Remove coupon
  const removeCoupon = () => {
    setOrderSummary(prev => ({
      ...prev,
      couponDiscount: 0,
      couponCode: ''
    }));
    localStorage.removeItem('coupon');
    return true;
  };

  const value = {
    cartItems,
    wishlistItems,
    orderSummary,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    applyCoupon,
    removeCoupon,
    getCouponInfo,
    getCartTotal,
    getCartTotalPrice,
    updateOrderSummary
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};