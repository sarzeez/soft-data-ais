import React, {useState} from 'react';
import {Table} from "antd";
import {RiEditLine} from "react-icons/ri";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const BlacklistTable = () => {


    const {t} = useTranslation();
    const isDarkMode = useSelector(state => state.theme.theme_data);

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
        },
        {
            key: '2',
            name: 'John',
        },
    ];

    const [state, setState] = useState({selectedRowKeys: []})

    const onSelectChange = (selectedRowKeys, a) => {
        setState({ selectedRowKeys })
        // setDeleteGroup(a.map(item => item.id));
    };

    const { selectedRowKeys } = state;

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }



    const columns = [

        {
            title: t('Ism'),
            dataIndex: 'name',
            align: 'start'
        },

        {
            title: t('Tahrir'),
            dataIndex: '',
            render: (text, record) => (
                <div  className='edit_button'>
                    <RiEditLine size = {22} color='#fff'/>
                </div>
            ),
            align: 'center'
        },
    ];

    return (
        <div>
            <Table
                className={` ${isDarkMode && 'darkModeBackground'}`}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        </div>
    );
};

export default BlacklistTable;