import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, List, Tag } from 'antd';
import { getDetailOrder, updateStatusOrder } from '~/redux/order/apiOrder';
import classNames from 'classnames/bind';
import styles from './DetailOrder.module.scss';
import { getDetailBooking } from '~/redux/booking/apiBooking';
import axios from 'axios';
import { toast } from 'react-toastify';
import ApiConfig from '~/service/ApiConfig';
const cx = classNames.bind(styles);
const { Meta } = Card;

function OrderDetail() {
    const [stateApi, setStateApi] = useState([]);
    const [discount, setDiscount] = useState();
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    console.log('check ---', user.roles[0]);

    const orderDetail = useSelector((state) => state.orderDetail.orderDetail?.orderDetailCurrent);
    const bookingDetail = useSelector((state) => state.booking.booking?.detailData);
    const [statusOrderDetailChange, setStatusOrderDetailChange] = useState();
    console.log('check status', statusOrderDetailChange);
    console.log('check state api ---', stateApi);

    const dataStatus = orderDetail?.length > 0 ? orderDetail[0]?.order.status : 1;

    useEffect(() => {
        setStatusOrderDetailChange(dataStatus);
        const fetchApi = async () => {
            // await getDetailOrder(id, dispatch, user?.accessToken);
            try {
                const res = await axios.get(`${ApiConfig.getDetailOrder}/${id} `, {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                });
                console.log('check res', res);
                setStateApi(res.data);
                await getDetailBooking(res.data[0]?.order.booking_id, dispatch);

                if (res.data[0].order?.voucher_id) {
                    try {
                        const voucherCheck = await axios.get(
                            `${ApiConfig.getDetailVoucher}/${res.data[0].order?.voucher_id}`,
                            {
                                headers: { Authorization: `Bearer ${user?.accessToken}` },
                            },
                        );
                        setDiscount(voucherCheck.data.discount);
                    } catch (error) {
                        toast.error(error.response.data.message);
                    }
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id || dataStatus || statusOrderDetailChange || stateApi]);

    const handleChangeStatus = (e) => {
        if (e.target.value !== '') {
            if (window.confirm('Bạn có chắc muốn thay đổi trạng thái?')) {
                updateStatusOrder(id, e.target.value, dispatch, user?.accessToken);
                setStatusOrderDetailChange(e.target.value);
            }
        }
    };

    const checkOrderStatus = () => {
        switch (statusOrderDetailChange) {
            case 2:
                return <Tag color="blue">Đã thanh toán</Tag>;
            case 1:
                return <Tag color="success">Đã đặt</Tag>;
            case 0:
                return <Tag color="volcano">Chưa Đặt</Tag>;
            case -1:
                return <Tag color="red">Đã hủy</Tag>;
            default:
                return <Tag color="blue">{dataStatus}</Tag>;
        }
    };

    return (
        <>
            <Link to={'/system/manage-order'}>
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                    {/* <EditOutlined /> */}
                    Back
                </Button>
            </Link>

            <div className={cx('wrapper')}>
                <Card title="Profile" size="default" style={{ width: 800 }}>
                    <List className={cx('list-detail')}>
                        <strong>Id Đơn hàng:</strong> <span className={cx('text-detail')}>{id}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Khách hàng:</strong>{' '}
                        <span className={cx('text-detail')}>
                            {stateApi?.length > 0 && stateApi[0]?.order?.customer?.name}
                        </span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Tổng tiền:</strong>{' '}
                        <span className={cx('text-detail')}>
                            {stateApi?.length > 0 && stateApi[0]?.order?.total_price}
                        </span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Mã giảm giá:</strong>{' '}
                        <span className={cx('text-detail')}>
                            {stateApi?.length > 0 && stateApi[0]?.order?.voucher_id}
                        </span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Mức giảm giá:</strong>{' '}
                        <span className={cx('text-detail')}>{discount ? discount * 100 + '%' : ''}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Mã đặt lịch:</strong>{' '}
                        <span className={cx('text-detail')}>
                            {stateApi?.length > 0 && stateApi[0]?.order.booking_id}
                        </span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Ngày đặt:</strong>{' '}
                        <span className={cx('text-detail')}>{bookingDetail?.date_booking}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Khung giờ:</strong>{' '}
                        <span className={cx('text-detail')}>{bookingDetail?.time_booking}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Trạng thái:</strong>{' '}
                        {/* <span className={cx('text-detail')}>{statusOrderDetailChange} ...</span> */}
                        {user.roles[0] === 'CUSTOMER' ? (
                            <span className={cx('text-detail')}>Đã đặt</span>
                        ) : (
                            <span className={cx('text-detail')}>
                                <select value={statusOrderDetailChange} onChange={handleChangeStatus}>
                                    <option value="2">Đã thanh toán</option>
                                    <option value="1">Đã đặt</option>

                                    <option value="-1">Hủy</option>
                                </select>
                            </span>
                        )}
                    </List>
                    {/* <table>
                        <tr>
                            <th>Id</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                        </tr>
                        {stateApi &&
                            stateApi.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.serviceModel.id}</td>
                                        <td>{item.serviceModel.name}</td>
                                        <td>{item.serviceModel.price}</td>
                                    </tr>
                                );
                            })}
                    </table> */}

                    <table className={cx('customers')}>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Price</th>
                        </tr>
                        {stateApi &&
                            stateApi.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.serviceModel.id}</td>
                                        <td
                                            className={cx('image-service')}
                                            style={{
                                                backgroundImage: `url(${item.serviceModel.thumbnail})`,
                                                width: 50,
                                                height: 50,
                                            }}
                                        ></td>
                                        <td>{item.serviceModel.name}</td>
                                        <td>{item.serviceModel.price}</td>
                                    </tr>
                                );
                            })}
                    </table>
                </Card>
            </div>
        </>
    );
}
export default OrderDetail;
