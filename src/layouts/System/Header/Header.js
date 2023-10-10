import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import config from '~/config';
// import Search from '~/layouts/components/Search';
import images from '~/assets/images';
// import Button from '~/components/Button';
// import Tippy from '@tippyjs/react';
// import { BellIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faUser, faCoins, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';
import Menu from '~/components/Popper/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '~/redux/apiRequest';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);

// const MENU_ITEMS = [
//     {
//         icon: <FontAwesomeIcon icon={faEarthAsia} />,
//         title: 'English',
//         children: {
//             title: 'Language',
//             data: [
//                 {
//                     type: 'language',
//                     code: 'en',
//                     title: 'English',
//                 },
//                 {
//                     type: 'language',
//                     code: 'vi',
//                     title: 'Tiếng Việt',
//                 },
//             ],
//         },
//     },
// ];

function Header() {
    const { i18n } = useTranslation();
    function clickLanguage(lang) {
        i18n.changeLanguage(lang);
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    console.log(user);
    const handleLogout = () => {
        logOut(dispatch, navigate);
    };
    const handleTest = () => {
        alert('hello world');
    };
    const handleLanguage = (value) => {
        clickLanguage(value);
    };
    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English',
                        handleOnclick: handleLanguage,
                    },
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Tiếng Việt',
                        handleOnclick: handleLanguage,
                    },
                ],
            },
        },
    ];
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            // to: '/system/manage-user',
            handleOnclick: handleTest,
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            // to: '/system/manage-user',
            handleOnclick: handleTest,
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            // to: '/system/manage-user',
            handleOnclick: handleTest,
        },
        ...MENU_ITEMS,

        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            // to: '/logout',
            separate: true,
            handleOnclick: handleLogout,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('inner-left')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="" width={48} height={40} />
                    </Link>
                    <div>Nỗ lực để tốt hơn 1% mỗi ngày</div>
                </div>
                {/* <Search /> */}
                <div className={cx('actions')}>
                    {/* <>
                        <Button style={{ color: '#808080', display: 'flex' }}>
                            <FontAwesomeIcon icon={faUser} />
                            <span className={cx('action-btn-2')}> {user?.username}</span>
                        </Button>

                        <Button style={{ marginLeft: '0px' }} primary onClick={handleLogout}>
                            Log out
                        </Button>
                    </> */}

                    <Menu items={userMenu}>
                        <img
                            className={cx('user-avatar')}
                            src={
                                user?.thumbnail?.length > 6 && user?.thumbnail
                                    ? `${user?.thumbnail}`
                                    : `${images.noAvatar}`
                            }
                            alt=""
                        />
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Header;
