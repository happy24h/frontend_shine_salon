import { useState, useEffect } from 'react';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, Select } from 'antd';

import './AddBooking.scss';
import { useTranslation } from 'react-i18next';
import { getAllAccount } from '~/redux/apiRequest';
import { getBranch } from '~/redux/branch/apiBranch';
import { createBooking } from '~/redux/booking/apiBooking';
import { useNavigate } from 'react-router-dom';
let dataBtnTime = [
    { name: '08:00', time: '8', isActive: false },
    { name: '09:00', time: '9', isActive: false },
    { name: '10:00 ', time: '10', isActive: false },
    { name: '11:00 ', time: '11', isActive: false },
    { name: '13:00 ', time: '13', isActive: false },
    { name: '14:00', time: '14', isActive: false },
    { name: '15:00 ', time: '15', isActive: false },
    { name: '16:00', time: '16', isActive: false },
];
function AddBooking() {
    const [dataTime, setDataTime] = useState([...dataBtnTime]);

    const { t } = useTranslation();
    const [state, setState] = useState({
        currentDate: '',
        timeBooking: '',
        accountId: '',
        branchId: '',
    });

    const onChange = (date, dateString) => {
        console.log('test', date, 'aaaa', dateString);
        setState((prev) => ({
            ...prev,
            currentDate: dateString,
        }));
    };

    // console.log('timeArr---', dataTime);
    let filterDataTime = dataTime.filter((item) => item.isActive === true);
    // console.log('filterDataTime---', filterDataTime);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const listAccount = useSelector((state) => state.account.account?.accountCurrent?.content);
    const listBranch = useSelector((state) => state.branch.branch?.listData?.content);

    // console.log('check list >>>', listAccount);
    // console.log('check branch >>>', listBranch);

    let dataAccount = {
        name: '',
        email: '',
        phone: '',
        gender: '',
        branch_id: state?.branchId,
        start: '',
        end: '',
        page: 1,
        limit: 15,
        sort: 'asc',
        role_id: '3',
        member_ship_class_id: '',
        status: '',
    };

    let dataBranch = {
        name: state?.name,
        address: '',
        hot_line: state?.hot_line,
        start: '',
        end: '',
        page: 1,
        limit: 6,
        // sort: 'desc',
        sort: 'asc',
        status: '',
    };

    useEffect(() => {
        getAllAccount(dataAccount, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state?.branchId]);
    useEffect(() => {
        getBranch(dataBranch, dispatch, user?.accessToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickBtnTime = (item) => {
        setState((prev) => ({ ...prev, timeBooking: item }));
        const dataTime2 = dataTime.map((data) => {
            if (data.time === item) {
                data.isActive = !data.isActive;
            }
            return data;
        });
        setDataTime(dataTime2);
    };

    let today = new Date();
    if (state?.currentDate) {
        today = new Date(state?.currentDate);
    } else {
    }
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    console.log('today', today);

    const handleSaveSchedule = async () => {
        for (const item of filterDataTime) {
            let dataBooking = {
                date_booking: today,
                time_booking: item.time,
                employee_id: state?.accountId,
                branch_id: state?.branchId,
            };
            await createBooking(dataBooking, dispatch, user?.accessToken, navigate);
        }
        // createBooking(dataBooking, dispatch, user?.accessToken, navigate);
    };

    const handleOnchangeInput = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleOnchangeEmployee = (value, name) => {
        // console.log('----', name);

        setState((prev) => ({
            ...prev,
            accountId: value,
        }));
    };
    const handleOnchangeBranch = (value, name) => {
        // console.log('----', name);

        setState((prev) => ({
            ...prev,
            branchId: value,
        }));
    };
    return (
        <div className="manage-schedule-container">
            <div className="m-s-title" style={{ margin: '75px 0 25px' }}>
                QUẢN LÝ KẾ HOẠCH THỜI GIAN CỦA NHÂN VIÊN
            </div>

            <div className="container">
                <div className="row">
                    <div className="col l-6 form-group">
                        {' '}
                        {/* <label>Chọn ngày </label> */}
                        <DatePicker
                            onChange={onChange}
                            style={{
                                width: '100%',
                                height: 32,
                                margin: '0 0 20px',
                            }}
                        />
                    </div>
                    <div className="col l-6 form-group">
                        {' '}
                        {/* <label>Chọn chi nhánh </label> */}
                        <Select
                            style={{
                                width: '100%',
                                margin: '0 0 20px',
                            }}
                            name="accountId"
                            placeholder="Select address"
                            onChange={handleOnchangeBranch}
                            options={listBranch?.map((item) => ({
                                label: item.name,
                                value: item.id,
                                name: 'accountId',
                            }))}
                        />
                    </div>
                    <div className="col l-6 form-group">
                        {' '}
                        {/* <label>Chọn nhân viên </label> */}
                        <Select
                            style={{
                                width: '100%',
                                margin: '0 0 20px',
                            }}
                            name="accountId"
                            disabled={state?.branchId ? false : true}
                            placeholder="Select account"
                            onChange={handleOnchangeEmployee}
                            options={listAccount.map((item) => ({
                                label: item.accounts_name,
                                value: item.accounts_id,
                            }))}
                        />
                    </div>

                    <div className="col l-12 pick-hour-container">
                        {dataTime.map((item, index) => {
                            return (
                                <button
                                    className={item.isActive === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                    onClick={() => handleClickBtnTime(item.time)}
                                    key={index}
                                >
                                    {item.name}
                                </button>
                            );
                        })}
                    </div>

                    <div className="col l-12 ">
                        <Button primary onClick={() => handleSaveSchedule()}>
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBooking;
