import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faKey, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { registerUser } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/layouts/components/Loading';

function Register() {
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
        <div className="container-login">
            <form className="loginForm" onSubmit={formik.handleSubmit}>
                <h1 className="heading">Sign Up</h1>
                <div className="socialLogins">
                    <button className="socialLogin1">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </button>
                    <button className="socialLogin2">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </button>
                    <button className="socialLogin3">
                        <FontAwesomeIcon icon={faGoogle} />
                    </button>
                </div>
                <span className="standardText">Or use your email instead</span>
                <div className="field">
                    <div className="customInput">
                        <FontAwesomeIcon className="inputicon" icon={faUser} />
                        <input
                            className="inputfield"
                            type="text"
                            placeholder="Name..."
                            autoComplete="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="message">{formik.errors.name && <p className="error">{formik.errors.name}</p>}</div>
                </div>
                <div className="field">
                    <div className="customInput">
                        <FontAwesomeIcon className="inputicon" icon={faEnvelope} />
                        <input
                            className="inputfield"
                            type="email"
                            placeholder="Email.."
                            autoComplete="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="message">
                        {formik.errors.email && <p className="error">{formik.errors.email}</p>}
                    </div>
                </div>
                <div className="field">
                    <div className="customInput">
                        <FontAwesomeIcon className="inputicon" icon={faPhone} />
                        <input
                            className="inputfield"
                            type="text"
                            placeholder="Phone..."
                            autoComplete="phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="message">
                        {formik.errors.phone && <p className="error">{formik.errors.phone}</p>}
                    </div>
                </div>
                <div className="field">
                    <div className="customInput">
                        <FontAwesomeIcon className="inputicon" icon={faKey} />
                        <input
                            className="inputfield"
                            type="password"
                            placeholder="Password.."
                            autoComplete="new-password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="message">
                        {formik.errors.password && <p className="error">{formik.errors.password}</p>}
                    </div>
                </div>
                <div class="field">
                    <div className="customInput radio-input">
                        <label for="password_confirmation" class="form-label">
                            <strong>Giới tính: </strong>
                        </label>
                        <div className="radio-input-col">
                            <input
                                name="gender"
                                type="radio"
                                value="MALE"
                                class="form-control"
                                onChange={formik.handleChange}
                            />
                            <span>Nam</span>
                        </div>
                        <div className="radio-input-col">
                            <input
                                name="gender"
                                type="radio"
                                value="FEMALE"
                                class="form-control"
                                onChange={formik.handleChange}
                            />
                            <span>Nữ</span>
                        </div>
                    </div>
                    <div className="message">
                        {formik.errors.gender && <p className="error">{formik.errors.gender}</p>}
                    </div>
                </div>

                <div className="field submitfield">
                    <input className="submit" type="submit" value="SIGN UP" />
                </div>
                <div className="field signupfield">
                    <span className="linkfield">
                        <Link to="/login">Already signed up? Login here</Link>
                    </span>
                </div>
                {registerStart && <Loading />}
            </form>
        </div>
    );
}

export default Register;
