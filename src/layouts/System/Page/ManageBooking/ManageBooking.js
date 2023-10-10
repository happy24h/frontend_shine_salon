import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DatePicker, Input } from 'antd';

import { Button, Form, Card } from 'antd';
import classNames from 'classnames/bind';
import styles from './ManageBooking.module.scss';
import { getBooking } from '~/redux/booking/apiBooking';
// import { cleanDashboardOder } from '~/redux/dashboard/order/dashboardOrderSlice';
// import { cleanDashboardBooking } from '~/redux/dashboard/booking/dashboardBookingSlice';
import InfoBranch from '~/layouts/components/InfoBranch';

const cx = classNames.bind(styles);

function ManageBooking() {
    const [state, setState] = useState();
    const [dataInput, setDataInput] = useState({
        employee_name: '',
    });
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBooking = useSelector((state) => state.booking.booking?.listData);
    // const dataSelector = useSelector((state) => state.dashBoarBookingSlices.dashboardBooking?.listData);

    const onChange = (date, dateString) => {
        setState(date.format('YYYY-MM-DD'));
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
    // console.log('today', today);

    let dataBooking = {
        branch_id: '',
        employee_id: '',
        employee_name: dataInput?.employee_name,
        role: '',
        date_booking: today,
        time_booking: '',
        start: '',
        end: '',
        idsBooking: [],
        limit: 4,
        page: 1,
        sort: 'asc',
    };
    let totalDataInput = dataInput?.employee_name;

    useEffect(() => {
        getBooking(dataBooking, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [today, totalDataInput]);

    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;
        setDataInput({ ...dataInput, [name]: value });
    };

    return (
        <div style={{ marginTop: '106px' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <Card
                    size="small"
                    title="Total Booking"
                    // extra={<a href="#">More</a>}
                    style={{
                        width: 160,
                        height: 140,
                        marginBottom: 25,
                    }}
                >
                    <h3 style={{ fontSize: '28px' }}>{listBooking?.totalItems}</h3>
                    <p>Booking</p>
                </Card>
                <Card
                    title={
                        <Input.Group className={cx('input-group')} compact>
                            <Input
                                style={{ width: '25%', height: 32 }}
                                placeholder="Tìm tên nhân viên"
                                name="employee_name"
                                value={dataInput?.employee_name}
                                onChange={handleOnchangeInput}
                            />
                            <DatePicker
                                format="DD-MM-YYYY"
                                onChange={onChange}
                                placeholder={today}
                                style={{ width: '25%', height: 32 }}
                            />
                        </Input.Group>
                    }
                    extra={
                        <Form.Item label="">
                            <Link to={'/system/manage-booking/add'}>
                                <Button type="primary" style={{ marginTop: '23px', backgroundColor: '#fcaf17' }}>
                                    Add booking
                                </Button>
                            </Link>
                        </Form.Item>
                    }
                    style={{
                        width: 1200,
                        minHeight: 600,
                        backgroundColor: '#e5e5e5',
                    }}
                >
                    <div className="grid wide">
                        <div className="row">
                            {listBooking?.content.map((item, index) => {
                                return (
                                    <div className="col l-6 m-6 c-12">
                                        <Card
                                            size="small"
                                            title="Đặt lịch"
                                            // extra={<a href="#">More</a>}
                                            style={{
                                                // width: 260,
                                                minHeight: 235,
                                                marginBottom: 15,
                                            }}
                                            key={index}
                                        >
                                            <div className={cx('info-employee')}>
                                                <div
                                                    className={cx('image-booking')}
                                                    style={{
                                                        backgroundImage: `url(${item.employee.employee_thumbnail})`,
                                                    }}
                                                ></div>
                                                <div>
                                                    <h3 style={{ fontSize: '20px' }}>{item.employee.employee_name}</h3>
                                                    <p>
                                                        Ngày:{' '}
                                                        <span>
                                                            {item.employee.bookingByTime_bookings[0].date_booking}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={cx('wrapper-btn')}>
                                                {item.employee.bookingByTime_bookings.map((item, index) => {
                                                    let isStatus = item?.status === 1 ? true : false;
                                                    return (
                                                        <div key={index} style={{ marginRight: '5px' }}>
                                                            <Button
                                                                type="primary"
                                                                className={cx('btn-booking')}
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
                                            <div className="content-right">
                                                <InfoBranch
                                                    EmployeeIdFromParent={
                                                        item?.employee?.bookingByTime_bookings[0]?.branch_id
                                                    }
                                                />
                                            </div>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default ManageBooking;
