import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetailService } from '~/redux/service/apiService';
import { Button, Card, List } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './DetailService.module.scss';
const cx = classNames.bind(styles);
const { Meta } = Card;

function DetailService() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailService = useSelector((state) => state.service.service?.detailService);

    useEffect(() => {
        getDetailService(id, dispatch);
    }, []);

    return (
        <>
            <Link to={'/system/manage-service'}>
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
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
                    // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <div
                        className={cx('detail-image')}
                        style={{ backgroundImage: `url(${detailService?.thumbnail})` }}
                    ></div>
                    <Meta title="Sắp đến tết" description="www.instagram.com" />
                </Card>
                <Card
                    title="Profile"
                    size="default"
                    extra={
                        <Link to={`/system/manage-service/edit/${id}`}>
                            <Button
                                type="primary"
                                style={{
                                    background: '#fcaf17',
                                    display: user.roles.map((item) => (item === 'ADMIN' ? 'block' : 'none')),
                                }}
                            >
                                {' '}
                                <EditOutlined />
                                Sửa dịch vụ
                            </Button>
                        </Link>
                    }
                    style={{ width: 800 }}
                >
                    {/* <Divider orientation="left">Default Size</Divider> */}
                    <List className={cx('list-detail')}>
                        <strong>Tên dịch vụ:</strong> <span className={cx('text-detail')}>{detailService?.name}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Mô tả:</strong> <span className={cx('text-detail')}>{detailService?.description}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Giá:</strong> <span className={cx('text-detail')}>{detailService?.price}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Loại dịch vụ:</strong>{' '}
                        <span className={cx('text-detail')}>{detailService?.typeService.name}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Ngày tạo:</strong>{' '}
                        <span className={cx('text-detail')}>{detailService?.created_at}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Ngày cập nhật:</strong>{' '}
                        <span className={cx('text-detail')}>{detailService?.updated_at}</span>
                    </List>
                </Card>
            </div>
        </>
    );
}

export default DetailService;
