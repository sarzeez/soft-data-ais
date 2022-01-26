import React, { useState } from 'react';
import { Table, Space  } from 'antd';
import { useSelector } from "react-redux";
import { RiEditLine } from 'react-icons/ri'

import {ip} from '../../../../ip';

// import './acsessControl.css';
// import 'antd/dist/antd.css';

const columns = [
    {
        title: 'T/r',
        dataIndex: 'id',
        align: 'center'
    },
    {
        title: 'Eshik nomi',
        dataIndex: 'door_name',
        align: 'center'
    },
    {
        title: "Yo'nalishi",
        dataIndex: 'direction',
        align: 'center'
    },
    {
        title: 'Autentifikatsiya turi',
        dataIndex: 'authentication_type',
        align: 'center'
    },
    {
        title: 'Terminal IP manzili',
        dataIndex: 'termina_ip',
        align: 'center'
    },
    {
        title: 'Terminal turi',
        dataIndex: 'terminal_type',
        align: 'center'
    },
    {
        title: 'Login',
        dataIndex: 'login',
        align: 'center'
    },
    {
        title: 'Parol',
        dataIndex: 'password',
        align: 'center'
    },
    {
        title: "O'rnatilgan vaqti",
        dataIndex: 'setted_time',
        align: 'center'
    },
    {
        title: 'Tahrir',
        dataIndex: '',
        render: (text, record) => (
            <div className='edit_button'>
                <RiEditLine size = {22} color='#fff'/>
            </div>
          ),
        align: 'center'
    },
];

const mockData = [
    {
        id: 1,
        door_name: 'Door 1',
        direction: 'Anhor',
        authentication_type: 'Yuz, barmoq iz, ID karta',
        termina_ip: '192.168.1.1',
        terminal_type: 'type',
        login: 'admin',
        password: 1234,
        setted_time: '20.01.2022 13:47'
    },
    {
        id: 2,
        door_name: 'Door 3',
        direction: 'Makro',
        authentication_type: 'Yuz, barmoq iz, ID karta',
        termina_ip: '192.168.1.1',
        terminal_type: 'type',
        login: 'admin',
        password: 1234,
        setted_time: '20.01.2022 13:47'
    }
]



const TerminalTable = (props) => {
    const { accessTableData } = props;
    const isDarkMode = useSelector(state => state.theme.theme_data)
    const [state, setState] = useState({
        selectedRowKeys: []
    })

    const onSelectChange = (selectedRowKeys, a) => {
        setState({ selectedRowKeys })
    };

    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

        return (
            <Table
               className={` ${isDarkMode && 'darkModeBackground'}`}
                rowSelection={false}
                columns={columns}
                dataSource={mockData}
                pagination={false}
            />
        );
}
export default TerminalTable
