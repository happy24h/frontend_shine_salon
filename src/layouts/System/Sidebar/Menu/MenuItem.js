import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './MenuItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);
function MenuItem({ title, icon, data }) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    return (
        <ul>
            <li className={cx('menu-item')}>
                <div className={cx('title-icon')}>
                    <span className={cx('icon')}>{icon}</span>
                    <span className={cx('title')}>{title}</span>
                </div>
                <ul className={cx('list-item')}>
                    {data.map((item, index) => (
                        <NavLink key={index} className={cx('link-item')} to={item.to}>
                            {item.title}
                        </NavLink>
                    ))}
                </ul>
            </li>
        </ul>
    );
}

export default MenuItem;
