import React, {useState} from 'react';
import { Table  } from 'antd';
import { useSelector } from "react-redux";
import {RiEditLine} from "react-icons/ri";

import 'antd/dist/antd.css';


const CameraTable = (props) => {
    const { cameraData, editCamera, setDeleteCamera } = props;
    const lang = localStorage.getItem('i18nextLng');
    const isDarkMode = useSelector(state => state.theme.theme_data)
    cameraData.forEach(e => {
        e.name = e[`name_${lang}`];
        e.group_name = e[`group_name_${lang}`];
    })

    const [state, setState] = useState({selectedRowKeys: []})

    const onSelectChange = (selectedRowKeys, a) => {
        setState({ selectedRowKeys })
        setDeleteCamera(a)
    };

    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

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
            dataIndex: `group_name`,
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
                <div onClick={editCamera} className='edit_button'>
                    <RiEditLine size = {22} color='#fff'/>
                </div>
            ),
            align: 'center'
        },
    ];


    return (
        <Table
            className={` ${isDarkMode && 'darkModeBackground'}`}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={cameraData}
            pagination={false}
        />
    );
}
export default CameraTable
