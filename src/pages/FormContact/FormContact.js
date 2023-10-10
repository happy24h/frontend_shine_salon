import './FormContact.scss';
import { createFeedback } from '~/redux/feedback/apiFeedback';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
function FormContact() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login?.currentUser);

    const formik = useFormik({
        initialValues: {
            title: '',
            email: '',
            phone: '',
            description: '',
            account_id: `${user ? user?.id : ''}`,
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
        <div className="wrapper-form-contact">
            <div className="container">
                <div className="content">
                    <div className="left">
                        <div className="details address">
                            <i className="fas fa-map-marker-alt"></i>
                            <div className="topic">Address</div>
                            <div className="text-one">Cầu Giấy, Hà Nội</div>
                            <div className="text-two">Việt Nam</div>
                        </div>
                        <div className="details phone">
                            <i className="fas fa-phone-alt"></i>
                            <div className="topic">Phone</div>
                            <div className="text-one">0339007770</div>
                            {/* <div className="text-two">0339007770</div> */}
                        </div>
                        <div className="details email">
                            <i className="fas fa-envelope"></i>
                            <div className="topic">Email</div>
                            <div className="text-one">vietanhhappy99@gmail.com</div>
                            {/* <div className="text-two">vietanhhappy99@gmail.com</div> */}
                        </div>
                    </div>
                    <div className="right">
                        <div className="topic-text">Gửi tin nhắn cho chúng tôi</div>
                        <p>
                            Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với
                            bạn sớm nhất có thể
                        </p>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Enter your title"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="message-form-contact">
                                {formik.errors.title && <p className="error">{formik.errors.title}</p>}
                            </div>
                            <div className="input-box">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="message-form-contact">
                                {formik.errors.email && <p className="error">{formik.errors.email}</p>}
                            </div>
                            <div className="input-box">
                                <input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="message-form-contact">
                                {formik.errors.phone && <p className="error">{formik.errors.phone}</p>}
                            </div>
                            <div className="input-box message-box">
                                <textarea
                                    placeholder="Message"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                ></textarea>
                            </div>
                            <div className="message-form-contact">
                                {formik.errors.description && <p className="error">{formik.errors.description}</p>}
                            </div>
                            <div className="button">
                                <input type="submit" value="Gửi thông tin" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormContact;
