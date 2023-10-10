import classNames from 'classnames/bind';
import styles from './DetailTypeService.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetailService } from '~/redux/service/apiService';
import { getDetailTypeService } from '~/redux/type_service/apiTypeService';
import { Button, Card, List } from 'antd';
import { EditOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles);

function DetailTypeService() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailTypeService = useSelector((state) => state.typeService.typeService?.detailTypeService);

    useEffect(() => {
        getDetailTypeService(id, dispatch);
    }, []);

    return (
        <>
            <Link to={'/system/manage-type-service'}>
                <Button type="primary" ghost style={{ backgroundColor: '#fff' }}>
                    Back
                </Button>
            </Link>
            <div className={cx('wrapper')}>
                {' '}
                <Card
                    title="Profile"
                    size="default"
                    extra={
                        <Link to={`/system/manage-type-service/edit/${id}`}>
                            <Button
                                type="primary" style={{ background: '#fcaf17',
                                display: user.roles.map(item => (
                                    item === "ADMIN" ? "block" : "none"
                                ))
                            }}>
                                {' '}
                                <EditOutlined />
                                Sửa loại dịch vụ
                            </Button>
                        </Link>
                    }
                    style={{ width: 800 }}
                >
                    {/* <Divider orientation="left">Default Size</Divider> */}
                    <List className={cx('list-detail')}>
                        <strong>Tên dịch vụ:</strong> <span className={cx('text-detail')}>{detailTypeService?.name}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Ngày tạo:</strong> <span className={cx('text-detail')}>{detailTypeService?.created_at}</span>
                    </List>
                    <List className={cx('list-detail')}>
                        <strong>Ngày cập nhật:</strong> <span className={cx('text-detail')}>{detailTypeService?.updated_at}</span>
                    </List>
                </Card>
            </div>
        </>
    );
}
export default DetailTypeService;