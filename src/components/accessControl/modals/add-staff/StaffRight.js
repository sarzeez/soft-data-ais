import React, { useState } from 'react';
import { Select } from 'antd';
import { ip } from '../../../../ip';
import {useTranslation} from "react-i18next";

import axios from 'axios';
import { FiUpload } from 'react-icons/fi';
import { IoImageOutline } from 'react-icons/io5';
import loadingGif from '../../../../assets/gif/loading.gif';

import './staffRight.css';

const StaffRight = ({ data, setData, terminalIPList, staffTableIntialValues, imageState, setImageState }) => {

    const {t} = useTranslation();
    const [view, setView] = useState(null)
    const [requestedImage, setRequestedImage] = useState(null)
    const [accessDoors, setAccessDoors] = useState('')
    const [loading, setLoading] = useState(false)
    
    const upload = (e) => {
        setAccessDoors('')
        if(e.target.files && e.target.files[0]) {
            console.log('uploaded')
            setView(URL.createObjectURL(e.target.files[0]))
            setData({...data, image: e.target.files[0]})
            setImageState({
                initial: false,
                uploaded: true,
                requested: false
            })

        } else {
            setView(null)
            setImageState({
                initial: true,
                uploaded: false,
                requested: false
            })
        }
    }
    const onChangeImageSelect = (a) => {
        console.log(a)
        setAccessDoors(a)
    }


    const handleClickImageDownload = () => {
        setLoading(true)
        axios.post(`${ip}/api/terminal/capture/${accessDoors}`)
            .then(res => {
                setLoading(false)
                setRequestedImage(res.data)
                setData({...data, image: res.data})
                setImageState({
                    initial: false,
                    uploaded: false,
                    requested: true
                })
            })
            .catch(err => {
                //
                console.log(err.response)
                setLoading(false)
                setImageState({
                    initial: true,
                    uploaded: false,
                    requested: false
                })
            })
    }

    console.log(imageState)

    return (
        <div className="access_control_add_staff_modal_body_item_middle">
                <div className="access_control_add_staff_modal_body_item_middle_image">
                    
                    {/*{*/}
                    {/*    loading*/}
                    {/*    ? <img src={loadingGif} alt='loading'/>*/}
                    {/*    : (*/}
                    {/*        (!staffTableIntialValues.edit)*/}
                    {/*        ? (*/}
                    {/*            imageState.initial*/}
                    {/*            ? <img src={`${ip}/${staffTableIntialValues.image}`} alt='initial'/>*/}
                    {/*            : (*/}
                    {/*                imageState.uploaded*/}
                    {/*                ? <img src={view} alt='view'/>*/}
                    {/*                : <img src={`${ip}/sign_up_request/${requestedImage}`} alt='requested'/>*/}
                    {/*            )*/}
                    {/*        )*/}
                    {/*        : <IoImageOutline size={75} color='#8E8E8E'/>*/}
                    {/*    )*/}
                    {/*}*/}
                    
                    {
                        loading
                        ? <img src={loadingGif} alt='loading'/>
                        : (
                            staffTableIntialValues.edit
                                ? (imageState.initial
                                    ? <img src={`${ip}/${staffTableIntialValues.image}`} alt='initial'/>
                                    : (imageState.uploaded
                                        ? <img src={view} alt='view'/>
                                        : <img src={`${ip}/sign_up_request/${requestedImage}`} alt='requested'/>)
                                    )
                                : (
                                    imageState.initial
                                    ?  <IoImageOutline size={75} color='#8E8E8E'/>
                                    : (imageState.uploaded
                                        ? <img src={view} alt='view'/>
                                        : <img src={`${ip}/sign_up_request/${requestedImage}`} alt='requested'/>)
                                )
                            )
                    }
                        
                </div>
                <label htmlFor='access_control_staff_image' className='access_control_add_staff_modal_body_item_middle_upload'>
                    <FiUpload size={18} style={{marginRight: '7px'}}/>
                    {t("Rasm yuklash")}
                    <input onChange={upload} name='image' type="file" id="access_control_staff_image" style={{display: 'none'}} />
                </label>
                <div className='access_control_add_staff_modal_body_item_middle_download_wrapper'>
                    <Select
                        size="large"
                        value={accessDoors}
                        onChange={onChangeImageSelect}
                        placeholder={t("Tanlash")}
                    >
                        <Select.Option value="">{t("Tanlash")}</Select.Option>
                        {
                            terminalIPList.map((item, index) => (
                                <Select.Option key = {index} value={item.value}>{item.label}</Select.Option>
                            ))
                        }
                    </Select>
                    <button
                        type='button'
                        className='access_control_add_staff_modal_body_item_middle_download'
                        style={{cursor: `${accessDoors === '' ? 'not-allowed' : 'pointer'}`,
                            color: `${accessDoors === '' ? '#000':'#fff'}`,
                            backgroundColor: `${accessDoors === '' ? '#bebebe':'#29B85D'}`
                    }}
                        onClick={handleClickImageDownload}
                        disabled={accessDoors === '' ? true : false}
                    >
                        {t("Rasm olish")}
                    </button>
                </div>
        </div>
    )
};

export default StaffRight;
