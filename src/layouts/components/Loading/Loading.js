import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
const cx = classNames.bind(styles);
function Loading() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('loading-container')}>
                <div className={cx('spinner')}></div>
                <div className={cx('spinner-center')}></div>
                <div className={cx('loading-text')}>Loading...</div>
            </div>
        </div>
    );
}

export default Loading;
