import React from 'react';
import FingerTable from "./FingerTable";
import finger from '../../../../images/finger.svg';

import './middleBottom.css';
import FingerprintModal from "../fingerprint/FingerprintModal";

const MiddleBottom = (props) => {

    const {
        isOpenAddFingerprint,
        setIsOpenAddFingerprint,
        terminalIPList,
        fingerPrint,
        setFingerPrint
    }=props

    const [selectedItems, setSelectedItems] = React.useState([]);

    const handleDeleteTerminal = () => {
        const selectedItemsKey = selectedItems.map(item => item.key)
        const new_data = fingerPrint.filter((item) => !selectedItemsKey.includes(item.key))
        setFingerPrint(new_data)
    }

    return (
        <>
            <FingerprintModal
                isOpenAddFingerprint={isOpenAddFingerprint}
                setIsOpenAddFingerprint={setIsOpenAddFingerprint}
                fingerPrint = {fingerPrint} setFingerPrint = {setFingerPrint}
                terminalIPList={terminalIPList}
            />
        <div className='access_control_add_staff_modal_body_item_fingerprint'>
            <FingerTable
                fingerPrint = {fingerPrint}
                setSelectedItems = {setSelectedItems}
            />
            <div className='access_control_add_staff_modal_body_item_fingerprint_buttons'>
                <button onClick={() => setIsOpenAddFingerprint(true)} type='button'>
                    <img style={{marginRight:8}} src={finger} alt=""/>
                    Qo’shish
                </button>
                <button onClick={handleDeleteTerminal} type='button'>O’chirish</button>
            </div>
        </div>
        </>
    )
};

export default MiddleBottom;