import { Card, List, Button, Descriptions, Drawer, Space, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styles from './DetailBlog.module.scss';
import { getDetailBlog } from '~/redux/blog/apiBlog';
const cx = classNames.bind(styles);
const { Meta } = Card;

function DetailBlog(props) {
    const [visible, setVisible] = useState(false);
    let { openViewDetail, setOpenViewDetail, detailId } = props;
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailBlog = useSelector((state) => state.blog.blog?.detailData);

    useEffect(() => {
        if (detailId) {
            getDetailBlog(detailId, dispatch, user?.accessToken);
        }
    }, [detailId]);

    const onClose = () => {
        setOpenViewDetail(false);
    };

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
                                src={`${detailBlog?.thumbnail}`}
                                preview={{
                                    visible,
                                    src: detailBlog?.thumbnail,
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
                            <Link to={`/system/manage-blog/edit/${detailId}`}>
                                <Button type="primary">
                                    {' '}
                                    <EditOutlined />
                                    Edit Blog
                                </Button>
                            </Link>
                        </>
                    }
                >
                    <Descriptions.Item label="Tiêu đề">{detailBlog?.title}</Descriptions.Item>
                    <Descriptions.Item label="Miêu tả">{detailBlog?.description}</Descriptions.Item>
                    <Descriptions.Item label="Nội dung" span={2}>
                        {detailBlog?.content}
                    </Descriptions.Item>

                    <Descriptions.Item label="Created At">
                        {moment(detailBlog?.createdAt).format('DD-MM-YY HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(detailBlog?.updatedAt).format('DD-MM-YY HH:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
}

export default DetailBlog;
