import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Tartib raqami',
        dataIndex: 'orderNumber',
    },
    {
        title: 'Turi',
        dataIndex: 'type',
    },
    {
        title: 'Karta raqami',
        dataIndex: 'cartNumber',
    },
];
const data = [
    {
        key: '1',
        orderNumber: 1,
        type: 'Mifare',
        cartNumber: '0014401468',
    },
    {
        key: '2',
        orderNumber: 2,
        type: 'Mifare',
        cartNumber: '0014401468',
    },
    {
        key: '3',
        orderNumber: 3,
        type: 'Mifare',
        cartNumber: '0014401468',
    },

];

function AddUserTable(props) {
    return (
        <div>
            <Table columns={columns} dataSource={data} size="middle" bordered />
        </div>
    );
}

export default AddUserTable;