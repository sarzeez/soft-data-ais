import React, {useState} from 'react';
import { Table  } from 'antd';
import { useSelector } from "react-redux";
import {RiEditLine} from "react-icons/ri";
import {useTranslation} from "react-i18next";
import 'antd/dist/antd.css';


const CameraTable = (props) => {
    const {
        cameraData,
        setIsOpenAddCamera,
        setDeleteCamera,
        setCameraInitialValues
    } = props;

    const {t} = useTranslation()
    const lang = localStorage.getItem('i18nextLng');
    const isDarkMode = useSelector(state => state.theme.theme_data)
    cameraData.forEach(e => {
        e.name = e[`name_${lang}`];
        e.group_name = e[`group_name_${lang}`];
    })

    const [state, setState] = useState({selectedRowKeys: []})

    const onSelectChange = (selectedRowKeys, a) => {
        setState({ selectedRowKeys })
        setDeleteCamera(a.map(item => item.id));
    };

    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const editCamera = (value, record) => {
        setCameraInitialValues({
            ...value,
            edit: true
        })
        setIsOpenAddCamera(true)
    }
    


    const columns = [
        {
            title: t('T/r'),
            dataIndex: 'key',
            align: 'center'
        },
        {
            title: t('Kamera nomi'),
            dataIndex: 'name',
            align: 'center'
        },
        {
            title: t("Kamera turi"),
            dataIndex: 'type',
            align: 'center'
        },
        {
            title: t('Guruh'),
            dataIndex: `group_name`,
            align: 'center'
        },
        {
            title: t('IP manzili'),
            dataIndex: 'ip_address',
            align: 'center'
        },
        {
            title: t('Login'),
            dataIndex: 'username',
            align: 'center'
        },
        {
            title: t('Parol'),
            dataIndex: 'password',
            align: 'center'
        },
        {
            title: t('Amal'),
            dataIndex: '',
            render: (text, record) => (
                <div onClick={() => editCamera(text, record)} className='edit_button'>
                    <RiEditLine size = {22} color='#fff'/>
                </div>
            ),
            align: 'center'
        },
    ];


    return (
        <>
            <Table
                className={` ${isDarkMode && 'darkModeBackground'}`}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={cameraData}
                pagination={false}
            />

        </>
    );
}
export default CameraTable
