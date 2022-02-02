import React from 'react';
import { Table  } from 'antd';
import { useSelector } from "react-redux";
import { RiEditLine } from 'react-icons/ri'

import 'antd/dist/antd.css';

const columnsUz = [
    {
        title: 'T/r',
        dataIndex: 'key',
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
        dataIndex: 'auth_type',
        align: 'center',
        render: (text, record) => record.auth_type.map(item => auth_type.uz[item]).join(', ')
    },
    {
        title: 'Terminal IP manzili',
        dataIndex: 'ip_address',
        align: 'center'
    },
    {
        title: 'Terminal turi',
        dataIndex: 'type',
        align: 'center'
    },
    {
        title: 'Login',
        dataIndex: 'username',
        align: 'center'
    },
    {
        title: 'Parol',
        dataIndex: 'password',
        align: 'center'
    },
    {
        title: "O'rnatilgan vaqti",
        dataIndex: 'created_time',
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

const auth_type = {
    uz: ['Yuz', 'Barmoq izi', 'ID karta'],
    ru: ['Лицо', 'Отпечаток пальца', 'ID карта'],
    en: ['Face', 'Fingerprint', 'ID card']
}

const TerminalTable = (props) => {
    const { terminalData } = props;
    const isDarkMode = useSelector(state => state.theme.theme_data)
    // const [state, setState] = useState({
    //     selectedRowKeys: []
    // })

    // const onSelectChange = (selectedRowKeys, a) => {
    //     setState({ selectedRowKeys })
    // };

    // const { selectedRowKeys } = state;
    // const rowSelection = {
    //     selectedRowKeys,
    //     onChange: onSelectChange,
    // }

        return (
            <Table
               className={` ${isDarkMode && 'darkModeBackground'}`}
                rowSelection={false}
                columns={columnsUz}
                dataSource={terminalData}
                pagination={false}
            />
        );
}
export default TerminalTable
