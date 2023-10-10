import { useState } from 'react';
import './FormLogin.scss';
import images from '~/assets/images';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/layouts/components/Loading';

function FormLogin() {
    const loginStart = useSelector((state) => state.auth.login?.isFetching);
    const [modeForm, setModeForm] = useState(true);
    console.log('check mode form >>', modeForm);
    return (
        <div className="wrapper-form-login">
            <div className={modeForm ? 'container' : 'container sign-up-mode'}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <SignIn />
                        <SignUp />
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Đăng ký ngay</h3>
                            <p>
                                Sẵn sàng để sáng tạo? <br />
                                Chúng tôi có thể giúp bạn phát triển.
                            </p>

                            <button onClick={() => setModeForm(false)} className="btn transparent" id="sign-up-btn">
                                Đăng ký
                            </button>
                        </div>

                        <img src={images.imageTransparent1} class="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Chào mừng trở lại !</h3>
                            <p>Bắt đầu sáng tạo.</p>
                            <button onClick={() => setModeForm(true)} className="btn transparent" id="sign-in-btn">
                                Đăng nhập
                            </button>
                        </div>
                        <img src={images.imageTransparent2} class="image" alt="" />
                    </div>
                </div>
            </div>
            {loginStart && <Loading />}
        </div>
    );
}

export default FormLogin;
