import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Input, InputNumber, Pagination, Select, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import classNames from 'classnames/bind';
import styles from './ManageVoucher.module.scss';
import { deleteVoucherByVoucherCode, getAllVoucher } from '~/redux/voucher/apiVoucher';
const { Option } = Select;

const cx = classNames.bind(styles);

function ManagerVoucher() {
    const [page, setPage] = useState(1);
    const [lineNumber, setLineNumber] = useState(6);
    const [loadApiVoucher, setLoadApiVoucher] = useState(false);
    const [state, setState] = useState({
        name: '',
        voucher_code: '',
        is_used: '',
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
        voucher_code: state?.voucher_code,
        is_used: state?.is_used,
        status: '',
        limit: lineNumber,
        page: page,
        sort: 'desc',
    };

    let totalState = state?.name + state?.voucher_code + state?.is_used;

    useEffect(() => {
        getAllVoucher(data, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadApiVoucher || page]);

    useEffect(() => {
        getAllVoucher(data, dispatch, user?.accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalState, lineNumber]);

    //B3: Lấy danh sách
    const listVoucher = useSelector((state) => state.voucher.voucher?.voucherCurrent);

    //B4: Tạo cột
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên voucher',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
            render: (text) => <span style={{ color: '#1677ff' }}>{text * 100}%</span>,
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expired_date',
            key: 'expired_date',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Mã voucher',
            dataIndex: 'voucherCode',
            key: 'voucherCode',
            render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'is_used',
            key: 'is_used',
            render: (text) => {
                switch (text) {
                    case 1:
                        return <Tag color="success">Đã dùng</Tag>;
                    case 0:
                        return <Tag color="volcano">Chưa dùng</Tag>;
                    default:
                        return <Tag color="blue">{text}</Tag>;
                }
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        style={{ display: user.roles.map((item) => (item === 'ADMIN' ? 'block' : 'none')) }}
                        type="primary"
                        danger
                        ghost
                        onClick={() => handleDeleteVoucher(record)}
                    >
                        <DeleteOutlined />
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDeleteVoucher = (voucher) => {
        deleteVoucherByVoucherCode(voucher.voucherCode, user?.accessToken, dispatch);
        setLoadApiVoucher(!loadApiVoucher);
    };

    const handleIncrement = () => {
        return (
            <div
                className={cx('counter-number')}
                // style={{ padding: '0 5px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '12px' }}
                onClick={() => setLineNumber(lineNumber + 1)}
            >
                <PlusCircleOutlined />
            </div>
        );
    };

    const handleDecrement = () => {
        if (lineNumber < 2) {
            return (
                <div className={cx('counter-number')} onClick={() => setLineNumber(1)}>
                    <MinusCircleOutlined />
                </div>
            );
        } else {
            return (
                <div className={cx('counter-number')} onClick={() => setLineNumber(lineNumber - 1)}>
                    <MinusCircleOutlined />
                </div>
            );
        }
    };

    const onChange = (value) => {
        // console.log('changed', value);
        setLineNumber(value);
    };

    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;

        setState({ ...state, [name]: value });
    };

    const handleSelectIs_usedChange = (value) => {
        setState({ ...state, is_used: value });
    };

    const layoutInput = () => {
        return (
            <div className={cx('wrapper-input-group')}>
                <Input.Group className={cx('input-group')} compact>
                    <Input
                        style={{ width: '30%', height: 32 }}
                        placeholder="Tìm tên"
                        name="name"
                        value={state?.name}
                        onChange={handleOnchangeInput}
                    />
                    <Input
                        style={{ width: '30%', height: 32 }}
                        placeholder="Tìm mã giảm giá"
                        name="voucher_code"
                        value={state?.voucher_code}
                        onChange={handleOnchangeInput}
                    />
                    <Select
                        className={cx('input-select')}
                        style={{ width: '20%', height: 32 }}
                        placeholder="Trạng thái"
                        name="is_used"
                        onChange={handleSelectIs_usedChange}
                    >
                        <Option value="">Trạng thái</Option>
                        <Option value="0">Chưa dùng</Option>
                        <Option value="1">Đã dùng</Option>
                    </Select>
                </Input.Group>
            </div>
        );
    };

    const tableFooter = () => {
        return (
            <div className={cx('table-footer')}>
                <div style={{ display: 'flex', width: '150px' }}>
                    {/* <Button onClick={() => setLineNumber(lineNumber + 1)}>+</Button> */}
                    <InputNumber
                        addonBefore={handleDecrement()}
                        addonAfter={handleIncrement()}
                        min={1}
                        max={10}
                        // defaultValue={lineNumber}
                        value={lineNumber}
                        onChange={onChange}
                    />{' '}
                    {/* <Button onClick={() => setLineNumber(lineNumber - 1)}>-</Button> */}
                </div>
                <Pagination
                    pageSize={lineNumber}
                    total={listVoucher?.totalItems}
                    // current={page}
                    onChange={(page) => setPage(page)}
                />
            </div>
        );
    };

    return (
        <div style={{ marginTop: '120px' }}>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <Card
                    size="small"
                    title="Total Voucher"
                    // extra={<a href="#">More</a>}
                    style={{
                        width: 180,
                        height: 140,
                    }}
                >
                    <h3 style={{ fontSize: '28px' }}>{listVoucher?.totalItems}</h3>
                    <p>Mã giảm giá </p>
                </Card>

                <div style={{ display: 'flex', margin: '20px auto 0' }} />
                <Table
                    columns={columns}
                    // { listAccount && listAccount.length > 0 ? dataSource={listAccount} : null}
                    dataSource={listVoucher?.content}
                    // rowKey={(orders) => orders.id}
                    title={() => layoutInput()}
                    footer={() => tableFooter()}
                    pagination={false}
                />
            </div>
        </div>
    );
}
export default ManagerVoucher;
