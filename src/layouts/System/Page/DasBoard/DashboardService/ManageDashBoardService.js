import styles from '../ManageDashBoard.module.scss';
import classNames from 'classnames/bind';
import { Button, Card, Col, DatePicker, Popover, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Bar } from '@ant-design/plots';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsDownToPeople, faCut, faMoneyBill, faRefresh } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';
import { getDashBoardColumn } from '~/redux/dashboard/order/apiOrderDashBoard';
import { useDispatch, useSelector } from 'react-redux';
import { getDashBoardBar, getDashBoardCountServicesAndStaff } from '~/redux/dashboard/service/apiServiceDashBoard';
import { getDashboardOder, getDashboardOderStart } from '~/redux/dashboard/order/dashboardOrderSlice';
const cx = classNames.bind(styles);
const titlePage = 'Dịch vụ';
const keyStorageBar = 'dashboard_service_dataBar';
const { RangePicker } = DatePicker;
function ManageDashBoardService() {
    const [dataBar, setDataBar] = useState([]);
    const [timeDate, setTimeDate] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [countServices, setCountServices] = useState();
    const [countStaffs, setCountStaffs] = useState();
    const [open2, setOpen2] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const showTimeLine = () => {
        setShowInfo(!showInfo);
    };
    const handleOpenChange2 = (newOpen) => {
        setOpen2(newOpen);
    };
    const handerSubmitTime = () => {
        if (timeDate.length != 0) {
            let datalineStorage = localStorage.getItem(keyStorageBar);
            let dataTranform = Array.from(JSON.parse(datalineStorage));
            var data = dataTranform.filter((value) => {
                let startDate = timeDate[0];
                let endDate = timeDate[1];
                console.log(
                    moment(startDate).isBefore(moment(value.created_at)),
                    moment(endDate).isAfter(moment(value.created_at)),
                    value,
                );
                return (
                    moment(startDate).isBefore(moment(value.created_at)) &&
                    moment(endDate).isAfter(moment(value.created_at))
                );
            });
            setDataBar(data);
        }
    };
    const refreshDataLine = () => {
        localStorage.removeItem(keyStorageBar);
        asyncFetchBar();
    };

    useEffect(() => {
        asyncFetchCount();
        asyncFetchBar();
    }, []);

    const asyncFetchCount = async () => {
        let dataServicesAndStaff;
        dataServicesAndStaff = await getDashBoardCountServicesAndStaff({}, user?.accessToken);
        setCountStaffs(dataServicesAndStaff?.count_staffs ?? 0);
        setCountServices(dataServicesAndStaff?.count_services ?? 0);
    };
    const asyncFetchBar = async () => {
        let dataBar;
        let dataBarStorage = localStorage.getItem(keyStorageBar);
        if (dataBarStorage == undefined || dataBarStorage == 'undefined') {
            dataBar = await getDashBoardBar({}, user?.accessToken);
            localStorage.setItem(keyStorageBar, JSON.stringify(dataBar));
            setDataBar(dataBar);
        } else {
            setDataBar(Array.from(JSON.parse(dataBarStorage)));
        }
    };
    const configBarChart = getConfigBarChart(dataBar, dispatch);
    return (
        <div style={{ marginTop: '120px' }}>
            <Row
                className={styles['flex-just-space-left']}
                style={{
                    marginBottom: '30px',
                    marginLeft: '30px',
                    textTransform: 'uppercase',
                }}
            >
                <h1>{titlePage ?? ''}</h1>
            </Row>
            <div className="container" style={{ width: '1200px', margin: '0 auto' }}>
                <Col style={{ padding: '5px' }} className="cart-item col-6" span={24}>
                    {' '}
                    <Card title="" bordered={true}>
                        <Row className="cards-dashboard">
                            <Col style={{ padding: '5px' }} span={12}>
                                <Card className={styles['cart-item-header']} title="Tổng Dịch Vụ" bordered={true}>
                                    <div
                                        className={styles['flex-just-space-center']}
                                        style={{
                                            paddingBottom: '15px',
                                        }}
                                    >
                                        <h1>
                                            <FontAwesomeIcon icon={faCut} /> {countServices}
                                        </h1>
                                    </div>
                                </Card>
                            </Col>
                            <Col style={{ padding: '5px' }} span={12}>
                                <Card className={styles['cart-item-header']} title="Tổng Nhân viên" bordered={true}>
                                    <div
                                        className={styles['flex-just-space-center']}
                                        style={{
                                            paddingBottom: '15px',
                                        }}
                                    >
                                        <h1>
                                            <FontAwesomeIcon icon={faArrowsDownToPeople} /> {countStaffs}
                                        </h1>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Row className="cards-dashboard">
                    <Col style={{ padding: '5px' }} className="cart-item col-6" span={24}>
                        <Card
                            title="Biểu đồ dịch vụ được sử dụng nhiều trong khoảng thời gian"
                            bordered={true}
                            extra={
                                <Popover
                                    content={
                                        <div>
                                            <Row
                                                style={{
                                                    marginBottom: '5px',
                                                }}
                                            >
                                                <Button onClick={showTimeLine} type="primary">
                                                    Chọn khoảng ngày
                                                </Button>
                                            </Row>
                                        </div>
                                    }
                                    title=""
                                    trigger="click"
                                    open={open2}
                                    onOpenChange={handleOpenChange2}
                                >
                                    <Button type="primary">Tùy chỉnh</Button>
                                    <Button type="primary" onClick={refreshDataLine}>
                                        <FontAwesomeIcon icon={faRefresh} />
                                    </Button>
                                </Popover>
                            }
                        >
                            <div style={{ display: showInfo ? 'block' : 'none', paddingBottom: '50px' }}>
                                <Col style={{ padding: '5px' }} className="cart-item col-6" span={24}>
                                    <span>Chon khoảng ngày:</span>
                                </Col>
                                <Space direction="vertical" size={12}>
                                    <div className={styles['flex-just-space-between']}>
                                        <RangePicker
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            valueDefault
                                            onChange={(values) => {
                                                if (values != null) {
                                                    setTimeDate(
                                                        values.map((item) => {
                                                            return item.format('YYYY-MM-DD');
                                                        }),
                                                    );
                                                }
                                            }}
                                        />
                                        <Button onClick={handerSubmitTime} type="primary">
                                            Gửi
                                        </Button>
                                    </div>
                                </Space>
                            </div>
                            return <Bar {...configBarChart} />;
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
function getConfigBarChart(data, dispatch) {
    return {
        data,
        xField: 'value',
        yField: 'year',
        seriesField: 'year',
        legend: {
            position: 'top-left',
        },
        onReady: (plot) => {
            plot.chart.on('plot:click', (evt) => {
                const { x, y } = evt;
                var item = plot.chart.getTooltipItems({ x, y })[0];

                dispatch(getDashboardOderStart());
                dispatch(getDashboardOder(item.data));
                window.location.replace('/system/manage-order');
            });
        },
    };
}
export default ManageDashBoardService;
