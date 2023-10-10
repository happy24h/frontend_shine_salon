import { Card, List, Button, Descriptions, Drawer, Space, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getDetailBlog } from '~/redux/blog/apiBlog';

import images from '~/assets/images';

import { getDetailAccount } from '~/redux/apiRequest';
import InfoBranch from '~/layouts/components/InfoBranch';

import { getBooking } from '~/redux/booking/apiBooking';
const { Meta } = Card;

function ModalAccount(props) {
    let { openViewDetail, setOpenViewDetail, detailId } = props;
    const [visible, setVisible] = useState(false);

    let { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const detailAccount = useSelector((state) => state.account.account?.detailAccount);
    const onClose = () => {
        setOpenViewDetail(false);
    };
    useEffect(() => {
        if (openViewDetail) {
            getDetailAccount(detailId, dispatch, user?.accessToken);
        }
    }, [detailId]);
    return (
        <>
            <Drawer title="Chức năng xem chi tiết" width={'50vw'} onClose={onClose} open={openViewDetail}>
                <Descriptions
                    title={
                        <>
                            <Image
                                width={48}
                                height={48}
                                style={{ borderRadius: 50 }}
                                src={`${detailAccount?.thumbnail}`}
                                preview={{
                                    visible,
                                    src: detailAccount?.thumbnail,
                                    onVisibleChange: (value) => {
                                        setVisible(value);
                                    },
                                }}
                            />{' '}
                            <span style={{ color: '#1677ff', cursor: 'pointer' }} onClick={() => setVisible(true)}>
                                Xem hình ảnh
                            </span>
                        </>
                    }
                    bordered
                    column={2}
                    extra={
                        <>
                            <Link to={`/system/manage-user/modal-edit/${detailId}`}>
                                <Button type="primary">
                                    {' '}
                                    <EditOutlined />
                                    Edit
                                </Button>
                            </Link>
                        </>
                    }
                >
                    <Descriptions.Item label="Name">{detailAccount?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{detailAccount?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{detailAccount?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{detailAccount?.gender}</Descriptions.Item>
                    <Descriptions.Item label="Address" span={2}>
                        {detailAccount?.address}
                    </Descriptions.Item>

                    <Descriptions.Item label="Created At">
                        {moment(detailAccount?.createdAt).format('DD-MM-YY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(detailAccount?.updatedAt).format('DD-MM-YY HH:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
}

export default ModalAccount;
