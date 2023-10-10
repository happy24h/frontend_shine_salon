import styles from '../ManageDashBoard.module.scss';
import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import { Column, Pie,Heatmap,Gauge } from '@ant-design/plots';

import { Button, Card, Col, DatePicker, Popover, Row, Space } from 'antd';
import { faMoneyBill, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDashBoardPei, getDashBoardRange,getDashBoardColumn,getDashBoardHeat } from '~/redux/dashboard/booking/apiBookingDashBoard';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { getDashboardBooking, getDashboardBookingStart } from '~/redux/dashboard/booking/dashboardBookingSlice';
import { getDashboardOder } from '~/redux/dashboard/order/dashboardOrderSlice';



const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);
const titlePage = 'Lịch hẹn';
const keyStoragePei = 'dashboard_booking_dataPei';
const keyStorageRange = 'dashboard_booking_dataRange';
const keyStorageColumn = 'dashboard_booking_dataColumn';
const keyStorageHeat = 'dashboard_booking_dataHeat';
function ManageDashBoardBooking() {

    const [dataPie, setDataPei] = useState([]);
    const [dataRate, setDataRate] = useState([]);
    const [dataBrush, setDataBrush] = useState([]);
    const [dataHeat, setDataHeat] = useState([]);
    const [timeDate, setTimeDate] = useState([]);
    const [timeDate2, setTimeDate2] = useState([]);
    const [showInfo1, setShowInfo1] = useState(false);
    const [showInfo2, setShowInfo2] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const dispatch = useDispatch();
    const configPie = getConfigPieChart(dataPie,dispatch);
    const configRate = getConfigRateChart(dataRate);
    const configBrush = getConfigBrushChart(dataBrush,dispatch);
    const configHeat = getConfigHeatMap(dataHeat,dispatch);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const showTimeLine1 = () => {
        setShowInfo1(!showInfo1);
    };
    const showTimeLine2 = () => {
        setShowInfo2(!showInfo2);
    };
    const refreshDataLine = () => {
        localStorage.removeItem(keyStorageRange);
        localStorage.removeItem(keyStorageHeat);
        localStorage.removeItem(keyStoragePei);
        localStorage.removeItem(keyStorageColumn);
        asyncFetchPei();
        asyncFetchRate();
        asyncFetchBrush();
        asyncFetchHeat();
    };
    useEffect(() => {
        asyncFetchPei();
        asyncFetchRate();
        asyncFetchBrush();
        asyncFetchHeat();
    }, []);
    const handleOpenChange1 = (newOpen) => {
        setOpen1(newOpen);
    };
    const handleOpenChange2 = (newOpen) => {
        setOpen2(newOpen);
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
    const asyncFetchRate = async () => {
        let dataRate;
        let dataRateStorage = localStorage.getItem(keyStorageRange);
        if (dataRateStorage == undefined) {
            dataRate = await getDashBoardRange({}, user?.accessToken);
            localStorage.setItem(keyStorageRange, JSON.stringify(dataRate[0].total_booking));
            setDataRate(dataRate[0].total_booking);
        } else {
            setDataRate(dataRateStorage);
        }
    };

    const asyncFetchBrush = async () => {
        let dataColumn;
        let dataColumnStorage = localStorage.getItem(keyStorageColumn);
        if (dataColumnStorage == undefined) {
            dataColumn = await getDashBoardColumn({}, user?.accessToken);
            localStorage.setItem(keyStorageColumn, JSON.stringify(dataColumn));
            convertDataTime("brush",dataColumn,setDataBrush);
        } else {
            convertDataTime("brush",Array.from(JSON.parse(dataColumnStorage)),setDataBrush);
        }
    };
    function convertDataTime(type,dataTranformcal,setData,start,end){
        let startDate;
        let endDate;
        let data;
        if (start != undefined && end != undefined){
             startDate = moment(start).startOf('year');
             endDate =  moment(end).endOf('year');
        }else {

             startDate = moment().startOf('year');
             endDate = moment().endOf('year');
        }
        switch (type) {
            case "brush":
                data = dataTranformcal.filter((value) => {
                    return moment(startDate).isBefore(moment(value.release)) && moment(endDate).isAfter(moment(value.release));
                });
                break;
            case "heat":
                console.log(startDate,endDate);
                data = dataTranformcal.filter((value) => {
                    return moment(startDate).isBefore(moment(value.year)) && moment(endDate).isAfter(moment(value.year));
                });
                break;
        }
        console.log(data);
        setData(
            data,
        );
    }
    const asyncFetchHeat = async () => {
        let dataHeat;
        let dataHeatStorage = localStorage.getItem(keyStorageHeat);
        if (dataHeatStorage == undefined) {
            dataHeat = await getDashBoardHeat({}, user?.accessToken);
            localStorage.setItem(keyStorageHeat, JSON.stringify(dataHeat));
            convertDataTime("heat",dataHeat,setDataHeat);
        } else {
            console.log(Array.from(JSON.parse(dataHeatStorage)));
            convertDataTime("heat",Array.from(JSON.parse(dataHeatStorage)),setDataHeat);

        }
    };

    const handerSubmitTimeColumn = () => {
        if (timeDate.length != 0) {
            let dataBrushStorage = localStorage.getItem(keyStorageColumn);
            let dataTranform = Array.from(JSON.parse(dataBrushStorage));
            let startDate = timeDate[0];
            let endDate = timeDate[1];
            convertDataTime("brush",dataTranform,setDataBrush,startDate,endDate);
        }
    };
    const handerSubmitTimeHeat = () => {
        if (timeDate2.length != 0) {

            let dataHeatStorage = localStorage.getItem(keyStorageHeat);
            let dataTranform = Array.from(JSON.parse(dataHeatStorage));
            let startDate = timeDate2[0];
            let endDate = timeDate2[1];
            convertDataTime("heat",dataTranform,setDataHeat,startDate,endDate);
        }
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
                <Row className={styles['cards-dashboard']}>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={12}> <Card
                        title='Biểu đồ lịch hẹn theo nhánh' bordered={true}>
                        <div className={styles['cart-chart']}>
                            <Pie {...configPie} />
                        </div>
                    </Card></Col>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={12}> <Card
                        title='Biểu đồ tỷ lệ lịch hẹn đã đặt' bordered={true}>
                        <div className={styles['cart-chart']}>
                            <Gauge {...configRate} />
                        </div>
                    </Card></Col>
                </Row>
                <Row className='cards-dashboard'>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={24}>
                        <Card title='Biểu đồ lịch hẹn theo năm'
                              bordered={true}
                              extra={
                                  <Popover
                                      content={(
                                                  <div>
                                                      <Row style={{
                                                          marginBottom: '5px',
                                                      }}>
                                                          <Button onClick={showTimeLine1} type='primary'>Chọn khoảng
                                                              ngày</Button>
                                                      </Row>
                                                  </div>
                                          )}
                                      title=''
                                      trigger='click'
                                      open={open1}
                                      onOpenChange={handleOpenChange1}
                                  >
                                      <Button
                                          style={{
                                              marginRight: '5px',
                                          }}
                                          type='primary'>Tùy chỉnh</Button>
                                      <Button type='primary' onClick={refreshDataLine}><FontAwesomeIcon
                                          icon={faRefresh} /></Button>
                                  </Popover>
                              }
                        >
                            <div style={{ display: showInfo1 ? 'block' : 'none', paddingBottom: '50px' }}>
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
                                        <Button onClick={handerSubmitTimeColumn} type='primary'>Gửi</Button>
                                    </div>


                                </Space>
                            </div>
                            <Column {...configBrush} />
                        </Card>

                    </Col>
                </Row>
                <Row className='cards-dashboard'>
                    <Col style={{ padding: '5px' }} className='cart-item col-6' span={24}>
                        <Card title='Biểu đồ tần xuất lịch hẹn từng nhân viên'
                              bordered={true}
                              extra={
                                  <Popover
                                      content={(
                                          <div>

                                                  <Row style={{
                                                      marginBottom:"5px"
                                                  }}>
                                                      <Button onClick={showTimeLine2} type='primary'>Chọn khoảng ngày</Button>
                                                  </Row>
                                          </div>
                                      )

                                      }
                                      title=''
                                      trigger='click'
                                      open={open2}
                                      onOpenChange={handleOpenChange2}
                                  >
                                      <Button  type='primary'>Tùy chỉnh</Button>
                                      <Button type='primary' onClick={refreshDataLine}><FontAwesomeIcon
                                          icon={faRefresh} /></Button>
                                  </Popover>
                              }
                        >
                            <div style={{ display: showInfo2 ? 'block' : 'none', paddingBottom: '50px' }}>
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
                                                             setTimeDate2(values.map(item => {
                                                                 return item.format('YYYY-MM-DD');
                                                             }));
                                                         }
                                                     }
                                                     }
                                        />
                                        <Button onClick={handerSubmitTimeHeat} type='primary'>Gửi</Button>
                                    </div>
                                </Space>
                            </div>

                            <Heatmap {...configHeat} />
                        </Card>

                    </Col>
                </Row>
            </div>
        </div>
    );
}
function getConfigHeatMap(data,dispatch){
    return  {
        width: 1000,
        height: 500,
        autoFit: true ,
        data,
        xField: 'year',
        yField: 'District',
        colorField: 'AQHI',
        color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
        meta: {
            'year': {
                type: 'cat',
            },
        },
        onReady: (plot) => {
            plot.chart.on('plot:click', (evt) => {
                const { x, y } = evt;
                var item = plot.chart.getTooltipItems({ x, y })[0];
                dispatch(getDashboardBookingStart());
                dispatch(getDashboardBooking(item.data));
                window.location.replace("/system/manage-booking");
            });
        },
    };
}

function getConfigBrushChart(data,dispatch){
return {
    data,
    xField: 'release',
    yField: 'count',
    meta: {
        count: {
            alias: 'Số lượng lịch hẹn',
            nice: true,
        },
        release: {
            tickInterval: 5,
            alias: '',
        },
    },
    brush: {
        enabled: true,
        type: 'y-rect',
    },
    onReady: (plot) => {
        plot.chart.on('plot:click', (evt) => {
            const { x, y } = evt;
            var item = plot.chart.getTooltipItems({ x, y })[0];
            dispatch(getDashboardBookingStart());
            dispatch(getDashboardBooking(item.data));
            window.location.replace("/system/manage-booking");
        });
    },
};

}
function getConfigRateChart(percent) {
    return {
        percent: percent,
        range: {
            color: 'l(0) 0:#B8E1FF 1:#3D76DD',
        },
        startAngle: Math.PI,
        endAngle: 2 * Math.PI,
        indicator: null,
        statistic: {
            title: {
                offsetY: -36,
                style: {
                    fontSize: '36px',
                    color: '#4B535E',
                },
                formatter: () => percent  +'%',
            },
            content: {
                style: {
                    fontSize: '24px',
                    lineHeight: '44px',
                    color: '#4B535E',
                },
                formatter: () => 'Tỷ lệ lịch có người đặt',
            },
        },
    };
}

function getConfigPieChart(data,dispatch) {
    return {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
        onReady: (plot) => {
            plot.chart.on('plot:click', (evt) => {
                const { x, y } = evt;
                var item = plot.chart.getTooltipItems({ x, y })[0];
                dispatch(getDashboardBookingStart());
                dispatch(getDashboardBooking(item.data));
                window.location.replace("/system/manage-booking");
            });
        },
    };
}

export default ManageDashBoardBooking;