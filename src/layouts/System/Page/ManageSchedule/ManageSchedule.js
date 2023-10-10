import { useState } from 'react';
import Button from '~/components/Button';
import './ManageSchedule.scss';
import { useTranslation } from 'react-i18next';

function ManageSchedule() {
    const [active, setActive] = useState(false);
    const { t } = useTranslation();

    const handleClickBtnTime = () => {
        setActive(!active);
    };
    const handleSaveSchedule = () => {
        alert('hello world');
    };
    let dataBtnTime = [
        { name: '8h ' },
        { name: '9h' },
        { name: '10h ' },
        { name: '11h ' },
        { name: '13h ' },
        { name: '14h' },
        { name: '15h ' },
        { name: '16h' },
    ];
    return (
        <div className="manage-schedule-container">
            <div className="m-s-title">QUẢN LÝ KẾ HOẠCH THỜI GIAN CỦA NHÂN VIÊN</div>
            <h1>{t('manageUser.title')}</h1>
            <div className="container">
                <div className="row">
                    <div className="col l-6 form-group">
                        <label>Chọn nhân viên </label>

                        <select className="form-control l-12" name="selectedDoctor">
                            <option value="">Choose...</option>

                            <option>hello</option>
                            <option>hello</option>
                            <option>hello</option>
                            <option>hello</option>
                        </select>
                    </div>
                    <div className="col l-6 form-group">
                        <label>Chọn ngày</label>
                        <input
                            type="date"
                            className="form-control"
                            name="currentDate"
                            dateformat="YYYY-MM-DD"
                            required
                        />
                    </div>
                    <div className="col l-12 pick-hour-container">
                        {dataBtnTime.map((item, index) => {
                            return (
                                <button
                                    className={active === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                    onClick={() => handleClickBtnTime()}
                                    key={index}
                                >
                                    {item.name}
                                    <div> Total 4 employee</div>
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

export default ManageSchedule;
