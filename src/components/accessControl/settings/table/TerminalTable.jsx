import React, {useState} from 'react';
import { Table  } from 'antd';
import { useSelector } from "react-redux";
import { RiEditLine } from 'react-icons/ri'

import 'antd/dist/antd.css';
import {useTranslation} from "react-i18next";

const auth_type = {
    uz: ['Yuz', 'Barmoq izi', 'ID karta'],
    ru: ['Лицо', 'Отпечаток пальца', 'ID карта'],
    en: ['Face', 'Fingerprint', 'ID card']
}

const TerminalTable = (props) => {
    const {
        terminalData,
        setDeleteTerminal ,
        addNewTerminal,
    } = props;

    const {t} = useTranslation()
    const isDarkMode = useSelector(state => state.theme.theme_data)

    const [state, setState] = useState({selectedRowKeys: []})
    const onSelectChange = (selectedRowKeys, a) => {
        setState({ selectedRowKeys })
        setDeleteTerminal(a)
    };

    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const columnsUz = [
        {
            title: t('T/r'),
            dataIndex: 'key',
            align: 'center'
        },
        {
            title: t('Eshik nomi'),
            dataIndex: 'door_name',
            align: 'center'
        },
        {
            title: t("Yo'nalishi"),
            dataIndex: 'direction',
            align: 'center'
        },
        {
            title: t('Autentifikatsiya turi'),
            dataIndex: 'auth_type',
            align: 'center',
            render: (text, record) => record.auth_type.map(item => auth_type.uz[item]).join(', ')
        },
        {
            title: t('Terminal IP manzili'),
            dataIndex: 'ip_address',
            align: 'center'
        },
        {
            title: t('Terminal turi'),
            dataIndex: 'type',
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
            title: t("O'rnatilgan vaqti"),
            dataIndex: 'created_time',
            align: 'center'
        },
        {
            title: t('Tahrir'),
            dataIndex: '',
            render: (text, record) => (
                <div onClick={()=> addNewTerminal(text, record)} className='edit_button'>
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
                columns={columnsUz}
                dataSource={terminalData}
                pagination={false}
            />
        );
}
export default TerminalTable
