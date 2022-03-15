import React from 'react'
import { Table } from 'antd';
import './staffMiddle.css';

const dataSource = [
    {
        key: '1',
        type : 'John Brown',
        card_number: 32,
    },
    {
        key: '1',
        type : 'John Brown',
        card_number: 32,
    },
    {
        key: '1',
        type : 'John Brown',
        card_number: 32,
    },
    {
        key: '1',
        type : 'John Brown',
        card_number: 32,
    },

];

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
  {
    title: 'Karta raqami',
    dataIndex: 'card_number',
    align: 'center'
  },
];


const CardTable = ({data, setSelectedItems}) => {

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
          dataSource={dataSource}
          pagination={false}
          // style={{minHeight: '140px'}}
          scroll={{ y: 105 }}
        />
    )
}

export default CardTable