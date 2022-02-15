import React, {useState} from 'react';
import { Table  } from 'antd';
import { useSelector } from "react-redux";
import {RiEditLine} from "react-icons/ri";
import 'antd/dist/antd.css';

const AddNewGroupTable = (props) => {
    const {
        languageGroup,
        setDeleteGroup,
        setGroupInitialValues,
        setShow,
    } = props;

    console.log(languageGroup)
    const lang = localStorage.getItem('i18nextLng');
    const isDarkMode = useSelector(state => state.theme.theme_data);

    languageGroup.forEach(e => {
        e.name = e[`name_${lang}`];
    })

    const [state, setState] = useState({selectedRowKeys: []})

    const onSelectChange = (selectedRowKeys, a) => {
        setState({ selectedRowKeys })
        setDeleteGroup(a.map(item => item.id));
    };

    const { selectedRowKeys } = state;

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const editGroup = (value, record) => {
        setGroupInitialValues({
            ...value,
            edit: true
        })
        setShow(true)
    }



    const columns = [
        {
            title: 'Guruh',
            dataIndex: [`name_${lang}`],
            align: 'start'
        },

        {
            title: 'Amal',
            dataIndex: '',
            render: (text, record) => (
                <div onClick={() => editGroup(text, record)} className='edit_button'>
                    <RiEditLine size = {22} color='#fff'/>
                </div>
            ),
            align: 'center'
        },
    ];


    return (

        <>
            <Table
                className={` ${isDarkMode && 'darkModeBackground'}`}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={languageGroup}
                pagination={false}
            />

        </>

    );
}


export default AddNewGroupTable;