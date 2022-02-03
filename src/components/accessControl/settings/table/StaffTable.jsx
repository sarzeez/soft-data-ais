import React, { useState } from 'react';
import { Table, Image  } from 'antd';
import moment from 'moment';
import { useSelector } from "react-redux";

import { AiOutlineUser } from 'react-icons/ai'

import {ip} from '../../../../ip';

const columns = [
    {
        title: 'T/r',
        dataIndex: 'key',
        align: 'center'
    },
    {
        title: 'Ism',
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
        title: 'Toifasi',
        dataIndex: 'user_type',
        align: 'center'
    },
    {
        title: 'Lavozimi',
        dataIndex: 'rank',
        align: 'center'
    },
    {
        title: 'Kirish eshiklari',
        // dataIndex: 'door_ip',
        align: 'center',
        render: (text, record) => (
            <div className='door_ip_length'>
                <p>
                    {record.door_ip.length}
                </p>
                <div className='door_ip_length_hover'>
                    {record.door_ip.join(', ')}
                    <div className='door_ip_length_hover_rectangel'>

                    </div>
                </div>
            </div>
        )
    },
    {
        title: 'Ruxsat turi',
        dataIndex: 'access_type',
        align: 'center'
    },
    {
        title: 'Cheklov',
        dataIndex: 'limit',
        align: 'center'
    },
    {
        title: 'ID karta turi',
        dataIndex: 'card_type',
        align: 'center'
    },
    {
        title: 'Karta raqami',
        dataIndex: 'card_id',
        align: 'center'
    },
    {
        title: 'Ruxsat etilgan muddat',
        dataIndex: 'valid_from_time',
        render: (text, record) => {
            return moment(record.valid_from_time).format('DD.MM.YYYY, HH:mm:ss')
        },
        align: 'center'
    },
    {
        title: 'Tahrir',
        dataIndex: '',
        align: 'center'
    },
];

const StaffTable = (props) => {
    const { staffData, setDeleteStaff } = props;

    const [state, setState] = useState({selectedRowKeys: []})
    const isDarkMode = useSelector(state => state.theme.theme_data)

    const onSelectChange = (selectedRowKeys, a) => {
        setState({ selectedRowKeys })
        setDeleteStaff(a)
    };

    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

        return (
            <Table
               className={` ${isDarkMode && 'darkModeBackground'}`}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={staffData}
                pagination={false}
            />
        );
}
export default StaffTable
