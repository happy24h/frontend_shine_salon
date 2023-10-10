import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteService, getAllService } from '~/redux/service/apiService';
import { Space, Table, Button, Form, Tag, Card, Input, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './ManageService.module.scss';
import { searchTypeService } from '~/redux/type_service/apiTypeService';
const { Option } = Select;
const cx = classNames.bind(styles);

function ManagerService() {
    const [page, setPage] = useState(1);
    const [loadApi, setloadApi] = useState(false);
    const [state, setState] = useState({
        name: '',
        type_service_id: '',
    });
    //B1: Gọi dispatch để gửi trạng thái reducer
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //B2: Lấy token
    // useSelector để lấy dữ liệu
    const user = useSelector((state) => state.auth.login?.currentUser);

    //B2: gọi api
    let data = {
        name: state?.name,
        type_service_id: state?.type_service_id,
        status: '',
        start: '',
        end: '',
        limit: 5,
        page: page,
        sort: 'desc',
    };
    let totalState = state?.name + state?.type_service_id;

    //B3: Lấy danh sách
    const listService = useSelector((state) => state.service.service?.serviceCurrent);
    const typeServices = useSelector((state) => state.typeService.typeService?.typeServiceCurrent);
    useEffect(() => {
        getAllService(data, dispatch, user?.accessToken);
        searchTypeService({ limit: 100, page: 1, sort: 'desc' }, dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApi || page]);
    useEffect(() => {
        getAllService(data, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalState]);
    //B4: Tạo cột
    const columns = [
        {
            title: 'ID',
            dataIndex: 'service_id',
            key: 'service_id',
        },

        {
            title: 'Tiêu đề',
            dataIndex: 'service_name',
            key: 'service_name',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Loại dịch vụ',
            dataIndex: 'type_service',
            key: 'type_service',
            render: (text) => <span style={{ color: '#1677ff' }}>{text.name}</span>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            // render: (text) => <span style={{ color: '#1677ff' }}>{text.price}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text) {
                    case 1:
                        return <Tag color="success">Hoạt động</Tag>;
                    case -1:
                        return <Tag color="red">Đã xóa</Tag>;
                    default:
                        return <Tag color="success">Hoạt động</Tag>;
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
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" ghost onClick={() => handleEditService(record)}>
                        <EditOutlined />
                        Chi tiết
                    </Button>
                    <Button
                        style={{ display: user.roles.map((item) => (item === 'ADMIN' ? 'block' : 'none')) }}
                        type="primary"
                        danger
                        ghost
                        onClick={() => handleDeleteService(record)}
                    >
                        <DeleteOutlined />
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEditService = (service) => {
        navigate(`/system/manage-service/detail/${service?.service_id}`);
    };

    const handleDeleteService = (service) => {
        deleteService(service?.service_id, dispatch, user?.accessToken);
        setloadApi(!loadApi);
    };

    const handleLoadAPI = () => {
        setloadApi(!loadApi);
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
                    title="Total Services"
                    // extra={<a href="#">More</a>}
                    style={{
                        width: 180,
                        height: 140,
                    }}
                >
                    <h3 style={{ fontSize: '28px' }}>{listService?.totalItems}</h3>
                    <p>Dịch vụ</p>
                </Card>
                <Form.Item label="">
                    <Link to={'/system/manage-service/add'}>
                        <Button type="primary" style={{ marginTop: '23px' }}>
                            Thêm dịch vụ
                        </Button>
                    </Link>
                </Form.Item>

                <Table
                    columns={columns}
                    // { listAccount && listAccount.length > 0 ? dataSource={listAccount} : null}
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
                                <Select
                                    className={cx('input-select')}
                                    style={{ width: '20%', height: 32 }}
                                    placeholder="Loại dịch vụ"
                                    name="type_service_id"
                                    // defaultValue="Gender"
                                    onChange={(value) => {
                                        setState({ ...state, type_service_id: value });
                                    }}
                                >
                                    <Option value="">--Loại dịch vụ--</Option>
                                    {typeServices &&
                                        typeServices?.content?.length > 0 &&
                                        typeServices?.content.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.id}>
                                                    {item.name}
                                                </Option>
                                            );
                                        })}
                                </Select>
                            </Input.Group>
                        </div>
                    )}
                    dataSource={listService?.content}
                    pagination={{
                        pageSize: 5,
                        total: listService?.totalItems,
                        onChange: (page) => {
                            setPage(page);
                        },
                    }}
                />
            </div>
        </div>
    );
}
export default ManagerService;
