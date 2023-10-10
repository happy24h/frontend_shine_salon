import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import Loading from '~/layouts/components/Loading';

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginStart = useSelector((state) => state.auth.login?.isFetching);
    const loginData = useSelector((state) => state.auth.login?.currentUser);
    console.log('check login start', loginStart);
    console.log('check login data', loginData?.isAdmin);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Vui lòng nhập email.')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ.'),
            password: Yup.string().required('Vui lòng nhập mật khẩu.').min(5, 'Mật khẩu phải lớn hơn 5 ký tự.'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            await loginUser(values, dispatch, navigate);
        },
    });

    // const handleShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };

    return (
        <form className="sign-in-form" onSubmit={formik.handleSubmit}>
            <h2 className="title">Đăng nhập</h2>
            <div className="input-field">
                <i className="fas fa-user"></i>
                {/* <FontAwesomeIcon icon={faUser} /> */}

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
            <input type="submit" value="Login" className="btn solid" />
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
            {/* {loginStart && <Loading />} */}
        </form>
    );
}

export default SignIn;
