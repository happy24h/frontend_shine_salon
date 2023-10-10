import { Card, List, Button } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './DetailBlog.module.scss';
import { getDetailBlog } from '~/redux/blog/apiBlog';
const cx = classNames.bind(styles);
const { Meta } = Card;

function DetailBlog() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const detailBlog = useSelector((state) => state.blog.blog?.detailData);
    useEffect(() => {
        getDetailBlog(id, dispatch, user?.accessToken);
    }, []);

    return (
        <>
            <Link to={'/system/manage-blog'}>
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                    {/* <EditOutlined /> */}
                    Back
                </Button>
            </Link>

            <div className={cx('wrapper')}>
                {' '}
                <Card
                    hoverable
                    style={{
                        width: 240,
                    }}
                    title="Avatar"
                >
                    <div
                        className={cx('detail-image')}
                        style={{ backgroundImage: `url(${detailBlog?.thumbnail})` }}
                    ></div>
                    <Meta title="Sắp đến tết" description="www.instagram.com" />
                </Card>
                <Card
                    title="Profile"
                    size="default"
                    extra={
                        <Link to={`/system/manage-blog/edit/${id}`}>
                            <Button type="primary" style={{ background: '#fcaf17' }}>
                                {' '}
                                <EditOutlined />
                                Edit Blog
                            </Button>
                        </Link>
                    }
                    style={{ width: 800 }}
                >
                    {/* <Divider orientation="left">Default Size</Divider> */}
                    <List className={cx('list-detail')}>
                        <strong>Title:</strong>{' '}
                        <span className={cx('text-detail')}>
                            {' '}
                            <span className={cx('text-hello')}>{detailBlog?.title}</span>
                        </span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Description:</strong>
                        <span className={cx('text-detail')}>
                            <span className={cx('text-hello')}>{detailBlog?.description}</span>
                        </span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Content:</strong>{' '}
                        <span className={cx('text-detail')}>
                            <span className={cx('text-hello')}>{detailBlog?.content}</span>
                        </span>
                    </List>
                </Card>
            </div>
        </>
    );
}

export default DetailBlog;
