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
import {AiOutlineClear, AiOutlineSearch} from "react-icons/ai";

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
        console.log(response)
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

    const clear = () => {
        //
        setName('')
        setDeviceName('all')
        setPosition('all')
        setUserType('all')

        setDateFrom('')
        setDateTo('')

        setAccessTableTotal(null)
        setAccessTableData(null)
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
                        <p className = {`content_total ${isDarkMode && 'darkModeColor'}`}>{t('Jami')}: {accessTableTotal} </p>
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
                        <div className="form_input_wrapper">
                            <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Ism')}</p>
                            <div className="input_wrappe">
                                <Input
                                    className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                    onChange={onChangeName}
                                    value={name}
                                    type="text"
                                    size="large"
                                    style={{marginRight: "10px", borderRadius: '5px'}}
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
                                    defaultValue={deviceName}
                                    value={deviceName}
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
                                    defaultValue={userType}
                                    value={userType}
                                >
                                    <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                    <Select.Option value="3">{t('Mehmon')}</Select.Option>
                                    <Select.Option value="2">{t('Begona')}</Select.Option>
                                    <Select.Option value="1">{t('Xodim')}</Select.Option>
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
                                    defaultValue={position}
                                    value={position}
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
                            <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Muddat')}:</p>
                            <div className="input_wrapper">
                                <DatePicker
                                    className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                    placeholder={`${moment(new Date()).format(
                                        "YYYY.DD.MM, 00:00:00"
                                    )}`}
                                    onChange={onChangeDateFrom}
                                    size="large"
                                    style={{width: "100%", borderRadius: '5px'}}
                                    showTime
                                    // value={dateFrom !== "" ? moment(dateFrom) : ""}
                                />
                            </div>
                            <div className="input_wrapper" style={{marginTop: "15px"}}>
                                <DatePicker
                                    className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                    placeholder={`${moment(new Date()).format(
                                        "YYYY.DD.MM, 26:59:59"
                                    )}`}
                                    onChange={onChangeDateTo}
                                    size="large"
                                    style={{width: "100%", borderRadius: '5px'}}
                                    showTime
                                    // value={dateTo !== "" ? moment(dateTo) : ""}
                                />
                            </div>
                        </div>

                        <div className="form_input_wrapper add_clear_button" style={{marginTop: "20px"}}>
                            <div className="input_wrapper">
                                <button
                                    type="button"
                                    className="soft_btn"
                                    onClick={() => fetchAccessTable(1)}
                                    icon={<SearchOutlined/>}
                                    size="large"
                                    style={{width: "100%"}}
                                >
                                    <AiOutlineSearch size={22} style = {{marginRight: '5px'}} />
                                    Qidirish
                                </button>
                            </div>

                            <div className="input_wrapper">
                                <button
                                    type="button"
                                    className="clear_button"
                                    onClick={clear}
                                >
                                    <AiOutlineClear size={24} style = {{marginRight: '5px'}} />
                                    Filterni tozalash
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className={`acsess_right ${isDarkMode && 'darkModeBackground darkModeBorder'} `}>
                        <AcsessTable
                            isDarkMode={isDarkMode}
                            accessTableData = {accessTableData}
                            // pagination={false}
                        />
                    </div>
                </div>
            </div>
        </>

    );
};

export default AcsessControlTable;