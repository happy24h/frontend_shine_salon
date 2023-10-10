import styles from '../ManageDashBoard.module.scss';
import classNames from 'classnames/bind';
import configRoutes from '~/config';
import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar } from '@ant-design/plots';
import { Link } from 'react-router-dom';
import moment from 'moment';
import OrderPage from 'src/layouts/System/Page/Order/ManagerOrder';

import { Button, Card, Col, DatePicker, Popover, Row, Space, Switch } from 'antd';
import { faMoneyBill, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardOder, getDashboardOderStart } from '~/redux/dashboard/order/dashboardOrderSlice';
import {
    getDashBoardColumn,
    getDashBoardLine,
    getDashBoardPei,
    getDashBoardStatus,
} from '~/redux/dashboard/order/apiOrderDashBoard';


const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);
const titlePage = 'Đơn hàng';
const keyStorageLine = 'dashboard_order_dataLine';
const keyStoragePei = 'dashboard_order_dataPei';
const keyStorageColumn = 'dashboard_order_dataColumn';

function ManageDashBoardOrder() {
    const [data, setData] = useState([]);
    const [dataPie, setDataPei] = useState([]);
    const [dataBar, setDataBar] = useState([]);
    const [timeDate, setTimeDate] = useState([]);
    const [open, setOpen] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let config = getConfigLineChart(data, dispatch);
    let configPie = getConfigPieChart(dataPie,dispatch);
    let configBar = getConfigBarChart(dataBar,dispatch);
    const [stateStatus, setStateStatus] = useState();
    const objectNull = {
        price: 0,
        count: 0,
    };
    let menuStatusMiss = objectNull;
    let menuStatusPaided = objectNull;
    let menuStatusDissMiss = objectNull;
    let menuStatusTotal = objectNull;
    if (stateStatus != null)
    {
        Object.values(stateStatus).map((e, index) => {
            Object.values(e).map((element, indexz) => {
                switch (element.status){
                    case 1:
                        menuStatusMiss = element;
                        break;
                    case 0:
                        menuStatusTotal = element;
                        break;
                    case 2:
                        menuStatusPaided = element;
                        break;
                    case -1:
                        menuStatusDissMiss = element;
                        break;
                }
            });

        });
    }
    const showTimeLine = () => {
        setShowInfo(!showInfo);
    };
    const handerSubmitTime = () => {
        if (timeDate.length != 0) {
            let datalineStorage = localStorage.getItem(keyStorageLine);
            let dataTranform = Array.from(JSON.parse(datalineStorage));
            var data = dataTranform.filter((value) => {
                let startDate = timeDate[0];
                let endDate = timeDate[1];
                return moment(startDate).isBefore(moment(value.Date)) && moment(endDate).isAfter(moment(value.Date));
            });
            setData(
                data,
            );
        }
    };
    const refreshDataLine = () => {
        localStorage.removeItem(keyStorageLine);
        localStorage.removeItem(keyStoragePei);
        localStorage.removeItem(keyStorageColumn);
        asyncFetch();
        asyncFetchPei();
        asyncFetchBar();
    };
    const showTimeLineYear = () => {
        asyncFetchYearOrMonth('year');
    };
    const showTimeLineMonth = () => {
        asyncFetchYearOrMonth('month');
    };
    const showTimeLineDay = () => {
        asyncFetch();
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    useEffect(() => {
        asyncFetch();
        asyncFetchPei();
        asyncFetchBar();
        asyncFetchStatus();

    }, []);

    const asyncFetch = async () => {
        let dataLine;
        let datalineStorage = localStorage.getItem(keyStorageLine);
        if (datalineStorage == undefined) {
            dataLine = await getDashBoardLine({}, user?.accessToken);
            localStorage.setItem(keyStorageLine, JSON.stringify(dataLine));
            setData(dataLine);
        } else {
            setData(Array.from(JSON.parse(datalineStorage)));
        }

    };

    const asyncFetchYearOrMonth = (type) => {
        let dataTranform;
        let dataYears;
        let dataMonths;
        let datalineStorage = localStorage.getItem(keyStorageLine);
        dataTranform = Array.from(JSON.parse(datalineStorage));
        switch (type) {
            case 'year':
                const mapYear = new Map();
                dataYears = dataTranform.forEach((dataDate) => {
                    var dateYear = new Date(dataDate.Date);
                    let year = mapYear.get(dateYear.getFullYear());
                    if (year == undefined) {
                        const ids = [];
                        ids.push(dataDate.id);
                        mapYear.set(dateYear.getFullYear(), {
                            Date: dateYear.getFullYear(),
                            scales: dataDate.scales,
                            ids: ids,
                        });

                    } else {
                        year.scales += dataDate.scales;
                        year.ids.push(dataDate.id);
                        mapYear.set(dateYear.getFullYear(), {
                            Date: dateYear.getFullYear(),
                            scales: year.scales,
                            ids: year.ids,
                        });
                    }
                });

                setData(Array.from(mapYear.values()));

                break;
            case 'month':
                const mapMonth = new Map();

                dataMonths = dataTranform.forEach((dataDate) => {
                    var dateMonth = moment(dataDate.Date);
                    var key = dateMonth.format('YYYY') + '-' + dateMonth.format('MM');
                    let month = mapMonth.get(key);
                    if (month == undefined) {
                        const ids = [];
                        ids.push(dataDate.id);
                        mapMonth.set(key, {
                            Date: key,
                            scales: dataDate.scales,
                            ids: ids,
                        });
                    } else {
                        month.scales += dataDate.scales;
                        month.ids.push(dataDate.id);
                        mapMonth.set(key, {
                            Date: key,
                            scales: month.scales,
                            ids: month.ids,
                        });
                    }
                });
                setData(Array.from(mapMonth.values()));
                break;
        }

    };

    const asyncFetchPei = async () => {
        let dataPei;
        let dataPeiStorage = localStorage.getItem(keyStoragePei);
        if (dataPeiStorage == undefined) {
            dataPei = await getDashBoardPei({}, user?.accessToken);
            localStorage.setItem(keyStoragePei, JSON.stringify(dataPei[0]));
            setDataPei(dataPei[0]);
        } else {
            setDataPei(Array.from(JSON.parse(dataPeiStorage)));
        }
    };
    const asyncFetchBar = async () => {
        let dataColumn;
        let dataColumnStorage = localStorage.getItem(keyStorageColumn);
        if (dataColumnStorage == undefined) {
            dataColumn = await getDashBoardColumn({}, user?.accessToken);
            localStorage.setItem(keyStorageColumn, JSON.stringify(dataColumn[0]));
            setDataBar(dataColumn[0]);
        } else {
            setDataBar(Array.from(JSON.parse(dataColumnStorage)));
        }
    };

    const asyncFetchStatus = async () => {
        let dataLine = await getDashBoardStatus({}, user?.accessToken);
        setStateStatus(dataLine);
    };

    return (

        <div style={{ marginTop: '120px' }}>
            <Row className={styles['flex-just-space-left']} style={{
                marginBottom: '30px',
                marginLeft: '30px',
                textTransform: 'uppercase',
            }}>
                <h1>{titlePage ?? ''}</h1>
            </Row>
            <div className='container' style={{ width: '1200px', margin: '0 auto' }}>
                <Col style={{ padding: '5px' }} className='cart-item col-6' span={24}> <Card title='' bordered={true}>
                    <Row className='cards-dashboard'>


                        <Col style={{ padding: '5px' }} span={6}>
                            <Link

                                to={{
                                    pathname: configRoutes.routes.manageOrder,
                                    search: "?status=2",
                                }}
                           >

                                <Card
                                    className={styles['cart-item-header']}
                                    title='Đã Đến' bordered={true}>
                                    <div className={styles['flex-just-space-center']} style={{
                                        paddingBottom: '15px',
                                    }}>
                                        <h1>{menuStatusPaided.count}</h1>
                                    </div>
                                    <div className={styles['flex-just-space-between']}>
                                        <FontAwesomeIcon icon={faMoneyBill} />
                                        <span>{menuStatusPaided.price}(đ)</span>
                                    </div>
                                </Card> </Link>
                        </Col>

                        <Col style={{ padding: '5px' }} span={6}>
                            <Link

                                to={{
                                    pathname: configRoutes.routes.manageOrder,
                                    search: "?status=1",
                                }}
                            >

                                <Card
                                    className={styles['cart-item-header']}
                                    title='Đã đặt' bordered={true}>
                                    <div className={styles['flex-just-space-center']} style={{
                                        paddingBottom: '15px',
                                    }}>
                                        <h1>{menuStatusMiss.count}</h1>
                                    </div>
                                    <div className={styles['flex-just-space-between']}>
                                        <FontAwesomeIcon icon={faMoneyBill} />
                                        <span>{menuStatusMiss.price}(đ)</span>
                                    </div>
                                </Card> </Link>
                        </Col>

                        <Col style={{ padding: '5px' }} span={6}>
                            <Link

                                to={{
                                    pathname: configRoutes.routes.manageOrder,
                                    search: "?status=-1",
                                }}
                            >

                                <Card
                                    className={styles['cart-item-header']}
                                    title='Đã Hủy' bordered={true}>
                                    <div className={styles['flex-just-space-center']} style={{
                                        paddingBottom: '15px',
                                    }}>
                                        <h1>{menuStatusDissMiss.count}</h1>
                                    </div>
                                    <div className={styles['flex-just-space-between']}>
                                        <FontAwesomeIcon icon={faMoneyBill} />
                                        <span>{menuStatusDissMiss.price}(đ)</span>
                                    </div>
                                </Card> </Link>
                        </Col>

                        <Col style={{ padding: '5px' }} span={6}>
                            <Link

                                to={{
                                    pathname: configRoutes.routes.manageOrder,
                                    search: "?status=0",
                                }}
                            >

                                <Card
                                    className={styles['cart-item-header']}
                                    title='Chưa đến' bordered={true}>
                                    <div className={styles['flex-just-space-center']} style={{
                                        paddingBottom: '15px',
                                    }}>
                                        <h1>{menuStatusTotal.count}</h1>
                                    </div>
                                    <div className={styles['flex-just-space-between']}>
                                        <FontAwesomeIcon icon={faMoneyBill} />
                                        <span>{menuStatusTotal.price}(đ)</span>
                                    </div>
                                </Card> </Link>
                        </Col>
                    </Row>
                </Card></Col>

                <Row className={styles['cards-dashboard']}>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={12}> <Card
                        title='Biểu đồ hóa đơn theo nhánh'
                        extra={(
                            <div>
                                <Button type='primary' onClick={refreshDataLine}><FontAwesomeIcon
                                    icon={faRefresh} /></Button>
                            </div>)}
                        bordered={true}>
                        <div className={styles['cart-chart']}>
                            <Pie {...configPie} />
                        </div>
                    </Card></Col>

                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={12}> <Card
                        title='Danh sách khách hàng tiềm năng'
                        extra={(
                            <div>
                                <Button type='primary' onClick={refreshDataLine}><FontAwesomeIcon
                                    icon={faRefresh} /></Button>
                            </div>)}
                        bordered={true}>
                        <div className={styles['cart-chart']}>
                            <Bar {...configBar} />;
                        </div>
                    </Card></Col>

                </Row>
                <Row className='cards-dashboard'>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={24}>
                        <Card title='Biểu đồ đơn hàng theo thời gian'
                              bordered={true}
                              extra={(
                                  <div>
                                      <Popover
                                          content={(
                                              <div>
                                                  <Row style={{
                                                      marginBottom: '5px',
                                                  }}>
                                                      <Button onClick={showTimeLineYear} type='primary'>Biểu đồ theo
                                                          năm</Button>
                                                  </Row>
                                                  <Row style={{
                                                      marginBottom: '5px',
                                                  }}>
                                                      <Button onClick={showTimeLineMonth} type='primary'>Biểu đồ theo
                                                          tháng</Button>
                                                  </Row>
                                                  <Row style={{
                                                      marginBottom: '5px',
                                                  }}>
                                                      <Button onClick={showTimeLineDay} type='primary'>Biểu đồ theo
                                                          ngày</Button>
                                                  </Row>
                                                  <Row style={{
                                                      marginBottom: '5px',
                                                  }}>
                                                      <Button onClick={showTimeLine} type='primary'>Chọn khoảng
                                                          ngày</Button>
                                                  </Row>
                                              </div>
                                          )}
                                          title=''
                                          trigger='click'
                                          open={open}
                                          onOpenChange={handleOpenChange}
                                      >
                                          <Button style={{ marginRight: '15px' }} type='primary'>Tùy chỉnh</Button>
                                      </Popover>
                                      <Button type='primary' onClick={refreshDataLine}><FontAwesomeIcon
                                          icon={faRefresh} /></Button>
                                  </div>)}
                        >
                            <div style={{ display: showInfo ? 'block' : 'none', paddingBottom: '50px' }}>
                                <Col style={{ padding: '5px' }} className='cart-item col-6' span={24}>
                                    <span>Chon khoảng ngày:</span>
                                </Col>
                                <Space direction='vertical' size={12}>
                                    <div className={styles['flex-just-space-between']}>
                                        <RangePicker style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                                     valueDefault
                                                     onChange={(values) => {
                                                         if (values != null) {
                                                             setTimeDate(values.map(item => {
                                                                 return item.format('YYYY-MM-DD');
                                                             }));
                                                         }
                                                     }
                                                     }
                                        />
                                        <Button onClick={handerSubmitTime} type='primary'>Gửi</Button>
                                    </div>


                                </Space>
                            </div>
                            <Line {...config} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>

    );
}

function getConfigPieChart(data,dispatch) {
    return {
        appendPadding: 10,
        data,
        theme: 'light',
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        innerRadius: 0.64,
        meta: {
            value: {
                formatter: (v) => `VNĐ ${v}`,
            },
        },
        label: {
            type: 'inner',
            offset: '-50%',
            autoRotate: false,
            style: {
                textAlign: 'center',
                fill: '#fff',
            },
            formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        },
        statistic: {
            title: {
                offsetY: -8,
                style: {
                    color: '#fff',
                },
            },
            content: {
                style: {
                    color: '#fff',
                },
                offsetY: -4,
            },
        },
        pieStyle: {
            lineWidth: 0,
        },
        onReady: (plot) => {
            plot.chart.on('plot:click', (evt) => {

                const { x, y } = evt;
                var item = plot.chart.getTooltipItems({ x, y })[0];
                dispatch(getDashboardOderStart());
                dispatch(getDashboardOder(item.data));
                window.location.replace("/system/manage-order");
            });
        },
    };
}

function getConfigBarChart(data,dispatch) {
    return {
        data,
        xField: 'sales',
        yField: 'type',
        meta: {
            type: {
                alias: '类别',
            },
            sales: {
                alias: '销售额',
            },
        },
        minBarWidth: 20,
        maxBarWidth: 20,
        onReady: (plot) => {
            plot.chart.on('plot:click', (evt) => {

                const { x, y } = evt;
                var item = plot.chart.getTooltipItems({ x, y })[0];
                dispatch(getDashboardOderStart());
                dispatch(getDashboardOder(item.data));
                window.location.replace("/system/manage-order");
            });
        },
    };
}

function getConfigLineChart(data, dispatch) {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    return {
        data,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        annotations: [
            {
                type: 'regionFilter',
                start: ['min', 'median'],
                end: ['max', '0'],
                color: '#F4664A',
            },
            {
                type: 'text',
                position: ['min', 'median'],
                content: 'Trung bình',
                offsetY: -4,
                style: {
                    textBaseline: 'bottom',
                },
            },
            {
                type: 'line',
                start: ['min', 'median'],
                end: ['max', 'median'],
                style: {
                    stroke: '#F4664A',
                    lineDash: [2, 2],
                },
            },
        ],
        onReady: (plot) => {
            plot.chart.on('plot:click', (evt) => {
                const { x, y } = evt;
                var item = plot.chart.getTooltipItems({ x, y })[0];

                dispatch(getDashboardOderStart());
                dispatch(getDashboardOder(item.data));
                window.location.replace("/system/manage-order");
            });
        },

    };
}

export default ManageDashBoardOrder;