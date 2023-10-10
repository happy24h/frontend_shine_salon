import Slider from 'react-slick';
import classNames from 'classnames/bind';
// import styles from '../ContentSlider/ContentSlider.module.scss';
import styles from '../../../Home/components/ContentSlider/ContentSlider.module.scss';
const cx = classNames.bind(styles);

let dataBook = [
    {
        id: 1,
        name: 'Thay đổi ngoại hình, chàng trai lạnh lùng, ít nói khiến cô hoa khôi rung động',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/hanh-trinh-toa-sang/30shine-thay-doi-ngoai-hinh.jpg',
    },
    {
        id: 2,
        name: 'Sau khi cắt tóc ở đây, tôi đã có người yêu và thoát cảnh Ế bền vững 23 năm.',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/hanh-trinh-toa-sang/30shine-nam-sinh-kien-truc-lot-xac.jpg',
    },
    {
        id: 3,
        name: 'Bạn sinh viên IT lột xác thành hot boy vạn người mê',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/hanh-trinh-toa-sang/30shine-lot-xac-thanh-hot-boy.jpg',
    },

    {
        id: 4,
        name: 'Phúc lột xác mái tóc để suốt bao năm giúp ngoại hình mới cực cuốn hút',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/hanh-trinh-toa-sang/30shine-toc-mullet.jpg',
    },
    {
        id: 4,
        name: 'Phúc lột xác mái tóc để suốt bao năm giúp ngoại hình mới cực cuốn hút',
        image: 'https://storage.30shine.com/ResourceWeb/data/images/hanh-trinh-toa-sang/30shine-toc-mullet.jpg',
    },
];
function Book({ settings }) {
    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Phản hồi từ khách hàng</span>

                    <button className="btn-section">Xem thêm</button>
                </div>

                <div className={cx('slider')}>
                    <Slider className={cx('container')} {...settings}>
                        {dataBook &&
                            dataBook.length > 0 &&
                            dataBook.map((item, index) => (
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

export default Book;
