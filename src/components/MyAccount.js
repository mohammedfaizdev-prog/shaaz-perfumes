import React from 'react'

const MyAccount = () => {
  return (
    <>
      <style>{`
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
        
        .my-account-page {
          animation: fadeIn 0.6s ease forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Account boxes staggered animation */
        .account-box {
          animation: scaleIn 0.5s ease backwards;
          transition: all 0.4s ease;
        }
        
        .col-lg-4:nth-child(1) .account-box { animation-delay: 0.05s; }
        .col-lg-4:nth-child(2) .account-box { animation-delay: 0.1s; }
        .col-lg-4:nth-child(3) .account-box { animation-delay: 0.15s; }
        .col-lg-4:nth-child(4) .account-box { animation-delay: 0.2s; }
        .col-lg-4:nth-child(5) .account-box { animation-delay: 0.25s; }
        .col-lg-4:nth-child(6) .account-box { animation-delay: 0.3s; }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .account-box:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(202,169,104,0.15);
        }
        
        /* Service box */
        .service-box {
          transition: all 0.3s ease;
          padding: 25px;
          border-radius: 15px;
          background: #fff;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }
        
        .account-box:hover .service-box {
          background: linear-gradient(135deg, #fff 0%, rgba(202,169,104,0.05) 100%);
        }
        
        /* Service icon animation */
        .service-icon a {
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        .service-icon a i {
          font-size: 2.5rem;
          transition: all 0.4s ease;
        }
        
        .account-box:hover .service-icon a i {
          transform: scale(1.15) rotate(360deg);
          color: #CAA968;
        }
        
        /* Service description */
        .service-desc h4 {
          transition: color 0.3s ease;
          margin-top: 15px;
        }
        
        .account-box:hover .service-desc h4 {
          color: #CAA968;
        }
        
        .service-desc p {
          transition: color 0.3s ease;
        }
        
        .account-box:hover .service-desc p {
          color: #555;
        }
        
        /* Bottom boxes staggered */
        .bottom-box .account-box {
          animation: slideInUp 0.5s ease backwards;
        }
        
        .bottom-box .col-lg-4:nth-child(1) .account-box { animation-delay: 0.35s; }
        .bottom-box .col-lg-4:nth-child(2) .account-box { animation-delay: 0.4s; }
        .bottom-box .col-lg-4:nth-child(3) .account-box { animation-delay: 0.45s; }
        .bottom-box .col-lg-4:nth-child(4) .account-box { animation-delay: 0.5s; }
        .bottom-box .col-lg-4:nth-child(5) .account-box { animation-delay: 0.55s; }
        .bottom-box .col-lg-4:nth-child(6) .account-box { animation-delay: 0.6s; }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* List items animation */
        .service-desc ul li {
          animation: fadeInRight 0.3s ease backwards;
          transition: all 0.3s ease;
        }
        
        .service-desc ul li:nth-child(1) { animation-delay: 0.05s; }
        .service-desc ul li:nth-child(2) { animation-delay: 0.1s; }
        .service-desc ul li:nth-child(3) { animation-delay: 0.15s; }
        .service-desc ul li:nth-child(4) { animation-delay: 0.2s; }
        
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .service-desc ul li a {
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        .service-desc ul li a:hover {
          transform: translateX(8px);
          color: #CAA968 !important;
        }
      `}</style>
  
      <div className="all-title-box">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h2>My Account</h2>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Shop</a></li>
                        <li className="breadcrumb-item active">My Account</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div className="my-account-box-main">
        <div className="container">
            <div className="my-account-page">
                <div className="row">
                    <div className="col-lg-4 col-md-12">
                        <div className="account-box">
                            <div className="service-box">
                                <div className="service-icon">
                                    <a href="#"> <i className="fa fa-gift"></i> </a>
                                </div>
                                <div className="service-desc">
                                    <h4>Your Orders</h4>
                                    <p>Track your fragrance orders, request returns, or reorder favorites</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="account-box">
                            <div className="service-box">
                                <div className="service-icon">
                                    <a href="#"><i className="fa fa-lock"></i> </a>
                                </div>
                                <div className="service-desc">
                                    <h4>Login &amp; security</h4>
                                    <p>Edit login credentials, name, and contact number</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="account-box">
                            <div className="service-box">
                                <div className="service-icon">
                                    <a href="#"> <i className="fa fa-location-arrow"></i> </a>
                                </div>
                                <div className="service-desc">
                                    <h4>Your Addresses</h4>
                                    <p>Edit shipping addresses for orders and gift deliveries</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="account-box">
                            <div className="service-box">
                                <div className="service-icon">
                                    <a href="#"> <i className="fa fa-credit-card"></i> </a>
                                </div>
                                <div className="service-desc">
                                    <h4>Payment options</h4>
                                    <p>Edit or add payment methods for easy checkout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="account-box">
                            <div className="service-box">
                                <div className="service-icon">
                                    <a href="#"> <i className="fab fa-paypal"></i> </a>
                                </div>
                                <div className="service-desc">
                                    <h4>PayPal</h4>
                                    <p>Manage PayPal payment settings and benefits</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="account-box">
                            <div className="service-box">
                                <div className="service-icon">
                                    <a href="#"> <i className="fab fa-amazon"></i> </a>
                                </div>
                                <div className="service-desc">
                                    <h4>Gift Card Balance</h4>
                                    <p>Check and add funds to your Shaaz Perfumes gift card</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-box">
                    <div className="row">
                        <div className="col-lg-4 col-md-12">
                            <div className="account-box">
                                <div className="service-box">
                                    <div className="service-desc">
                                        <h4>Fragrance Subscription</h4>
                                        <ul>
                                            <li> <a href="#">Manage subscriptions</a> </li>
                                            <li> <a href="#">Delivery preferences</a> </li>
                                            <li> <a href="#">Scent profile settings</a> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="account-box">
                                <div className="service-box">
                                    <div className="service-desc">
                                        <h4>Communication Preferences</h4>
                                        <ul>
                                            <li> <a href="#">Email notifications </a> </li>
                                            <li> <a href="#">SMS alerts</a> </li>
                                            <li> <a href="#">New fragrance launches</a> </li>
                                            <li> <a href="#">Special offers</a> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="account-box">
                                <div className="service-box">
                                    <div className="service-desc">
                                        <h4>Payment Settings</h4>
                                        <ul>
                                            <li> <a href="#">Saved cards</a> </li>
                                            <li> <a href="#">Bank accounts for refunds</a> </li>
                                            <li> <a href="#">Promo codes & coupons</a> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="account-box">
                                <div className="service-box">
                                    <div className="service-desc">
                                        <h4>Gift Services</h4>
                                        <ul>
                                            <li> <a href="#">Leave delivery feedback</a> </li>
                                            <li> <a href="#">Wishlist</a> </li>
                                            <li> <a href="#">Gift message preferences</a> </li>
                                            <li> <a href="#">Profile settings</a> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="account-box">
                                <div className="service-box">
                                    <div className="service-desc">
                                        <h4>Other accounts</h4>
                                        <ul>
                                            <li> <a href="#">Business registration</a> </li>
                                            <li> <a href="#">Wholesale account</a> </li>
                                            <li> <a href="#">Partner programs</a> </li>
                                            <li> <a href="#">Login with Amazon</a> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="account-box">
                                <div className="service-box">
                                    <div className="service-desc">
                                        <h4>Loyalty Programs</h4>
                                        <ul>
                                            <li> <a href="#">Subscribe &amp; Save</a> </li>
                                            <li> <a href="#">Rewards points</a> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default MyAccount