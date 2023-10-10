import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import EmployeeSchedule from './Schedule/EmployeeSchedule';
// import './ServiceClient.scss';
import { getAllAccount } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ServiceClient.module.scss';
const cx = classNames.bind(styles);

function ServiceClient() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listAccount = useSelector((state) => state.account.account?.accountCurrent.content);
    // const navigate = useNavigate();

    let dataAccount = {
        name: '',
        email: '',
        phone: '',
        gender: '',
        start: '',
        end: '',
        page: 1,
        limit: 30,
        sort: 'asc',
        role_id: '3',
        member_ship_class_id: '',
        status: '',
    };

    useEffect(() => {
        getAllAccount(dataAccount, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log('check list account', listAccount);
    return (
        <div>
            {listAccount &&
                listAccount.map((item, index) => {
                    return (
                        <div key={index} className={cx('wrapper-content')}>
                            <div className={cx('content-employee')}>
                                <div
                                    className={cx('content-left')}
                                    style={
                                        item?.thumbnail
                                            ? {
                                                  backgroundImage: `url(${item?.thumbnail})`,
                                              }
                                            : {}
                                    }
                                ></div>
                                <div className={cx('content-right')}>
                                    <div className={cx('up')}>{item?.accounts_name}</div>
                                    <div className="down">{item?.account_description}</div>
                                </div>
                            </div>
                            <EmployeeSchedule employees_id={item?.accounts_id} branch_id={item?.accounts_branch_id} />
                        </div>
                    );
                })}
        </div>
    );
}

export default ServiceClient;
