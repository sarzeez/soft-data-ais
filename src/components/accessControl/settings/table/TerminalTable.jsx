import React from 'react';
import { Table  } from 'antd';
import { useSelector } from "react-redux";
import { RiEditLine } from 'react-icons/ri'

import 'antd/dist/antd.css';

const columns = [
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
        align: 'center'
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
        // render: (text, record) => {
        //     return moment(record.created_time).format('DD.MM.YYYY, HH:mm:ss')
        // },
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
                columns={columns}
                dataSource={terminalData}
                pagination={false}
            />
        );
}
export default TerminalTable
