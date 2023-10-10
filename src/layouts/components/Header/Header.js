import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import config from '~/config';
import Search from '~/layouts/components/Search';
import images from '~/assets/images';
import Button from '~/components/Button';
import Tippy from '@tippyjs/react';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import { BellIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEarthAsia,
    faUser,
    faCoins,
    faGear,
    faSignOut,
    faAngleLeft,
    faBars,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';
import Menu from '~/components/Popper/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '~/redux/apiRequest';
const cx = classNames.bind(styles);

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
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
];

function Header({ homePage }) {
    const [modelSidebar, setModelSidebar] = useState(false);
    const [showGoToTop, setShowGoToTop] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginData = useSelector((state) => state.auth.login?.currentUser);
    const handleProfile = () => {
        navigate(`/system/manage-user/detail/${loginData.id}`);
    };
    const handleLogout = () => {
        logOut(dispatch, navigate);
    };
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
            handleOnclick: handleProfile,
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
            handleOnclick: handleLogout,
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setShowGoToTop(true);
            if (window.scrollY >= 250) {
                setShowGoToTop(true);
                console.log('set state');
            } else {
                // Hide
                setShowGoToTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        console.log('addEvent');
        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
            console.log('removeEvent');
        };
    }, []);
    const handleModel = () => {
        setModelSidebar(!modelSidebar);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {modelSidebar && <SidebarMobile handleModel={handleModel} />}
                {!modelSidebar && homePage ? (
                    <div className={cx('icon-bars')}>
                        <Link to={config.routes.home}>
                            <div className={cx('menu-mobile')}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </div>
                        </Link>
                    </div>
                ) : (
                    <div className={cx('icon-bars')} onClick={() => handleModel()}>
                        <div className={cx('menu-mobile')}>
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    </div>
                )}

                <div className={cx('inner-left')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="" width={48} height={40} />
                    </Link>
                    {homePage ? (
                        <Link to={config.routes.home}>
                            <div className={cx('back-home')}>
                                <FontAwesomeIcon className={cx('back-home-icon')} icon={faAngleLeft} />
                                Quay lại trang chủ
                            </div>
                        </Link>
                    ) : (
                        <div className={cx('title-salon')}>Shine Salon</div>
                    )}
                </div>
                {/* {showGoToTop && <Search />} */}
                <Search />
                <div className={cx('actions')}>
                    {!!loginData?.id ? (
                        <>
                            <div className={cx('my-course')}>Hỗ trợ</div>
                            <Tippy delay={[0, 50]} content="Thông báo" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <BellIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>
                                <FontAwesomeIcon icon={faEarthAsia} />
                                <span className={cx('action-btn-2')}> English</span>
                            </Button>
                            <Link to={config.routes.formLogin}>
                                <Button primary>Log in</Button>
                            </Link>
                        </>
                    )}

                    {!!loginData?.id && (
                        <Menu items={userMenu}>
                            <img
                                className={cx('user-avatar')}
                                src={
                                    loginData?.thumbnail?.length > 6 && loginData?.thumbnail
                                        ? `${loginData?.thumbnail}`
                                        : `${images.noAvatar}`
                                }
                                alt=""
                            />
                        </Menu>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
