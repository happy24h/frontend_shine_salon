import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registerStart = useSelector((state) => state.auth.register?.isFetching);
    console.log('check register start', registerStart);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
            description: '',
            thumbnail: '',
            address: '',

            gender: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên người dùng.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            email: Yup.string()
                .required('Vui lòng nhập email.')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ.'),
            password: Yup.string().required('Vui lòng nhập mật khẩu.').min(3, 'Tên phải lớn hơn 3 ký tự.'),
            phone: Yup.string()
                .required('Vui lòng nhập số điện thoại.')
                .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Phải là số điện thoại hợp lệ'),
            gender: Yup.string().required('Vui lòng xác nhận giới tính.').min(3, 'Tên phải lớn hơn 3 ký tự.'),
        }),
        onSubmit: (values) => {
            console.log(values);
            const dataRegister = {
                ...values,

                roles: [
                    {
                        name: 'ADMIN',
                    },
                ],
            };
            registerUser(dataRegister, dispatch, navigate);
        },
    });
    return (
        <form className="sign-up-form" onSubmit={formik.handleSubmit}>
            <h2 className="title">Đăng ký</h2>
            <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="form-login-message">
                {formik.errors.email && <p className="error">{formik.errors.email}</p>}
            </div>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                    type="text"
                    placeholder="name"
                    autoComplete="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="form-login-message">
                {formik.errors.name && <p className="error">{formik.errors.name}</p>}
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                    type="password"
                    placeholder="Password"
                    autoComplete="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="form-login-message">
                {formik.errors.password && <p className="error">{formik.errors.password}</p>}
            </div>
            <div className="input-field">
                <i className="fas fa-phone"></i>
                <input
                    type="number"
                    placeholder="Phone"
                    autoComplete="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="form-login-message">
                {formik.errors.phone && <p className="error">{formik.errors.phone}</p>}
            </div>
            <div className="wrapper-btn-form-login">
                <p>What's your gender ?</p>
                <button
                    style={formik.values.gender === 'MALE' ? { background: '#ffd800', color: '#fff' } : {}}
                    onClick={() => formik.setFieldValue('gender', 'MALE')}
                >
                    Nam
                </button>
                <button
                    style={formik.values.gender === 'FEMALE' ? { background: '#ffd800', color: '#fff' } : {}}
                    onClick={() => formik.setFieldValue('gender', 'FEMALE')}
                >
                    Nữ
                </button>
                <div className="form-login-message">
                    {formik.errors.gender && <p className="error">{formik.errors.gender}</p>}
                </div>
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Continue with Social Account</p>
            <div className="social-media">
                <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
        </form>
    );
}

export default SignUp;
