import Header from '../components/Header';
import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import SliderOnly from '../components/SliderOnly';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    let homePage = true;
    return (
        <div className={cx('wrapper')}>
            <Header homePage={homePage} />
            <SliderOnly />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default HeaderOnly;
