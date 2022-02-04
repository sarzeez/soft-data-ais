import React from 'react';
import { Table  } from 'antd';
import { useSelector } from "react-redux";

import 'antd/dist/antd.css';
import {AiOutlineDelete} from "react-icons/all";

const columns = [
    {
        title: 'T/r',
        dataIndex: 'key',
        align: 'center'
    },
    {
        title: 'Kamera nomi',
        dataIndex: 'name',
        align: 'center'
    },
    {
        title: "Kamera turi",
        dataIndex: 'type',
        align: 'center'
    },
    {
        title: 'Guruh',
        dataIndex: 'group_name',
        align: 'center'
    },
    {
        title: 'IP manzili',
        dataIndex: 'ip_address',
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
        title: 'Amal',
        dataIndex: '',
        render: () => (
            <div className='camera_delite_button'>
                <button className="camera_groups_item_button"><AiOutlineDelete style={{fontSize: '20px'}} /></button>
            </div>
        ),
        align: 'center'
    },
];

const CameraTable = (props) => {
    const { cameraData, handleDeleteGroupItem } = props;
    const isDarkMode = useSelector(state => state.theme.theme_data)


    return (
        <Table
            className={` ${isDarkMode && 'darkModeBackground'}`}
            rowSelection={false}
            columns={columns}
            dataSource={cameraData}
            pagination={false}
        />
    );
}
export default CameraTable
