import React from 'react';
import IdCardTable from './IdCardTable';
import IdCardModal from "../add-IDCard/IdCardModal";

import './staffMiddle.css'

const StaffMiddle = (props) => {
   const {
       setIsOpenAddTerminal,
       isOpenAddTerminal,
       card,
       setCard,
       selectedCard,
       setSelectedCard,

   } = props

    const [selectedItems, setSelectedItems] = React.useState([]);

    const handleDeleteTerminal = () => {
        const selectedItemsKey = selectedItems.map(item => item.key)
        const new_data = card.filter((item) => !selectedItemsKey.includes(item.key))
        setCard(new_data)
    }

    return (
       <>
           <IdCardModal
               card={card}
               setCard={setCard}
               isOpenAddTerminal={isOpenAddTerminal}
               setIsOpenAddTerminal={setIsOpenAddTerminal}
               selectedCard={selectedCard}
               setSelectedCard={setSelectedCard}
           />

           <div className='access_control_add_staff_modal_body_item_right'>

                  <IdCardTable
                      card = {card}
                      setCard={setCard}
                      selectedCard={selectedCard}
                      setSelectedCard={setSelectedCard}
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
