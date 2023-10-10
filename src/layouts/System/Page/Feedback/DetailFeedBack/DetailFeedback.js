import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Card, List, Tag } from 'antd';
import classNames from 'classnames/bind';
import styles from '~/layouts/System/Page/Feedback/DetailFeedBack/DetailFeedback.module.scss';
import { changeStatusDetailFeedback, getDetailFeedback } from '~/redux/feedback/apiFeedback';
import { getDetailAccount } from '~/redux/apiRequest';
const cx = classNames.bind(styles);
const { Meta } = Card;

function DetailFeedback() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const detailFeedback = useSelector((state) => state.feedback.feedback?.detailFeedback);
    const detailAccount = useSelector((state) => state.account.account?.detailAccount);
    const [statusFeedbackChange, setStatusFeedbackChange] = useState(-2);
    // console.log('check detail', detailAccount);

    // console.log('check id', id);

    useEffect(() => {
        getDetailFeedback(id, dispatch, user?.accessToken);
        if (detailFeedback.account_id != 0 || detailFeedback.account_id != 1) {
            getDetailAccount(detailFeedback.account_id, dispatch, user?.accessToken);
        }
    }, [statusFeedbackChange]);

    // let { name, email, address, phone, gender } = detailAccount;

    const checkAccountFeedback = () => {
        switch (detailFeedback?.account_id) {
            case 1:
                return <Tag color="blue">Khách vãng lai</Tag>;
            case 0:
                return <Tag color="blue">Khách vãng lai</Tag>;
            default:
                return <Tag color="success">Khách đã đăng ký</Tag>;
        }
    };

    const checkAccountStatus = () => {
        switch (detailFeedback?.status) {
            case 1:
                return <Tag color="success">Đã đọc</Tag>;
            case 0:
                return <Tag color="volcano">Chưa đọc</Tag>;
            case -1:
                return <Tag color="red">Đã xóa</Tag>;
            default:
                return <Tag color="blue">{detailFeedback?.account_id}</Tag>;
        }
    };

    const handleChangeStatus = (e) => {
        if (window.confirm('Bạn có chắc muốn thay đổi trạng thái?')) {
            changeStatusDetailFeedback(id, e.target.value, dispatch, user?.accessToken);
            setStatusFeedbackChange(!statusFeedbackChange);
        }
    };
    return (
        <div className={cx('wrapper')}>
            {' '}
            <Card
                hoverable
                style={{
                    width: 240,
                }}
                cover={
                    detailAccount.thumbnail ? (
                        <img alt="example" src={detailAccount.thumbnail} />
                    ) : (
                        <img
                            alt="example"
                            src="https://res.cloudinary.com/dark-faith/image/upload/v1672128258/270220617_653131342669938_7315258558351568369_n_xyae61.png"
                        />
                    )
                }
            >
                <Meta
                    title={detailFeedback?.account_id ? detailAccount?.name : 'The man from no where'}
                    description="www.instagram.com"
                />
            </Card>
            <Card title="Chi tiết phản hồi" size="default" style={{ width: 800 }}>
                {/* <Divider orientation="left">Default Size</Divider> */}
                <List className={cx('list-detail')}>
                    <strong>Tiêu đề:</strong> <span className={cx('text-detail')}>{detailFeedback?.title}</span>
                </List>
                <List className={cx('list-detail')}>
                    <strong>Email:</strong> <span className={cx('text-detail')}>{detailFeedback?.email}</span>
                </List>
                <List className={cx('list-detail')}>
                    <strong>Loại khách:</strong> <span className={cx('text-detail')}>{checkAccountFeedback()}</span>
                </List>
                <List className={cx('list-detail')}>
                    <strong>Trạng thái:</strong> <span className={cx('text-detail')}>{checkAccountStatus()}</span>
                    <span>
                        <select value={detailFeedback?.status} onChange={handleChangeStatus}>
                            <option value="1">Đã đọc</option>
                            {detailFeedback?.status === 1 || detailFeedback?.status === -1 ? (
                                ''
                            ) : (
                                <option value="0">Chưa đọc</option>
                            )}
                            {/*<option value="-1">Thư rác</option>*/}
                        </select>
                    </span>
                </List>
                <List className={cx('list-detail')}>
                    <strong>Nội dung liên hệ:</strong>{' '}
                    <span className={cx('text-detail')}>{detailFeedback?.description}</span>
                </List>
            </Card>
        </div>
    );
}

export default DetailFeedback;
