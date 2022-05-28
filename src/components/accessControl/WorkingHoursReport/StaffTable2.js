import React from 'react';
import { Table, Image  } from 'antd';
import moment from 'moment';
import { useSelector } from "react-redux";

import { AiOutlineUser } from 'react-icons/ai'

// import {ip} from '../../../../ip';
import {ip} from "../../../ip";
import {useTranslation} from "react-i18next";
import {RiEditLine} from "react-icons/ri";
import search from "../../../images/newimages/ishvaqti/Vector.png";

import 'antd/dist/antd.css';
import { Radio , Input , Button } from 'antd';
import { DatePicker, Space } from 'antd';
import "./working.css";

const StaffTable = (props) => {

    const [value, setValue] = React.useState(1);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    function onChangeee(date, dateString) {
        console.log(date, dateString);
    }

    const {
        staffData,
        rowSelection,
        setIsOpenAddStaff,
        setStaffTableIntialValues,
    } = props;
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
                    <Image
                        width={40}
                        style={{borderRadius: '20px', marginRight: '5px', maxWidth: '40px', maxHeight: '40px'}}
                        src={`${ip}/${record.image}`}
                        preview = {{
                            mask: (
                                <AiOutlineUser size={20} />
                            ),
                            maskClassName: 'customize-mask',
                        }}
                    />
                    <p>{record.fullname}</p>
                </div>
            ),
        },
        {
            title: t('Toifasi'),
            dataIndex: 'user_type',
            align: 'center'
        },
        {
            title: t('Lavozimi'),
            dataIndex: 'rank',
            align: 'center'
        },
        {
            title: t('Kechikkan vaqti'),
            // dataIndex: 'door_ip',
            align: 'center',
            render: (text, record) => (
                <div className='door_ip_length'>
                    <p>
                        {record.door_ip.length}
                    </p>
                    <div className='door_ip_length_hover'>
                        {record.door_ip.join(' ')}
                        <div className='door_ip_length_hover_rectangel'>

                        </div>
                    </div>
                </div>
            )
        },
        // {
        //     title: t('Ruxsat turi'),
        //     dataIndex: 'access_type',
        //     align: 'center'
        // },
        {
            title: t('Erta ketish vaqti'),
            // dataIndex: 'cards',
            align: 'center',
            render: (text, record) => (
                <div className='door_ip_length'>
                    {
                        record.cards.length>0?
                            <>
                                <p>
                                    {record.cards.length}
                                </p>
                                <div className='door_ip_length_hover'>
                                    {record.cards.map(e => e.id).join(`, `)}
                                    <div className='door_ip_length_hover_rectangel'></div>
                                </div>
                            </>: '—'
                    }
                </div>
            )
        },
        {
            title: t('Umumiy jarima vaqti'),
            // dataIndex: 'card_id',
            align: 'center',
            render: (text, record) => (
                <div className='door_ip_length'>
                    {record.fingerprint.length > 0 ?
                        <>
                            <p>
                                {record.fingerprint.length}
                            </p>
                            <div className='door_ip_length_hover'>
                                {record.fingerprint.map(e => e.name).join(`, `)}
                                <div className='door_ip_length_hover_rectangel'>

                                </div>
                            </div>
                        </>
                        : "—"
                    }
                </div>
            )
        },
        {
            title: t('Kelmagan kunlari'),
            dataIndex: 'valid_from_time',
            render: (text, record) => {
                return `${moment(record.valid_from_time).format('DD.MM.YYYY')} - ${moment(record.valid_to_time).format('DD.MM.YYYY')}`
            },
            align: 'center'
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
            <div className="staf-table-navbar">
                <div className="d-flex">
                    <Radio.Group onChange={onChange} value={value} className="radioCheck" >
                        <Radio value={1} className={value==1 ? "radio1 active" : "radio1"} >Hammasi</Radio>
                        <Radio value={2} className={value==2 ? "radio1 active" : "radio1"}>Hozirda mavjud hodimlar</Radio>
                        <Radio value={3} className={value==3 ? "radio1 active" : "radio1"}>Kelmaganlar</Radio>
                        <Radio value={4} className={value==4 ? "radio1 active" : "radio1"}>Kechikkanlar</Radio>
                        <Radio value={5} className={value==5 ? "radio1 active" : "radio1"}>Barvaqt ketganlar</Radio>
                    </Radio.Group>
                </div>
                <div className="d-flex align-items-center mt-3">
                    <div className="d-flex align-items-center mr-3">
                        <Input placeholder="Izlash" className="input"/>
                        <Button className="button ml-1"><img src={search}/></Button>
                    </div>
                    <Space direction="gorizontal">
                        <DatePicker className="selectedDate" onChange={onChangeee} />
                        <DatePicker className="selectedDate" onChange={onChangeee} />
                    </Space>
                </div>
            </div>
            <div className="tableAll">
                <Table
                    className={` ${isDarkMode && 'darkModeBackground'}`}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={staffData}
                    pagination={false}
                />
            </div>

        </div>
    );
}
export default StaffTable
