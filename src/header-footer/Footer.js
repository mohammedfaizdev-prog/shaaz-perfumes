import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer-main">
        <div className="container">
          <div className="row">

            {/* Company Info */}
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="footer-widget">
                <h4>Shaaz Perfumes</h4>
                <p>
                  Shaaz Perfumes brings the timeless beauty of Arabian fragrance
                  culture with premium oud oils, bakhoor, musk blends, and luxury
                  gift collections.
                </p>

                {/* <ul className="social-icons">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-google-plus" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-rss" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-pinterest-p" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-whatsapp" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul> */}
              </div>
            </div><br /><br />

            {/* Information */}
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="footer-link">
                <h4>Information</h4>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/service">Our Service</Link></li>
                  <li><Link to="/shop">Shop</Link></li>
                  <li><Link to="/contact">Customer Service</Link></li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="footer-link-contact">
                <h4>Customer Care</h4>

                <ul>
                  <li>
                    <p>
                      <i className="fas fa-map-marker-alt"></i>
                      {" "}
                      Address: Shaaz Perfumes
                      <br />
                      Dubai Fragrance Hub,
                      <br />
                      United Arab Emirates
                    </p>
                  </li>

                  <li>
                    <p>
                      <i className="fas fa-phone-square"></i>
                      {" "}
                      Phone:{" "}
                      <a href="tel:+97141234567">
                        +971 4 123 4567
                      </a>
                    </p>
                  </li>

                  <li>
                    <p>
                      <i className="fas fa-envelope"></i>
                      {" "}
                      Email:{" "}
                      <a href="mailto:info@shaazperfumes.com">
                        info@shaazperfumes.com
                      </a>
                    </p>
                  </li>
                </ul>

              </div>
            </div>

          </div>

          {/* Payment Icons Section */}
          <div className="payment-section-wrapper">
            <div className="payment-section">
              <h5>SECURE PAYMENTS</h5>
              <div className="payment-icons">
                <img src="/images/payment-icon/1.png" alt="Payment Method" className="payment-icon" loading="lazy" />
                  <img src="/images/payment-icon/2.png" alt="Payment Method" className="payment-icon" loading="lazy" />
                  <img src="/images/payment-icon/3.png" alt="Payment Method" className="payment-icon" loading="lazy" />
                  <img src="/images/payment-icon/4.png" alt="Payment Method" className="payment-icon" loading="lazy" />
                  <img src="/images/payment-icon/5.png" alt="Payment Method" className="payment-icon" loading="lazy" />
                  <img src="/images/payment-icon/6.png" alt="Payment Method" className="payment-icon" loading="lazy" />
                  <img src="/images/payment-icon/7.png" alt="Payment Method" className="payment-icon" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container">
          <p className="footer-company">
            All Rights Reserved. &copy; 2026 <Link to="/">Shaaz Perfumes</Link>
          </p>
          <p className="footer-company">
           <Link to="/">Website design and</Link> Developed By: <a href="https://www.vssitcompany.com/"><p style={{color: '#FF6B4A'}}>VERITEAM SOFTWARE</p></a>
          </p>
          <p className="footer-company">
           Terms of Use | Privacy Policy
          </p>
        </div>
      </div>

      <a href="#" id="back-to-top" title="Back to top" style={{ display: 'none', background: 'linear-gradient(135deg, #061b0f 0%, #0a2a18 100%)', color: '#CAA968' }}>&uarr;</a>

      <style>{`
        /* Footer main styles */
        .footer-main {
          background: #0a0a0a;
          padding: 60px 0 30px;
          animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Footer widgets */
        .footer-widget, .footer-link, .footer-link-contact {
          margin-bottom: 30px;
          animation: slideInFromBottom 0.5s ease-out backwards;
        }
        
        .footer-widget { animation-delay: 0.1s; }
        .footer-link { animation-delay: 0.2s; }
        .footer-link-contact { animation-delay: 0.3s; }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .footer-widget h4, .footer-link h4, .footer-link-contact h4 {
          color: #CAA968;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 25px;
          position: relative;
          display: inline-block;
        }
        
        .footer-widget h4::after, .footer-link h4::after, .footer-link-contact h4::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 2px;
          background: #CAA968;
          transition: width 0.4s ease;
        }
        
        .footer-widget:hover h4::after,
        .footer-link:hover h4::after,
        .footer-link-contact:hover h4::after {
          width: 100%;
        }

        .footer-widget p {
          color: #aaa;
          font-size: 14px;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        /* Social icons */
        .social-icons {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        
        .social-icons li {
          display: inline-block;
          margin-right: 12px;
          animation: fadeInScale 0.3s ease-out backwards;
        }
        
        .social-icons li:nth-child(1) { animation-delay: 0.05s; }
        .social-icons li:nth-child(2) { animation-delay: 0.1s; }
        .social-icons li:nth-child(3) { animation-delay: 0.15s; }
        .social-icons li:nth-child(4) { animation-delay: 0.2s; }
        .social-icons li:nth-child(5) { animation-delay: 0.25s; }
        .social-icons li:nth-child(6) { animation-delay: 0.3s; }
        .social-icons li:nth-child(7) { animation-delay: 0.35s; }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .social-icons li a {
          display: inline-block;
          width: 38px;
          height: 38px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          text-align: center;
          line-height: 38px;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .social-icons li a i {
          color: #fff;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        
        .social-icons li a:hover {
          background: #CAA968;
          transform: translateY(-5px);
        }
        
        .social-icons li a:hover i {
          color: #0a0a0a;
        }

        /* Footer links */
        .footer-link ul, .footer-link-contact ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        
        .footer-link ul li, .footer-link-contact ul li {
          margin-bottom: 12px;
          animation: slideInLeft 0.3s ease-out backwards;
        }
        
        .footer-link ul li:nth-child(1) { animation-delay: 0.05s; }
        .footer-link ul li:nth-child(2) { animation-delay: 0.1s; }
        .footer-link ul li:nth-child(3) { animation-delay: 0.15s; }
        .footer-link ul li:nth-child(4) { animation-delay: 0.2s; }
        .footer-link ul li:nth-child(5) { animation-delay: 0.25s; }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .footer-link ul li a, .footer-link-contact ul li a {
          color: #aaa;
          font-size: large;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        .footer-link ul li a:hover {
          transform: translateX(8px);
          color: #CAA968 !important;
        }
        
        .footer-link-contact ul li {
          animation: slideInRight 0.3s ease-out backwards;
        }
        
        .footer-link-contact ul li:nth-child(1) { animation-delay: 0.05s; }
        .footer-link-contact ul li:nth-child(2) { animation-delay: 0.1s; }
        .footer-link-contact ul li:nth-child(3) { animation-delay: 0.15s; }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .footer-link-contact ul li p {
          color: #aaa;
          font-size: 14px;
          margin-bottom: 0;
          line-height: 1.8;
        }
        
        .footer-link-contact ul li p i {
          color: #CAA968;
          width: 25px;
          transition: all 0.3s ease;
        }
        
        .footer-link-contact ul li:hover i {
          transform: scale(1.15);
        }
        
        .footer-link-contact ul li a {
          color: #aaa;
        }
        
        .footer-link-contact ul li a:hover {
          color: #CAA968 !important;
          transform: translateX(3px);
        }

        /* Payment Section */
        .payment-section-wrapper {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid rgba(202, 169, 104, 0.2);
        }
        
        .payment-section {
          text-align: center;
          animation: fadeInUp 0.6s ease-out 0.4s backwards;
        }
        
        .payment-section h5 {
          color: #CAA968;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          margin-bottom: 20px;
          text-transform: uppercase;
          position: relative;
          display: inline-block;
        }
        
        .payment-section h5::before,
        .payment-section h5::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #CAA968, transparent);
        }
        
        .payment-section h5::before {
          right: -50px;
        }
        
        .payment-section h5::after {
          left: -50px;
        }
        
        .payment-icons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 25px;
        }
        
        .payment-icon {
          // height: 35px;
          width: auto;
          object-fit: contain;
          // transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          cursor: pointer;
          // filter: grayscale(100%);
          // opacity: 0.6;
        }
        
        /* If your icons are white/light colored, use this */
        .payment-icon:hover {
          filter: grayscale(0%);
          opacity: 1;
          transform: translateY(-5px) scale(1.1);
        }
        
        /* If your icons are colored, use this instead - remove the filter above */
        /*
        .payment-icon:hover {
          transform: translateY(-5px) scale(1.1);
          filter: drop-shadow(0 4px 8px rgba(202, 169, 104, 0.3));
        }
        */
        
        /* Responsive */
        @media (max-width: 768px) {
          .footer-main {
            padding: 40px 0 20px;
          }
          
          .payment-icons {
            gap: 15px;
          }
          
          .payment-icon {
            height: 28px;
          }
          
          .payment-section h5::before,
          .payment-section h5::after {
            width: 20px;
          }
          
          .payment-section h5::before {
            right: -30px;
          }
          
          .payment-section h5::after {
            left: -30px;
          }
        }

        /* Copyright */
        .footer-copyright {
          background: #050505;
          padding: 20px 0;
          text-align: center;
          animation: fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .footer-company {
          color: #888;
          font-size: 13px;
          margin: 0;
        }
        
        .footer-company a {
          color: #CAA968;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        .footer-company a:hover {
          color: #CAA968 !important;
          transform: translateY(-2px);
        }

        /* Back to top button */
        #back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          text-align: center;
          line-height: 45px;
          font-size: 20px;
          z-index: 999;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
          opacity: 0;
          visibility: hidden;
          text-decoration: none;
        }
        
        #back-to-top.show {
          opacity: 1;
          visibility: visible;
        }
        
        #back-to-top:hover {
          transform: translateY(-5px) scale(1.05);
          background: linear-gradient(135deg, #0a2a18 0%, #061b0f 100%) !important;
          box-shadow: 0 5px 20px rgba(202,169,104,0.4);
        }
      `}</style>
    </>
  );
};

export default Footer;