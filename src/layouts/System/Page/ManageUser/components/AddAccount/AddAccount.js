import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { Input } from 'antd';
// import { Select } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { createAccount, getAllAccount, getAllRoles } from '~/redux/apiRequest';
import { Button, Select, Input, Card } from 'antd';
import classNames from 'classnames/bind';
import styles from './CreateAccount.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getBranch } from '~/redux/branch/apiBranch';
const cx = classNames.bind(styles);

function AddAccount() {
    const [loadApi, setLoadApi] = useState(false);
    const [state, setState] = useState();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const handleApi = () => {
        setLoadApi(!loadApi);
    };

    let navigate = useNavigate();
    useEffect(() => {
        getAllRoles(dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAllAccount();
        console.log('loadApi useEffect ', loadApi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleApi]);

    const listRoles = useSelector((state) => state.role.role?.roleCurrent);
    const listBranch = useSelector((state) => state.branch.branch?.listData?.content);
    const handleChangeRoles = (value) => {
        setState(value);
        // alert(value);
        // console.log(`selected ${value}`);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
            gender: '',
            branch_id: '',
            // roles: state,
            thumbnail: '',
            address: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên người dùng.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            email: Yup.string()
                .required('Vui lòng nhập email.')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ.'),
            password: Yup.string().required('Vui lòng nhập mật khẩu.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            phone: Yup.string()
                .required('Vui lòng nhập số điện thoại.')
                .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Phải là số điện thoại hợp lệ'),
            gender: Yup.string().required('Vui lòng xác nhận giới tính.').min(3, 'Tên phải lớn hơn 3 ký tự.'),
            branch_id: Yup.string().required('Vui lòng xác nhận chi nhánh.'),
            // roles: Yup.string().required('Vui lòng xác nhận chức vụ.'),
            description: Yup.string().required('Vui lòng xác nhận miêu tả.'),
            thumbnail: Yup.string().required('Vui lòng nhập link ảnh.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            address: Yup.string().required('Vui lòng nhập địa chỉ.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
        }),
        onSubmit: (values) => {
            const submitValue = {
                ...values,

                roles: [
                    {
                        name: state,
                    },
                ],
            };
            if (state) {
                createAccount(submitValue, dispatch, user?.accessToken, handleApi, navigate);
            } else {
                alert('Chưa điền đủ thông tin');
            }
        },
    });

    let dataBranch = {
        name: state?.name,
        address: '',
        hot_line: state?.hot_line,
        start: '',
        end: '',
        page: 1,
        limit: 6,
        // sort: 'desc',
        sort: 'asc',
        status: '',
    };

    useEffect(() => {
        getBranch(dataBranch, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ marginTop: 115 }}>
            <Card
                title="Tạo tài khoản người dùng"
                className={cx('form-card')}
                extra={
                    <Link to={'/system/manage-user'}>
                        <Button type="primary">Cancel</Button>
                    </Link>
                }
            >
                <form className={cx('loginForm')} onSubmit={formik.handleSubmit}>
                    <div className="col l-6">
                        <div className={cx('customInput')}>
                            <Input
                                className={cx('form-input')}
                                type="text"
                                placeholder="Name..."
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
                                type="email"
                                placeholder="Email..."
                                autoComplete="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.email && <p className={cx('error')}>{formik.errors.email}</p>}
                        </div>
                    </div>

                    <div className="col l-6">
                        <div className={cx('customInput')}>
                            <Input
                                className={cx('form-input')}
                                type="password"
                                placeholder="Password..."
                                autoComplete="new-password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.password && <p className={cx('error')}>{formik.errors.password}</p>}
                        </div>
                    </div>
                    <div class="col l-6">
                        <div className={cx('customInput')}>
                            <Select
                                defaultValue="Giới tính"
                                className={cx('form-input')}
                                onChange={(data) => formik.setFieldValue('gender', data)}
                                options={[
                                    {
                                        value: 'MALE',
                                        label: 'Nam',
                                    },
                                    {
                                        value: 'FEMALE',
                                        label: 'Nữ',
                                    },
                                ]}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.gender && <p className={cx('error')}>{formik.errors.gender}</p>}
                        </div>
                    </div>

                    <div class="col l-6">
                        <div className={cx('customInput')}>
                            <Select
                                className={cx('form-input')}
                                defaultValue="Chinh nhánh"
                                onChange={(data) => formik.setFieldValue('branch_id', data)}
                                options={
                                    listBranch &&
                                    listBranch?.length > 0 &&
                                    listBranch.map((item) => {
                                        return { value: item.id, label: item.name };
                                    })
                                }
                            />
                        </div>

                        <div className={cx('message')}>
                            {formik.errors.branch && <p className={cx('error')}>{formik.errors.branch}</p>}
                        </div>
                    </div>
                    <div class="col l-6">
                        <div className={cx('customInput')}>
                            <Select
                                className={cx('form-input')}
                                defaultValue="Chức vụ"
                                onChange={handleChangeRoles}
                                options={
                                    listRoles &&
                                    listRoles?.length > 0 &&
                                    listRoles.map((item) => {
                                        return { value: item.name, label: item.name };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.roles && <p className={cx('error')}>{formik.errors.roles}</p>}
                        </div>
                    </div>

                    <div className="col l-6">
                        <div className={cx('customInput')}>
                            <Input
                                className={cx('form-input')}
                                type="text"
                                placeholder="Address..."
                                autoComplete="address"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.address && <p className="error">{formik.errors.address}</p>}
                        </div>
                    </div>
                    <div className="col l-6">
                        <div className={cx('customInput')}>
                            <Input
                                className={cx('form-input')}
                                type="text"
                                placeholder="Phone..."
                                autoComplete="phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.phone && <p className="error">{formik.errors.phone}</p>}
                        </div>
                    </div>
                    <div className="col l-6">
                        <div className={cx('customInput')}>
                            <Input
                                className={cx('form-input')}
                                type="text"
                                placeholder="Avatar..."
                                autoComplete="thumbnail"
                                name="thumbnail"
                                value={formik.values.thumbnail}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.thumbnail && <p className="error">{formik.errors.thumbnail}</p>}
                        </div>
                    </div>
                    <div className="col l-6">
                        <div className={cx('customInput')}>
                            <Input
                                className={cx('form-input')}
                                type="text"
                                placeholder="Description..."
                                autoComplete="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('message')}>
                            {formik.errors.description && <p className="error">{formik.errors.description}</p>}
                        </div>
                    </div>

                    <div className={cx('field submitfield')} style={{ width: '1000px' }}>
                        <input className={cx('submit')} type="submit" value="ADD USER" />
                    </div>
                </form>{' '}
            </Card>
            {/* </Add> */}
        </div>
    );
}

export default AddAccount;
