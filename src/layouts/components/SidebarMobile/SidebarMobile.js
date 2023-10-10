import classNames from 'classnames/bind';
import styles from './SidebarMobile.module.scss';
import config from '~/config';
import MenuItem from './Menu/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBriefcase,
    faHandshake,
    faPenAlt,
    faHome,
    faSquareXmark,
    faUserNinja,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function SidebarMobile({ handleModel }) {
    return (
        <div className={cx('wrapper')}>
            <nav className={cx('navWrapper')}>
                <div className={cx('icon-close')} onClick={() => handleModel()}>
                    <FontAwesomeIcon icon={faSquareXmark} />
                </div>
                <div onClick={() => handleModel()}>
                    <MenuItem title="Home" to={config.routes.home} icon={<FontAwesomeIcon icon={faHome} />} />
                </div>
                <div onClick={() => handleModel()}>
                    <MenuItem
                        title="Dịch vụ"
                        to={config.routes.service}
                        icon={<FontAwesomeIcon icon={faHandshake} />}
                    />
                </div>
                <div onClick={() => handleModel()}>
                    <MenuItem
                        title="Kiểu tóc"
                        to={config.routes.hairStyle}
                        icon={<FontAwesomeIcon icon={faUserNinja} />}
                    />
                </div>
                <div onClick={() => handleModel()}>
                    <MenuItem title="Bài viết" to={config.routes.blog} icon={<FontAwesomeIcon icon={faPenAlt} />} />
                </div>
                <div onClick={() => handleModel()}>
                    <MenuItem
                        title="Tuyển dụng"
                        to={config.routes.library}
                        icon={<FontAwesomeIcon icon={faBriefcase} />}
                    />
                </div>
            </nav>
        </div>
    );
}

export default SidebarMobile;
