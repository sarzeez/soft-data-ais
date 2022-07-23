import React from 'react';
import { Table  } from 'antd';
import { useSelector } from "react-redux";
import { RiEditLine } from 'react-icons/ri'

import 'antd/dist/antd.css';
import {useTranslation} from "react-i18next";

// const auth_type = {
//     uz: ['', 'Yuz', 'Barmoq izi', 'ID karta', 'Yuz va Barmoq izi', 'Yuz yoki Barmoq izi', 'Yuz va ID karta', 'Yuz yoki ID karta', 'Barmoq izi va ID karta', 'Barmoq izi yoki ID karta', 'Yuz yoki Barmoq izi yoki ID karta'],
//     ru: ['Лицо', 'Отпечаток пальца', 'ID карта'],
//     en: ['Face', 'Fingerprint', 'ID card']
// }

const TerminalTable = (props) => {
    const {
        terminalData,
        setIsOpenAddTerminal,
        setTerminalTableIntialValues,
        rowSelection
    } = props;

    const {t} = useTranslation();
    const isDarkMode = useSelector(state => state.theme.theme_data);
    const lang = localStorage.getItem('i18nextLng');


    const editTerminal= ( value, record) =>{
        console.log(value)
        setTerminalTableIntialValues({
            ...value,
            edit: true
        })
        setIsOpenAddTerminal(true)
    }

    const columnsUz = [
        {
            title: t('T/r'),
            dataIndex: 'key',
            // align: 'center'
        },
        {
            title: t('Eshik nomi'),
            dataIndex: 'door_name',
            // align: 'center',
        },
        {
            title: t("Yo'nalishi"),
            dataIndex: 'direction',
            // align: 'center',
            render: (text, record) => (
                <div>
                    {record?.direction == 'Exit' ? t("Chiqish") : t("Kirish")}
                </div>
            )
        },
        {
            title: t('Autentifikatsiya turi'),
            dataIndex: 'auth_type',
            align: 'center',
            render: (text, record) => (
                <div>
                    {
                        record.auth_type ==1 ? t("Yuz"):
                            record.auth_type ==2 ? t("Barmoq izi"):
                                record.auth_type ==3 ? t("ID karta"):
                                    record.auth_type ==4 ? t("Yuz va Barmoq izi"):
                                        record.auth_type ==5 ? t("Yuz yoki Barmoq izi"):
                                            record.auth_type ==6 ? t("Yuz va ID karta"):
                                                record.auth_type ==7 ? t("Yuz yoki ID karta"):
                                                    record.auth_type ==8 ? t("Barmoq izi va ID karta"):
                                                        record.auth_type ==9 ? t("Barmoq izi yoki ID karta"):
                                                            record.auth_type ==10 ? t("Yuz yoki Barmoq izi yoki ID karta"): ""

                    }
                    {/*{auth_type[lang][record.auth_type]}*/}
                </div>
            )
        },
        {
            title: t('Terminal IP manzili'),
            dataIndex: 'ip_address',
            // align: 'center'
        },
        {
            title: t('Terminal turi'),
            dataIndex: 'type',
            // align: 'center',
        },
        {
            title: t('Login'),
            dataIndex: 'username',
            // align: 'center'
        },
        {
            title: t('Parol'),
            dataIndex: 'password',
            // align: 'center'
        },
        {
            title: t("O'rnatilgan vaqti"),
            dataIndex: 'created_time',
            // align: 'center'
        },
        {
            title: t('Tahrir'),
            dataIndex: '',
            render: (text, record) => (
                <div onClick={()=> editTerminal(text, record)} className='edit_button'>
                    <RiEditLine size = {22} />
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
