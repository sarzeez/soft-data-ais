import React from 'react'
import { Table } from 'antd';
import './right.css';

const columns = [
    {
        title: 'T/r',
        dataIndex: 'key',
        width: 60,
        align: 'center'
    },
    {
        title: 'Turi',
        dataIndex: 'type',
        align: 'center'
    },
];


const FingerTable = ({data, setSelectedItems}) => {

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
            dataSource={data}
            pagination={false}
            style={{minHeight: '190px'}}
            scroll={{ y: 90 }}
        />
    )
}

export default FingerTable