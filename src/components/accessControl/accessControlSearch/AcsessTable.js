import React from 'react';
import { Table, Space  } from 'antd';
import { useSelector } from "react-redux";

import {ip} from '../../../ip';

import './acsessControl.css';
import 'antd/dist/antd.css';

const columns = [
    {
        title: 'T/r',
        dataIndex: 'key',
        align: 'center'
    },
    {
        title: 'Ism',
        dataIndex: 'fullname',
        render: (text, record) => (
            <Space size="small">
                {

                }
                <div className='table_item_image_wrapper'>
                    <img className="table_round_img" src={`${ip}/${record.user_id}.jpg`} alt = 'user'/>
                </div>
                <td>{record.fullname}</td>
            </Space>
          ),
    },
    {
        title: 'Toifasi',
        dataIndex: 'user_type',
        align: 'center'
    },
    {
        title: 'Lavozimi',
        dataIndex: 'rank',
        align: 'center'
    },
    {
        title: 'Vaqt',
        dataIndex: 'created_time',
        align: 'center'
    },
    {
        title: 'Amaliyot',
        dataIndex: 'direction',
        align: 'center'
    },
    {
        title: 'Eshik',
        dataIndex: 'door_name',
        align: 'center'
    },
];

const AcsessTable = (props) => {
    const { accessTableData } = props;
    const isDarkMode = useSelector(state => state.theme.theme_data)

    // const [state, setState] = useState({
    //     selectedRowKeys: []
    // })

    // const onSelectChange = (selectedRowKeys, a) => {
    //     setState({ selectedRowKeys })
    // };

    // const { selectedRowKeys } = state;
    // const rowSelection = {
    //     selectedRowKeys,
    //     onChange: onSelectChange,
    // }

        return (
            <Table
               className={` ${isDarkMode && 'darkModeBackground'}`}
                rowSelection={false}
                columns={columns}
                dataSource={accessTableData}
                pagination={false}
            />
        );
}
export default AcsessTable
