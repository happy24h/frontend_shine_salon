import Slider from 'react-slick';
import classNames from 'classnames/bind';
// import styles from '../ContentSlider/ContentSlider.module.scss';
import styles from '../../../Home/components/ContentSlider/ContentSlider.module.scss';
const cx = classNames.bind(styles);

let dataProduct = [
    {
        id: 1,
        name: '[New 2023] COMBO DA SẠCH MỤN TRẮNG SÁNG BẬT TONE',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/home/reward/new-2023-combo-da-sach-mun-trang-sang-bat-tone.jpg',
    },
    {
        id: 2,
        name: 'COMBO DA LÁNG MỊN PHÁT SÁNG CHO TRAI VIỆT',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/home/reward/combo-da-lang-min-phat-sang-cho-trai-viet.jpg',
    },
    {
        id: 3,
        name: 'COMBO SẠCH MỤN TRẮNG MIN SAU 7 NGÀY',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/home/reward/combo-sach-mun-trang-min-sau-7-ngay.jpg',
    },
    {
        id: 4,
        name: '[HOT] SỮA RỬA MẶT SẠCH MỤN TRẮNG DA SKIN&DR TRÀM TRÀ',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/home/reward/hot-sua-rua-mat-sach-mun-trang-da-skin-dr-tram-tra.jpg',
    },
    {
        id: 5,
        name: 'COMBO TRẮNG SẠCH DẦU',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/home/reward/com-bo-trang-sang-sach-dau.jpg',
    },
];
function Product({ settings }) {
    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Ưu đãi & Quà tặng</span>
                    <button className="btn-section">Xem thêm</button>
                </div>

                <div className={cx('slider')}>
                    <Slider className={cx('container')} {...settings}>
                        {dataProduct &&
                            dataProduct.length > 0 &&
                            dataProduct.map((item, index) => (
                                <div key={index} className="section-customize">
                                    <div
                                        className="bg-image section-specialty"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    ></div>
                                    <div className="name-specialty">{item.name}</div>
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Product;
