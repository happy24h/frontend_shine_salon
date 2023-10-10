import Slider from 'react-slick';
import classNames from 'classnames/bind';
import styles from '../../../Home/components/ContentSlider/ContentSlider.module.scss';
const cx = classNames.bind(styles);

let dataFood = [
    {
        id: 1,
        name: 'Mỹ phẩm & sản phẩm - Cam kết chất lượng',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/home/30shine-safe/30shine-so-1-ve-an-toan-4.jpg',
    },
    {
        id: 2,
        name: 'Bảo quản xe cộ, đồ đạc',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/home/30shine-safe/30shine-so-1-ve-an-toan-5.jpg',
    },
    {
        id: 3,
        name: 'Phòng chống Covid-19 - Vì sức khỏe khách hàng, nhân viên và cộng đồng',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/home/30shine-safe/30shine-so-1-ve-an-toan-3.jpg',
    },
    {
        id: 4,
        name: 'Trang thiết bị hiện đại & sạch sẽ',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/home/concept-khong-gian/30shinecon-cept-khong-gian-rong-lon-2.jpg',
    },
    {
        id: 5,
        name: 'Làm chủ thời gian đặt lịch & các dịch vụ tiện ích khác',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/home/concept-khong-gian/30shinecon-cept-khong-gian-rong-lon-3.jpg',
    },
];
function Food({ settings }) {
    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">An tâm & Tin tưởng</span>
                    <button className="btn-section">Xem thêm</button>
                </div>

                <div className={cx('slider')}>
                    <Slider className={cx('container')} {...settings}>
                        {dataFood &&
                            dataFood.length > 0 &&
                            dataFood.map((item, index) => (
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

export default Food;
