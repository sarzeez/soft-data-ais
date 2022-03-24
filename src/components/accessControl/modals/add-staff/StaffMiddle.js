import React from 'react';
import IdCardTable from './IdCardTable';

import './staffMiddle.css'
import IdCardModal from "../add-terminal/IdCardModal";

const StaffMiddle = (props) => {
   const {
       setIsOpenAddTerminal,
       isOpenAddTerminal
   }=props


    const [selectedItems, setSelectedItems] = React.useState([]);
    const [data, setData] = React.useState([]);

    const handleDeleteTerminal = () => {
        const selectedItemsKey = selectedItems.map(item => item.key)
        const new_data = data.filter((item) => !selectedItemsKey.includes(item.key))
        setData(new_data)
    }

    return (
       <>
           <IdCardModal
               data={data}
               setData={setData}
               isOpenAddTerminal={isOpenAddTerminal}
               setIsOpenAddTerminal={setIsOpenAddTerminal}
           />

           <div className='access_control_add_staff_modal_body_item_right'>
               <IdCardTable
                   data = {data}
                   setSelectedItems = {setSelectedItems}
               />
               <div className='access_control_add_staff_modal_body_item_right_buttons'>
                   <button onClick={() => setIsOpenAddTerminal(true)} type='button'>ID karta qo’shish</button>
                   <button onClick={handleDeleteTerminal} type='button'>O’chirish</button>
               </div>
           </div>
       </>
    )
};

export default StaffMiddle;
