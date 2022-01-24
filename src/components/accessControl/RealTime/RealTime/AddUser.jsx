import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import {DatePicker, Input, Select, } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import moment from "moment";
import { FiImage} from "react-icons/fi";
import uplodeicon from '../../../../images/uploadIcon.svg';
import AddUserTable from "./AddUserTable";
import AddIDcardModal from "./AddIDcardModal/AddIDcardModal";

import './addUser.css';
import {useNavigate} from "react-router-dom";


function AddUser(props) {

    const navigate = useNavigate()
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)
    const isDarkMode = useSelector(state => state.theme.theme_data)

    const [viewImage, setViewImage] = useState(false);
    // const [image, setImage] = useState(null);
    const [realimageFailed, setRealImageFailed] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);


    const handleUpdoadFileImage = e => {
        if(e.target.files && e.target.files[0]) {
            setViewImage(URL.createObjectURL(e.target.files[0]))
            // setImage(e.target.files[0])
            setRealImageFailed(false)
        }
        else {
            setViewImage(false)
        }
    }

    useEffect(() => {
        if(!is_refresh_value) {
            navigate('/face-control-search')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="real_time_content">
            <div className="add_user_title">
                <div className="content_top">
                    <p className={`Content_title ${isDarkMode && 'darkModeColor'}`}>Odam qo'shish</p>
                </div>
            </div>

            <div className={`real_time_body ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                <div className="realtime_left">
                    <div className={`realtime_left_title ${isDarkMode && 'darkModeCard'}`}>
                        <p className={`${isDarkMode && 'darkModeColor'}`}>Foydalanuvchi ma’lumotlari</p>
                    </div>

                    <div className="real_time_inline_inputs">
                        <div className="form_input_wrapper">
                            <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Ism</p>
                            <div className="input_wrapper">
                                <Input
                                    className={`left_input rt_search_inpur ${isDarkMode && 'darkModeColor'}`}
                                    type="text"
                                    size="large"
                                    placeholder="Kiriting"
                                />
                            </div>
                        </div>

                        <div className="form_input_wrapper">
                            <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Toifasi</p>
                            <div className="input_wrapper realtime_selectInput">
                                <Select
                                    className={`left_select ${isDarkMode && 'darkModeColor'}`}

                                    style={{width: "100%"}}
                                    size="large"
                                    defaultValue="all"
                                >
                                    <Select.Option value="all">Toifasi</Select.Option>
                                    <Select.Option value="1">Mehmon</Select.Option>
                                    <Select.Option value="2">Mijoz</Select.Option>
                                    <Select.Option value="3">Xodim</Select.Option>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="real_time_inline_inputs">
                        <div className="form_input_wrapper">
                            <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Lavozimi</p>
                            <div className="input_wrapper realtime_selectInput">
                                <Select
                                    className={`left_select ${isDarkMode && 'darkModeColor'}`}

                                    style={{width: "100%"}}
                                    size="large"
                                    defaultValue="all"
                                >
                                    <Select.Option value="all">Lavozimi</Select.Option>
                                    <Select.Option value="6">Begona</Select.Option>
                                    <Select.Option value="7">Oddiy xodim</Select.Option>
                                    <Select.Option value="8">Direktor</Select.Option>
                                    <Select.Option value="9">VIP</Select.Option>
                                </Select>
                            </div>
                        </div>

                        <div className="form_input_wrapper">
                            <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Eshiklar</p>
                            <div className="input_wrapper realtime_selectInput">
                                <Select
                                    className={`left_select ${isDarkMode && 'darkModeColor'}`}

                                    style={{width: "100%"}}
                                    size="large"
                                    defaultValue="all"
                                >
                                    <Select.Option value="all">Tanlash</Select.Option>
                                    <Select.Option value="6">1</Select.Option>
                                    <Select.Option value="7">2</Select.Option>
                                    <Select.Option value="8">3</Select.Option>
                                    <Select.Option value="9">4</Select.Option>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="real_time_inline_inputs">
                        <div className="form_input_wrapper">
                            <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Krishlar soni</p>
                            <div className="input_wrapper">
                                <Input
                                    className={`left_input rt_search_inpur ${isDarkMode && 'darkModeColor'}`}
                                    type="number"
                                    size="large"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <Checkbox className={`checkbox ${isDarkMode && 'darkModeColor'}`} >Cheklov</Checkbox>
                    </div>



                    <div className="form_input_wrapper">
                        <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Ruxsat turi</p>
                        <div className="input_wrapper realtime_selectInput">
                            <Select
                                className={`left_select ${isDarkMode && 'darkModeColor'}`}

                                style={{width: "100%"}}
                                size="large"
                                defaultValue="all"
                            >
                                <Select.Option value="all">Tanlash</Select.Option>
                                <Select.Option value="6">Yuz orqali</Select.Option>
                                <Select.Option value="7">ID karta orqali</Select.Option>
                                <Select.Option value="8">Yuz yoki ID karta orqali</Select.Option>
                                <Select.Option value="9">Yuz va ID karta orqali</Select.Option>
                            </Select>
                        </div>
                    </div>

                    <div className="form_input_wrapper">
                        <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Muddat:</p>
                        <div className="input_wrapper">
                            <DatePicker
                                className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                placeholder={`${moment(new Date()).format(
                                    "DD.MM.YYYY, 00:00:00"
                                )}`}
                                // onChange={onChangeDateFrom}
                                size="large"
                                style={{width: "100%"}}
                                showTime
                            />
                        </div>
                        <div className="input_wrapper" style={{marginTop: "15px"}}>
                            <DatePicker
                                className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                placeholder={`${moment(new Date()).format(
                                    "DD.MM.YYYY, 23:59:59"
                                )}`}
                                // onChange={onChangeDateTo}
                                size="large"
                                style={{width: "100%"}}
                                showTime
                            />
                        </div>
                    </div>
                </div>

                    <div className="realtime_middle">
                        <div className={`realtime_middle_title ${isDarkMode && 'darkModeCard'}`}>
                            <p className={` ${isDarkMode && 'darkModeColor'}`}>Yuzni aniqlash</p>
                        </div>

                           <div className="update_img">
                               <label htmlFor="staff-file">
                                   <div style={{borderColor: `${realimageFailed ? 'red' : ''}`, boxShadow: `${realimageFailed ? '0 0 0 2px rgba(255, 0, 0, 0.2)' : ''}`}} className = 'label-container'>
                                       {
                                           !viewImage
                                               ?   <>
                                                   <FiImage color="#C1C1C1" size={40} />
                                                  </>
                                               : <img src={viewImage} alt = 'asdf' />
                                       }
                                   </div>
                               </label>


                               <input name="image" id='staff-file' onChange={handleUpdoadFileImage} type="file" style={{display: 'none'}} />
                           </div>
                        <button  onChange={handleUpdoadFileImage} htmlFor='staff-file' className="realtime_button">
                            <img style={{marginRight: 5}} src={uplodeicon} alt=""/>
                            Rasmni yuklash
                        </button>
                    </div>


                <div className="realtime_right">
                    <div className={`realtime_right_title ${isDarkMode && 'darkModeCard'}`}>
                        <p className={` ${isDarkMode && 'darkModeColor'}`}>ID karta</p>
                    </div>
                  <div className="realtime_right_content">

                      <div className="realtime_table">
                          <AddUserTable isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
                          <AddIDcardModal />
                      </div>

                      <div className="realtime_right_bottom_buttons">
                          <button className="realtime_remove_btn">O’chirish</button>
                          <button className="realtime_add_btn">Qo’shish</button>
                      </div>

                  </div>
                </div>

            </div>
        </div>
    );
}

export default AddUser;