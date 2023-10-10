import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
// import './Footer.scss';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('wide')}>
                <div className={cx('row')}>
                    <div className="col">
                        <h3 className={cx('footer__heading')}>Chăm sóc khách hàng</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>Trung Tâm Trợ Giúp</li>
                            <li className={cx('footer-item')}>Email: vietanhhappy99@gmail.com</li>
                            <li className={cx('footer-item')}>Hướng dẫn mua hàng</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3 className={cx('footer__heading')}>Giới thiệu</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>Giới thiệu</li>
                            <li className={cx('footer-item')}>Tuyển Dụng</li>
                            <li className={cx('footer-item')}>Điều khoản</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3 className={cx('footer__heading')}>Danh mục</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>Thể thao </li>
                            <li className={cx('footer-item')}>Đọc sách</li>
                            <li className={cx('footer-item')}>Giáo dục</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3 className={cx('footer__heading')}>Theo dõi</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>Facebook</li>
                            <li className={cx('footer-item')}>Instagram</li>
                            <li className={cx('footer-item')}>Linkedin</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={cx('footer__bottom')}>
                <div>
                    <p className={cx('footer__text')}>2022 - Happy learning nền tảng học online miễn phí.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
