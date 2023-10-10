import './ManageUser.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount, getAllAccount } from '~/redux/apiRequest';
import { DeleteOutlined, EyeTwoTone, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Space, Table, Button, Form, Tag, Card, Pagination } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Select } from 'antd';
// import { InputNumber } from 'antd';
import ModalDetailAccount from './components/DetailAccount/ModalDetailAccount';

import classNames from 'classnames/bind';
import styles from './ManageUser.module.scss';

const cx = classNames.bind(styles);
const { Option } = Select;

function ManageUser() {
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [detailId, setDetailId] = useState();
    const [page, setPage] = useState(1);
    const [lineNumber, setLineNumber] = useState(6);
    const [loadApi, setLoadApi] = useState(false);
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        number: '',
        roles: '',
    });
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listAccount = useSelector((state) => state.account.account?.accountCurrent);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'ID',
            dataIndex: 'accounts_id',
            key: 'id',
            // render: (text) => <Link>{text}</Link>,
        },
        {
            title: 'Name',
            dataIndex: 'accounts_name',
            key: 'name',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'accounts_email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (text) => {
                if (text.length === 4) {
                    return <Tag color="blue">{text}</Tag>;
                } else {
                    return <Tag color="green">{text}</Tag>;
                }
            },
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text) => {
                if (text?.length > 9) {
                    return <div className={cx('thumbnail-account')} style={{ backgroundImage: `url(${text})` }}></div>;
                } else {
                    return <div className={cx('thumbnail-account')}></div>;
                }
            },
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" ghost onClick={() => handleDetailUser(record)}>
                        <EyeTwoTone />
                        Detail
                    </Button>
                    <Button type="primary" danger ghost onClick={() => handleDeleteUser(record)}>
                        <DeleteOutlined />
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    let totalState = state?.name + state?.email + state?.phone + state?.gender + state?.roles;
    // console.log('check total state', totalState);

    let dataAccount = {
        name: state?.name,
        email: state?.email,
        phone: state?.phone,
        gender: state?.gender,
        start: '',
        end: '',
        page: page,
        limit: lineNumber,
        sort: 'asc',
        role_id: state?.roles,
        member_ship_class_id: '',
        status: '',
    };
    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;

        setState({ ...state, [name]: value });
    };

    const handleSelectChange = (value) => {
        setState({ ...state, gender: value });
    };
    const handleSelectChangeRoles = (value) => {
        setState({ ...state, roles: value });
    };

    useEffect(() => {
        getAllAccount(dataAccount, dispatch, user?.accessToken);
        console.log('loadApi useEffect ', loadApi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalState, lineNumber]);

    useEffect(() => {
        getAllAccount(dataAccount, dispatch, user?.accessToken);
        console.log('loadApi useEffect ', loadApi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApi || page]);

    const handleDeleteUser = (account) => {
        console.log('loadApi before ', loadApi);
        deleteAccount(account.accounts_id, user?.accessToken, dispatch);
        setLoadApi(!loadApi);
    };

    const handleDetailUser = (account) => {
        setOpenViewDetail(true);
        setDetailId(account.accounts_id);
        // navigate(`/system/manage-user/detail/${account.accounts_id}`);
    };

    const layoutInput = () => {
        return (
            <div className={cx('wrapper-input-group')}>
                <Input.Group className={cx('input-group')} compact>
                    <Input
                        style={{ width: 200, height: 32 }}
                        placeholder="Tìm theo tên"
                        name="name"
                        value={state?.name}
                        onChange={handleOnchangeInput}
                    />

                    <Input
                        style={{ width: 200, height: 32 }}
                        placeholder="Tìm theo email"
                        name="email"
                        value={state?.email}
                        onChange={handleOnchangeInput}
                    />
                    <Input
                        style={{ width: 150, height: 32 }}
                        placeholder="Tìm theo điện thoại"
                        name="phone"
                        value={state?.phone}
                        onChange={handleOnchangeInput}
                    />
                    <Select
                        className={cx('input-select')}
                        style={{ width: 150, height: 32 }}
                        placeholder="Giới tính"
                        name="gender"
                        // defaultValue="Gender"
                        onChange={handleSelectChange}
                    >
                        <Option value="">Tất cả</Option>
                        <Option value="MALE">Nam</Option>
                        <Option value="FEMALE">Nữ</Option>
                    </Select>
                    <Select
                        className={cx('input-select')}
                        style={{ width: 150, height: 32 }}
                        placeholder="Roles"
                        name="roles"
                        onChange={handleSelectChangeRoles}
                    >
                        <Option value="">Tất cả</Option>
                        <Option value="1">Admin</Option>
                        <Option value="2">RECEPTIONISTS</Option>
                        <Option value="3">STAFF</Option>
                        <Option value="4">CUSTOMER_CARE</Option>
                        <Option value="5">CUSTOMER</Option>
                    </Select>
                </Input.Group>
                {/* <Form.Item label=""> */}
                <Link to={'/system/manage-user/add'}>
                    <Button type="primary" style={{ fontWeight: 600, fontSize: 14, backgroundColor: '#fcaf17' }}>
                        <PlusCircleOutlined />
                        Add User
                    </Button>
                </Link>
                {/* </Form.Item> */}
            </div>
        );
    };

    const tableFooter = () => {
        return (
            <div className={cx('table-footer')}>
                <Pagination
                    pageSize={lineNumber}
                    total={listAccount?.totalItems}
                    showSizeChanger={true}
                    onChange={onChange}
                />
            </div>
        );
    };

    const onChange = (currentPage, currentPageSize) => {
        if (currentPage !== page) {
            setPage(currentPage);
        }

        if (currentPageSize !== lineNumber) {
            setLineNumber(currentPageSize);
            setPage(1);
        }
    };

    // console.log('test state', state);
    return (
        <div style={{ marginTop: '106px' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <Card
                    size="small"
                    title="Tổng tài khoản"
                    // extra={<a href="#">More</a>}
                    style={{
                        width: 160,
                        height: 140,
                        marginBottom: 25,
                    }}
                >
                    <h3 style={{ fontSize: '28px' }}>{listAccount?.totalItems}</h3>
                    <p>Tài khoản</p>
                </Card>

                <Table
                    columns={columns}
                    dataSource={listAccount?.content}
                    // rowKey={(listAccount) => listAccount.id}
                    bordered
                    title={() => layoutInput()}
                    footer={() => tableFooter()}
                    pagination={false}
                    // pagination={{
                    //     pageSize: lineNumber,
                    //     total: listAccount?.totalItems,
                    //     onChange: (page) => {
                    //         setPage(page);
                    //     },
                    // }}
                />
            </div>
            <ModalDetailAccount
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                detailId={detailId}
            />
        </div>
    );
}

export default ManageUser;
