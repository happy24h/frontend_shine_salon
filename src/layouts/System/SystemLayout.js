import Header from './Header';
import Sidebar from './Sidebar';
import classNames from 'classnames/bind';
import styles from './SystemLayout.module.scss';

const cx = classNames.bind(styles);
function SystemLayout({ children }) {
    return (
        <div className={cx('container')}>
            <Sidebar />
            <div className={cx('content')}>
                <Header />
                <div className={cx('page')}>{children}</div>
            </div>
        </div>
    );
}

export default SystemLayout;
