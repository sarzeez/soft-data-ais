import React, {useEffect, useState} from 'react';
import "./working.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Tabs} from "antd";
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import AddTerminalModal from "../settings/Terminal-modal/AddTerminalModal";
import TerminalTable from "../settings/table/TerminalTable";
import TerminalPagination from "../settings/paginations/TerminalPagination";
import AddStaff from "../modals/add-staff/AddStaff";
import StaffTable from "../settings/table/StaffTable";
import StaffTable2 from "./StaffTable2";
import StaffPagination from "../settings/paginations/StaffPagination";
import axios from "axios";
import {ip} from "../../../ip";
import moment from "moment";
import {useTranslation} from "react-i18next";

const { TabPane } = Tabs;


const WorkingHoursReport = () => {
    const isDarkMode = useSelector(state => state.theme.theme_data)

    const {t} = useTranslation()

    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)
    const navigate = useNavigate();


    // add new staff modal state
    const [isOpenAddStaff, setIsOpenAddStaff] = useState(false)

    // add new terminal modal state
    const [isOpenAddTerminal, setIsOpenAddTerminal] = useState(false)

    // terminal
    const [terminalPaginationLimit, setTerminalPaginationLimit] = useState(15)
    const [terminalPaginationCurrent, setTerminalPaginationCurrent] = useState(1)
    const [terminalData, setTerminalData] = useState([])
    const [terminalTotal, setTerminalTotal] = useState(null)

    // staff
    const [staffPaginationLimit, setStaffPaginationLimit] = useState(14)
    const [staffPaginationCurrent, setStaffPaginationCurrent] = useState(1)
    const [staffData, setStaffData] = useState([])
    const [staffTotal, setStaffTotal] = useState(null)

    const [staffTableIntialValues, setStaffTableIntialValues] = useState({
        fullname: '',
        gender: '',
        rank: '',
        user_type: '',
        door_ip: [],
        access_type: '',
        valid_from_time: '',
        valid_to_time: '',
        image: '',
        notification: false,
    })

    // delete button
    const [deleteStaff, setDeleteStaff] = useState([])
    const [deleteTerminal, setDeleteTerminal] = useState([])

    const [terminalTableIntialValues, setTerminalTableIntialValues] = useState({
        door_name: '',
        direction: '',
        auth_type: '',
        ip_address: '',
        type: '',
        username: '',
        password: '',
    })

    const addNewStaff = () => {
        setIsOpenAddStaff(true)
    }

    const addNewTerminal = () =>{
        setIsOpenAddTerminal(true)
    }

    const onChangeTabs = (key) => {
        // console.log(key);
    }

    const [state, setState] = useState({selectedRowKeys: []})
    const onSelectChange = (selectedRowKeys, a) => {
        setState({ selectedRowKeys })
        setDeleteTerminal(a.map(item => item.id));
        setDeleteStaff(a.map(item => item.id));
    };

    const { selectedRowKeys } = state;

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
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
                valid_from_time: '',   //moment(item.valid_from_time).format('DD.MM.YYYY, HH:mm:ss'),
                valid_to_time: '',   //moment(item.valid_to_time).format('DD.MM.YYYY, HH:mm:ss'),
                direction: item.direction,
                door_name: item.door_name,
                user_type: item.user_type === 1 ? t('Xodim') : item.user_type === 2 ? t('Mehmon') : t('Begona'),
                rank: item.rank == 1 ? t('Oddiy xodim') : item.rank == 2 ? t('Direktor') : item.rank == 3 ? t('VIP') : '',
                access_type: item.access_type === 0 ? t('Yuz') : item.access_type === 1 ? t('Barmoq izi') : item.access_type ===2 ? t('Yuz yoki Barmoq izi') : 'Yuz va Barmoq izi'
            }
        ))
        setStaffData(newData)
    }

    const handleDeliteStaff = () =>{
        axios.delete(`${ip}/api/terminal/deleteusers`, {data: deleteStaff})
            .then(res =>{
                getStaffData(staffPaginationCurrent);
                setState({selectedRowKeys: []})
                setDeleteStaff([])
            })
            .catch(err=>{
                console.log(err?.response?.data)
            })
    }

    const handleDeleteterminal =() =>{
        axios.delete(`${ip}/api/terminal/delete`,{data: deleteTerminal})
            .then(res =>{
                getTerminalData(terminalPaginationCurrent);
                setState({selectedRowsKeys:[]})
                setDeleteTerminal([])
            })
            .catch(err => {
                // console.log(err?.response?.data)
            })
    }

    const terminalPaginationOnChange = (e = 1, option) => {
        getTerminalData(e)
        setTerminalPaginationCurrent(e)
        setTerminalPaginationLimit(option)
    }

    const staffPaginationOnChange = (e = 1, option) => {
        getStaffData(e)
        setStaffPaginationCurrent(e)
        setStaffPaginationLimit(option)
    }

    useEffect(() => {
        getTerminalData(terminalPaginationCurrent)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [terminalPaginationLimit, terminalPaginationCurrent])

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
    }, []);


    return (
        <div>

            <div className="working_hour_report">
                <div className='working_hour_report_header'>
                    <div className="acsess_content_top">
                        <p className= {`Content_title darkModeColor'}`} >Ish vaqtini hisobga olish</p>
                    </div>
                </div>

                <div className="working_hour_report_body">

                    <Tabs onChange={onChangeTabs} type="card" defaultActiveKey="1">

                        <TabPane tab={"Intizom bo'yicha hisobotlar"} key="2">
                            <AddStaff
                                isOpenAddStaff = {isOpenAddStaff}
                                setIsOpenAddStaff = {setIsOpenAddStaff}
                                staffTableIntialValues={staffTableIntialValues}
                                setStaffTableIntialValues={setStaffTableIntialValues}
                                getStaffData={getStaffData}
                                setStaffPaginationCurrent ={setStaffPaginationCurrent}
                            />
                            <div className="access_control_setting_tab">
                                <div className='access_control_setting_tab_item'>
                                    <div className='access_control_setting_tab_item_body'>


                                        <StaffTable2
                                            isDarkMode={isDarkMode}
                                            staffData = {staffData}
                                            rowSelection={rowSelection}
                                            setIsOpenAddStaff={setIsOpenAddStaff}
                                            setStaffTableIntialValues={setStaffTableIntialValues}
                                        />
                                    </div>
                                    <div className='access_control_setting_tab_item_footer'>
                                        <div className='access_control_setting_tab_item_footer_buttons'>
                                            {/*<button onClick={addNewStaff} className='add_button'>*/}
                                            {/*    <MdOutlineAddCircleOutline size={24} style = {{marginRight: '5px'}}/>*/}
                                            {/*    {t("Xodim qo'shish")}*/}
                                            {/*</button>*/}
                                            {/*{*/}
                                            {/*    deleteStaff.length > 0 &&*/}
                                            {/*    <button onClick={handleDeliteStaff}>*/}
                                            {/*        <AiOutlineDelete size={22} style = {{marginRight: '5px'}}/>*/}
                                            {/*        {t("O’chirish")}*/}
                                            {/*    </button>*/}
                                            {/*}*/}
                                        </div>

                                        <StaffPagination
                                            staffPaginationLimit = {staffPaginationLimit}
                                            staffPaginationCurrent = {staffPaginationCurrent}
                                            staffPaginationOnChange = {staffPaginationOnChange}
                                            accessTableTotal = {staffTotal}
                                        />
                                    </div>
                                </div>
                            </div>

                        </TabPane>

                        {/*<TabPane tab={t("Autentifikatsiya sozlamalari")} key="3">*/}
                        {/*    <div className='access_control_setting_tab_item access_control_setting_tab_item_single'>*/}
                        {/*        <div className='access_control_setting_tab_item_body'>*/}
                        {/*            Autentifikatsiya sozlamalari*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</TabPane>*/}

                        {/*<TabPane tab={t("Online boshqaruv")} key="4">*/}
                        {/*    <div className='access_control_setting_tab_item access_control_setting_tab_item_single'>*/}
                        {/*        <div className='access_control_setting_tab_item_body'>*/}
                        {/*            Online boshqaruv*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</TabPane>*/}
                    </Tabs>

                </div>

            </div>

        </div>
    );
};

export default WorkingHoursReport;