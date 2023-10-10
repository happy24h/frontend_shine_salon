import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import Button from '~/components/Button';
import './Contact.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createAccount } from '~/redux/apiRequest';
import { createFeedback } from '~/redux/feedback/apiFeedback';
import { useDispatch, useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function Contact() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login?.currentUser);

    const formik = useFormik({
        initialValues: {
            title: '',
            email: `${user ? user.email : ''}`,
            phone: `${user ? user.phone : ''}`,
            description: '',
            account_id: `${user ? user.id : ''}`,
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Vui lòng nhập tên tiêu đề.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            email: Yup.string()
                .required('Vui lòng nhập email.')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ.'),
            phone: Yup.string().required('Vui lòng nhập số điện thoại.'),
            // .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Phải là số điện thoại hợp lệ')
            description: Yup.string().required('Vui lòng nhập nội dung liên hệ.').min(3, 'Tên phải lớn hơn 3 ký tự.'),
        }),
        onSubmit: async (values, actions) => {
            console.log('feedback là: ', values);
            await createFeedback(values, dispatch);
            actions.resetForm();
        },
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('row-content')}>
                    <div className={cx('content-left')}>
                        <h2>Chúng tôi trân trọng ý kiến của quý khách</h2>
                        <strong>Nếu bạn có gì thắc mắc hãy liên hệ với chúng tôi qua địa chỉ</strong>
                        <ul>
                            <li>
                                <span>Điện thoại</span> <h4>1900.27.27.30</h4>
                            </li>
                            <li>
                                <span>Điạ chỉ</span>{' '}
                                <h4>Số 82 Trần Đại Nghĩa, phường Đồng Tâm, quận Hai Bà Trưng, Hà Nội</h4>
                            </li>
                            <li>
                                <span>Email</span> <h4>30shinestore@30shine.com</h4>
                            </li>
                            <li>
                                <span>Thời gian</span> <h4>Tất cả các ngày trong tuần</h4>
                            </li>
                            <li>
                                <span>Mạng xã hội</span>{' '}
                                <h4 className={cx('icon-contact-page')}>
                                    <span>
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </span>
                                </h4>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('content-right')}>
                        <h2>Gửi thắc mắc cho chúng tôi</h2>
                        <strong>
                            Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với
                            bạn sớm nhất có thể
                        </strong>
                        <form className="row contact-page" onSubmit={formik.handleSubmit}>
                            <div className="col c-12 l-12 form-group">
                                <label>Tiêu đề *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập tiêu đề"
                                    className="form-control"
                                />
                                <div className={cx('message')}>
                                    {formik.errors.title && <p className={cx('error')}>{formik.errors.title}</p>}
                                </div>
                            </div>
                            <div style={{ display: user ? 'none' : 'block' }} className="col l-6 c-6 form-group">
                                <label>Số điện thoại *</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập số điện thoại của bạn"
                                    className="form-control"
                                />
                                <div className={cx('message')}>
                                    {formik.errors.phone && <p className={cx('error')}>{formik.errors.phone}</p>}
                                </div>
                            </div>
                            <div style={{ display: user ? 'none' : 'block' }} className="col l-6 c-6 form-group">
                                <label>Email *</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập địa chỉ email của bạn"
                                    className="form-control"
                                />
                                <div className={cx('message')}>
                                    {formik.errors.email && <p className={cx('error')}>{formik.errors.email}</p>}
                                </div>
                            </div>
                            <div className="col c-12 l-12 form-group">
                                <label>Nội dung liên hệ *</label>
                                <textarea
                                    type="text"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập nội dung liên hệ"
                                    className="form-control form-textarea"
                                ></textarea>
                            </div>
                            <div className={cx('message')}>
                                {formik.errors.description && (
                                    <p style={{ marginLeft: 12 }} className={cx('error')}>
                                        {formik.errors.description}
                                    </p>
                                )}
                            </div>
                            <div className={cx('wrapper-btn')}>
                                <Button type="submit" primary className={cx('btn-submit')}>
                                    GỬI THÔNG TIN
                                </Button>{' '}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
