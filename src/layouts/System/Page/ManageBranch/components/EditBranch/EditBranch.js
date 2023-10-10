import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPenToSquare, faFilePen, faImage } from '@fortawesome/free-solid-svg-icons';
// import { getDetailAccount } from '~/redux/apiRequest';

import { Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './EditBranch.module.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { editBlog } from '~/redux/blog/apiBlog';
import { editBranch, getDetailBranch } from '~/redux/branch/apiBranch';
const cx = classNames.bind(styles);

function EditBranch() {
    const [loadApi, setLoadApi] = useState(false);
    let { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailBranch = useSelector((state) => state.branch.branch?.detailData);

    useEffect(() => {
        getDetailBranch(id, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApi]);

    const handleUpdateApi = () => {
        setLoadApi(!loadApi);
        // navigate(`/system/manage-blog/detail/${id}`);
        navigate(`/system/manage-branch`);
    };

    // const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: detailBranch?.name,
            address: detailBranch?.address,
            hot_line: detailBranch?.hot_line,
            thumbnail: detailBranch?.thumbnail,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            address: Yup.string().required('Vui lòng nhập địa chỉ.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            hot_line: Yup.string().required('Vui lòng nhập số điện thoại.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            thumbnail: Yup.string().required('Vui lòng nhập link avatar.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
        }),
        onSubmit: (values) => {
            console.log(values);

            editBranch(id, values, dispatch, user?.accessToken, handleUpdateApi);
            // actions.resetForm();
        },
    });

    return (
        <div style={{ marginTop: 23 }}>
            <Link to={`/system/manage-blog/detail/${id}`}>
                {/* <EditOutlined /> */}
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                    Back
                </Button>
            </Link>

            <form className={cx('loginForm')} onSubmit={formik.handleSubmit} style={{ width: '1000px' }}>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faCircleInfo} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Name..."
                            autoComplete="=name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.name && <p className="error">{formik.errors.name}</p>}
                    </div>
                </div>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className="inputicon" icon={faPenToSquare} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Address..."
                            autoComplete="address"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.address && <p className={cx('error')}>{formik.errors.address}</p>}
                    </div>
                </div>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faFilePen} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Hot line..."
                            autoComplete="hot_line"
                            name="hot_line"
                            value={formik.values.hot_line}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.hot_line && <p className="error">{formik.errors.hot_line}</p>}
                    </div>
                </div>

                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faImage} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="avatar..."
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

                <div className={cx('field submitfield')} style={{ width: '850px' }}>
                    <input className={cx('submit')} type="submit" value="Update Branch" />
                </div>
            </form>
        </div>
    );
}

export default EditBranch;
