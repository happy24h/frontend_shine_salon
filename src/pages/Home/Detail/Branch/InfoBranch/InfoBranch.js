import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
// import './InfoBranch.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailBranch } from '~/redux/branch/apiBranch';
import styles from './InfoBranch.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function InfoBranch({ EmployeeIdFromParent }) {
    const [showDetail, setShowDetail] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailBranch = useSelector((state) => state.branch.branch?.detailData);
    console.log('check detail branch', detailBranch);
    console.log('check parent', EmployeeIdFromParent);

    useEffect(() => {
        getDetailBranch(EmployeeIdFromParent, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [EmployeeIdFromParent]);
    return (
        <div className={cx('doctor-extra-infor-container')}>
            <div className={cx('content-up')}>
                <div className={cx('text-address')}>Địa chỉ</div>
                <div className={cx('name-clinic')}>{detailBranch?.name}</div>
                <div className={cx('detail-address')}>{detailBranch?.address}</div>
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
                                        value={detailBranch?.hot_line}
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
                    {/* <div className="hide-price">
                        <span onClick={() => setShowDetail(!showDetail)}>Ẩn bảng giá</span>
                    </div> */}
                </>
            </div>
        </div>
    );
}

export default InfoBranch;
