// src/pages/CheckOut.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
const CheckOut = () => {
  const { cartItems, orderSummary, clearCart } = useShop();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    address2: '',
    country: 'United Arab Emirates',
    state: 'Dubai',
    zip: '',
    paymentMethod: 'credit',
    shippingOption: 'standard'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value, name } = e.target;
    setFormData(prev => ({
      ...prev,
      [id || name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.zip) errors.zip = 'Zip code is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate('/order-confirmation');
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-box-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center py-5">
              <i className="fas fa-shopping-cart fa-4x mb-3" style={{ color: '#CAA968' }}></i>
              <h3>Your cart is empty</h3>
              <p style={{textAlign:'center'}}>Add some items to your cart before checking out</p>
              <Link to="/shop" className="btn hvr-hover" style ={{color:'white'}}>Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Checkout</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
                <li className="breadcrumb-item"><Link to="/cart">Cart</Link></li>
                <li className="breadcrumb-item active">Checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-box-main">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-6 mb-3">
              <div className="checkout-address">
                <div className="title-left">
                  <h3>Billing address</h3>
                </div>
                <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName">First name *</label>
                      <input 
                        type="text" 
                        className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`} 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={handleChange}
                        required 
                      />
                      {formErrors.firstName && (
                        <div className="invalid-feedback">{formErrors.firstName}</div>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName">Last name *</label>
                      <input 
                        type="text" 
                        className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`} 
                        id="lastName" 
                        value={formData.lastName}
                        onChange={handleChange}
                        required 
                      />
                      {formErrors.lastName && (
                        <div className="invalid-feedback">{formErrors.lastName}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username">Username *</label>
                    <div className="input-group">
                      <input 
                        type="text" 
                        className={`form-control ${formErrors.username ? 'is-invalid' : ''}`} 
                        id="username" 
                        value={formData.username}
                        onChange={handleChange}
                        required 
                      />
                      {formErrors.username && (
                        <div className="invalid-feedback">{formErrors.username}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      type="email" 
                      className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {formErrors.email && (
                      <div className="invalid-feedback">{formErrors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address">Address *</label>
                    <input 
                      type="text" 
                      className={`form-control ${formErrors.address ? 'is-invalid' : ''}`} 
                      id="address" 
                      value={formData.address}
                      onChange={handleChange}
                      required 
                    />
                    {formErrors.address && (
                      <div className="invalid-feedback">{formErrors.address}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address2">Address 2</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="address2" 
                      value={formData.address2}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <label htmlFor="country">Country *</label>
                      <select 
                        className="wide w-100 form-control" 
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="United States">United States</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="state">State *</label>
                      <select 
                        className="wide w-100 form-control" 
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                      >
                        <option>Dubai</option>
                        <option>Abu Dhabi</option>
                        <option>Sharjah</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="zip">Zip *</label>
                      <input 
                        type="text" 
                        className={`form-control ${formErrors.zip ? 'is-invalid' : ''}`} 
                        id="zip" 
                        value={formData.zip}
                        onChange={handleChange}
                        required 
                      />
                      {formErrors.zip && (
                        <div className="invalid-feedback">{formErrors.zip}</div>
                      )}
                    </div>
                  </div>
                  <hr className="mb-4" />
                  <div className="custom-control custom-checkbox">
                    <input 
                      type="checkbox" 
                      className="custom-control-input" 
                      id="same-address" 
                    />
                    <label className="custom-control-label" htmlFor="same-address">
                      Shipping address is the same as my billing address
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input 
                      type="checkbox" 
                      className="custom-control-input" 
                      id="save-info" 
                    />
                    <label className="custom-control-label" htmlFor="save-info">
                      Save this information for next time
                    </label>
                  </div>
                  <hr className="mb-4" />
                  <div className="title"> <span>Payment</span> </div>
                  <div className="d-block my-3">
                    <div className="custom-control custom-radio">
                      <input 
                        id="credit" 
                        name="paymentMethod" 
                        type="radio" 
                        className="custom-control-input" 
                        checked={formData.paymentMethod === 'credit'}
                        onChange={() => setFormData(prev => ({...prev, paymentMethod: 'credit'}))}
                      />
                      <label className="custom-control-label" htmlFor="credit">Credit card</label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input 
                        id="debit" 
                        name="paymentMethod" 
                        type="radio" 
                        className="custom-control-input" 
                        checked={formData.paymentMethod === 'debit'}
                        onChange={() => setFormData(prev => ({...prev, paymentMethod: 'debit'}))}
                      />
                      <label className="custom-control-label" htmlFor="debit">Debit card</label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input 
                        id="paypal" 
                        name="paymentMethod" 
                        type="radio" 
                        className="custom-control-input" 
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={() => setFormData(prev => ({...prev, paymentMethod: 'paypal'}))}
                      />
                      <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-name">Name on card</label>
                      <input type="text" className="form-control" id="cc-name" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-number">Credit card number</label>
                      <input type="text" className="form-control" id="cc-number" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="cc-expiration">Expiration</label>
                      <input type="text" className="form-control" id="cc-expiration" placeholder="MM/YY" required />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="cc-cvv">CVV</label>
                      <input type="text" className="form-control" id="cc-cvv" required />
                    </div>
                  </div>
                  <hr className="mb-1" />
                </form>
              </div>
            </div>
            <div className="col-sm-6 col-lg-6 mb-3">
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="shipping-method-box">
                    <div className="title-left">
                      <h3>Shipping Method</h3>
                    </div>
                    <div className="mb-4">
                      <div className="custom-control custom-radio">
                        <input 
                          id="shippingOption1" 
                          name="shippingOption" 
                          className="custom-control-input" 
                          checked={formData.shippingOption === 'standard'}
                          onChange={() => setFormData(prev => ({...prev, shippingOption: 'standard'}))}
                          type="radio" 
                        />
                        <label className="custom-control-label" htmlFor="shippingOption1">Standard Delivery</label>
                        <span className="float-right font-weight-bold">FREE</span>
                      </div>
                      <div className="ml-4 mb-2 small">(5-7 business days)</div>
                      <div className="custom-control custom-radio">
                        <input 
                          id="shippingOption2" 
                          name="shippingOption" 
                          className="custom-control-input" 
                          checked={formData.shippingOption === 'express'}
                          onChange={() => setFormData(prev => ({...prev, shippingOption: 'express'}))}
                          type="radio" 
                        />
                        <label className="custom-control-label" htmlFor="shippingOption2">Express Delivery</label>
                        <span className="float-right font-weight-bold">$10.00</span>
                      </div>
                      <div className="ml-4 mb-2 small">(2-3 business days)</div>
                      <div className="custom-control custom-radio">
                        <input 
                          id="shippingOption3" 
                          name="shippingOption" 
                          className="custom-control-input" 
                          checked={formData.shippingOption === 'nextday'}
                          onChange={() => setFormData(prev => ({...prev, shippingOption: 'nextday'}))}
                          type="radio" 
                        />
                        <label className="custom-control-label" htmlFor="shippingOption3">Next Business Day</label>
                        <span className="float-right font-weight-bold">$20.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12">
                  <div className="odr-box">
                    <div className="title-left">
                      <h3>Shopping cart</h3>
                    </div>
                    <div className="rounded p-2 bg-light">
                      {cartItems.map((item) => (
                        <div className="media mb-2 border-bottom" key={item.id}>
                          <div className="media-body">
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                            <div className="small text-muted">
                              Price: ${item.price.toFixed(2)} <span className="mx-2">|</span> 
                              Qty: {item.quantity} <span className="mx-2">|</span> 
                              Subtotal: ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12">
                  <div className="order-box">
                    <div className="title-left">
                      <h3>Your order</h3>
                    </div>
                    <div className="d-flex">
                      <div className="font-weight-bold">Product</div>
                      <div className="ml-auto font-weight-bold">Total</div>
                    </div>
                    <hr className="my-1" />
                    <div className="d-flex">
                      <h4>Sub Total</h4>
                      <div className="ml-auto font-weight-bold">${orderSummary.subtotal.toFixed(2)}</div>
                    </div>
                    <div className="d-flex">
                      <h4>Discount</h4>
                      <div className="ml-auto font-weight-bold">-${orderSummary.discount.toFixed(2)}</div>
                    </div>
                    <hr className="my-1" />
                    <div className="d-flex">
                      <h4>Coupon Discount</h4>
                      <div className="ml-auto font-weight-bold">-${orderSummary.couponDiscount.toFixed(2)}</div>
                    </div>
                    <div className="d-flex">
                      <h4>Tax</h4>
                      <div className="ml-auto font-weight-bold">${orderSummary.tax.toFixed(2)}</div>
                    </div>
                    <div className="d-flex">
                      <h4>Shipping Cost</h4>
                      <div className="ml-auto font-weight-bold">
                        {orderSummary.shipping === 0 ? 'Free' : `$${orderSummary.shipping.toFixed(2)}`}
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex gr-total">
                      <h5>Grand Total</h5>
                      <div className="ml-auto h5">${orderSummary.grandTotal.toFixed(2)}</div>
                    </div>
                    <hr />
                  </div>
                </div>
                <div className="col-12 d-flex shopping-box">
                  <button 
                    className="ml-auto btn hvr-hover" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;