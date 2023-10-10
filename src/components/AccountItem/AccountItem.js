import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function AccountItem({ data }) {
    const navigate = useNavigate();
    const handleDetailService = () => {
        navigate(`/detail-service/${data.service_id}`);
    };
    return (
        <div onClick={handleDetailService} className={cx('wrapper')}>
            <img className={cx('avatar')} src={data.thumbnail} alt={data.service_name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.service_name}</span>
                    {/* {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />} */}
                </h4>
                <span className={cx('username')}>
                    {' '}
                    <NumberFormat
                        value={data.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' VND'}
                    />{' '}
                </span>
            </div>
        </div>
    );
}
AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default AccountItem;
