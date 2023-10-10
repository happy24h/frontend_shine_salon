import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPenToSquare, faFilePen, faImage } from '@fortawesome/free-solid-svg-icons';
import { getDetailAccount } from '~/redux/apiRequest';

import { Button, Drawer, Space, Form, Row, Col, Input } from 'antd';
import classNames from 'classnames/bind';
import styles from './EditBlog.module.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { editBlog } from '~/redux/blog/apiBlog';
const cx = classNames.bind(styles);

function EditBlog() {
    const [loadApi, setLoadApi] = useState(false);
    const [open, setOpen] = useState(false);
    let { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailBlog = useSelector((state) => state.blog.blog?.detailData);

    useEffect(() => {
        getDetailAccount(id, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApi]);

    const handleUpdateApi = () => {
        setLoadApi(!loadApi);
        // navigate(`/system/manage-blog/detail/${id}`);
        navigate(`/system/manage-blog`);
    };

    const handleClose = () => {
        // setOpen(false);
        navigate(`/system/manage-blog`);
    };

    // const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: detailBlog?.title,
            description: detailBlog?.description,
            content: detailBlog?.content,
            thumbnail: detailBlog?.thumbnail,
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Vui lòng nhập tiêu đề.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            description: Yup.string().required('Vui lòng nhập miêu tả.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            content: Yup.string().required('Vui lòng nhập nội dung.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            thumbnail: Yup.string().required('Vui lòng nhập link avatar.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
        }),
        onSubmit: (values) => {
            console.log(values);

            editBlog(id, values, dispatch, user?.accessToken, handleUpdateApi);
            // actions.resetForm();
        },
    });

    return (
        <Drawer
            width={'100vw'}
            height={'100vh'}
            title="Chỉnh sửa thông tin bài viết"
            placement="top"
            closable={true}
            onClose={handleClose}
            open={true}
            key={'top'}
            extra={
                <Space>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button form="formEditBlog" type="primary" onClick={formik.handleSubmit}>
                        Submit
                    </Button>
                </Space>
            }
        >
            {/* <div style={{ marginTop: 23 }}> */}
            {/* <Link to={`/system/manage-blog/detail/${id}`}>
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                    Back
                </Button>
            </Link> */}

            {/* <form className={cx('loginForm')} onSubmit={formik.handleSubmit} style={{ width: '1000px' }}>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faCircleInfo} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Title..."
                            autoComplete="title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.title && <p className="error">{formik.errors.title}</p>}
                    </div>
                </div>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className="inputicon" icon={faPenToSquare} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Description..."
                            autoComplete="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.description && <p className={cx('error')}>{formik.errors.description}</p>}
                    </div>
                </div>
                <div className={cx('field')}>
                    <div className={cx('customInput')}>
                        <FontAwesomeIcon className={cx('inputicon')} icon={faFilePen} />
                        <input
                            className={cx('inputfield')}
                            type="text"
                            placeholder="Content..."
                            autoComplete="content"
                            name="content"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={cx('message')}>
                        {formik.errors.content && <p className="error">{formik.errors.content}</p>}
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
                    <input className={cx('submit')} type="submit" value="Update Blog" />
                </div>
            </form> */}

            <form onSubmit={formik.handleSubmit} id="formEditBlog">
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                // name="title"
                                label="Tiêu đề"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input
                                    placeholder="Please enter user name"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                // name="description"
                                label="Miêu tả"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input
                                    placeholder="Please enter user name"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                // name="thumbnail"
                                label="Hình ảnh"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input
                                    placeholder="Please enter user name"
                                    name="thumbnail"
                                    value={formik.values.thumbnail}
                                    onChange={formik.handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                // name="content"
                                label="Nội dụng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={4}
                                    placeholder="please enter url description"
                                    name="content"
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </form>
            {/* </div> */}
        </Drawer>
    );
}

export default EditBlog;
