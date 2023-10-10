import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getBlog } from '~/redux/blog/apiBlog';

import { DeleteOutlined, EyeTwoTone, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Space, Table, Button, Form, Card, InputNumber, Pagination } from 'antd';
import { Input } from 'antd';
import ModalDetailBlog from './DetailBlog/ModalDetailBlog';
import classNames from 'classnames/bind';
import styles from './ManageBlog.module.scss';

const cx = classNames.bind(styles);

function ManageBlog() {
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [detailId, setDetailId] = useState();
    const [lineNumber, setLineNumber] = useState(3);
    const [page, setPage] = useState(1);
    const [state, setState] = useState({
        title: '',
        account: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listBlog = useSelector((state) => state.blog.blog.listData);
    let dataBlog = {
        title: state?.title,
        auth_name: state?.account,
        start: '',
        end: '',
        page: page,
        limit: lineNumber,
        sort: 'asc',
        status: '',
    };

    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;

        setState({ ...state, [name]: value });
    };
    let totalState = state?.title + state?.account;
    useEffect(() => {
        getBlog(dataBlog, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, lineNumber]);
    useEffect(() => {
        getBlog(dataBlog, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalState]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            // render: (text) => <Link>{text}</Link>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => {
                const slicedText = text.slice(0, 50);
                let newText = slicedText.length >= 50 ? `${slicedText}...` : text;
                return <span style={{ color: '#1677ff' }}>{newText}</span>;
            },
        },

        {
            title: 'Account',
            dataIndex: 'account',
            key: 'account',
            render: (text) => <span>{text?.name}</span>,
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            render: (text) => {
                const slicedText = text.slice(0, 100);
                let newText = slicedText.length >= 100 ? `${slicedText}...` : text;
                return <span style={{ color: '#1677ff' }}>{newText}</span>;
            },
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
                    <Button type="primary" ghost onClick={() => handleDetailBlog(record)}>
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
    const handleDeleteUser = () => {};

    // const handleEditUser = (blog) => {
    //     setOpenViewEdit(true);
    //     setEditId(blog.id);
    // };
    const handleDetailBlog = (blog) => {
        setOpenViewDetail(true);
        setDetailId(blog.id);
    };

    const layoutInput = () => {
        return (
            <div className={cx('wrapper-input-group')}>
                <Input.Group className={cx('input-group')} compact>
                    <Input
                        style={{ width: '30%', height: 32 }}
                        placeholder="Tìm theo tiêu đề"
                        name="title"
                        value={state?.title}
                        onChange={handleOnchangeInput}
                    />

                    <Input
                        style={{ width: '30%', height: 32 }}
                        placeholder="Tìm theo tên tác giả"
                        name="account"
                        value={state?.account}
                        onChange={handleOnchangeInput}
                    />
                </Input.Group>
                <Link to={'/system/manage-blog/add'}>
                    <Button type="primary" style={{ fontWeight: 600, fontSize: 14, backgroundColor: '#fcaf17' }}>
                        <PlusCircleOutlined />
                        Add Blog
                    </Button>
                </Link>
            </div>
        );
    };

    const tableFooter = () => {
        return (
            <div className={cx('table-footer')}>
                <Pagination
                    pageSize={lineNumber}
                    total={listBlog?.totalItems}
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

    return (
        <div style={{ marginTop: '106px' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <Card
                    size="small"
                    title="Total Blogs"
                    // extra={<a href="#">More</a>}
                    style={{
                        width: 160,
                        height: 140,
                        marginBottom: 25,
                    }}
                >
                    <h3 style={{ fontSize: '28px' }}>{listBlog?.totalItems}</h3>
                    <p>Blogs</p>
                </Card>
                <Table
                    columns={columns}
                    dataSource={listBlog?.content}
                    title={() => layoutInput()}
                    bordered
                    footer={() => tableFooter()}
                    pagination={false}
                />
            </div>
            <ModalDetailBlog
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                detailId={detailId}
            />
        </div>
    );
}

export default ManageBlog;
