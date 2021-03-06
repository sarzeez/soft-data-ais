import React, { useState, useEffect } from 'react';
import { ip } from '../../../ip';
import { useSelector } from "react-redux";
import {useTranslation} from "react-i18next";
import {Input, Select, DatePicker} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {AiOutlineClear, AiOutlineSearch} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import './acsessControl.css';

import AcsessTable from "./AcsessTable";
import AccessControlSearchPagination from './Pagination';

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
    const [userType, setUserType] = useState('all');
    const [position, setPosition] = useState('all');
    const [direction, setDirection] = useState('all');
    const [authType, setAuthType] = useState('all');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [allowedDoor, setAllowedDoor] = useState([]);


    const categoryData = [
        [
            {value: 1, name: "Oddiy xodim"},
            {value: 2, name: "Direktor"},
            {value: 3, name: "VIP"},
        ],
        [
            {value: 4, name: "Mehmon"},
            {value: 5, name: "Bloklangan"},
        ]
    ]

    const onChangeName = (e) =>{
        setName(e.target.value);
    };
    const onChangeDeviceName = (e) =>{
        setDeviceName(e)
        if(e === 'all') {
            setDeviceName('all');
        }
        else {
            const DoorIP = allowedDoor[e].ip_address
            setDeviceName([DoorIP])
        }
    };
     const onChangeUserType = (e) =>{
        setUserType(e)
    };

    const onChangePosition = (e) =>{
        setPosition(e)
    };

    const onChangeAuthType=(e) =>{
        setAuthType(e)
    }

    const onChangeDirection=(e) =>{
        setDirection(e)
    }

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
            auth_type: authType,
            direction: direction,
            fromDate: dateFrom,
            toDate: dateTo,
        })
        const { data } = response;
        const count = data.count;
        // console.log(response)
        setAccessTableTotal(count)
        const newData = data.data.map((item, index) => (
            {
                ...item,
                key: index + 1 + (data.current_page - 1) * accessTablePaginationLimit,
                created_time: moment(item.created_time).format('DD.MM.YYYY, HH:mm:ss'),
                direction: item.direction,
                door_name: item.door_name,
                user_type: item.user_type,
                rank: item.rank ,
                auth_type: item.auth_type
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
        setAuthType('all')
        setDirection('all')

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

    useEffect(() => {
        const getData = () => {
            axios.get(`${ip}/api/adduser/terminal`)
                .then(res => {
                    const { data } = res;
                    setAllowedDoor(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        getData()
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
                        <div className="acsess_left_inputs">
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

                            <div className="access_control_table_inline_inputs">
                                <div className="form_input_wrapper">
                                    <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Toifasi')}</p>
                                    <div className="input_wrapper">
                                        <Select
                                            className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                            size="large"
                                            style={{width: "100%"}}
                                            placeholder={"Kiriting"}
                                            onChange={onChangeUserType}
                                            value={userType}
                                            defaultValue={userType}
                                        >
                                            <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                            <Select.Option value="1">{t("Xodim")}</Select.Option>
                                            <Select.Option value="2">{t("Begona")}</Select.Option>
                                        </Select>
                                    </div>
                                </div>

                                <div className="form_input_wrapper">
                                    <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Lavozimi')}</p>
                                    <div className="input_wrapper">
                                        <Select
                                            className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                            size="large"
                                            style={{width: "100%"}}
                                            onChange={onChangePosition}
                                            defaultValue={position}
                                            value={position}
                                        >
                                            <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                            {

                                                categoryData[userType -1 ]?.map((item, index) => (
                                                    <Select.Option key={index} value={item.value}>{t(item.name)}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                            </div>



                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t("Tasdiq turi")}</p>
                                <div className="input_wrapper">
                                    <Select
                                        className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                        onChange={onChangeAuthType}
                                        style={{width: "100%"}}
                                        size="large"
                                        defaultValue={authType}
                                        value={authType}
                                    >
                                        <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                        <Select.Option value="1">{t("Yuz")}</Select.Option>
                                        <Select.Option value="2">{t("Barmoq izi")}</Select.Option>
                                        <Select.Option value="3">{t("ID karta")}</Select.Option>
                                        <Select.Option value="4">{t("Yuz va Barmoq izi")}</Select.Option>
                                        <Select.Option value="6">{t("Yuz va ID karta")}</Select.Option>
                                        <Select.Option value="8">{t("Barmoq izi va ID karta")}</Select.Option>
                                    </Select>
                                </div>
                            </div>

                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Eshik')}</p>
                                <div className="input_wrapper">
                                    <Select
                                        className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                        style={{width: "100%"}}
                                        size="large"
                                        defaultValue={'all'}
                                        onChange={onChangeDeviceName}
                                    >
                                        <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                        {
                                            allowedDoor.map((item, index) => (
                                                <Select.Option key={index} >{item.door_name}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </div>

                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t("Yo'nalishi")}</p>
                                <div className="input_wrapper">
                                    <Select
                                        className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                        onChange={onChangeDirection}
                                        style={{width: "100%"}}
                                        size="large"
                                        defaultValue={direction}
                                        value={direction}
                                    >
                                        <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                        <Select.Option value="Entry">{t("Kirish")}</Select.Option>
                                        <Select.Option value="Exit">{t("Chiqish")}</Select.Option>
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
                                        value={dateFrom !== "" ? moment(dateFrom) : ""}
                                    />
                                </div>
                                <div className="input_wrapper" style={{marginTop: "5px"}}>
                                    <DatePicker
                                        className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                        placeholder={`${moment(new Date()).format(
                                            "YYYY.DD.MM, 26:59:59"
                                        )}`}
                                        onChange={onChangeDateTo}
                                        size="large"
                                        style={{width: "100%", borderRadius: '5px'}}
                                        showTime
                                        value={dateTo !== "" ? moment(dateTo) : ""}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="form_input_wrapper add_clear_button" style={{marginTop: "5px"}}>
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
                                    {t("Qidirish")}
                                </button>
                            </div>

                            <div className="input_wrapper">
                                <button
                                    type="button"
                                    className="clear_button"
                                    onClick={clear}
                                >
                                    <AiOutlineClear size={24} style = {{marginRight: '5px'}} />
                                    {t("Filterni tozalash")}
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
