import React from 'react'

const Service = () => {
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
        .services-box-main,
        .all-title-box,
        [class*="col-"] {
          max-width: 100%;
          // overflow-x: hidden;
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
        
        /* ========== ANIMATIONS FOR SERVICE PAGE ========== */
        
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
        
        /* Service blocks container */
        .services-box-main .row:first-child {
          animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Service cards staggered animation */
        .service-block-inner {
          animation: scaleIn 0.5s ease backwards;
          transition: all 0.4s ease;
          height: 100%;
          border-radius: 15px;
          padding: 30px 25px;
          background: #fff;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          margin-bottom: 30px;
          text-align: center;
        }
        
        .col-sm-6.col-lg-4:nth-child(1) .service-block-inner { animation-delay: 0.05s; }
        .col-sm-6.col-lg-4:nth-child(2) .service-block-inner { animation-delay: 0.1s; }
        .col-sm-6.col-lg-4:nth-child(3) .service-block-inner { animation-delay: 0.15s; }
        .col-sm-6.col-lg-4:nth-child(4) .service-block-inner { animation-delay: 0.2s; }
        .col-sm-6.col-lg-4:nth-child(5) .service-block-inner { animation-delay: 0.25s; }
        .col-sm-6.col-lg-4:nth-child(6) .service-block-inner { animation-delay: 0.3s; }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .service-block-inner:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(202,169,104,0.15);
        }
        
        .service-block-inner h3 {
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: #333;
        }
        
        .service-block-inner h3::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #CAA968;
          transition: width 0.3s ease;
        }
        
        .service-block-inner:hover h3::after {
          width: 100%;
        }
        
        .service-block-inner:hover h3 {
          color: #CAA968;
        }
        
        .service-block-inner p {
          transition: color 0.3s ease;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }
        
        .service-block-inner:hover p {
          color: #555;
        }
        
        /* Heading animation */
        .noo-sh-title {
          position: relative;
          display: inline-block;
          animation: fadeInUp 0.6s ease forwards;
          font-size: 2rem;
          margin-bottom: 40px;
          color: #333;
        }
        
        .noo-sh-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 0;
          height: 3px;
          background: #CAA968;
          transition: width 0.5s ease;
        }
        
        .noo-sh-title:hover::after {
          width: 100%;
        }
        
        /* Team cards animations */
        .hover-team {
          animation: fadeInUp 0.6s ease backwards;
          transition: all 0.4s ease;
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          margin-bottom: 30px;
        }
        
        .col-sm-6.col-lg-3:nth-child(1) .hover-team { animation-delay: 0.05s; }
        .col-sm-6.col-lg-3:nth-child(2) .hover-team { animation-delay: 0.1s; }
        .col-sm-6.col-lg-3:nth-child(3) .hover-team { animation-delay: 0.15s; }
        .col-sm-6.col-lg-3:nth-child(4) .hover-team { animation-delay: 0.2s; }
        
        .our-team {
          transition: all 0.4s ease;
          overflow: hidden;
          border-radius: 15px 15px 0 0;
          position: relative;
        }
        
        .our-team img {
          transition: transform 0.6s ease;
          width: 100%;
          height: auto;
          display: block;
        }
        
        .our-team:hover img {
          transform: scale(1.08);
        }
        
        .team-content {
          transition: all 0.3s ease;
          padding: 20px;
          text-align: center;
          background: #fff;
        }
        
        .our-team:hover .team-content {
          background: rgba(202,169,104,0.9);
        }
        
        .team-content .title {
          transition: color 0.3s ease;
          font-size: 1.2rem;
          margin-bottom: 5px;
          color: #333;
        }
        
        .our-team:hover .team-content .title {
          color: #fff;
        }
        
        .team-content .post {
          font-size: 0.85rem;
          color: #888;
          transition: color 0.3s ease;
        }
        
        .our-team:hover .team-content .post {
          color: #fff;
        }
        
        /* Social icons animation */
        .social {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 15px;
          list-style: none;
          padding: 0;
          margin: 0;
          opacity: 0;
          transition: all 0.3s ease;
          background: rgba(0,0,0,0.7);
          padding: 15px 20px;
          border-radius: 50px;
        }
        
        .our-team:hover .social {
          opacity: 1;
        }
        
        .social li {
          animation: bounceIn 0.4s ease backwards;
        }
        
        .social li:nth-child(1) { animation-delay: 0.05s; }
        .social li:nth-child(2) { animation-delay: 0.1s; }
        .social li:nth-child(3) { animation-delay: 0.15s; }
        .social li:nth-child(4) { animation-delay: 0.2s; }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .social li a {
          transition: all 0.3s ease;
          display: inline-block;
          width: 35px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          color: white;
          text-decoration: none;
        }
        
        .social li a:hover {
          transform: translateY(-3px) scale(1.15);
          background: #CAA968;
          color: #fff !important;
        }
        
        /* Plus icon rotation */
        .icon {
          position: absolute;
          bottom: 15px;
          right: 15px;
          width: 40px;
          height: 40px;
          background: #CAA968;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }
        
        .icon i {
          transition: all 0.4s ease;
          color: #fff;
          font-size: 1.2rem;
        }
        
        .our-team:hover .icon i {
          transform: rotate(90deg);
        }
        
        .icon:hover {
          transform: scale(1.1);
        }
        
        /* Team description expand animation */
        .team-description {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.3s ease;
          padding: 0 20px;
          background: #fff;
        }
        
        .hover-team:hover .team-description {
          max-height: 150px;
          padding: 20px;
        }
        
        .team-description p {
          margin: 0;
          color: #666;
          line-height: 1.6;
          font-size: 0.9rem;
        }
        
        .hover-team hr {
          margin: 0;
          border-color: #eee;
        }
        
        /* Responsive fixes */
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
          .service-block-inner {
            padding: 25px 20px;
          }
          .service-block-inner h3 {
            font-size: 1.2rem;
          }
          .noo-sh-title {
            font-size: 1.8rem;
          }
        }
        
        @media (max-width: 768px) {
          .all-title-box {
            padding: 50px 0;
          }
          .all-title-box h2 {
            font-size: 2rem;
          }
          .service-block-inner {
            padding: 20px 15px;
            margin-bottom: 20px;
          }
          .service-block-inner h3 {
            font-size: 1.1rem;
          }
          .service-block-inner p {
            font-size: 0.9rem;
          }
          .noo-sh-title {
            font-size: 1.5rem;
            margin-bottom: 30px;
          }
          .team-content .title {
            font-size: 1rem;
          }
          .team-content .post {
            font-size: 0.75rem;
          }
          .team-description p {
            font-size: 0.85rem;
          }
          .social li a {
            width: 30px;
            height: 30px;
            line-height: 30px;
            font-size: 0.8rem;
          }
          .icon {
            width: 35px;
            height: 35px;
          }
          .icon i {
            font-size: 1rem;
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
          .service-block-inner {
            padding: 18px 12px;
          }
          .service-block-inner h3 {
            font-size: 1rem;
          }
          .service-block-inner p {
            font-size: 0.85rem;
          }
          .noo-sh-title {
            font-size: 1.3rem;
          }
          .hover-team:hover .team-description {
            padding: 15px;
          }
          .team-description p {
            font-size: 0.8rem;
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
              <h2>Our Services</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Our Services</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="services-box-main">
        <div className="container">
          <div className="row my-5">
            <div className="col-sm-6 col-lg-4">
              <div className="service-block-inner">
                <h3>Authentic Fragrance Oils</h3>
                <p>We offer premium quality perfume oils inspired by designer scents and traditional Arabian blends, crafted to provide long-lasting fragrance experiences.</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service-block-inner">
                <h3>Premium Oud & Bakhoor</h3>
                <p>Discover our exclusive collection of authentic oud oils, oud wood chips, and luxury bakhoor sets sourced from the finest regions.</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service-block-inner">
                <h3>Luxury Gift Packaging</h3>
                <p>Every purchase comes beautifully packaged in elegant gift boxes, perfect for special occasions and corporate gifting needs.</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service-block-inner">
                <h3>Worldwide Shipping</h3>
                <p>We deliver our premium fragrance collections to customers around the globe with secure packaging and reliable shipping partners.</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service-block-inner">
                <h3>Personalized Consultation</h3>
                <p>Our fragrance experts help you discover your perfect signature scent based on your preferences and style.</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service-block-inner">
                <h3>Wholesale Availability</h3>
                <p>We offer wholesale pricing for retailers and businesses looking to stock authentic Arabian perfume oils and oud products.</p>
              </div>
            </div>
          </div>

          {/* <div className="row my-4">
            <div className="col-12">
              <h2 className="noo-sh-title">Our Fragrance Experts</h2>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="hover-team">
                <div className="our-team">
                  <img src="images/img-1.jpg" alt="Ahmed Al Rashid" />
                  <div className="team-content">
                    <h3 className="title">Ahmed Al Rashid</h3>
                    <span className="post">Master Perfumer</span>
                  </div>
                  <ul className="social">
                    <li>
                      <a href="#" className="fab fa-facebook"></a>
                    </li>
                    <li>
                      <a href="#" className="fab fa-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="fab fa-google-plus"></a>
                    </li>
                    <li>
                      <a href="#" className="fab fa-youtube"></a>
                    </li>
                  </ul>
                  <div className="icon">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="team-description">
                  <p>With over 20 years of experience in Arabian perfumery, Ahmed crafts authentic oud blends and attars using traditional techniques passed down through generations.</p>
                </div>
                <hr className="my-0" />
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="hover-team">
                <div className="our-team">
                  <img src="images/img-2.jpg" alt="Fatima Al Zayani" />
                  <div className="team-content">
                    <h3 className="title">Fatima Al Zayani</h3>
                    <span className="post">Fragrance Curator</span>
                  </div>
                  <ul className="social">
                    <li>
                      <a href="#" className="fab fa-facebook"></a>
                    </li>
                    <li>
                      <a href="#" className="fab fa-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="fab fa-google-plus"></a>
                    </li>
                    <li>
                      <a href="#" className="fab fa-youtube"></a>
                    </li>
                  </ul>
                  <div className="icon">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="team-description">
                  <p>Fatima carefully selects each fragrance in our collection, ensuring every perfume oil and bakhoor meets our premium quality standards.</p>
                </div>
                <hr className="my-0" />
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="hover-team">
                <div className="our-team">
                  <img src="images/img-3.jpg" alt="Yusuf Khan" />
                  <div className="team-content">
                    <h3 className="title">Yusuf Khan</h3>
                    <span className="post">Oud Specialist</span>
                  </div>
                  <ul className="social">
                    <li>
                      <a href="#" className="fab fa-facebook"></a>
                    </li>
                    <li>
                      <a href="#" className="fab fa-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="fab fa-google-plus"></a>
                    </li>
                    <li>
                      <a href="#" className="fab fa-youtube"></a>
                    </li>
                  </ul>
                  <div className="icon">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="team-description">
                  <p>Yusuf specializes in sourcing authentic oud wood chips and creating rich, long-lasting fragrance blends inspired by Eastern traditions.</p>
                </div>
                <hr className="my-0" />
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="hover-team">
                <div className="our-team">
                  <img src="images/img-1.jpg" alt="Layla Hassan" />
                  <div className="team-content">
                    <h3 className="title">Layla Hassan</h3>
                    <span className="post">Luxury Consultant</span>
                  </div>
                  <ul className="social">
                    <li>
                      <a href="#" className="fab fa-facebook"></a>
                    </li>
                    <li>
                      <a href="#" className="fab fa-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="fab fa-google-plus"></a>
                    </li>
                    <li>
                      <a href="#" className="fab fa-youtube"></a>
                    </li>
                  </ul>
                  <div className="icon">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="team-description">
                  <p>Layla helps customers discover their perfect signature scent, offering personalized recommendations from our exclusive fragrance collections.</p>
                </div>
                <hr className="my-0" />
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </>
  )
}

export default Service