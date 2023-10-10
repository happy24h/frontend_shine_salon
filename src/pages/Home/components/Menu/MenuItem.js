import './MenuItem.scss';
function MenuItem() {
    return (
        <div className="home-product">
            <div className="row sm-gutter">
                <div className="col m-4 c-6">
                    <a href="./shopping/home.html" className="home-product-item">
                        <div
                            className="home-product-item__img"
                            style={{
                                backgroundImage: `url(https://vietanhhappy.herokuapp.com/ok/shopee-mobile/assets/imgs/iphone12.png)`,
                            }}
                        ></div>
                        <h4 className="home-product-item__name">iPhone 13 Pro Max | Chính hãng VN/A </h4>
                        <div className="home-product-item__price">
                            <span className="home-product-item__price-old">37.990.000đ</span>
                            <span className="home-product-item__price-current">35.000.000đ</span>
                        </div>
                        <div className="home-product-item__action">
                            <span className="home-product-item__like home-product-item__like--liked">
                                <i className="home-product-item__like-icon-empty fas fa-heart"></i>
                                <i className="home-product-item__like-icon-fill fas fa-heart"></i>
                            </span>
                            <div className="home-product-item__rating">
                                <i className="home-product-item__star--gold fas fa-star"></i>
                                <i className="home-product-item__star--gold fas fa-star"></i>
                                <i className="home-product-item__star--gold fas fa-star"></i>
                                <i className="home-product-item__star--gold fas fa-star"></i>
                                <i className="home-product-item__star--gold fas fa-star"></i>
                            </div>
                            <span className="home-product-item__sold">88 đã bán</span>
                        </div>

                        <div className="home-product-item__favourite">
                            <i className="fas fa-check"></i>
                            <span>Yêu thích</span>
                        </div>
                        <div className="home-product-item__sale-off">
                            <span className="home-product-item__sale-off-percent">7%</span>
                            <span className="home-product-item__sale-off-label">Giảm</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MenuItem;
