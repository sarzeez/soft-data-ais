import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import socketIOClient from "socket.io-client";
import {ip} from "../../../ip";
import axios from "axios";
import myImg from "../../../images/myImg.svg";
import moment from "moment";
import noIMG from "../../../images/noIMG.svg";
import recIcon from "../../../images/recognationIcon.svg";

import './onlineDoors.css';
import {useNavigate} from "react-router-dom";


const OnlineDoors = () => {

    const navigate = useNavigate()
    const isDarkMode = useSelector(state => state.theme.theme_data)
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)
    const [onlineImg, setOnlineImg] = useState(null);


    useEffect(() => {
        const socket = socketIOClient(ip);
        socket.on("terminal_guests", data => {
            setOnlineImg(data)
            // console.log(data)
        });
    }, []);

    const reject = () =>{
       setOnlineImg(null)
    }

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
        <div className="online_doors_content">
            <div className="face_control_search_header">
                <div className="content_top">
                    <p className={`Content_title ${isDarkMode && 'darkModeColor'}`}>Online boshqaruvi</p>
                </div>
            </div>

            <div className= {`online_doors_body ${isDarkMode && 'darkModeBackground'}`} >

                <div className="online_doors_info_content">

                        <div className={`online_doors_info_title ${isDarkMode && 'darkModeBackground'}`}>
                            <h3 className={`${isDarkMode && 'darkModeColor'}`}>Eshik 1</h3>
                        </div>

                    {
                        onlineImg
                            ?
                            <div className="overflov_img">
                                   <img className="doors_left_img" src={url} alt=""/>
                                <div className="doors_time_info">
                                    <h1 className="doors_time">{moment( onlineImg && onlineImg.guest_user && onlineImg.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>
                                </div>
                            </div>
                            : <img className="doors_left_default" src={myImg} alt="img"/>
                    }

                    {
                        onlineImg
                            ? (onlineImg.hasOwnProperty('user_in_db')
                                ?
                                    <div className="doors_right">
                                        <div className="box_right_top">
                                            <div className="right_top_info">
                                                <div className="doors_right_label">Ism</div>
                                                <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.fullname}</div>
                                                <div className="doors_right_label">Toifasi</div>
                                                <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.rank}</div>
                                            </div>
                                            <div className="img_box">
                                                    <img className="door_user_img" src={`${ip}/${onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.id}.jpg`} alt=""/>
                                            </div>
                                        </div>

                                        <div className="doors_right_label">Lavozimi</div>
                                        <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.user_type}</div>
                                        <div className="doors_right_label">Ruxsat turi</div>
                                        <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.access_type}</div>
                                    </div>
                                :
                                    <div className="doords_right_no" >
                                        <img className="doors_right_icon" src={recIcon} alt=""/>

                                        <h1 className="doots_right_title">Ma’lumot topilmadi</h1>
                                        <p className="doors_right_p">Ushbu shaxs ma’lumotlar bazasida aniqlanmadi</p>

                                        <div className="doors_buttons">
                                            <button style={{marginRight: 15}} className="recognation_btn_cancel" onClick={reject}>Bekor qilish</button>
                                            <button className="recognation_btn" onClick={openDoor}>Ruxsat berish</button>
                                        </div>
                                    </div>
                            )
                            :
                                <div className="doors_right">
                                    <div className="box_right_top">
                                        <div className="right_top_info">
                                            <div className="doors_right_label">Ism</div>
                                            <div className="doors_right_box"></div>
                                            <div className="doors_right_label">Toifasi</div>
                                            <div className="doors_right_box"></div>
                                        </div>
                                        <div className="img_box">
                                            <img className="no_my_img" src={noIMG} alt=""/>
                                        </div>
                                    </div>

                                    <div className="doors_right_label">Lavozimi</div>
                                    <div className="doors_right_box"></div>
                                    <div className="doors_right_label">Ruxsat turi</div>
                                    <div className="doors_right_box"></div>
                                </div>
                    }
                </div>



                <div className="online_doors_info_content">

                    <div className={`online_doors_info_title ${isDarkMode && 'darkModeBackground'}`}>
                        <h3 className={`${isDarkMode && 'darkModeColor'}`}>Eshik 1</h3>
                    </div>

                    {
                        onlineImg
                            ?
                            <div className="overflov_img">
                                <img className="doors_left_img" src={url} alt=""/>
                                <div className="doors_time_info">
                                    <h1 className="doors_time">{moment( onlineImg && onlineImg.guest_user && onlineImg.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>
                                </div>
                            </div>
                            : <img className="doors_left_default" src={myImg} alt="img"/>
                    }

                    {
                        onlineImg
                            ? (onlineImg.hasOwnProperty('user_in_db')
                                    ?
                                    <div className="doors_right">
                                        <div className="box_right_top">
                                            <div className="right_top_info">
                                                <div className="doors_right_label">Ism</div>
                                                <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.fullname}</div>
                                                <div className="doors_right_label">Toifasi</div>
                                                <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.rank}</div>
                                            </div>
                                            <div className="img_box">
                                                <img className="door_user_img" src={`${ip}/${onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.id}.jpg`} alt=""/>
                                            </div>
                                        </div>

                                        <div className="doors_right_label">Lavozimi</div>
                                        <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.user_type}</div>
                                        <div className="doors_right_label">Ruxsat turi</div>
                                        <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.access_type}</div>
                                    </div>
                                    :
                                    <div className="doords_right_no" >
                                        <img className="doors_right_icon" src={recIcon} alt=""/>

                                        <h1 className="doots_right_title">Ma’lumot topilmadi</h1>
                                        <p className="doors_right_p">Ushbu shaxs ma’lumotlar bazasida aniqlanmadi</p>

                                        <div className="doors_buttons">
                                            <button style={{marginRight: 15}} className="recognation_btn_cancel" onClick={reject}>Bekor qilish</button>
                                            <button className="recognation_btn" onClick={openDoor}>Ruxsat berish</button>
                                        </div>
                                    </div>
                            )
                            :
                            <div className="doors_right">
                                <div className="box_right_top">
                                    <div className="right_top_info">
                                        <div className="doors_right_label">Ism</div>
                                        <div className="doors_right_box"></div>
                                        <div className="doors_right_label">Toifasi</div>
                                        <div className="doors_right_box"></div>
                                    </div>
                                    <div className="img_box">
                                        <img className="no_my_img" src={noIMG} alt=""/>
                                    </div>
                                </div>

                                <div className="doors_right_label">Lavozimi</div>
                                <div className="doors_right_box"></div>
                                <div className="doors_right_label">Ruxsat turi</div>
                                <div className="doors_right_box"></div>
                            </div>
                    }
                </div>
                <div className="online_doors_info_content">

                    <div className={`online_doors_info_title ${isDarkMode && 'darkModeBackground'}`}>
                        <h3 className={`${isDarkMode && 'darkModeColor'}`}>Eshik 1</h3>
                    </div>

                    {
                        onlineImg
                            ?
                            <div className="overflov_img">
                                <img className="doors_left_img" src={url} alt=""/>
                                <div className="doors_time_info">
                                    <h1 className="doors_time">{moment( onlineImg && onlineImg.guest_user && onlineImg.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>
                                </div>
                            </div>
                            : <img className="doors_left_default" src={myImg} alt="img"/>
                    }

                    {
                        onlineImg
                            ? (onlineImg.hasOwnProperty('user_in_db')
                                    ?
                                    <div className="doors_right">
                                        <div className="box_right_top">
                                            <div className="right_top_info">
                                                <div className="doors_right_label">Ism</div>
                                                <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.fullname}</div>
                                                <div className="doors_right_label">Toifasi</div>
                                                <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.rank}</div>
                                            </div>
                                            <div className="img_box">
                                                <img className="door_user_img" src={`${ip}/${onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.id}.jpg`} alt=""/>
                                            </div>
                                        </div>

                                        <div className="doors_right_label">Lavozimi</div>
                                        <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.user_type}</div>
                                        <div className="doors_right_label">Ruxsat turi</div>
                                        <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.access_type}</div>
                                    </div>
                                    :
                                    <div className="doords_right_no" >
                                        <img className="doors_right_icon" src={recIcon} alt=""/>

                                        <h1 className="doots_right_title">Ma’lumot topilmadi</h1>
                                        <p className="doors_right_p">Ushbu shaxs ma’lumotlar bazasida aniqlanmadi</p>

                                        <div className="doors_buttons">
                                            <button style={{marginRight: 15}} className="recognation_btn_cancel" onClick={reject}>Bekor qilish</button>
                                            <button className="recognation_btn" onClick={openDoor}>Ruxsat berish</button>
                                        </div>
                                    </div>
                            )
                            :
                            <div className="doors_right">
                                <div className="box_right_top">
                                    <div className="right_top_info">
                                        <div className="doors_right_label">Ism</div>
                                        <div className="doors_right_box"></div>
                                        <div className="doors_right_label">Toifasi</div>
                                        <div className="doors_right_box"></div>
                                    </div>
                                    <div className="img_box">
                                        <img className="no_my_img" src={noIMG} alt=""/>
                                    </div>
                                </div>

                                <div className="doors_right_label">Lavozimi</div>
                                <div className="doors_right_box"></div>
                                <div className="doors_right_label">Ruxsat turi</div>
                                <div className="doors_right_box"></div>
                            </div>
                    }
                </div>
                <div className="online_doors_info_content">

                    <div className={`online_doors_info_title ${isDarkMode && 'darkModeBackground'}`}>
                        <h3 className={`${isDarkMode && 'darkModeColor'}`}>Eshik 1</h3>
                    </div>

                    {
                        onlineImg
                            ?
                            <div className="overflov_img">
                                <img className="doors_left_img" src={url} alt=""/>
                                <div className="doors_time_info">
                                    <h1 className="doors_time">{moment( onlineImg && onlineImg.guest_user && onlineImg.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>
                                </div>
                            </div>
                            : <img className="doors_left_default" src={myImg} alt="img"/>
                    }

                    {
                        onlineImg
                            ? (onlineImg.hasOwnProperty('user_in_db')
                                    ?
                                    <div className="doors_right">
                                        <div className="box_right_top">
                                            <div className="right_top_info">
                                                <div className="doors_right_label">Ism</div>
                                                <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.fullname}</div>
                                                <div className="doors_right_label">Toifasi</div>
                                                <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.rank}</div>
                                            </div>
                                            <div className="img_box">
                                                <img className="door_user_img" src={`${ip}/${onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.id}.jpg`} alt=""/>
                                            </div>
                                        </div>

                                        <div className="doors_right_label">Lavozimi</div>
                                        <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.user_type}</div>
                                        <div className="doors_right_label">Ruxsat turi</div>
                                        <div className="doors_right_box">{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.access_type}</div>
                                    </div>
                                    :
                                    <div className="doords_right_no" >
                                        <img className="doors_right_icon" src={recIcon} alt=""/>

                                        <h1 className="doots_right_title">Ma’lumot topilmadi</h1>
                                        <p className="doors_right_p">Ushbu shaxs ma’lumotlar bazasida aniqlanmadi</p>

                                        <div className="doors_buttons">
                                            <button style={{marginRight: 15}} className="recognation_btn_cancel" onClick={reject}>Bekor qilish</button>
                                            <button className="recognation_btn" onClick={openDoor}>Ruxsat berish</button>
                                        </div>
                                    </div>
                            )
                            :
                            <div className="doors_right">
                                <div className="box_right_top">
                                    <div className="right_top_info">
                                        <div className="doors_right_label">Ism</div>
                                        <div className="doors_right_box"></div>
                                        <div className="doors_right_label">Toifasi</div>
                                        <div className="doors_right_box"></div>
                                    </div>
                                    <div className="img_box">
                                        <img className="no_my_img" src={noIMG} alt=""/>
                                    </div>
                                </div>

                                <div className="doors_right_label">Lavozimi</div>
                                <div className="doors_right_box"></div>
                                <div className="doors_right_label">Ruxsat turi</div>
                                <div className="doors_right_box"></div>
                            </div>
                    }
                </div>


            </div>
        </div>
    );
};

export default OnlineDoors;





