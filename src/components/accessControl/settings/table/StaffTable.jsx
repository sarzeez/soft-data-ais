import React from 'react';
import {Table, Image} from 'antd';
import {useSelector} from "react-redux";
import {AiOutlineUser} from 'react-icons/ai'
import {ip} from '../../../../ip';
import {useTranslation} from "react-i18next";
import {RiEditLine} from "react-icons/ri";
import moment from 'moment';



const StaffTable = (props) => {

    const {
        staffData,
        rowSelection,
        setIsOpenAddStaff,
        setStaffTableIntialValues,
        setCard,
        setFingerPrint
    } = props;
    const {t} = useTranslation()
    const isDarkMode = useSelector(state => state.theme.theme_data)
    const lang = localStorage.getItem('i18nextLng');

    const editAddStaff = (value, record) => {
        console.log(value)
        setCard(value.cards)
        setFingerPrint(value.fingerprint)
        const newDoorIP = value.door_ip.map(item => ({
            label: item.door_name,
            value: item.ip_address,
            key: item.ip_address,
        }))
        setStaffTableIntialValues({
            ...value,
            door_ip: [...newDoorIP],
            edit: true,
        })
        setIsOpenAddStaff(true)
    }

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
                        src={`${ip}/${record.image}`}
                        preview={{
                            mask: (
                                <AiOutlineUser size={20}/>
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
                    {record?.user_type === 1 ? t("Xodim") :  t("Begona")}
                </div>
            )
        },
        {
            title: t('Lavozimi'),
            dataIndex: 'rank',
            align: 'center',
            render:(text, record)=>(
                <div>
                    {record.rank ===1 ? t('Oddiy xodim') :
                        record.rank ===2 ? t("Direktor") :
                        record.rank ===3 ?t("VIP"):
                        record.rank ===4 ?t("Mehmon"): "Bloklangan"

                    }
                </div>
            )
        },
        {
            title: t('Kirish eshiklari'),
            // dataIndex: 'door_ip',
            align: 'center',
            render: (text, record) => (
                <div className='door_ip_length'>
                    <p>
                        {record.door_ip.length}
                    </p>

                    <div className='door_ip_length_hover'>
                        {record.door_ip.map(door => door.door_name).join(', ')}
                        <div className='door_ip_length_hover_rectangel'>

                        </div>
                    </div>

                    {/*<div className='door_ip_length_hover'>*/}
                    {/*    {record.door_ip.join(', ')}*/}
                    {/*    <div className='door_ip_length_hover_rectangel'>*/}

                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            )
        },
        {
            title: t('ID karta'),
            // dataIndex: 'cards',
            align: 'center',
            render: (text, record) => (
                <div className='door_ip_length'>
                    {
                        record.cards.length > 0 ?
                            <>
                                <p>
                                    {record.cards.length}
                                </p>
                                <div className='door_ip_length_hover'>
                                    {record.cards.map(e => e.id).join(`, `)}
                                    <div className='door_ip_length_hover_rectangel'></div>
                                </div>
                            </> : '—'
                    }
                </div>
            )
        },
        {
            title: t('Barmoq izi'),
            // dataIndex: 'card_id',
            align: 'center',
            render: (text, record) => (
                <div >
                    {record.fingerprint.length > 0 ?
                        <>
                            <p>
                                {record.fingerprint.length}
                            </p>
                            {/*<div className='door_ip_length_hover'>*/}
                            {/*    {record.fingerprint.map(e => e.name).join(`, `)}*/}
                            {/*    <div className='door_ip_length_hover_rectangel'>*/}

                            {/*    </div>*/}
                            {/*</div>*/}
                        </>
                        : "—"
                    }
                </div>
            )
        },
        {
            title: t('Ruxsat etilgan muddat'),
            dataIndex: 'valid_from_time',
            render: (text, record) => {
                return `${moment(record.valid_from_time).format('DD.MM.YYYY')} - ${moment(record.valid_to_time).format('DD.MM.YYYY')}`
            },
            align: 'center'
        },
        {
            title: t('Tahrir'),
            dataIndex: '',
            render: (text, record) => (
                <div onClick={() => editAddStaff(text, record)} className='edit_button'>
                    <RiEditLine size={22} color='#fff'/>
                </div>
            ),
            align: 'center'
        },
    ];

    return (
        <Table
            className={` ${isDarkMode && 'darkModeBackground'}`}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={staffData}
            pagination={false}
        />
    );
}
export default StaffTable
