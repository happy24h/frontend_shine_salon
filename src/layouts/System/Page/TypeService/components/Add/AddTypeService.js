import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createTypeService } from '~/redux/type_service/apiTypeService';
import { Button, Input, Card } from 'antd';
import classNames from 'classnames/bind';
import styles from './AddTypeService.module.scss';
const cx = classNames.bind(styles);

function AddTypeService() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login?.currentUser);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
        }),
        onSubmit: (values) => {
            createTypeService(values, dispatch, user?.accessToken, navigate);
        },
    });

    return (
        <div style={{ marginTop: 23 }}>
            <Link to={'/system/manage-type-service'}>
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                    Back
                </Button>
            </Link>
            <Card
                title="Tạo loại dịch vụ"
                // extra={<a href="#">More</a>}
                style={{
                    width: 1200,
                    margin: '0 auto',
                }}
            >
                <form className={cx('loginForm')} onSubmit={formik.handleSubmit} style={{ width: '750px' }}>
                    <div className="col l-12">
                        <div className={cx('customInput')}>
                            <Input
                                className={cx('form-input')}
                                type="text"
                                placeholder="Tên loại dịch vụ..."
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
                    <div className={cx('field submitfield')} style={{ width: '1150px' }}>
                        <input className={cx('submit')} type="submit" value="Tạo" />
                    </div>
                </form>
            </Card>
        </div>
    );
}
export default AddTypeService;
