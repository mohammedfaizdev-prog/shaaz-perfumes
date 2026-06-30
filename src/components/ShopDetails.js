import React from 'react'

const ShopDetails = () => {
  return (
    <>
      <style>{`
        /* ========== ANIMATIONS FOR SHOP DETAILS PAGE ========== */
        
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
        
        /* Image carousel animation */
        .single-product-slider {
          animation: slideInLeft 0.7s ease forwards;
          overflow: hidden;
          border-radius: 20px;
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .carousel-item img {
          transition: transform 0.5s ease;
        }
        
        .carousel-item:hover img {
          transform: scale(1.02);
        }
        
        .carousel-control-prev, .carousel-control-next {
          transition: all 0.3s ease;
          background: rgba(0,0,0,0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .carousel-control-prev:hover, .carousel-control-next:hover {
          background: #CAA968;
          transform: translateY(-50%) scale(1.1);
        }
        
        /* Product details animation */
        .single-product-details {
          animation: slideInRight 0.7s ease forwards;
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .single-product-details h2 {
          animation: fadeInUp 0.5s ease forwards;
        }
        
        .single-product-details h5 {
          animation: fadeInUp 0.5s ease 0.1s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .single-product-details h5 del {
          transition: all 0.3s ease;
        }
        
        .single-product-details h5:hover del {
          color: #dc3545;
        }
        
        .available-stock {
          animation: fadeInUp 0.5s ease 0.15s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .single-product-details h4 {
          animation: fadeInUp 0.5s ease 0.2s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .single-product-details p {
          animation: fadeInUp 0.5s ease 0.25s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
          line-height: 1.8;
          transition: all 0.3s ease;
        }
        
        .single-product-details p:hover {
          transform: translateX(5px);
        }
        
        /* Form elements animations */
        .form-group {
          animation: fadeInUp 0.5s ease 0.3s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        select.form-control, input.form-control {
          transition: all 0.3s ease;
        }
        
        select.form-control:focus, input.form-control:focus {
          border-color: #CAA968;
          transform: scale(1.02);
          box-shadow: 0 0 0 3px rgba(202,169,104,0.2);
        }
        
        /* Price box bar */
        .price-box-bar {
          animation: fadeInUp 0.5s ease 0.35s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .cart-and-bay-btn a {
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        .cart-and-bay-btn a:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(202,169,104,0.3);
        }
        
        /* Add to buttons */
        .add-to-btn {
          animation: fadeInUp 0.5s ease 0.4s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .add-comp a {
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        .add-comp a:hover {
          transform: translateY(-2px);
          background: #CAA968 !important;
          color: white !important;
        }
        
        .share-bar a {
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        .share-bar a:hover {
          transform: translateY(-3px) scale(1.1);
          background: #CAA968 !important;
          color: white !important;
        }
        
        /* Featured products section */
        .title-all h1 {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        .title-all p {
          animation: fadeInUp 0.6s ease 0.2s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .featured-products-box .item {
          animation: scaleIn 0.5s ease backwards;
        }
        
        .featured-products-box .item:nth-child(1) { animation-delay: 0.05s; }
        .featured-products-box .item:nth-child(2) { animation-delay: 0.1s; }
        .featured-products-box .item:nth-child(3) { animation-delay: 0.15s; }
        .featured-products-box .item:nth-child(4) { animation-delay: 0.2s; }
        .featured-products-box .item:nth-child(5) { animation-delay: 0.25s; }
        .featured-products-box .item:nth-child(6) { animation-delay: 0.3s; }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .products-single {
          transition: all 0.4s ease;
        }
        
        .products-single:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }
        
        .box-img-hover {
          overflow: hidden;
        }
        
        .box-img-hover img {
          transition: transform 0.6s ease;
        }
        
        .products-single:hover .box-img-hover img {
          transform: scale(1.08);
        }
        
        .mask-icon {
          position: absolute;
          bottom: -100%;
          left: 0;
          width: 100%;
          background: rgba(0,0,0,0.7);
          transition: bottom 0.3s ease;
        }
        
        .products-single:hover .mask-icon {
          bottom: 0;
        }
        
        .why-text h4 {
          transition: color 0.3s ease;
        }
        
        .products-single:hover .why-text h4 {
          color: #CAA968;
        }
        
        .why-text h5 {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        
        .products-single:hover .why-text h5 {
          transform: scale(1.05);
        }
      `}</style>
  
      <div className="all-title-box">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h2>Shop Detail</h2>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Shop</a></li>
                        <li className="breadcrumb-item active">Shop Detail</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  
    <div className="shop-detail-box-main">
        <div className="container">
            <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-6">
                    <div id="carousel-example-1" className="single-product-slider carousel slide" data-ride="carousel">
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active"> <img className="d-block w-100" src="images/product1.jpeg" alt="First slide" /> </div>
                            <div className="carousel-item"> <img className="d-block w-100" src="images/product2.jpeg" alt="Second slide" /> </div>
                            <div className="carousel-item"> <img className="d-block w-100" src="images/product3.jpeg" alt="Third slide" /> </div>
                        </div>
                        <a className="carousel-control-prev" href="#carousel-example-1" role="button" data-slide="prev"> 
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                        <span className="sr-only">Previous</span> 
                    </a>
                        <a className="carousel-control-next" href="#carousel-example-1" role="button" data-slide="next"> 
                        <i className="fa fa-angle-right" aria-hidden="true"></i> 
                        <span className="sr-only">Next</span> 
                    </a>
                    </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-6">
                    <div className="single-product-details">
                        <h2>Oud Wood - Deep Earthy Powerful</h2>
                        <h5> <del>$ 18.00</del> $9.79</h5>
                        <p className="available-stock"><span> More than 50 available / <a href="#">120+ sold</a></span>
                        </p>
                        <h4>Short Description:</h4>
                        <p>A luxurious oud fragrance featuring rare agarwood, smoky vetiver, and warm amber. This rich, long-lasting perfume oil embodies the essence of Middle Eastern luxury with its deep, woody character and sophisticated dry down. Perfect for evening wear and special occasions. The fragrance opens with intense oud notes, evolves into a heart of exotic spices, and settles into a warm base of amber, musk, and sandalwood.</p>
                        <ul>
                            <li>
                                <div className="form-group size-st">
                                    <label className="size-label">Size</label>
                                    <select id="basic" className="selectpicker show-tick form-control">
                                    <option value="0">Size</option>
                                    <option value="0">6ml - $9.79</option>
                                    <option value="1">12ml - $17.99</option>
                                    <option value="1">24ml - $32.99</option>
                                    <option value="1">50ml - $59.99</option>
                                </select>
                                </div>
                            </li>
                            <li>
                                <div className="form-group quantity-box">
                                    <label className="control-label">Quantity</label>
                                    <input className="form-control" value="1" min="1" max="20" type="number" />
                                </div>
                            </li>
                        </ul>

                        <div className="price-box-bar">
                            <div className="cart-and-bay-btn">
                                <a className="btn hvr-hover" data-fancybox-close="" href="#">Buy New</a>
                                <a className="btn hvr-hover" data-fancybox-close="" href="#">Add to cart</a>
                            </div>
                        </div>

                        <div className="add-to-btn">
                            <div className="add-comp">
                                <a className="btn hvr-hover" href="#"><i className="fas fa-heart"></i> Add to wishlist</a>
                                <a className="btn hvr-hover" href="#"><i className="fas fa-sync-alt"></i> Add to Compare</a>
                            </div>
                            <div className="share-bar">
                                <a className="btn hvr-hover" href="#"><i className="fab fa-facebook" aria-hidden="true"></i></a>
                                <a className="btn hvr-hover" href="#"><i className="fab fa-google-plus" aria-hidden="true"></i></a>
                                <a className="btn hvr-hover" href="#"><i className="fab fa-twitter" aria-hidden="true"></i></a>
                                <a className="btn hvr-hover" href="#"><i className="fab fa-pinterest-p" aria-hidden="true"></i></a>
                                <a className="btn hvr-hover" href="#"><i className="fab fa-whatsapp" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-5">
                <div className="col-lg-12">
                    <div className="title-all text-center">
                        <h1>Featured Products</h1>
                        <p style={ { textAlign:'center'}}>Discover more luxury fragrances from our exclusive collection</p>
                    </div>
                    <div className="featured-products-box owl-carousel owl-theme">
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/product1.jpeg" className="img-fluid" alt="Image" />
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="#">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Aqua Di Gio - Fresh Aquatic</h4>
                                    <h5>$7.79</h5>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/product3.jpeg" className="img-fluid" alt="Image" />
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="#">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Imagination - Inspired Bold</h4>
                                    <h5>$10.79</h5>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/product4.jpeg" className="img-fluid" alt="Image" />
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="#">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Angel Share - Rich Warm</h4>
                                    <h5>$15.79</h5>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/product5.jpeg" className="img-fluid" alt="Image" />
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="#">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Imperial Oud - Royal Blend</h4>
                                    <h5>$12.79</h5>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/product6.jpeg" className="img-fluid" alt="Image" />
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="#">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Noor Al Oud - Pure Light</h4>
                                    <h5>$11.79</h5>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/product2.jpeg" className="img-fluid" alt="Image" />
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="#">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Desert Oud - Earthy Rich</h4>
                                    <h5>$10.79</h5>
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

export default ShopDetails