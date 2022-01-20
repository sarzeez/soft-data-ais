import React, { useState } from 'react';
import { Table, Space  } from 'antd';
import { useSelector } from "react-redux";

import {ip} from '../../../ip';

import './acsessControl.css';
import 'antd/dist/antd.css';

const columns = [
    {
        title: 'T/r',
        dataIndex: 'key',
    },
    {
        title: 'Ism',
        dataIndex: 'fullname',
        render: (text, record) => (
            <Space size="small">
                {

                }
                <img className="table_round_img" src={`${ip}/${record.user_id}.jpg`} alt = 'user'/>
                <td>{record.fullname}</td>
            </Space>
          ),
    },
    {
        title: 'Toifasi',
        dataIndex: 'user_type',
    },
    {
        title: 'Lavozimi',
        dataIndex: 'rank',
    },
    {
        title: 'Vaqt',
        dataIndex: 'created_time',
    },
    {
        title: 'Amaliyot',
        dataIndex: 'direction',
    },
    {
        title: 'Eshik',
        dataIndex: 'door_name',
    },
];

const AcsessTable = (props) => {
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
                rowSelection={rowSelection}
                columns={columns}
                dataSource={accessTableData}
                pagination={false}
            />
        );
}
export default AcsessTable
