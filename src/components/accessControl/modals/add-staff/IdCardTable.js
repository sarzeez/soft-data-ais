import React from 'react';
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
    title: 'Turi',
    dataIndex: 'type',
    align: 'center'
  },
  {
    title: 'Karta raqami',
    dataIndex: 'id',
    align: 'center'
  },
];


const IdCardTable = ({data, setSelectedItems}) => {

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
          // style={{minHeight: '140px'}}
          scroll={{ y: 105 }}
        />
    )
}

export default IdCardTable