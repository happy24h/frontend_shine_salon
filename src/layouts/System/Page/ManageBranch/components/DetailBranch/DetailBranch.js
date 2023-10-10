import { Card, List, Button } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import styles from './DetailBranch.module.scss';
import { getDetailBranch } from '~/redux/branch/apiBranch';
const cx = classNames.bind(styles);
const { Meta } = Card;

function DetailBranch() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailBranch = useSelector((state) => state.branch.branch?.detailData);

    useEffect(() => {
        getDetailBranch(id, dispatch, user?.accessToken);
    }, []);

    return (
        <>
            <Link to={'/system/manage-branch'}>
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
                        style={{ backgroundImage: `url(${detailBranch?.thumbnail})` }}
                    ></div>
                    <Meta title="Sắp đến tết" description="www.instagram.com" />
                </Card>
                <Card
                    title="Profile"
                    size="default"
                    extra={
                        <Link to={`/system/manage-branch/edit/${id}`}>
                            <Button type="primary" style={{ background: '#fcaf17' }}>
                                {' '}
                                <EditOutlined />
                                Edit Branch
                            </Button>
                        </Link>
                    }
                    style={{ width: 800 }}
                >
                    {/* <Divider orientation="left">Default Size</Divider> */}
                    <List className={cx('list-detail')}>
                        <strong>Name:</strong> <span className={cx('text-detail')}>{detailBranch?.name}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Address:</strong> <span className={cx('text-detail')}>{detailBranch?.address}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Hot line:</strong> <span className={cx('text-detail')}>{detailBranch?.hot_line}</span>
                    </List>
                </Card>
            </div>
        </>
    );
}

export default DetailBranch;
