import {useTranslation} from "react-i18next";
import React from 'react'
import { Table } from 'antd';
import './staffMiddle.css';


const FingerTable = ({fingerPrint, setSelectedItems,}) => {
    // console.log(staffTableIntialValues)
    const {t} = useTranslation()
    const [state, setState] = React.useState({selectedRowKeys: []})
    const onSelectChange = (selectedRowKeys, a) => {
        setState({ selectedRowKeys })
        setSelectedItems(a)
    };

    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    const columns = [
        {
            title: t('T/r'),
            dataIndex: 'key',
            width: 60,
            align: 'center'
        },
        {
            title: t('Nomi'),
            dataIndex: 'name',
            align: 'center'
        },
    ];

    return (
        <Table
            columns={columns}
            rowSelection={rowSelection}
            dataSource={fingerPrint }
            pagination={false}
            style={{minHeight: '170px'}}
            scroll={{ y: 129 }}
        />
    )
}

export default FingerTable