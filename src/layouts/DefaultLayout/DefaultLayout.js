import Header from '~/layouts/components/Header';
// import Sidebar from '~/layouts/components/Sidebar';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Footer from '../components/Footer';
import Slider from '../components/Slider';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('container')}>
                {/* <Sidebar /> */}
                <div className={cx('content')}>
                    <Slider />
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default DefaultLayout;
