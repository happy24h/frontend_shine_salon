import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../ContentSlider/ContentSlider.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccount } from '~/redux/apiRequest';
const cx = classNames.bind(styles);
function Employee({ settings }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loadData, setLoadData] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listAccount = useSelector((state) => state.account.account?.accountCurrent?.content);
    let dataAccount = {
        name: '',
        email: '',
        phone: '',
        gender: '',
        start: '',
        end: '',
        page: 1,
        limit: 20,
        sort: 'asc',
        role_id: '3',
        member_ship_class_id: '',
        status: '',
    };
    useEffect(() => {
        getAllAccount();
        getAllAccount(dataAccount, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleViewDetailEmployee = (employee) => {
        navigate(`/detail-employee/${employee.accounts_id}`);
    };
    console.log('posts >>>', posts);

    const handleSeeMore = () => {
        navigate(`/see-more/employee`);
    };

    // let newDataTeacher = posts && posts.length > 0 ? posts : dataTeacherFake;
    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Nhân viên nổi bật tuần qua</span>
                    <button className="btn-section" onClick={handleSeeMore}>
                        Xem thêm
                    </button>
                </div>

                <div className={cx('slider')}>
                    <Slider className={cx('container')} {...settings}>
                        {listAccount &&
                            listAccount.length > 0 &&
                            listAccount.map((item, index) => {
                                return (
                                    <div
                                        className="section-customize"
                                        key={index}
                                        onClick={() => handleViewDetailEmployee(item)}
                                    >
                                        <div className="item-center">
                                            <div
                                                className="bg-image section-outstanding-doctor"
                                                style={{ backgroundImage: `url(${item.thumbnail})` }}
                                            ></div>
                                            <div className="name-specialty">{`${item.accounts_name}`}</div>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                    {/* {loadData && (
                        <div className={cx('wrapper-loading')}>
                            Loading...
                            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}

export default Employee;
