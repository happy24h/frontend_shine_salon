import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getDetailTypeService, updateTypeService } from '~/redux/type_service/apiTypeService';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './EditTypeService.module.scss';
const cx = classNames.bind(styles);

function EditTypeService() {
    let { id } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login?.currentUser);
    const detailTypeService = useSelector((state) => state.typeService.typeService?.detailTypeService);

    let navigate = useNavigate();

    useEffect(() => {
        getDetailTypeService(id, dispatch);
    }, []);

    const formik = useFormik({
        initialValues: {
            name: detailTypeService?.name,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
        }),
        onSubmit: (values) => {
            updateTypeService(id,values,dispatch,user?.accessToken,navigate);
        },
    });

    return (
        <div style={{ marginTop: 23 }}>
            <Link to={'/system/manage-type-service/detail/'+id}>
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                    Back
                </Button>
            </Link>
            <form className={cx('loginForm')} onSubmit={formik.handleSubmit} style={{ width: '1000px' }}>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faUser} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="tên loại dịch vụ..."
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
                <div className={cx('field submitfield')} style={{ width: '850px' }}>
                    <input className={cx('submit')} type="submit" value="Tạo" />
                </div>
            </form>
        </div>
    );
}
export default EditTypeService;