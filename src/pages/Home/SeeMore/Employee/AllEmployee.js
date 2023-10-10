import classNames from 'classnames/bind';
import styles from './AllEmployee.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccount } from '~/redux/apiRequest';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AllEmployee() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login?.currentUser);
    const listAccount = useSelector((state) => state.account.account?.accountCurrent?.content);
    let dataAccount = {
        name: '',
        email: '',
        phone: '',
        gender: '',
        start: '',
        end: '',
        page: 1,
        limit: 10,
        sort: 'asc',
        role_id: '3',
        member_ship_class_id: '',
        status: '',
    };
    useEffect(() => {
        getAllAccount(dataAccount, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleDetailAccount = (employee) => {
        navigate(`/detail-employee/${employee.accounts_id}`);
    };
    return (
        <div className={cx('wrapper')}>
            <div className="grid wide">
                <div className="row">
                    {listAccount &&
                        listAccount.map((item, index) => {
                            return (
                                <div className="col l-2-4 m-4 c-6" key={index}>
                                    <div
                                        className={cx('item')}
                                        style={{
                                            backgroundImage: `url(${item.thumbnail})`,
                                        }}
                                        onClick={() => handleDetailAccount(item)}
                                    >
                                        <span>{item.accounts_name}</span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default AllEmployee;
