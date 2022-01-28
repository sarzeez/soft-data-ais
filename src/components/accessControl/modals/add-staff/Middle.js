import React, { useState } from 'react';

import { FiUpload } from 'react-icons/fi'
import { IoImageOutline } from 'react-icons/io5'

import './middle.css'

const Middle = ({ setData }) => {

    const [view, setView] = useState(null)

    const upload = (e) => {
        if(e.target.files && e.target.files[0]) {
            setView(URL.createObjectURL(e.target.files[0]))
            setData(e.target.files[0])
        } else {
            setView(null)
        }
    }

    return (
        <div className="access_control_add_staff_modal_body_item_middle">
                <div className="access_control_add_staff_modal_body_item_middle_image">
                    {
                        view
                            ? <img src = {view} alt = 'view'/>
                            : <IoImageOutline size={75} color='#8E8E8E'/>
                    }
                </div>
                <label htmlFor='access_control_staff_image' className='access_control_add_staff_modal_body_item_middle_upload'>
                    <FiUpload size={18} style={{marginRight: '7px'}}/>
                    Rasm yuklash
                    <input onChange={upload} type="file" id="access_control_staff_image" style={{display: 'none'}} />
                </label>
                <button type='button' className='access_control_add_staff_modal_body_item_middle_download'>Rasm olish</button>
        </div>
    )
};

export default Middle;
