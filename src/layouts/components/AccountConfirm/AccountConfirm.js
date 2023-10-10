import classNames from 'classnames/bind';
import styles from './AccountConfirm.module.scss';
import imageCheck from './assets/images/check.png';
const cx = classNames.bind(styles);
function AccountConfirm() {
    return (
        <div>
            <div className={cx('page-background')}></div>
            <div className={cx('container')}>
                <div className={cx('content-background')}></div>
                <div className={cx('content-border')}>
                    <div className={cx('content')}>
                        <h1>
                            <img className={cx('icon-success')} src={imageCheck} alt="✔" />
                            Xác Minh Email Đã Hoàn Tất!
                        </h1>
                        <p>Bạn có thể yên tâm đóng trang này.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountConfirm;
