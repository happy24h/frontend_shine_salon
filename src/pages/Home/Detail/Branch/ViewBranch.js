import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DatePicker } from 'antd';

import { Button, Card, Result } from 'antd';
import classNames from 'classnames/bind';
import styles from './ViewBranch.module.scss';
import { getBooking } from '~/redux/booking/apiBooking';
import InfoBranch from './InfoBranch/InfoBranch';

const cx = classNames.bind(styles);

function ViewBranch() {
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBooking = useSelector((state) => state.booking.booking?.listData);

    const onChange = (date, dateString) => {
        console.log('test', date, 'aaaa', dateString);
        setState(dateString);
    };

    let today = new Date();
    if (state) {
        today = new Date(state);
    } else {
    }
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    console.log('today', today);
    let dataBooking = {
        branch_id: id,
        employee_id: '',
        role: '3',
        date_booking: today,
        time_booking: '',
        start: '',
        end: '',
        limit: 20,
        page: 1,
        sort: 'asc',
    };

    useEffect(() => {
        getBooking(dataBooking, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    useEffect(() => {
        getBooking(dataBooking, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [today]);

    const handleTimeBooking = (id) => {
        navigate(`/order-modal/${id}`);
    };

    return (
        <div style={{ margin: '45px 0 ' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <Card
                    title={<DatePicker onChange={onChange} placeholder="Chọn ngày" />}
                    style={{
                        width: 1200,
                        minHeight: 600,
                        backgroundColor: '#e5e5e5',
                    }}
                >
                    {listBooking.content && listBooking.content.length > 0 ? (
                        listBooking?.content.map((item, index) => {
                            return (
                                <div key={index} className={cx('wrapper-content')}>
                                    <div className={cx('content-employee')}>
                                        <div
                                            className={cx('content-left')}
                                            style={
                                                item.employee?.employee_thumbnail
                                                    ? {
                                                          backgroundImage: `url(${item.employee?.employee_thumbnail})`,
                                                      }
                                                    : {}
                                            }
                                        ></div>
                                        <div className={cx('content-right')}>
                                            <div className={cx('up')}>{item.employee?.employee_name}</div>
                                            <div className="down">{item.employee?.employee_description}</div>
                                        </div>
                                    </div>
                                    <Card
                                        size="small"
                                        title="Chọn ngày đặt lịch"
                                        // extra={<DatePicker onChange={onChange} />}
                                        style={{
                                            minHeight: 170,
                                            width: '100%',
                                            marginLeft: 20,
                                        }}
                                    >
                                        <div className={cx('')}>
                                            <div className="content-left">
                                                <div
                                                    className="doctor-schedule-container"
                                                    style={{ paddingLeft: '0px ' }}
                                                >
                                                    <div className="grid wide">
                                                        <div className="row">
                                                            <div className="col l-12 m-12 c-12">
                                                                <div>
                                                                    <h3 style={{ fontSize: '20px' }}>Đặt lịch </h3>
                                                                    <div>
                                                                        Ngày: <span>{today}</span>
                                                                    </div>
                                                                </div>
                                                                <div className={cx('wrapper-btn')}>
                                                                    {item.employee.bookingByTime_bookings?.map(
                                                                        (item, index) => {
                                                                            let isStatus =
                                                                                item?.status === 1 ? true : false;
                                                                            return (
                                                                                <div
                                                                                    key={index}
                                                                                    style={{
                                                                                        marginRight: '12px',
                                                                                        marginBottom: '6px',
                                                                                    }}
                                                                                >
                                                                                    <Button
                                                                                        type="primary"
                                                                                        className={cx('btn-booking')}
                                                                                        onClick={() =>
                                                                                            handleTimeBooking(item.id)
                                                                                        }
                                                                                        disabled={isStatus}
                                                                                        style={
                                                                                            item?.status === 1
                                                                                                ? {
                                                                                                      backgroundColor:
                                                                                                          '#8ccdf2',
                                                                                                  }
                                                                                                : {}
                                                                                        }
                                                                                    >
                                                                                        {item?.time_booking}:00 -{' '}
                                                                                        {item?.time_booking}:30
                                                                                    </Button>
                                                                                </div>
                                                                            );
                                                                        },
                                                                    )}
                                                                </div>
                                                                {/* </Card> */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {}
                                                </div>
                                            </div>
                                            <div className="content-right">
                                                <InfoBranch EmployeeIdFromParent={id} />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            );
                        })
                    ) : (
                        <Result
                            status="404"
                            title="Thông báo"
                            subTitle="Bạn không thể đặt lịch vào ngày này, vui lòng chọn ngày khác."
                            extra={
                                <Button type="primary" onClick={() => navigate('/')}>
                                    Back Home
                                </Button>
                            }
                        />
                    )}
                </Card>
            </div>
        </div>
    );
}

export default ViewBranch;
