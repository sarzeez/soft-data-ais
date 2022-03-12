import React from 'react';
import FingerTable from "./FingerTable";
import finger from '../../../../images/finger.svg';

import './right.css'

const RightBottom = ({ setIsOpenAddFingerprint }) => {

    const [selectedItems, setSelectedItems] = React.useState([])
    const [data, setData] = React.useState([])

    const handleDeleteTerminal = () => {
        const selectedItemsKey = selectedItems.map(item => item.key)
        const new_data = data.filter((item) => !selectedItemsKey.includes(item.key))
        setData(new_data)
    }

    return (
        <div className='access_control_add_staff_modal_body_item_right'>
            <FingerTable
                data = {data}
                setSelectedItems = {setSelectedItems}
            />
            <div className='access_control_add_staff_modal_body_item_right_buttons'>
                <button onClick={() => setIsOpenAddFingerprint(true)} type='button'>
                    <img style={{marginRight:8}} src={finger} alt=""/>
                    Qo’shish
                </button>
                <button onClick={handleDeleteTerminal} type='button'>O’chirish</button>
            </div>

        </div>
    )
};

export default RightBottom;