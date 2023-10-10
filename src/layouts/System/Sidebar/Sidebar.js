import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuItem from './Menu/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDay,
    faCartShopping,
    faComment,
    faDashboard,
    faHandScissors,
    faNetworkWired,
    faNewspaper,
    faTicket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
// import { faBlogger } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function Sidebar() {
    const { t } = useTranslation();
    const MENU_ITEMS = [
        {
            // eslint-disable-next-line no-undef
            icon: <FontAwesomeIcon icon={faDashboard} />,
            title: t('systemSidebar.dashboard.title'),
            data: [
                {
                    title: t('systemSidebar.dashboard.data.title_booking'),
                    to: '/system/manage-dash-board-booking',
                },
                {
                    title: t('systemSidebar.dashboard.data.title_service'),
                    to: '/system/manage-dash-board-service',
                },
                {
                    title: t('systemSidebar.dashboard.data.title_order'),
                    to: '/system/manage-dash-board-order',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: t('systemSidebar.accounts.title'),
            data: [
                {
                    title: t('systemSidebar.accounts.data.list'),
                    to: '/system/manage-user',
                },
                {
                    title: t('systemSidebar.accounts.data.create'),
                    to: '/system/manage-user/add',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faNewspaper} />,
            title: t('systemSidebar.blog.title'),
            data: [
                {
                    title: t('systemSidebar.blog.data.list'),
                    to: '/system/manage-blog',
                },
                {
                    title: t('systemSidebar.blog.data.create'),
                    to: '/system/manage-blog/add',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faCalendarDay} />,
            title: t('systemSidebar.booking.title'),
            data: [
                {
                    title: t('systemSidebar.booking.data.list'),
                    to: '/system/manage-booking',
                },
                {
                    title: t('systemSidebar.booking.data.create'),
                    to: '/system/manage-booking/add',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faNetworkWired} />,
            title: t('systemSidebar.branch.title'),
            data: [
                {
                    title: t('systemSidebar.branch.data.list'),
                    to: '/system/manage-branch',
                },
                {
                    title: t('systemSidebar.branch.data.create'),
                    to: '/system/manage-branch/add',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faHandScissors} />,
            title: t('systemSidebar.service.title'),
            data: [
                {
                    title: t('systemSidebar.service.data.list'),
                    to: '/system/manage-service',
                    permission: ['ADMIN', 'RECEPTIONISTS', 'STAFF', 'CUSTOMER_CARE'],
                },
                {
                    title: t('systemSidebar.service.data.create'),
                    to: '/system/manage-service/add',
                },
                {
                    title: t('systemSidebar.type_service.data.list'),
                    to: '/system/manage-type-service',
                },
                {
                    title: t('systemSidebar.type_service.data.create'),
                    to: '/system/manage-type-service/add',
                },
            ],
        },
        // {
        //     icon: <FontAwesomeIcon icon={faComment} />,
        //     title: t('systemSidebar.feedback.title'),
        //     data: [
        //         {
        //             title: t('systemSidebar.feedback.data.list'),
        //             to: '/system/manage-feedback',
        //         },
        //         {
        //             title: t('systemSidebar.feedback.data.create'),
        //             to: '/system/manage-feedback/add',
        //         },
        //     ],
        // },
        {
            icon: <FontAwesomeIcon icon={faTicket} />,
            title: t('systemSidebar.voucher.title'),
            data: [
                {
                    title: t('systemSidebar.voucher.data.list'),
                    to: '/system/manage-voucher',
                },
                {
                    title: t('systemSidebar.voucher.data.create'),
                    to: '/system/manage-voucher/add',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faComment} />,
            title: t('systemSidebar.feedback.title'),
            data: [
                {
                    title: t('systemSidebar.feedback.data.list'),
                    to: '/system/manage-feedback',
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faCartShopping} />,
            title: 'Hóa đơn',
            data: [
                {
                    title: 'Danh sách hóa đơn',
                    to: '/system/manage-order',
                },
            ],
        },
    ];

    const user = useSelector((state) => state.auth.login?.currentUser);

    // const checkPermission  = () => {
    //     let checkRole = true;
    //     item.data.permission.map(permission => (
    //         user.roles.map(item => (
    //             item === permission ? "block" : "none"
    //         ))
    //     ));
    //     return checkRole;
    // };

    const MenuCustom = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: t('systemSidebar.accounts.title'),
            data: [
                {
                    title: 'Thông tin',
                    to: `/system/manage-user/detail/${user.id}`,
                },
                {
                    title: 'Cập nhật thông tin',
                    to: `/system/manage-user/modal-edit/${user.id}`,
                },
            ],
        },
        {
            icon: <FontAwesomeIcon icon={faNewspaper} />,
            title: 'Hóa đơn',
            data: [
                {
                    title: 'Danh sách hóa đơn',
                    to: '/system/manage-order',
                },
            ],
        },
    ];

    return (
        <nav className={cx('sidebar')}>
            <div className={cx('logo')}>
                <span>Happy24h</span>
            </div>
            {user?.isAdmin ? (
                <div className={cx('sidebar-menu')}>
                    {MENU_ITEMS.map((item, index) => (
                        <MenuItem key={index} title={item.title} icon={item.icon} data={item.data} />
                    ))}
                </div>
            ) : (
                <div className={cx('sidebar-menu')}>
                    {MenuCustom.map((item, index) => (
                        <MenuItem key={index} title={item.title} icon={item.icon} data={item.data} />
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Sidebar;
