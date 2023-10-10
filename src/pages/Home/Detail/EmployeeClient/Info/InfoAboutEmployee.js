import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import './InfoAboutEmployee.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailBranch } from '~/redux/branch/apiBranch';
// import NumericFormat from 'react-number-format';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhone } from '@fortawesome/free-solid-svg-icons';
// import { PhoneFilled } from '@ant-design/icons';

function InfoAboutEmployee({ EmployeeIdFromParent }) {
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
        <div className="doctor-extra-infor-container">
            <div className="content-up">
                <div className="text-address">Địa chỉ</div>
                <div className="name-clinic">{detailBranch?.name}</div>
                <div className="detail-address">{detailBranch?.address}</div>
            </div>
            <div className="content-down">
                <>
                    {/* <div className="title-price">Tư vấn:</div> */}
                    <div className="detail-infor">
                        <div className="price">
                            <div style={{ marginTop: 3 }} className="note">
                                HỖ TRỢ KHÁCH HÀNG
                            </div>
                            <div style={{ marginTop: 6 }}>
                                <span className="left">Số điện thoại tư vấn:</span>
                                <span className="right">
                                    <NumberFormat
                                        className="currency"
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

                    <div className="payment">Khác hàng có thể thanh toán chi phí bằng hình thức: Tiền mặt</div>
                    <div className="hide-price">
                        <span onClick={() => setShowDetail(!showDetail)}>Ẩn bảng giá</span>
                    </div>
                </>
            </div>
        </div>
    );
}

export default InfoAboutEmployee;
