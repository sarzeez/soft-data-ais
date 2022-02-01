import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from 'moment';
import { Tabs } from 'antd';
import { MdOutlineAddCircleOutline } from 'react-icons/md'


import { ip } from '../../../ip';

import TerminalTable from './table/TerminalTable'
import StaffTable from './table/StaffTable'
import TerminalPagination from './paginations/TerminalPagination';
import StaffPagination from './paginations/StaffPagination';
import AddStaff from '../modals/add-staff/AddStaff';


import './setting.css'

const { TabPane } = Tabs;


const AccessControlSetting = () => {

    const isDarkMode = useSelector(state => state.theme.theme_data)
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)

    // add new staff modal state
    const [isOpenAddStaff, setIsOpenAddStaff] = useState(false)

    // terminal
    const [terminalPaginationLimit, setTerminalPaginationLimit] = useState(10)
    const [terminalPaginationCurrent, setTerminalPaginationCurrent] = useState(1)
    const [terminalData, setTerminalData] = useState([])
    const [terminalTotal, setTerminalTotal] = useState(null)

    // staff
    const [staffPaginationLimit, setStaffPaginationLimit] = useState(10)
    const [staffPaginationCurrent, setStaffPaginationCurrent] = useState(1)
    const [staffData, setStaffData] = useState([])
    const [staffTotal, setStaffTotal] = useState(null)

    const navigate = useNavigate()

    const addNewStaff = () => {
        setIsOpenAddStaff(true)
    }

    const onChangeTabs = (key) => {
        // console.log(key);
    }

    const getTerminalData = async (id) => {
        const response = await axios.get(`${ip}/api/terminals/${terminalPaginationLimit}/${id}`)
        const { data } = response;
        const count = data.count;
        setTerminalTotal(count)
        const newData = data.data.map((item, index) => (
            {
                ...item,
                key: index + 1 + (data.current_page - 1) * terminalPaginationLimit,
                created_time: moment(item.created_time).format('DD.MM.YYYY, HH:mm:ss'),
                door_name: item.door_name,
                direction: item.direction,
                auth_type: item.auth_type,
                ip_address: item.ip_address,
                type: item.type,
                username: item.username,
                password: item.password,
            }
        ))
        setTerminalData(newData)
    }

    const terminalPaginationOnChange = (e = 1, option) => {
        getTerminalData(e)
        setTerminalPaginationCurrent(e)
        setTerminalPaginationLimit(option)
    }

    useEffect(() => {
        getTerminalData(terminalPaginationCurrent)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [terminalPaginationLimit, terminalPaginationCurrent])


    // get staff data
    const getStaffData = async (id) => {
        const response = await axios.get(`${ip}/api/terminal/getusers/${staffPaginationLimit}/${id}`)
        const { data } = response;
        const count = data.count;
        setStaffTotal(count)
        const newData = data.data.map((item, index) => (
            {
                ...item,
                key: index + 1 + (data.current_page - 1) * staffPaginationLimit,
                created_time: moment(item.created_time).format('DD.MM.YYYY, HH:mm:ss'),
                direction: item.direction,
                door_name: item.door_name,
                user_type: item.user_type ? item.user_type : "Begona"
            }
        ))
        setStaffData(newData)
    }

    const staffPaginationOnChange = (e = 1, option) => {
        getStaffData(e)
        setStaffPaginationCurrent(e)
        setStaffPaginationLimit(option)
    }

    useEffect(() => {
        getStaffData(staffPaginationCurrent)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staffPaginationLimit, staffPaginationCurrent])

    // redirect
    useEffect(() => {
        if(!is_refresh_value) {
            navigate('/face-control-search')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='access_control_setting'>
            <AddStaff
                isOpenAddStaff = {isOpenAddStaff}
                setIsOpenAddStaff = {setIsOpenAddStaff}
            />
            <div className='access_control_setting_header'>
                <div className="acsess_content_top">
                    <p className= {`Content_title ${isDarkMode && 'darkModeColor'}`} >Kirishni boshqarish sozlamalar</p>
                </div>
            </div>

            <div className={`access_control_setting_body ${isDarkMode && 'darkModeBackground'}`}>
                
                <Tabs onChange={onChangeTabs} type="card" defaultActiveKey="1">
                    <TabPane tab="Autentifikatsiya sozlamalari" key="1">
                        <div className='access_control_setting_tab_item access_control_setting_tab_item_single'>
                            <div className='access_control_setting_tab_item_body'>
                                Content of Tab Pane 1
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Terminal parametrlari" key="2">
                        <div className='access_control_setting_tab_item'>
                            <div className='access_control_setting_tab_item_body'>
                                <TerminalTable
                                    isDarkMode={isDarkMode}
                                    terminalData = {terminalData}
                                />
                            </div>
                            <div className='access_control_setting_tab_item_footer'>
                                <button className='add_button'>
                                    <MdOutlineAddCircleOutline size={24} style = {{marginRight: '5px'}}/>
                                    Terminal qo'shish
                                </button>
                                <TerminalPagination
                                    accessTablePaginationLimit = {terminalPaginationLimit}
                                    accessTablePaginationCurrent = {terminalPaginationCurrent}
                                    accessTablePaginationOnChange = {terminalPaginationOnChange}
                                    accessTableTotal = {terminalTotal}
                                />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Onlayn boshqaruv" key="3">
                        <div className='access_control_setting_tab_item access_control_setting_tab_item_single'>
                            <div className='access_control_setting_tab_item_body'>
                                Content of Tab Pane 3
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Xodimlar" key="4">
                        <div className='access_control_setting_tab_item'>
                            <div className='access_control_setting_tab_item_body'>
                                <StaffTable
                                    isDarkMode={isDarkMode}
                                    staffData = {staffData}
                                />
                            </div>
                            <div className='access_control_setting_tab_item_footer'>
                                <button onClick={addNewStaff} className='add_button'>
                                    <MdOutlineAddCircleOutline size={24} style = {{marginRight: '5px'}}/>
                                    Xodim qo'shish
                                </button>
                                <StaffPagination
                                    accessTablePaginationLimit = {staffPaginationLimit}
                                    accessTablePaginationCurrent = {staffPaginationCurrent}
                                    accessTablePaginationOnChange = {staffPaginationOnChange}
                                    accessTableTotal = {staffTotal}
                                />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>

        </div>
    )
};

export default AccessControlSetting;
