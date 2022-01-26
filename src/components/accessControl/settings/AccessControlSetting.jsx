import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from 'moment';

import { ip } from '../../../ip';

import AcsessTable from './table'
import AccessControlSearchPagination from '../accessControlSearch/Pagination';
import NewStaff from '../../newStaff/newStaff'

import { MdOutlineAddCircleOutline } from 'react-icons/md'

import './setting.css'

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
                    <p className= {`Content_title ${isDarkMode && 'darkModeColor'}`} >Access control setting</p>
                    <div className='access_control_setting_header_wrapper'>
                        <button onClick={addNewStaff} className='add_staff_button'>
                            <MdOutlineAddCircleOutline size={24} style = {{marginRight: '5px'}}/>
                            Xodim qo'shish
                            </button>
                            <NewStaff newStaffModal = {newStaffModal} setNewStaffModal = {setNewStaffModal} />
                        <div className='access-control-pagination'>
                            <AccessControlSearchPagination
                                accessTablePaginationLimit = {accessTablePaginationLimit}
                                accessTablePaginationCurrent = {accessTablePaginationCurrent}
                                accessTablePaginationOnChange = {accessTablePaginationOnChange}
                                accessTableTotal = {accessTableTotal}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`access_control_setting_body ${isDarkMode && 'darkModeBackground'}`}>
                {/* <div className={`acsess_content ${isDarkMode && 'darkModeBackground'}`}>
                    <div className={`acsess_right ${isDarkMode && 'darkModeBackground darkModeBorder'} `}>
                        <AcsessTable
                            isDarkMode={isDarkMode}
                            accessTableData = {accessTableData}

                        />
                    </div>
                </div> */}
                <AcsessTable
                    isDarkMode={isDarkMode}
                    accessTableData = {accessTableData}
                />
            </div>

        </div>
    )
};

export default AccessControlSetting;
