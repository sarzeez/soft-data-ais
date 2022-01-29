import React from 'react';
import CardTable from './CardTable';

import './right.css'

const Right = ({ setIsOpenAddTerminal }) => {
    return (
        <div className='access_control_add_staff_modal_body_item_right'>
            <CardTable />
            <div className='access_control_add_staff_modal_body_item_right_buttons'>
                <button onClick={() => setIsOpenAddTerminal(true)} type='button'>ID karta qo’shish</button>
                <button type='button'>O’chirish</button>
            </div>
            
        </div>
    )
};

export default Right;
