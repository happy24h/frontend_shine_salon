import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { DeleteOutlined, EyeTwoTone, PlusCircleOutlined } from '@ant-design/icons';
import { Space, Table, Button, Form, Card, Input } from 'antd';
import { deleteBranch, getBranch } from '~/redux/branch/apiBranch';
import classNames from 'classnames/bind';
import styles from './ManageBranch.module.scss';

const cx = classNames.bind(styles);

function ManageBranch() {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        name: '',
        hot_line: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBranch = useSelector((state) => state.branch.branch?.listData);
    let dataBranch = {
        name: state?.name,
        address: '',
        hot_line: state?.hot_line,
        start: '',
        end: '',
        page: `${page}`,
        limit: 6,
        // sort: 'desc',
        sort: 'asc',
        status: '',
    };
    let totalState = state?.name + state?.hot_line;
    useEffect(() => {
        getBranch(dataBranch, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalState, loading]);
    useEffect(() => {
        getBranch(dataBranch, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);
    const handleLoading = () => {
        setLoading(!loading);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            // render: (text) => <Link>{text}</Link>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Hot line',
            dataIndex: 'hot_line',
            key: 'hot_line',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text) => {
                if (text.length > 9) {
                    return <div className={cx('thumbnail-branch')} style={{ backgroundImage: `url(${text})` }}></div>;
                } else {
                    return <div className={cx('thumbnail-branch')}></div>;
                }
            },
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" ghost onClick={() => handleEditUser(record)}>
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
    const handleDeleteUser = (data) => {
        // alert('hello world' + data.id);
        deleteBranch(data.id, user?.accessToken, dispatch, handleLoading);
    };
    const handleEditUser = (data) => {
        // alert('ID: ' + data.id);
        navigate(`/system/manage-branch/detail/${data.id}`);
    };
    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;

        setState({ ...state, [name]: value });
    };
    return (
        <div style={{ marginTop: '120px' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <Card
                    size="small"
                    title="Tổng Chi nhánh"
                    // extra={<a href="#">More</a>}
                    style={{
                        width: 160,
                        height: 140,
                    }}
                >
                    <h3 style={{ fontSize: '28px' }}>{listBranch?.totalItems}</h3>
                    <p>Chi nhánh</p>
                </Card>
                <Form.Item label="">
                    <Link to={'/system/manage-branch/add'}>
                        <Button type="primary" style={{ marginTop: '23px' }}>
                            Thêm nhánh
                        </Button>
                    </Link>
                </Form.Item>
                <Table
                    columns={columns}
                    dataSource={listBranch?.content}
                    title={() => (
                        <div className={cx('wrapper-input-group')}>
                            <Input.Group className={cx('input-group')} compact>
                                <Input
                                    style={{ width: '30%', height: 32 }}
                                    placeholder="Tìm theo tên"
                                    name="name"
                                    value={state?.name}
                                    onChange={handleOnchangeInput}
                                />

                                <Input
                                    style={{ width: '30%', height: 32 }}
                                    placeholder="Tìm theo số điện thoại"
                                    name="hot_line"
                                    value={state?.hot_line}
                                    onChange={handleOnchangeInput}
                                />
                            </Input.Group>
                        </div>
                    )}
                    pagination={{
                        pageSize: 6,
                        total: listBranch?.totalItems,
                        onChange: (page) => {
                            setPage(page);
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default ManageBranch;
