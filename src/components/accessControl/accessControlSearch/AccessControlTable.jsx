import React, { useState, useEffect } from 'react';
import {Input, Select, DatePicker} from "antd";
import moment from "moment";
import {SearchOutlined} from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './acsessControl.css';
import { ip } from '../../../ip';

import AcsessTable from "./AcsessTable";
import AccessControlSearchPagination from './Pagination';
import {useTranslation} from "react-i18next";

const AcsessControlTable = () => {

    const isDarkMode = useSelector(state => state.theme.theme_data)
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)
    const [accessTablePaginationLimit, setAccessTablePaginationLimit] = useState(15)
    const [accessTablePaginationCurrent, setAccessTablePaginationCurrent] = useState(1)
    const [accessTableData, setAccessTableData] = useState([])
    const [accessTableTotal, setAccessTableTotal] = useState(null)
    const navigate = useNavigate()
    const {t} = useTranslation()

    const [name, setName] = useState('');
    const [deviceName, setDeviceName] = useState('all');
    const [position, setPosition] = useState('all');
    const [userType, setUserType] = useState('all');
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();

    const onChangeName = (e) =>{
        setName(e.target.value);
    };

    const onChangeDeviceName = (e) =>{
        setDeviceName(e)
    };

    const onChangePosition = (e) =>{
        setPosition(e)
    };

    const onChangeUserType = (e) =>{
        setUserType(e)
    };


    const onChangeDateFrom = (e, a) => {
        setDateFrom(a);
    };

    const onChangeDateTo = (e, a) => {
        setDateTo(a);
    };

    const fetchAccessTable = async (id) => {
        const response = await axios.post(`${ip}/api/history/${accessTablePaginationLimit}/${id}`, {
            fullname: name,
            device_name: deviceName,
            rank: position,
            user_type: userType,
            fromDate: dateFrom,
            toDate: dateTo,
        })
        const { data } = response;
        const count = data.count;
        // console.log(data)
        setAccessTableTotal(count)
        const newData = data.data.map((item, index) => (
            {
                ...item,
                key: index + 1 + (data.current_page - 1) * accessTablePaginationLimit,
                created_time: moment(item.created_time).format('DD.MM.YYYY, HH:mm:ss'),
                direction: item.direction,
                door_name: item.door_name,
                user_type: item.user_type ? item.user_type : "Begona"
            }
        ))
        setAccessTableData(newData)
    }

    const accessTablePaginationOnChange = (e = 1, option) => {
        fetchAccessTable(e)
        setAccessTablePaginationCurrent(e)
        setAccessTablePaginationLimit(option)
    }

    useEffect(() => {
        fetchAccessTable(accessTablePaginationCurrent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessTablePaginationLimit, accessTablePaginationCurrent])

    useEffect(() => {
        if(!is_refresh_value) {
            navigate('/face-control-search')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <div className={`accsessControl ${isDarkMode && 'darkModeBackground'}`}>
                <div className="acsess_content_top">
                    <p className= {`Content_title ${isDarkMode && 'darkModeColor'}`} >{t('Jadval')}</p>
                    <div className='access-control-pagination'>
                        <AccessControlSearchPagination
                            accessTablePaginationLimit = {accessTablePaginationLimit}
                            accessTablePaginationCurrent = {accessTablePaginationCurrent}
                            accessTablePaginationOnChange = {accessTablePaginationOnChange}
                            accessTableTotal = {accessTableTotal}
                        />
                    </div>
                </div>

                <div className={`acsess_content ${isDarkMode && 'darkModeBackground'}`}>
                    <div className="acsess_left">
                        <div>
                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Ism')}</p>
                                <div className="input_wrappe">
                                    <Input
                                        className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                        onChange={onChangeName}
                                        type="text"
                                        size="large"
                                        style={{marginRight: "10px"}}
                                        placeholder={t('Kiriting')}
                                    />
                                </div>
                            </div>

                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Eshik')}</p>
                                <div className="input_wrapper">
                                    <Select
                                        className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                        onChange={onChangeDeviceName}
                                        style={{width: "100%"}}
                                        size="large"
                                        defaultValue="all"
                                    >
                                        <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                        <Select.Option value="1">1</Select.Option>
                                        <Select.Option value="2">2</Select.Option>
                                        <Select.Option value="3">3</Select.Option>
                                    </Select>
                                </div>
                            </div>

                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Toifasi')}</p>
                                <div className="input_wrapper">
                                    <Select
                                        className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                        onChange={onChangeUserType}
                                        style={{width: "100%"}}
                                        size="large"
                                        defaultValue="all"
                                    >
                                        <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                        <Select.Option value="3">{t('Mehmon')}</Select.Option>
                                        <Select.Option value="2">{t('Begona')}</Select.Option>
                                        <Select.Option value="1">Xodim</Select.Option>
                                    </Select>
                                </div>
                            </div>

                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Lavozimi</p>
                                <div className="input_wrapper">
                                    <Select
                                        className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                        onChange={onChangePosition}
                                        style={{width: "100%"}}
                                        size="large"
                                        defaultValue="all"
                                    >
                                        <Select.Option value="all">Hammasi</Select.Option>
                                        <Select.Option value="Oddiy xodim">Oddiy xodim</Select.Option>
                                        <Select.Option value="Direktor">Direktor</Select.Option>
                                        <Select.Option value="VIP">VIP</Select.Option>
                                    </Select>
                                </div>
                            </div>

                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Amaliyot turi</p>
                                <div className="input_wrapper">
                                    <Select
                                        className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                        // onChange={onChangePosition}
                                        style={{width: "100%"}}
                                        size="large"
                                        defaultValue="all"
                                    >
                                        <Select.Option value="all">Hammasi</Select.Option>
                                        <Select.Option value="0">Kirdi</Select.Option>
                                        <Select.Option value="1">Chiqdi</Select.Option>
                                    </Select>
                                </div>
                            </div>



                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Muddat:</p>
                                <div className="input_wrapper">
                                    <DatePicker
                                        className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                        placeholder={`${moment(new Date()).format(
                                            "DD.MM.YYYY"
                                        )}`}
                                        onChange={onChangeDateFrom}
                                        size="large"
                                        style={{width: "100%"}}
                                        // showTime
                                    />
                                </div>
                                <div className="input_wrapper" style={{marginTop: "15px"}}>
                                    <DatePicker
                                        className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                        placeholder={`${moment(new Date()).format(
                                            "DD.MM.YYYY"
                                        )}`}
                                        onChange={onChangeDateTo}
                                        size="large"
                                        style={{width: "100%"}}
                                        // showTime
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form_input_wrapper" style={{marginTop: "20px"}}>
                            <div className="input_wrapper">
                                <button
                                    type="button"
                                    className="soft_btn"
                                    onClick={() => fetchAccessTable(1)}
                                    icon={<SearchOutlined/>}
                                    size="large"
                                    style={{width: "100%"}}
                                >
                                    Qidirish
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className={`acsess_right ${isDarkMode && 'darkModeBackground darkModeBorder'} `}>
                        
                        <AcsessTable
                            isDarkMode={isDarkMode}
                            accessTableData = {accessTableData}
                        />
                    </div>
                </div>
            </div>
        </>

    );
};

export default AcsessControlTable;