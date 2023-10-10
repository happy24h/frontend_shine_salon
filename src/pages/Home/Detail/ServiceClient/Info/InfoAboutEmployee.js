import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import './InfoAboutEmployee.scss';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDetailBranch } from '~/redux/branch/apiBranch';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './InfoAboutEmployee.module.scss';
import ApiConfig from '~/service/ApiConfig';
const cx = classNames.bind(styles);

function InfoAboutEmployee({ EmployeeIdFromParent }) {
    // console.log('check employeeId ----', EmployeeIdFromParent);
    // const dispatch = useDispatch();
    const [dataApi, setDataApi] = useState([]);

    // const user = useSelector((state) => state.auth.login?.currentUser);

    // const detailBranch = useSelector((state) => state.branch.branch?.detailData);

    // console.log('detaiBranch-----', detailBranch);
    // console.log('check----branch', dataApi);
    // console.log('check----id', EmployeeIdFromParent);

    useEffect(() => {
        // getDetailBranch(EmployeeIdFromParent, dispatch, user?.accessToken);
        const fetchApi = async () => {
            const res = await axios.get(`${ApiConfig.getDetailBranch}/${EmployeeIdFromParent}`);
            if (res.data) {
                setDataApi((prev) => {
                    return { prev, ...res.data };
                });
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [EmployeeIdFromParent || dataApi]);
    return (
        <div className="">
            <div className="content-up">
                <div className={cx('text-address')}>Địa chỉ</div>
                <div className={cx('name-clinic')}>{dataApi?.name}</div>
                <div className={cx('detail-address')}>{dataApi?.address}</div>
            </div>
            <div className={cx('content-down')}>
                <>
                    {/* <div className="title-price">Tư vấn:</div> */}
                    <div className={cx('detail-infor')}>
                        <div className={cx('price')}>
                            <div style={{ marginTop: 3 }} className={cx('note')}>
                                HỖ TRỢ KHÁCH HÀNG
                            </div>
                            <div style={{ marginTop: 6 }}>
                                <span className={cx('left')}>Số điện thoại tư vấn:</span>
                                <span className={cx('right')}>
                                    <NumberFormat
                                        className={cx('currency')}
                                        value={dataApi?.hot_line}
                                        displayType={'text'}
                                        thousandSeparator=" "
                                        suffix={''}
                                        prefix="&#9742; "
                                    />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('payment')}>Khác hàng có thể thanh toán chi phí bằng hình thức: Tiền mặt</div>
                </>
            </div>
        </div>
    );
}

export default InfoAboutEmployee;
