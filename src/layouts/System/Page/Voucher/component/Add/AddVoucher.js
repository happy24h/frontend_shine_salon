import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, DatePicker, Input, Card } from 'antd';
import classNames from 'classnames/bind';
import styles from './AddVoucher.module.scss';
import { createVoucher } from '~/redux/voucher/apiVoucher';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

function AddVoucher() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            discount: '',
            expired_date: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên'),
            discount: Yup.string().required('Vui lòng chọn mức giảm giá'),
            expired_date: Yup.string().required('Vui lòng chọn ngày hết hạn'),
        }),
        onSubmit: (values) => {
            values.discount = values.discount / 100;
            createVoucher(values, dispatch, user?.accessToken, navigate);
        },
    });

    return (
        <div style={{ marginTop: 23 }}>
            <Link to={'/system/manage-voucher'}>
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                    Back
                </Button>
            </Link>
            <Card
                title="Tạo mã giảm giá"
                // extra={<a href="#">More</a>}
                style={{
                    width: 1200,
                    margin: '0 auto',
                }}
            >
                <form className={cx('loginForm')} onSubmit={formik.handleSubmit} style={{ width: '1150px' }}>
                    <div className="col l-6">
                        <div className={cx('customInput')}>
                            <Input
                                className={cx('form-input')}
                                type="text"
                                placeholder="Tên voucher..."
                                autoComplete="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.name && <p className="error">{formik.errors.name}</p>}
                        </div>
                    </div>
                    <div className="col l-6">
                        <div className={cx('customInput')}>
                            <Input
                                className={cx('form-input')}
                                type="number"
                                placeholder="giảm giá ..."
                                autoComplete="discount"
                                name="discount"
                                value={formik.values.discount}
                                onChange={(e) => {
                                    formik.setFieldValue('discount', e.target.value);
                                    if (e.target.value < 0) {
                                        formik.setFieldValue('discount', 1);
                                        toast.error('giảm giá không được nhỏ hơn 0');
                                    }
                                    if (e.target.value > 100) {
                                        formik.setFieldValue('discount', 100);
                                        toast.error('giảm giá không được lớn hơn hơn 100');
                                    }
                                }}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.discount && <p className="error">{formik.errors.discount}</p>}
                        </div>
                    </div>

                    <div className="col l-6">
                        <div className={cx('customInput')}>
                            <div>
                                {' '}
                                <DatePicker
                                    className={cx('form-input')}
                                    placeholder="Chọn ngày hết hạn"
                                    onChange={(e) => {
                                        let thisDate = new Date(e);
                                        let dd = String(thisDate.getDate()).padStart(2, '0');
                                        let mm = String(thisDate.getMonth() + 1).padStart(2, '0');
                                        let yyyy = thisDate.getFullYear();
                                        let dateConvert = yyyy + '-' + mm + '-' + dd;
                                        formik.setFieldValue('expired_date', dateConvert);
                                    }}
                                    name="expired_date"
                                    // style={{
                                    //     // backgroundColor: '#dedede',
                                    //     width: 350,
                                    //     height: 37,
                                    // }}
                                />
                            </div>
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.expired_date && <p className="error">{formik.errors.expired_date}</p>}
                        </div>
                    </div>

                    <div className={cx('field submitfield')} style={{ width: '1200px' }}>
                        <input className={cx('submit')} type="submit" value="Create voucher" />
                    </div>
                </form>
            </Card>
        </div>
    );
}
export default AddVoucher;
