import React, {useEffect, useState} from 'react';

import './onlineRecognation.css';
import {useSelector} from "react-redux";
import socketIOClient from 'socket.io-client';
import {ip} from "../../../ip";

import recIcon from "../../../images/recognationIcon.svg";
import myImg from '../../../images/myImg.svg';
import noIMG from '../../../images/noIMG.svg';
import moment from "moment";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const OnlineRecognation = () => {

    const navigate = useNavigate()
    const isDarkMode = useSelector(state => state.theme.theme_data)
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)
    const [onlineImg, setOnlineImg] = useState(true);


    useEffect(() => {
        const socket = socketIOClient(ip);
        socket.on("terminal_guests", data => {
            setOnlineImg(data)
            // console.log(data)
        });
    }, []);


    const openDoor =  () => {
        axios.get(`${ip}/api/terminal/open/${onlineImg && onlineImg.guest_user && onlineImg.guest_user.ip}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                //
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    useEffect(() => {
        if(!is_refresh_value) {
            navigate('/face-control-search')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const blob = new Blob([onlineImg && onlineImg.guest_user && onlineImg.guest_user.image]);
    const url = URL.createObjectURL(blob);

    return (
        <div className="online_recognation_content">
            <div className="face_control_search_header">
                <div className="content_top">
                    <p className={`Content_title ${isDarkMode && 'darkModeColor'}`}>RealTime</p>
                </div>
            </div>
            <div className= {`online_recognation_body ${isDarkMode && 'darkModeBackground'}`} >

                <div className={`online_recognation_left ${isDarkMode && 'darkModeColor'}`}>
                    <div className={`recognation_left_title ${isDarkMode && 'darkModeBackground'}`}>
                        <h3 className={`${isDarkMode && 'darkModeColor'}`}>Aniqlangan surat</h3>
                    </div>
                    <div className="recognation_img_content">
                        {
                            onlineImg && !onlineImg.guest_user ? <img className="recognation_img_default" src={myImg} alt="img"/>
                                : <div>
                                    <img className="recognation_img" src={url} alt=""/>
                                    <div className="img_time_info">
                                        <p className="img_time_title">Vaqt</p>
                                        <h1 className="img_time">{moment( onlineImg && onlineImg.guest_user && onlineImg.guest_user.created_time).format("DD.MM.YYYY - HH:mm:ss")}</h1>
                                    </div>
                                </div>
                        }
                    </div>
                </div>


                <div className="online_recognation_right">
                    {
                        onlineImg && !onlineImg.guest_user ?
                            <div className="recognation_right_yes">
                                <div className={`right_yes_title ${isDarkMode && 'darkModeBackground'}`}>
                                    <h3 className={`${isDarkMode && 'darkModeColor'}`}>Shaxsiy ma’lumotlar</h3>
                                </div>
                                <div className="recognation_right_yes_content">
                                    <div className="yes_content_left">
                                        <img className="my_img_no" src={noIMG} alt=""/>
                                    </div>

                                    <div className="yes_content_right">
                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_label`}>Ism</div>
                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_box`}>{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.fullname}</div>

                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_label`} >Toifasi</div>
                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_box` }>{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.rank}</div>

                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_label` }>Lavozimi</div>
                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_box` }>{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.user_type}</div>

                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_label`} >Eshiklar</div>
                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_box` }>{onlineImg && onlineImg.user_in_db && onlineImg.guest_user.ip}</div>

                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_label` }>Ruxsat turi</div>
                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_box` }>{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.access_type}</div>
                                    </div>
                                </div>
                            </div>
                            :
                        onlineImg && onlineImg.user_in_db ?
                            <div className="recognation_right_yes">
                                <div className={`right_yes_title ${isDarkMode && 'darkModeBackground'}`}>
                                    <h3 className={`${isDarkMode && 'darkModeColor'}`}>Shaxsiy ma’lumotlar</h3>
                                </div>
                                <div className="recognation_right_yes_content">
                                    <div className="yes_content_left">
                                        <img className="my_img" src={`${ip}/${onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.id}.jpg`} alt=""/>
                                    </div>

                                    <div className="yes_content_right">
                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_label`}>Ism</div>
                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_box`}>{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.fullname}</div>

                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_label`} >Toifasi</div>
                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_box` }>{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.rank}</div>

                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_label` }>Lavozimi</div>
                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_box` }>{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.user_type}</div>

                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_label`} >Eshiklar</div>
                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_box` }>{onlineImg && onlineImg.user_in_db && onlineImg.guest_user.ip}</div>

                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_label` }>Ruxsat turi</div>
                                        <div className={`${isDarkMode && 'darkModeColor'} yes_content_box` }>{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.access_type}</div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="recognation_right_no" >
                                <img className="recognation_right_icon" src={recIcon} alt=""/>

                                <h1 className="recognation_right_title">Ma’lumot topilmadi</h1>
                                <p className="recognation_right_p">Ushbu shaxs ma’lumotlar bazasida aniqlanmadi</p>

                                <div className="recognation_buttons">
                                    <button style={{marginRight: 15}} className="recognation_btn_cancel" >Bekor qilish</button>
                                    <button className="recognation_btn" onClick={openDoor}>Ruxsat berish</button>
                                </div>
                            </div>
                    }

                </div>

            </div>
        </div>
    );
};

export default OnlineRecognation;