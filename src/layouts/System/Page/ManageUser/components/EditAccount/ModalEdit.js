import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAddressBook,
    faEnvelope,
    faPhone,
    faUser,
    faKey,
    faImage,
    faShieldCat,
} from '@fortawesome/free-solid-svg-icons';
import { editDetailAccount, getDetailAccount } from '~/redux/apiRequest';
import { Button, Form, Input, Col, Row, Drawer, Space, Select } from 'antd';
import classNames from 'classnames/bind';
import styles from './EditAccount.module.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getBranch } from '~/redux/branch/apiBranch';
const cx = classNames.bind(styles);
const { Option } = Select;

function ModalEdit() {
    const [loadApi, setLoadApi] = useState(false);
    let { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailAccount = useSelector((state) => state.account.account?.detailAccount);
    const listRoles = useSelector((state) => state.role.role?.roleCurrent);
    const listBranch = useSelector((state) => state.branch.branch?.listData?.content);
    const [state, setState] = useState(detailAccount?.roles[0].name);
    const [branchId, setBranchId] = useState(detailAccount?.branch_id);

    console.log('check id', id, '----user id', user.id);

    useEffect(() => {
        getDetailAccount(id, dispatch, user?.accessToken);
        if (!user.isAdmin) {
            navigate(`/system/manage-user/modal-edit/${user?.id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id || loadApi]);

    let dataBranch = {
        name: '',
        address: '',
        hot_line: '',
        start: '',
        end: '',
        page: 1,
        limit: 6,
        // sort: 'desc',
        sort: 'asc',
        status: '',
    };
    useEffect(() => {
        getBranch(dataBranch, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUpdateApi = () => {
        setLoadApi(!loadApi);
        navigate(`/system/manage-user/detail/${id}`);
    };
    const handleClose = () => {
        navigate(`/system/manage-user`);
    };

    const handleChangeRoles = (value) => {
        setState(value);
    };

    const formik = useFormik({
        initialValues: {
            name: detailAccount?.name,
            email: detailAccount?.email,
            password: 'a123456@',
            phone: detailAccount?.phone,
            gender: detailAccount?.gender,
            address: detailAccount?.address,
            thumbnail: detailAccount?.thumbnail,
            description: detailAccount?.description,
            branch_id: detailAccount.branch_id,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên người dùng.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            email: Yup.string()
                .required('Vui lòng nhập email.')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập địa chỉ email hợp lệ.'),
            address: Yup.string().required('Vui lòng nhập tên địa chỉ.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            phone: Yup.string()
                .required('Vui lòng nhập số điện thoại.')
                .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Phải là số điện thoại hợp lệ'),
            gender: Yup.string().required('Vui lòng xác nhận giới tính.').min(3, 'Tên phải lớn hơn 3 ký tự.'),
            thumbnail: Yup.string().required('Vui lòng nhập link ảnh.').min(4, 'Tên phải lớn hơn 4 ký tự.'),
            password: Yup.string().required('Vui lòng nhập mật khẩu.').min(4, 'Mật khẩu phải lớn hơn 4 ký tự.'),
        }),
        onSubmit: (values) => {
            const submitValue = {
                ...values,
                roles: [
                    {
                        name: state,
                    },
                ],
            };

            editDetailAccount(id, submitValue, dispatch, user?.accessToken, handleUpdateApi);
            // actions.resetForm();
        },
    });

    return (
        <>
            {
                <Drawer
                    width={'100vw'}
                    height={'100vh'}
                    title="Chỉnh sửa thông tin người dùng"
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
                    {/* <form className={cx('loginForm')} onSubmit={formik.handleSubmit} style={{ width: '1000px' }}>
                        <div className={cx('field')}>
                            <div className={cx('customInput')}>
                                <FontAwesomeIcon className={cx('inputicon')} icon={faUser} />
                                <input
                                    className={cx('inputfield')}
                                    type="text"
                                    placeholder="Name..."
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
                        <div className={cx('field')}>
                            <div className={cx('customInput')}>
                                <FontAwesomeIcon className="inputicon" icon={faEnvelope} />
                                <input
                                    className={cx('inputfield')}
                                    type="email"
                                    placeholder="Email.."
                                    autoComplete="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={cx('message')}>
                                {formik.errors.email && <p className={cx('error')}>{formik.errors.email}</p>}
                            </div>
                        </div>
                        <div className={cx('field')}>
                            <div className={cx('customInput')}>
                                <FontAwesomeIcon className={cx('inputicon')} icon={faPhone} />
                                <input
                                    className={cx('inputfield')}
                                    type="text"
                                    placeholder="Phone..."
                                    autoComplete="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={cx('message')}>
                                {formik.errors.phone && <p className="error">{formik.errors.phone}</p>}
                            </div>
                        </div>
                        <div className={cx('field')}>
                            <div className="customInput">
                                <FontAwesomeIcon className={cx('inputicon')} icon={faKey} />
                                <input
                                    className={cx('inputfield')}
                                    type="text"
                                    placeholder="Password.."
                                    autoComplete="new-password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={cx('message')}>
                                {formik.errors.password && <p className={cx('error')}>{formik.errors.password}</p>}
                            </div>
                        </div>
                        <div class="field">
                            <div className={cx('customInput')}>
                                <FontAwesomeIcon className={cx('inputicon')} icon={faShieldCat} />

                                <select
                                    className={cx('inputfield')}
                                    name="branch_id"
                                    onChange={(e) => setBranchId(e.target.value)}
                                    value={branchId}
                                >
                                    <option value="">-- Chi nhánh --</option>

                                    {listRoles &&
                                        listBranch?.length > 0 &&
                                        listBranch?.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                        {user.isAdmin && (
                            <div class="field">
                                <div className={cx('customInput')}>
                                    <FontAwesomeIcon className={cx('inputicon')} icon={faShieldCat} />

                                    <select
                                        className={cx('inputfield')}
                                        name="roles"
                                        onChange={(e) => setState(e.target.value)}
                                        value={state}
                                    >
                                        <option value="">-- Chức vụ --</option>

                                        {listRoles &&
                                            listRoles.length > 0 &&
                                            listRoles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.name}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className={cx('field')}>
                            <div className={cx('customInput')}>
                                <FontAwesomeIcon className={cx('inputicon')} icon={faAddressBook} />
                                <input
                                    className={cx('inputfield')}
                                    type="text"
                                    placeholder="Address..."
                                    autoComplete="username"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={cx('message')}>
                                {formik.errors.address && <p className="error">{formik.errors.address}</p>}
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
                        <div className={cx('field')}>
                            <div className={cx('customInput')}>
                                <FontAwesomeIcon className={cx('inputicon')} icon={faImage} />
                                <input
                                    className={cx('inputfield')}
                                    type="text"
                                    placeholder="description..."
                                    autoComplete="description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={cx('message')}>
                                {formik.errors.description && <p className="error">{formik.errors.description}</p>}
                            </div>
                        </div>

                        <div className={cx('field submitfield')} style={{ width: '900px' }}>
                            <input className={cx('submit')} type="submit" value="Update User" />
                        </div>
                    </form> */}
                    <form onSubmit={formik.handleSubmit} id="formEditBlog">
                        <Form layout="vertical" hideRequiredMark>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item label="Name">
                                        <Input
                                            placeholder="Please enter user name"
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Email">
                                        <Input
                                            placeholder="Please enter user name"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Phone">
                                        <Input
                                            placeholder="Please enter user name"
                                            name="phone"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Password">
                                        <Input
                                            placeholder="please enter url description"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Description">
                                        <Input
                                            placeholder="please enter url description"
                                            name="description"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Image">
                                        <Input
                                            placeholder="please enter url description"
                                            name="thumbnail"
                                            value={formik.values.thumbnail}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Address">
                                        <Input
                                            placeholder="please enter url description"
                                            name="address"
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Branch">
                                        <Select
                                            defaultValue="Chinh nhánh"
                                            value={formik.values.branch_id}
                                            onChange={(data) => formik.setFieldValue('branch_id', data)}
                                            options={
                                                listBranch &&
                                                listBranch?.length > 0 &&
                                                listBranch.map((item) => {
                                                    return { value: item.id, label: item.name };
                                                })
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Role">
                                        {user.isAdmin && (
                                            <Select
                                                className={cx('form-input')}
                                                defaultValue="Chức vụ"
                                                onChange={handleChangeRoles}
                                                value={state}
                                                options={
                                                    listRoles &&
                                                    listRoles?.length > 0 &&
                                                    listRoles.map((item) => {
                                                        return { value: item.name, label: item.name };
                                                    })
                                                }
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </form>
                </Drawer>
            }
        </>
    );
}

export default ModalEdit;
