import React from 'react';
import { Table } from 'antd';
import './staffMiddle.css';
import {useTranslation} from "react-i18next";



const IdCardTable = ({card, setSelectedItems }) => {

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
            title: t('Turi'),
            dataIndex: 'type',
            align: 'center'
        },
        {
            title: t('Karta raqami'),
            dataIndex: 'id',
            align: 'center'
        },
    ];

    return (
        <Table
          columns={columns}
          rowSelection={rowSelection}
          dataSource={card}
          pagination={false}
          style={{minHeight: '170px'}}
          scroll={{ y: 129 }}
        />
    )
}

export default IdCardTable