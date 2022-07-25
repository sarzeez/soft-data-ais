import React, {useEffect, useState} from 'react';
import {Table, Image} from 'antd';
import moment from 'moment';
import {useSelector} from "react-redux";

import {AiOutlineUser} from 'react-icons/ai'

// import {ip} from '../../../../ip';
import {ip} from "../../../ip";
import {useTranslation} from "react-i18next";
import {RiEditLine} from "react-icons/ri";
import search from "../../../images/newimages/ishvaqti/Vector.png";

import 'antd/dist/antd.css';
import {Radio, Input, Button} from 'antd';
import {DatePicker, Space} from 'antd';
import "./working.css";
import axios from "axios";

const StaffTable = (props) => {

    // const [value, setValue] = React.useState(1);
    //
    // const onChange = e => {
    //     console.log('radio checked', e.target.value);
    //     setValue(e.target.value);
    // };
    //
    //
    // function onChangeee(date, dateString) {
    //     console.log(date, dateString);
    // }
    // console.log(localStorage.getItem('i18nextLng'))
    const lang = localStorage.getItem('i18nextLng');
    console.log(lang)
    const {
        staffData,
        rowSelection,
        setIsOpenAddStaff,
        setStaffTableIntialValues,
    } = props;
    // console.log(staffData)

    const {t} = useTranslation()
    const isDarkMode = useSelector(state => state.theme.theme_data)

    const editAddStaff = (value, record) => {
        console.log(value);

        setStaffTableIntialValues({
            ...value,
            edit: true
        })
        setIsOpenAddStaff(true)
    }

    const columns = [
        {
            title: t('T/r'),
            dataIndex: 'key',
            align: 'center'
        },
        {
            title: t('Ism'),
            dataIndex: 'fullname',
            render: (text, record) => (
                <div className='table_user_cell'>
                    <div className="user_img">
                        <Image
                            width={40}
                            style={{borderRadius: '20px', marginRight: '5px', maxWidth: '40px', maxHeight: '40px'}}
                            src={`${ip}/${record.image}`}
                            preview={{
                                mask: (
                                    <AiOutlineUser size={20}/>
                                ),
                                maskClassName: 'customize-mask',
                            }}
                        >
                        </Image>
                        {/*imgNeActiveIcon*/}
                        {/*<span className={`${record.notification===true ? "imgActiveIcon":"imgNeActiveIcon" }`}>*/}
                        <span className={"imgNeActiveIcon"}>

                        </span>
                    </div>

                    <p>{record.fullname}</p>
                </div>
            ),
        },
        {
            title: t('Toifasi'),
            dataIndex: 'user_type',
            // align: 'center'
        },
        {
            title: t('Lavozimi'),
            dataIndex: 'rank',
            // align: 'center'
        },
        {
            title: t('Kechikkan vaqti'),
            render: (text, record) => (
                <div className='door_ip_length'>
                    <p>
                        {/*{record.door_ip.length}*/}
                        {record.late_time}
                        {/*{lang==="uz" ? record.late_time.uz : (lang==="en" ? record.late_time.en : record.late_time.ru)}*/}
                        {/*{console.log(record.late_time.ru)}*/}
                    </p>
                    <div className='door_ip_length_hover'>
                        {/*{record.door_ip.join(' ')}*/}
                        <div className='door_ip_length_hover_rectangel'>

                        </div>
                    </div>
                </div>
            )
        },
        {
            title: t('Erta ketish vaqti'),
            // dataIndex: 'cards',
            // align: 'center',
            render: (text, record) => (
                <div className='door_ip_length'>
                    <p>
                        {/*{record.door_ip.length}*/}
                        {record.early_go_time}
                        {/*{lang==="uz" ? record.early_go_time.uz : (lang==="en" ? record.early_go_time.en : record.early_go_time.ru)}*/}
                    </p>
                    <div className='door_ip_length_hover'>
                        {/*{record.door_ip.join(' ')}*/}
                        <div className='door_ip_length_hover_rectangel'>

                        </div>
                    </div>
                </div>
            )
        },
        {
            title: t('Umumiy jarima vaqti'),
            // dataIndex: 'card_id',
            // align: 'center',
            render: (text, record) => (
                <div className='door_ip_length'>
                    <p>
                        {/*{record.door_ip.length}*/}
                        {record.all_fine_time}
                        {/*{lang==="uz" ? record.all_fine_time.uz : (lang==="en" ? record.all_fine_time.en :record.all_fine_time.ru)}*/}
                    </p>
                    <div className='door_ip_length_hover'>
                        {/*{record.door_ip.join(' ')}*/}
                        <div className='door_ip_length_hover_rectangel'>

                        </div>
                    </div>
                </div>
            )
        },
        {
            title: t('Kelmagan kunlari'),
            dataIndex: 'valid_from_time',
            render: (text, record) =>
                (
                    <div className='door_ip_length'>
                        <p>
                            {/*{record.door_ip.length}*/}
                            {record.absence_count}
                        </p>
                        <div className='door_ip_length_hover'>
                            {/*{record.door_ip.join(' ')}*/}
                            <div className='door_ip_length_hover_rectangel'>

                            </div>
                        </div>
                    </div>
                )
            // {
            //     return `${moment(record.valid_from_time).format('DD.MM.YYYY')} - ${moment(record.valid_to_time).format('DD.MM.YYYY')}`
            // },
            // align: 'center'
        },
        // {
        //     title: t('Tahrir'),
        //     dataIndex: '',
        //     render: (text, record) => (
        //         <div onClick={() => editAddStaff(text, record)} className='edit_button'>
        //             <RiEditLine size = {22} color='#fff'/>
        //         </div>
        //     ),
        //     align: 'center'
        // },
    ];


    return (
        <div className="">
            <div className="tableAll">
                <Table
                    className={`${isDarkMode && 'darkModeBackground'}`}
                    columns={columns}
                    // rowSelection={rowSelection}
                    dataSource={staffData}
                    pagination={false}
                />
            </div>
        </div>
    );
}
export default StaffTable
