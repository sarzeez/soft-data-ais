import React from 'react';
import { Table, Image  } from 'antd';
import { useSelector } from "react-redux";

import { AiOutlineUser } from 'react-icons/ai'

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
            <div className='table_user_cell'>
                <Image
                    width={40}
                    style={{borderRadius: '20px', marginRight: '5px', maxWidth: '40px', maxHeight: '40px'}}
                    src={`${ip}/${record.user_id}.jpg`}
                    preview = {{
                        src: `${ip}/api/get_history/${record.id}/img`,
                        mask: (
                            <AiOutlineUser size={20} />
                        ),
                        maskClassName: 'customize-mask',
                    }}
                />
                <p>{record.fullname}</p>
            </div>
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
