import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from 'moment';
import { Tabs } from 'antd';

import { ip } from '../../../ip';

import TerminalTable from './table/TerminalTable'
import StaffTable from './table/StaffTable'
import TerminalPagination from './paginations/TerminalPagination';
import StaffPagination from './paginations/StaffPagination';
import NewStaff from '../../newStaff/newStaff'

import { MdOutlineAddCircleOutline } from 'react-icons/md'

import './setting.css'

const { TabPane } = Tabs;


const AccessControlSetting = () => {

    const isDarkMode = useSelector(state => state.theme.theme_data)
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)
    const [accessTablePaginationLimit, setAccessTablePaginationLimit] = useState(10)
    const [accessTablePaginationCurrent, setAccessTablePaginationCurrent] = useState(1)
    const [accessTableData, setAccessTableData] = useState([])
    const [accessTableTotal, setAccessTableTotal] = useState(null)
    const [newStaffModal, setNewStaffModal] = useState(false);

    const navigate = useNavigate()

    const addNewStaff = () => {
        setNewStaffModal(true)
    }

    const onChangeTabs = (key) => {
        // console.log(key);
    }

    const fetchAccessTable = async (id) => {
        const response = await axios.post(`${ip}/api/history/${accessTablePaginationLimit}/${id}`, {
            // fullname: name,
            // device_name: deviceName,
            // rank: position,
            // user_type: userType,
            // fromDate: dateFrom,
            // toDate: dateTo,
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
        <div className='access_control_setting'>
            <div className='access_control_setting_header'>
                <div className="acsess_content_top">
                    <p className= {`Content_title ${isDarkMode && 'darkModeColor'}`} >Kirishni boshqarish sozlamalar</p>
                    <NewStaff newStaffModal = {newStaffModal} setNewStaffModal = {setNewStaffModal} />
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
                                    accessTableData = {accessTableData}
                                />
                            </div>
                            <div className='access_control_setting_tab_item_footer'>
                                <button className='add_button'>
                                    <MdOutlineAddCircleOutline size={24} style = {{marginRight: '5px'}}/>
                                    Terminal qo'shish
                                </button>
                                <TerminalPagination
                                    accessTablePaginationLimit = {accessTablePaginationLimit}
                                    accessTablePaginationCurrent = {accessTablePaginationCurrent}
                                    accessTablePaginationOnChange = {accessTablePaginationOnChange}
                                    accessTableTotal = {accessTableTotal}
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
                                    accessTableData = {accessTableData}
                                />
                            </div>
                            <div className='access_control_setting_tab_item_footer'>
                                <button onClick={addNewStaff} className='add_button'>
                                    <MdOutlineAddCircleOutline size={24} style = {{marginRight: '5px'}}/>
                                    Xodim qo'shish
                                </button>
                                <StaffPagination
                                    accessTablePaginationLimit = {accessTablePaginationLimit}
                                    accessTablePaginationCurrent = {accessTablePaginationCurrent}
                                    accessTablePaginationOnChange = {accessTablePaginationOnChange}
                                    accessTableTotal = {accessTableTotal}
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
