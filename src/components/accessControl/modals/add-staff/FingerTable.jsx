import React from 'react'
import { Table } from 'antd';
import './staffMiddle.css';

const columns = [
    {
        title: 'T/r',
        dataIndex: 'key',
        width: 60,
        align: 'center'
    },
    {
        title: 'Nomi',
        dataIndex: 'name',
        align: 'center'
    },
];

const FingerTable = ({fingerPrint, setSelectedItems,}) => {
    // console.log(staffTableIntialValues)
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