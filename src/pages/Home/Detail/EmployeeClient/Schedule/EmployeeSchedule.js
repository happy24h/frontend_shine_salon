import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfoAboutEmployee from '../Info/InfoAboutEmployee';

import { Button, Form, Card } from 'antd';
import classNames from 'classnames/bind';
import styles from './EmployeeSchedule.module.scss';
import { getBooking } from '~/redux/booking/apiBooking';
// import { faCalendarAlt, faHandPointUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function EmployeeSchedule({ branch_id }) {
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const { id } = useParams();

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBooking = useSelector((state) => state.booking.booking?.listData);
    // console.log('list booking', listBooking);

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
        branch_id: '',
        employee_id: id,
        role: '',
        date_booking: today,
        time_booking: '',
        start: '',
        end: '',
        limit: 4,
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
        <>
            {' '}
            <div className="schedule-doctor">
                <div className="content-left">
                    <div className="doctor-schedule-container">
                        <Card
                            title={<DatePicker onChange={onChange} />}
                            className="info-detail-employee-client"
                            extra={<h4>Đặt lịch</h4>}
                        >
                            <div className="grid wide">
                                <div className="row">
                                    {listBooking?.content.map((item, index) => {
                                        return (
                                            <div key={index} className="col l-12 m-12 c-12">
                                                {/* <Card
                                                    size="small"
                                                    title="Đặt lịch"
                                                    // extra={<a href="#">More</a>}
                                                    style={{
                                                        minHeight: 170,
                                                    }}
                                                    key={index}
                                                > */}
                                                <h3 style={{ fontSize: '20px' }}>{item.employee.employee_name}</h3>
                                                <p>
                                                    Ngày:
                                                    <span>{item.employee.bookingByTime_bookings[0].date_booking}</span>
                                                </p>
                                                <div className={cx('wrapper-btn')}>
                                                    {item.employee.bookingByTime_bookings.map((item, index) => {
                                                        let isStatus = item?.status === 1 ? true : false;
                                                        return (
                                                            <div key={index} style={{ marginRight: '6px' }}>
                                                                <Button
                                                                    type="primary"
                                                                    className={cx('btn-booking')}
                                                                    onClick={() => handleTimeBooking(item.id)}
                                                                    disabled={isStatus}
                                                                    style={
                                                                        item?.status === 1
                                                                            ? { backgroundColor: '#8ccdf2' }
                                                                            : {}
                                                                    }
                                                                >
                                                                    {item.time_booking}:00 - {item.time_booking}:30
                                                                </Button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                {/* </Card> */}
                                            </div>
                                        );
                                    })}
                                    {listBooking?.content.length < 1 && (
                                        <div className="col l-12 m-12 c-12">
                                            <Card
                                                size="small"
                                                title="Đặt lịch"
                                                // extra={<a href="#">More</a>}
                                                style={{
                                                    minHeight: 170,
                                                }}
                                            >
                                                <h3 style={{ fontSize: '20px' }}>Chưa có lịch hẹn</h3>
                                                <p>
                                                    Ngày: <span>{today}</span>
                                                </p>
                                                <div style={{ display: 'flex', marginTop: 8 }}>
                                                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                                                        Vui lòng chọn ngày khác
                                                    </span>
                                                </div>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                        {}
                    </div>
                </div>
                <div className="content-right">
                    <InfoAboutEmployee EmployeeIdFromParent={branch_id} />
                </div>
            </div>
            {/* {modal && <Modal setModal={setModal} dataTime={dataTime} />} */}
        </>
    );
}

export default EmployeeSchedule;
