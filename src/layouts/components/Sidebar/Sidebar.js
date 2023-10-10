import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';
import MenuItem from './Menu/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBowlFood, faCalculator, faHome } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <nav className={cx('navWrapper')}>
                <MenuItem title="Home" to={config.routes.home} icon={<FontAwesomeIcon icon={faHome} />} />
                <MenuItem title="Blog" to={config.routes.blog} icon={<FontAwesomeIcon icon={faCalculator} />} />
                <MenuItem title="Service" to={config.routes.service} icon={<FontAwesomeIcon icon={faBowlFood} />} />
                <MenuItem title="Library" to={config.routes.library} icon={<FontAwesomeIcon icon={faBook} />} />
                {/* <MenuItem title="Learn" to={config.routes.learn} icon={<FontAwesomeIcon icon={faLightbulb} />} /> */}
            </nav>
        </div>
    );
}

export default Sidebar;
