import React from 'react'

const Contact = () => {
  return (
    <>
      <style>{`
        /* ========== GLOBAL RESET - PREVENT HORIZONTAL SCROLL ========== */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          overflow-x: hidden !important;
          width: 100%;
          position: relative;
        }
        
        /* Fix for row margins causing horizontal scroll */
        .row {
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        
        .container, .container-fluid {
          overflow-x: hidden !important;
          padding-left: 15px !important;
          padding-right: 15px !important;
        }
        
        /* Prevent any element from causing horizontal scroll */
        .contact-box-main,
        .all-title-box,
        [class*="col-"] {
          max-width: 100%;
          overflow-x: hidden;
        }
        
        /* Fix for Bootstrap columns on mobile */
        [class*="col-"] {
          padding-left: 15px;
          padding-right: 15px;
        }
        
        /* Prevent touch swipe from revealing white space */
        body {
          touch-action: pan-y pinch-zoom;
        }
        
        /* Ensure all images are responsive */
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* ========== ANIMATIONS FOR CONTACT PAGE ========== */
        
        /* Title box fade-in */
        .all-title-box {
          animation: fadeInDown 0.6s ease forwards;
          background: linear-gradient(135deg, #061b0f 0%, #0a2a18 100%);
          padding: 80px 0;
          text-align: center;
          margin-bottom: 50px;
        }
        
        .all-title-box h2 {
          color: #CAA968;
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 15px;
          letter-spacing: 2px;
        }
        
        .breadcrumb {
          background: transparent;
          padding: 0;
          margin: 0;
          justify-content: center;
        }
        
        .breadcrumb-item a {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .breadcrumb-item a:hover {
          color: #CAA968;
        }
        
        .breadcrumb-item.active {
          color: #CAA968;
        }
        
        .breadcrumb-item + .breadcrumb-item::before {
          color: #fff;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Breadcrumb animation */
        .breadcrumb li {
          animation: fadeInUp 0.5s ease backwards;
        }
        .breadcrumb li:nth-child(1) { animation-delay: 0.1s; }
        .breadcrumb li:nth-child(2) { animation-delay: 0.2s; }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Contact info left panel */
        .contact-info-left {
          animation: slideInLeft 0.7s ease forwards;
          padding: 30px;
          background: #f9f9f9;
          border-radius: 15px;
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .contact-info-left:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(202,169,104,0.1);
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Contact info right panel */
        .contact-form-right {
          animation: slideInRight 0.7s ease forwards;
          padding: 30px;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 5px 25px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .contact-form-right:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(202,169,104,0.1);
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Contact info list items staggered */
        .contact-info-left ul {
          list-style: none;
          padding: 0;
          margin: 20px 0 0 0;
        }
        
        .contact-info-left ul li {
          animation: fadeInUpList 0.5s ease backwards;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }
        
        .contact-info-left ul li:nth-child(1) { animation-delay: 0.1s; }
        .contact-info-left ul li:nth-child(2) { animation-delay: 0.2s; }
        .contact-info-left ul li:nth-child(3) { animation-delay: 0.3s; }
        
        @keyframes fadeInUpList {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .contact-info-left ul li:hover {
          transform: translateX(8px);
        }
        
        .contact-info-left ul li p {
          margin: 0;
          display: flex;
          align-items: flex-start;
        }
        
        .contact-info-left ul li i {
          transition: all 0.3s ease;
          margin-right: 15px;
          margin-top: 3px;
          color: #CAA968;
          font-size: 1.2rem;
          min-width: 25px;
        }
        
        .contact-info-left ul li:hover i {
          color: #CAA968;
          transform: scale(1.15);
        }
        
        .contact-info-left ul li a {
          transition: color 0.3s ease;
          color: #333;
          text-decoration: none;
        }
        
        .contact-info-left ul li a:hover {
          color: #CAA968 !important;
        }
        
        .contact-info-left p {
          margin-bottom: 20px;
          color: #666;
          line-height: 1.6;
        }
        
        /* Form group animations */
        .form-group {
          animation: fadeInUpForm 0.5s ease backwards;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }
        
        .form-group:nth-child(1) { animation-delay: 0.05s; }
        .form-group:nth-child(2) { animation-delay: 0.1s; }
        .form-group:nth-child(3) { animation-delay: 0.15s; }
        .form-group:nth-child(4) { animation-delay: 0.2s; }
        
        @keyframes fadeInUpForm {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .form-control {
          transition: all 0.3s ease;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 12px 15px;
          width: 100%;
          font-size: 1rem;
        }
        
        .form-control:focus {
          border-color: #CAA968;
          box-shadow: 0 0 0 3px rgba(202,169,104,0.2);
          transform: scale(1.02);
          outline: none;
        }
        
        textarea.form-control {
          resize: vertical;
          min-height: 120px;
        }
        
        /* Button animation */
        .btn.hvr-hover {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          background: #CAA968;
          color: #06140d;
          padding: 12px 35px;
          border-radius: 50px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }
        
        .btn.hvr-hover:hover {
          background: #d4b87a;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(202,169,104,0.3);
        }
        
        .btn.hvr-hover:active {
          transform: translateY(0);
        }
        
        /* Button ripple effect */
        .btn.hvr-hover::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }
        
        .btn.hvr-hover:active::after {
          width: 300px;
          height: 300px;
        }
        
        /* Heading underline animation */
        .contact-info-left h2, .contact-form-right h2 {
          position: relative;
          display: inline-block;
          animation: fadeInUp 0.6s ease forwards;
          font-size: 1.8rem;
          margin-bottom: 25px;
          color: #333;
        }
        
        .contact-info-left h2::after, .contact-form-right h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 0;
          height: 3px;
          background: #CAA968;
          transition: width 0.5s ease;
        }
        
        .contact-info-left:hover h2::after, .contact-form-right:hover h2::after {
          width: 100%;
        }
        
        /* Description text animation */
        .contact-info-left > p, .contact-form-right > p {
          animation: fadeIn 0.6s ease 0.1s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
          color: #666;
          line-height: 1.6;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Submit button container */
        .submit-button {
          animation: fadeInUp 0.5s ease 0.25s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
          margin-top: 20px;
        }
        
        /* Contact box main */
        .contact-box-main {
          padding: 0 0 80px 0;
        }
        
        /* Responsive adjustments */
        @media (max-width: 1200px) {
          .container {
            max-width: 95% !important;
          }
        }
        
        @media (max-width: 992px) {
          .all-title-box {
            padding: 60px 0;
          }
          .all-title-box h2 {
            font-size: 2.5rem;
          }
          .contact-info-left, .contact-form-right {
            margin-bottom: 30px;
          }
          .contact-info-left h2, .contact-form-right h2 {
            font-size: 1.6rem;
          }
        }
        
        @media (max-width: 768px) {
          .all-title-box {
            padding: 50px 0;
          }
          .all-title-box h2 {
            font-size: 2rem;
          }
          .contact-info-left, .contact-form-right {
            padding: 25px 20px;
          }
          .contact-info-left h2, .contact-form-right h2 {
            font-size: 1.4rem;
          }
          .contact-info-left ul li p {
            font-size: 0.9rem;
          }
          .form-control {
            font-size: 0.9rem;
            padding: 10px 12px;
          }
          .btn.hvr-hover {
            padding: 10px 30px;
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 576px) {
          .all-title-box {
            padding: 40px 0;
          }
          .all-title-box h2 {
            font-size: 1.5rem;
          }
          .breadcrumb-item {
            font-size: 0.85rem;
          }
          .contact-info-left, .contact-form-right {
            padding: 20px 15px;
          }
          .contact-info-left h2, .contact-form-right h2 {
            font-size: 1.3rem;
            margin-bottom: 20px;
          }
          .contact-info-left p, .contact-form-right p {
            font-size: 0.85rem;
          }
          .contact-info-left ul li {
            margin-bottom: 15px;
          }
          .contact-info-left ul li i {
            font-size: 1rem;
            margin-right: 10px;
          }
          .contact-info-left ul li p {
            font-size: 0.85rem;
          }
          .form-control {
            font-size: 0.85rem;
            padding: 8px 12px;
          }
          .btn.hvr-hover {
            padding: 8px 25px;
            font-size: 0.85rem;
          }
        }

        
    /* Prevent touch swipe from revealing white space */
    body {
        touch-action: pan-y pinch-zoom;
    }
    
    /* ========== CRITICAL HEADER FIX - Allow dropdowns to display ========== */
    /* Override overflow hidden for header and its parent containers */
    .main-header,
    .navbar,
    .container,
    .container-fluid {
        overflow: visible !important;
    }
    
    /* Specifically target the header's container without affecting page content */
    .main-header .container,
    .main-header .container-fluid {
        overflow: visible !important;
    }
    
    /* Ensure the navbar container doesn't clip dropdowns */
    .navbar .container {
        overflow: visible !important;
    }
    
    /* Override the general container rule for header only */
    .main-header .container,
    .main-header .container-fluid,
    header .container,
    header .container-fluid,
    .main-header > div > .container,
    .navbar > .container {
        overflow-x: visible !important;
    }

      `}</style>

      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Contact Us</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active"> Contact Us </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-box-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <div className="contact-info-left">
                <h2>CONTACT INFO</h2>
                <p>We'd love to hear from you! Whether you have questions about our fragrance collections, need assistance with an order, or want personalized recommendations, our customer care team is here to help.</p>
                <ul>
                  <li>
                    <p><i className="fas fa-map-marker-alt"></i>Address: Shaaz Perfumes <br />Dubai Fragrance Hub,<br /> United Arab Emirates</p>
                  </li>
                  <li>
                    <p><i className="fas fa-phone-square"></i>Phone: <a href="tel:+1-888705770">+971 4 123 4567</a></p>
                  </li>
                  <li>
                    <p><i className="fas fa-envelope"></i>Email: <a href="mailto:contactinfo@gmail.com">info@shaazperfumes.com</a></p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="contact-form-right">
                <h2>GET IN TOUCH</h2>
                <p>Have a question about our authentic Arabian oils, oud collections, or bakhoor? Fill out the form below and our fragrance experts will get back to you within 24 hours.</p>
                <form id="contactForm">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" required data-error="Please enter your name" />
                        <div className="help-block with-errors" ></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input type="text" placeholder="Your Email" id="email" className="form-control" name="name" required data-error="Please enter your email" />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input type="text" className="form-control" id="subject" name="name" placeholder="Subject" required data-error="Please enter your Subject" />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea className="form-control" id="message" placeholder="Your Message" rows="4" data-error="Write your message" required></textarea>
                        <div className="help-block with-errors"></div>
                      </div>
                      <div className="submit-button text-center">
                        <button className="btn hvr-hover" id="submit" type="submit">Send Message</button>
                        <div id="msgSubmit" className="h3 text-center hidden"></div>
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact