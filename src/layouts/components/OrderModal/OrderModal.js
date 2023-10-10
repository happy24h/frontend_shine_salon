import { useState, useEffect, useRef } from 'react';
// import { Row, Tag, Checkbox, Button } from 'antd';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import validation from './validation';

import { faCartShopping, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.scss';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOder, createOderDetail } from '~/redux/order/apiOrder';
import { getAllService } from '~/redux/service/apiService';
import classNames from 'classnames/bind';
import styles from './OrderModal.module.scss';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import ApiConfig from '~/service/ApiConfig';
const cx = classNames.bind(styles);
// import moment from 'moment';

function OrderModal() {
    const [state, setState] = useState({
        username: '',
        phone: '',
        email: '',
        service: '',
        voucher: '',
        isShowLoading: false,
    });
    const [dataPrice, setDataPrice] = useState([]);
    const [modalItem, setModalItem] = useState(false);
    const [errors, setErrors] = useState({});
    const [messageError, setMessageError] = useState(false);

    const [dataService, setDataService] = useState([]);
    const listDataOrder = useRef();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    // var dataCreateOrder = useSelector((state) => state.order.order?.createData);
    const listService = useSelector((state) => state.service.service?.serviceCurrent);
    const dataCreateOrderDetail = useSelector((state) => state.orderDetail.orderDetail?.isFetching);
    const dataCreateOrder = useSelector((state) => state.order.order?.isFetching);

    let subTotal = 0;
    dataPrice.forEach((item) => (subTotal += item.unit_price));

    console.log('listDataOrder.current -----', listDataOrder.current);

    useEffect(() => {
        getAllService();
        setState({ ...user });

        setDataService(listService?.content.map((item) => ({ ...item, isActive: false })));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);
    // console.log('check state modal', state);

    //B3: Lấy danh sách

    // console.log('hello viet anh state la : ', state);

    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    let totalState = state?.email + state?.phone + state?.username;
    useEffect(() => {
        setErrors(validation(state));
    }, [totalState]);
    const values = {
        booking_id: id,
        customer_id: user?.id ? state?.id : '1',
        name_booking: state?.username,
        email: state?.email,
        phone: state?.phone,
        voucher_id: state?.voucher ? state?.voucher : '',
    };
    // console.log('check value ...', values);
    // console.log('check state modal', state);

    const handleSelectService = (item) => {
        const newDateService = dataService.map((data) => {
            if (data.service_id === item.service_id) {
                data.isActive = !data.isActive;
            }
            return data;
        });
        setDataService(newDateService);

        let filterDataService = dataService.filter((item) => item.isActive === true);
        listDataOrder.current = filterDataService;
        setDataPrice(() => {
            return filterDataService.map((element) => ({ service_id: element.service_id, unit_price: element.price }));
            // return [...prev, { service_id: item.service_id, unit_price: item.price }];
        });
    };

    const handleConfirmBooking = async () => {
        if (Object.keys(errors).length === 0) {
            // toast.error('Vui lòng điền đúng thông tin');
            setMessageError(false);

            if (subTotal === 0) {
                toast.error('Vui lòng chọn dịch vụ');
            } else {
                var res = await axios
                    .post(`${ApiConfig.createOder}`, values)
                    .then(function (response) {
                        return response.data;
                    })
                    .catch(function (error) {
                        return error.response;
                    });
            }

            const dataService = {
                order_id: res?.id,
                orderDetails: [...dataPrice],
            };
            console.log('res check,', res);

            if (res.status === 400 || res.status === 404) {
                // alert(`${res.data.path}`);

                toast.error('Vui lòng điền đúng mã giảm giá');
            } else {
                await createOderDetail(dataService, dispatch, user?.accessToken);
                setDataPrice([]);
                navigate('/');
            }
        } else {
            toast.error('Vui lòng điền đúng thông tin');
            setMessageError(true);
        }
    };
    const handleClose = () => {
        navigate('/');
    };

    // const handleDelete = (index) => {
    //     setDataPrice((state) => {
    //         const data = [...state];
    //         data.splice(index, 1);
    //         return data;
    //     });

    //     toast.success('Delete success');
    // };

    return (
        <div className="modal ">
            {state.isShowLoading && (
                <div className="modal-loading">
                    <FontAwesomeIcon className="loading" icon={faSpinner} />
                </div>
            )}

            <div className="modal__inner">
                <div className="modal__header">
                    <p>Thông tin của khách hàng</p>
                    <span onClick={() => handleClose(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </div>
                <div className="modal__body">
                    <div className="info-teacher">
                        {/* <ProfileTeacher 
                        /> */}
                    </div>
                    <form className="row">
                        <div className="col l-6 c-6 form-group">
                            <label>Họ và tên</label>
                            <input
                                type="text"
                                name="username"
                                value={state.username}
                                className="form-control"
                                onChange={handleOnchangeInput}
                            />

                            {messageError || !errors.username ? <p className={cx('error')}>{errors.username}</p> : ''}
                        </div>
                        <div className="col l-6 c-6 form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                value={state.phone}
                                onChange={handleOnchangeInput}
                            />

                            {messageError || !errors.phone ? <p className={cx('error')}>{errors.phone}</p> : ''}
                        </div>
                        <div className="col l-6 c-6 form-group">
                            <label>Địa chỉ email</label>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                value={state.email}
                                onChange={handleOnchangeInput}
                            />
                            {messageError || !errors.email ? <p className={cx('error')}>{errors.email}</p> : ''}
                        </div>

                        <div className="col l-6 c-6 form-group">
                            <label>Mã giảm giá</label>
                            <input
                                type="text"
                                name="voucher"
                                className="form-control"
                                value={state?.voucher}
                                onChange={handleOnchangeInput}
                            />
                        </div>
                    </form>

                    <div className={cx('select-service')}>
                        <strong style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 5 }}>Chọn dịch vụ</strong>
                        <div className={cx('wrapper-cart')}>
                            <FontAwesomeIcon
                                className={cx('cart-icon')}
                                icon={faCartShopping}
                                onClick={() => setModalItem(!modalItem)}
                            />
                            <span className={cx('notify-number')}>{dataPrice.length}</span>
                            {modalItem && (
                                <div className={cx('nav-list-item')}>
                                    <h4 className={cx('title-cart')}>Dịch vụ đã thêm</h4>

                                    {dataPrice.length === 0 && (
                                        <div
                                            style={{
                                                width: '300px',
                                                height: '150px',
                                                textAlign: 'center',
                                                marginTop: 50,
                                            }}
                                        >
                                            Chưa chọn sản phẩm
                                        </div>
                                    )}
                                    <div className={cx('wrapper-cart-item')}>
                                        {dataPrice &&
                                            listDataOrder.current?.map((item, index) => {
                                                return (
                                                    <div key={index} className={cx('cart-item')}>
                                                        <div style={{ display: 'flex' }}>
                                                            <div
                                                                className={cx('cart-image')}
                                                                style={{ backgroundImage: `url(${item.thumbnail})` }}
                                                            ></div>

                                                            <div>
                                                                <h4> {item.service_name}</h4>
                                                                <span className={cx('cart-price')}>
                                                                    <NumberFormat
                                                                        value={item.price}
                                                                        displayType={'text'}
                                                                        thousandSeparator={true}
                                                                        suffix={' VND'}
                                                                    />{' '}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div onClick={() => handleSelectService(item)}>
                                                            {' '}
                                                            <FontAwesomeIcon style={{ color: 'red' }} icon={faTrash} />
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                        <div className={cx('total-cart')}>
                                            <div>Tổng:</div>{' '}
                                            <span>
                                                {
                                                    <NumberFormat
                                                        value={subTotal}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' VND'}
                                                    />
                                                }{' '}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="grid wide">
                            <div className="row">
                                {dataService?.map((item, index) => {
                                    return (
                                        <div className="col l-3 m-4 c-6" key={index}>
                                            <div className={cx('item')}>
                                                <div
                                                    className={cx('item-image')}
                                                    style={{
                                                        backgroundImage: `url(${item.thumbnail})`,
                                                    }}
                                                >
                                                    {' '}
                                                </div>
                                                <span className={cx('text-name-service')}>{item.service_name}</span>
                                                <div>
                                                    <NumberFormat
                                                        value={item.price}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' VND'}
                                                    />{' '}
                                                </div>
                                                <div className={cx('wrapper-btn')}>
                                                    <button
                                                        className={cx('btn-buy')}
                                                        style={
                                                            item?.isActive
                                                                ? { backgroundColor: '#fcaf17', color: '#ffffff' }
                                                                : { backgroundColor: '#f0f0f0' }
                                                        }
                                                        onClick={() => handleSelectService(item)}
                                                    >
                                                        Chọn
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal__footer">
                    <button onClick={() => handleConfirmBooking()}>Xác nhận</button>
                    <button className="cancel" onClick={() => handleClose(false)}>
                        Hủy
                    </button>
                </div>
            </div>
            {dataCreateOrder && <Loading />}
        </div>
    );
}

export default OrderModal;
