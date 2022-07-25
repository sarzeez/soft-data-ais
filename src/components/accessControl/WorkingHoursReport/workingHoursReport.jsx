import React, {useEffect, useState} from 'react';
import "./working.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button, DatePicker, Input, Radio, Space, Tabs} from "antd";
import AddStaff from "../modals/add-staff/AddStaff";
import StaffTable from "../settings/table/StaffTable";
import StaffTable2 from "./StaffTable2";
import StaffPagination from "../settings/paginations/StaffPagination";
import axios from "axios";
import {ip} from "../../../ip";
import moment from "moment";
import {useTranslation} from "react-i18next";
import search from "../../../images/newimages/ishvaqti/Vector.png";

const {TabPane} = Tabs;


const WorkingHoursReport = () => {


    // const onChange = e => {
    //     console.log('radio checked', e.target.value);
    //     setValue(e.target.value);
    //
    // };


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

    const addNewTerminal = () => {
        setIsOpenAddTerminal(true)
    }

    const onChangeTabs = (key) => {
        // console.log(key);
    }

    const [state, setState] = useState({selectedRowKeys: []})
    const onSelectChange = (selectedRowKeys, a) => {
        setState({selectedRowKeys})
        setDeleteTerminal(a.map(item => item.id));
        setDeleteStaff(a.map(item => item.id));
    };

    const {selectedRowKeys} = state;

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const getTerminalData = async (id) => {
        const response = await axios.get(`${ip}/api/terminals/${terminalPaginationLimit}/${id}`)
        const {data} = response;
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
    const [allStaff, setAllStaff] = useState([]);
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");

    const [value, setValue] = React.useState("all");
    const onChange = e => {
        // console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    function onChangeee(date, dateString) {
        console.log(dateString);
        setDate1(dateString)
    }

    function onChangeee2(date2, dateString2) {
        console.log(dateString2);
        setDate2(dateString2);
    }

    const [matn, setMatn] = useState("");
    const onChangeText = (e) => {
        // console.log(e.target.value)
        setMatn(e.target.value)
    }
    const dataa = {
        fullname: matn,
        fromDate: date1,
        // toDate: date2
    };
    const dataa2 = {
        fullname: matn,
        givenDate: date1,
    };
    const headers = {'Content-Type': 'application/json'}

    useEffect(() => {
        console.log(value)
        getStaffData(staffPaginationCurrent , value)
        setStaffPaginationCurrent(1);
    }, [value , setValue]);

    const lang = localStorage.getItem('i18nextLng');
    const getStaffData = async (id , api) => {
        const response = await axios.post(`${ip}/api/terminal/timemanagement/${api}/${staffPaginationLimit}/${id}`,
            {fullname:matn,fromDate:date1,toDate:date2,givenDate:date1}
            , headers)
        setMatn("");
        setDate1("");
        setDate2("");

        const {data} = response;
        // console.log(data)
        const count = data.count;
        setStaffTotal(count)

        const newData = data.data.map((item, index) => (
            {
                ...item,
                key: index + 1 + (data.current_page - 1) * staffPaginationLimit,
                user_type: item.user_type,
                // user_type: item.user_type === 1 ? t('Xodim') : (item.user_type === 2 ? t('Mehmon') : t('Begona')),
                rank: item.rank,
                // rank: item.rank == 1 ? t('Oddiy xodim') : (item.rank == 2 ? t('Direktor') : (item.rank == 3 ? t('VIP') : '')),
                late_time: item.late_time,
                early_go_time : item.early_go_time,
                all_fine_time: item.all_fine_time,
                // late_time: lang==="uz" ? item.late_time.uz :(lang==="ru" ? item.late_time.ru : item.late_time.en),
                // early_go_time: lang==="uz" ? item.early_go_time.uz :(lang==="ru" ? item.early_go_time.ru : item.early_go_time.en),
                // all_fine_time: lang==="uz" ? item.all_fine_time.uz :(lang==="ru" ? item.all_fine_time.ru : item.all_fine_time.en),
                absence_count: item.absence_count
            }
        ))
        setStaffData(newData)
    }
    const handleSearch = () =>{
        getStaffData(staffPaginationCurrent , value)
    }


    const handleDeliteStaff = () => {
        axios.delete(`${ip}/api/terminal/deleteusers`, {data: deleteStaff})
            .then(res => {
                getStaffData(staffPaginationCurrent);
                setState({selectedRowKeys: []})
                setDeleteStaff([])
            })
            .catch(err => {
                console.log(err?.response?.data)
            })
    }

    const handleDeleteterminal = () => {
        axios.delete(`${ip}/api/terminal/delete`, {data: deleteTerminal})
            .then(res => {
                getTerminalData(terminalPaginationCurrent);
                setState({selectedRowsKeys: []})
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
        getStaffData(e,value)
        setStaffPaginationCurrent(e)
        setStaffPaginationLimit(option)
    }
    useEffect(() => {
        getStaffData(staffPaginationCurrent,value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staffPaginationLimit, staffPaginationCurrent])


    useEffect(() => {
        getTerminalData(terminalPaginationCurrent)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [terminalPaginationLimit, terminalPaginationCurrent])


    // redirect
    useEffect(() => {
        if (!is_refresh_value) {
            navigate('/face-control-search')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // new tabs


    // new tabs


    return (

        <div>
            <div className="working_hour_report">
                <div className='working_hour_report_header'>
                    <div className="acsess_content_top">
                        <p className={`Content_title darkModeColor'}`}>{t('Ish vaqtini hisobga olish')}</p>
                    </div>
                </div>

                <div className="working_hour_report_body">


                    <Tabs onChange={onChangeTabs} type="card" defaultActiveKey="1">

                        <TabPane tab={t('Intizom boyicha hisobotlar')} key="2">
                            <div className="access_control_setting_tab">
                                <div className='access_control_setting_tab_item'>
                                    <div className='access_control_setting_tab_item_body'>
                                        <div className="staf-table-navbar">
                                            <div className="d-flex">
                                                <Radio.Group onChange={onChange} value={value} className="radioCheck">
                                                    <Radio value={"all"} className={value === "all" ? "radio1 active" : "radio1"}
                                                           >{t('Hammasi')}</Radio>
                                                    <Radio value={"s"} className={value ==="s" ? "radio1 active" : "radio1"}
                                                           >{t('Kelganlar')}</Radio>
                                                    <Radio value={"absence"} className={value ==="absence" ? "radio1 active" : "radio1"}
                                                           >{t('Kelmaganlar')}</Radio>
                                                    <Radio value={"late"} className={value ==="late" ? "radio1 active" : "radio1"}
                                                           >{t('Kechikkanlar')}</Radio>
                                                    <Radio value={"earlygo"} className={value ==="earlygo" ? "radio1 active" : "radio1"}
                                                           >{t('Barvaqt ketganlar')}</Radio>
                                                    <Radio value={"exist"} className={value ==="exist" ? "radio1 active" : "radio1"}
                                                    >{t('Hozirda mavjud hodimlar')}</Radio>
                                                </Radio.Group>
                                            </div>
                                            <div className="d-flex align-items-center mt-3">
                                                <div className="d-flex align-items-center mr-2">
                                                    <Input placeholder={t('Izlash')} className="input" name="fullname"
                                                           onChange={onChangeText} value={matn}/>
                                                </div>
                                                <Space direction="gorizontal">
                                                    <DatePicker className="selectedDate" onChange={onChangeee}/>
                                                    {
                                                        value === "all" ?
                                                            <DatePicker className="selectedDate"
                                                                        onChange={onChangeee2}/>
                                                            : ""
                                                    }
                                                </Space>
                                                <button className="button ml-1"
                                                onClick={handleSearch}><img src={search}/></button>
                                            </div>
                                        </div>
                                        <StaffTable2
                                            isDarkMode={isDarkMode}
                                            staffData={staffData}
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
                                            staffPaginationLimit={staffPaginationLimit}
                                            staffPaginationCurrent={staffPaginationCurrent}
                                            staffPaginationOnChange={staffPaginationOnChange}
                                            accessTableTotal={staffTotal}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>

                </div>

            </div>

        </div>
    );
};

export default WorkingHoursReport;