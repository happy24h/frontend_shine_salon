import React, { useEffect, useState } from 'react';
import './SliderLayout.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '~/config';
import Search from '../Search';
import { Select } from 'antd';
import {
    faBriefcase,
    faCircleQuestion,
    faClock,
    faHandshake,
    faHome,
    faHospital,
    faPenAlt,
    faSearch,
    faUserNinja,
} from '@fortawesome/free-solid-svg-icons';
import { getBranch } from '~/redux/branch/apiBranch';
import { useDispatch, useSelector } from 'react-redux';

function SliderLayout() {
    // const [state, setState] = useState({
    //     currentDate: '',
    //     timeBooking: '',
    //     accountId: '',
    //     branchId: '',
    // });

    // console.log('check branch', state.branchId);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const listBranch = useSelector((state) => state.branch.branch?.listData?.content);
    const handleOnchangeBranch = (value, name) => {
        // console.log('----', name);

        // setState((prev) => ({
        //     ...prev,
        //     branchId: value,
        // }));
        navigate(`/detail-learn-branch/${value}`);
    };

    let dataBranch = {
        name: '',
        address: '',
        hot_line: '',
        start: '',
        end: '',
        page: 1,
        limit: 6,
        // sort: 'desc',
        sort: 'asc',
        status: '',
    };

    useEffect(() => {
        getBranch(dataBranch, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="home-header-banner">
            <div className="content-up">
                <div className="title1">CƠ SỞ LÀM TÓC UY TÍN</div>
                <div className="title2">NƠI CHĂM SÓC VÀ YÊU THƯƠNG MÁI TÓC</div>
                {/* <div className="search">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Tìm kiếm kiểu tóc của bạn tại đây..." />
                </div> */}
                <div className="form-input-booking">
                    <div className="form-input-slogan">
                        <div className="form-text-slogan">Đặt lịch giử chỗ chỉ 30 giây</div>
                        <div className="form-text-slogan-down">Cắt xong trả tiền, hủy lịch không sao</div>
                    </div>
                    <div className="form-input-booking-select">
                        <Select
                            className="input-search-slider"
                            name="accountId"
                            placeholder="Chọn địa chỉ đặt lịch..."
                            onChange={handleOnchangeBranch}
                            options={listBranch?.map((item) => ({
                                label: item.name,
                                value: item.id,
                                name: 'accountId',
                            }))}
                        />
                    </div>
                </div>
            </div>
            <div className="content-down">
                <div className="options">
                    <div className="option-child">
                        <Link to={config.routes.home}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faHome} />
                            </div>
                            <div className="text-child">Trang chủ</div>
                        </Link>
                    </div>
                    <div className="option-child">
                        <Link to={config.routes.allService}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faHandshake} />
                            </div>
                            <div className="text-child">Dịch vụ</div>
                        </Link>
                    </div>
                    <div className="option-child">
                        <Link to={config.routes.allBranch}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faHospital} />
                            </div>
                            <div className="text-child">Cơ sở</div>
                        </Link>
                    </div>
                    <div className="option-child">
                        <Link to={config.routes.allEmployee}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faUserNinja} />
                            </div>
                            <div className="text-child">Nhân viên</div>
                        </Link>
                    </div>

                    <div className="option-child">
                        <Link to={'/blog'}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faPenAlt} />
                            </div>
                            <div className="text-child">Bài viết</div>
                        </Link>
                    </div>

                    <div className="option-child">
                        <Link to={'/library'}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faBriefcase} />
                            </div>
                            <div className="text-child">Tuyển dụng</div>
                        </Link>
                    </div>
                    <div className="option-child">
                        <Link to={'/contact'}>
                            <div className="icon-child">
                                <FontAwesomeIcon icon={faCircleQuestion} />
                            </div>
                            <div className="text-child">Liên Hệ</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SliderLayout;
