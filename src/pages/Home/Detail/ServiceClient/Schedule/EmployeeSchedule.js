import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DatePicker } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import InfoAboutEmployee from '../Info/InfoAboutEmployee';

import { Button, Card } from 'antd';
import classNames from 'classnames/bind';
import styles from './EmployeeSchedule.module.scss';
import { getBooking, getDetailBookingDate } from '~/redux/booking/apiBooking';
import ApiConfig from '~/service/ApiConfig';

const cx = classNames.bind(styles);
function EmployeeSchedule({ employees_id, branch_id }) {
    const [state, setState] = useState('');

    const [dataApi, setDataApi] = useState([]);
    const dispatch = useDispatch();
    const { id } = useParams();

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBooking = useSelector((state) => state.booking.booking?.listData);
    const detailBookingDate = useSelector((state) => state.booking.booking?.detailDataDate);
    // console.log('list booking', listBooking);

    const onChange = (date, dateString) => {
        // console.log('test', date, 'aaaa', dateString);
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
    // console.log('today', today);

    let valueId = employees_id;
    let todayDetail = today;

    console.log(detailBookingDate, 'hello toi la nguyen viet anh');
    console.log('data api ', dataApi);
    useEffect(() => {
        getDetailBookingDate(valueId, todayDetail, dispatch);
        // getBooking(dataBooking, dispatch, user?.accessToken);

        const fetchApi = async () => {
            const res = await axios.get(
                `${ApiConfig.getDetailBookingDate}?employee_id=${valueId}&date_booking=${todayDetail}`,
            );
            if (res.data.length > 0) {
                setDataApi((prev) => {
                    return [...res?.data];
                });
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [today]);

    const handleTimeBooking = (id) => {
        navigate(`/order-modal/${id}`);
    };

    console.log('check employee id -->', employees_id);

    return (
        <>
            <Card
                size="small"
                title="Chọn ngày đặt lịch"
                extra={<DatePicker onChange={onChange} />}
                className={cx('card-wrapper')}
            >
                <div className={cx('wrapper')}>
                    <div className="content-left">
                        <div className="doctor-schedule-container" style={{ paddingLeft: '0px ' }}>
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
                                            {dataApi?.map((item, index) => {
                                                let isStatus = item?.status === 1 ? true : false;
                                                return (
                                                    <div
                                                        key={index}
                                                        style={{ marginRight: '12px', marginBottom: '6px' }}
                                                    >
                                                        <Button
                                                            type="primary"
                                                            className={cx('btn-booking')}
                                                            onClick={() => handleTimeBooking(item.id)}
                                                            disabled={isStatus}
                                                            style={
                                                                item?.status === 1 ? { backgroundColor: '#8ccdf2' } : {}
                                                            }
                                                        >
                                                            {item?.time_booking}:00 - {item?.time_booking}:30
                                                        </Button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {/* </Card> */}
                                    </div>
                                </div>
                            </div>

                            {}
                        </div>
                    </div>
                    <div className="content-right">
                        <InfoAboutEmployee EmployeeIdFromParent={branch_id} />
                    </div>
                </div>
            </Card>
        </>
    );
}

export default EmployeeSchedule;
