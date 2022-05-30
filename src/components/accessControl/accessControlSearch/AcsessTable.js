import React from 'react';
import { Table, Image  } from 'antd';
import { useSelector } from "react-redux";
import { AiOutlineUser } from 'react-icons/ai';
import {useTranslation} from "react-i18next";
import {ip} from '../../../ip';

import './acsessControl.css';
import 'antd/dist/antd.css';


const AcsessTable = (props) => {

    const { accessTableData } = props;
    // console.log(accessTableData)
    const {t} = useTranslation();

    const isDarkMode = useSelector(state => state.theme.theme_data)

    const columns = [
        {
            title: t('T/r'),
            dataIndex: 'key',
            align: 'center'
        },
        {
            title: t('Ism'),
            dataIndex: 'fullname',
            render: (text, record) => (
                <div className='table_user_cell'>
                    <Image
                        width={40}
                        style={{borderRadius: '20px', marginRight: '5px', maxWidth: '40px', maxHeight: '40px'}}
                        src= {`${ip}/${record.user_id}.jpg` }
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
            title: t('Toifasi'),
            dataIndex: 'user_type',
            align: 'center',
            render:(text, record)=>(
                <div>
                    {record?.user_type == 1 ? t("Xodim") :  t("Begona")}
                </div>
            )
        },
        {
            title: t('Lavozimi'),
            dataIndex: 'rank',
            align: 'center',
            render:(text, record)=>(
                <div>
                    {record.rank ==1 ? t('Oddiy xodim') :
                        record.rank ==2 ? t("Direktor") :
                            record.rank ==3 ? t("VIP"):
                                record.rank ==4 ? t("Mehmon"):
                                    record.rank == 5 ? "Bloklangan" : "-"

                    }
                </div>
            )
        },

        // {
        //     title: t('Toifasi'),
        //     dataIndex: 'user_type',
        //     align: 'center'
        // },
        // {
        //     title: t('Lavozimi'),
        //     dataIndex: 'rank',
        //     align: 'center'
        // },
        {
            title: t('Tasdiq turi'),
            dataIndex: 'auth_type',
            align: 'center',
            render:(text, record) =>(
                <div>
                    {record?.auth_type === 1 ? t("Yuz") :
                        record.auth_type === 2 ? t("Barmoq izi") :
                            record.auth_type === 3 ? t("ID karta") :
                                record.auth_type === 4 ? t("Yuz va Barmoq izi") :
                                    record.auth_type === 6 ? t("Yuz va ID karta") :
                                        record.auth_type === 8 ? t("Barmoq izi va ID karta") : ''
                    }
                </div>
            )
        },
        {
            title: t('Yo\'nalishi'),
            dataIndex: 'direction',
            align: 'center',
            render: (text, record) => (
                <div>
                    {record?.direction == 'Exit' ? t("Chiqdi") : t("Kirdi")}
                </div>
            )
        },
        {
            title: t('Vaqt'),
            dataIndex: 'created_time',
            align: 'center'
        },

        {
            title: t('Eshik'),
            dataIndex: 'door_name',
            align: 'center'
        },
    ];

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
