import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ip} from "../../../ip";
import {useTranslation} from "react-i18next";
import socketIOClient from "socket.io-client";
import axios from "axios";

import myImg from "../../../images/myImg.svg";
import noIMG from "../../../images/noIMG.svg";
import recIcon from "../../../images/recognationIcon.svg";
import warning from "../../../images/warning.svg";
import doorNext from "../../../images/doorNext.svg";

import './onlineDoors.css';


const OnlineDoors = () => {

    const {t} = useTranslation()
    const navigate = useNavigate()
    const isDarkMode = useSelector(state => state.theme.theme_data)
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)
    const [onlineImg, setOnlineImg] = useState(null);
    const [onlineImg2, setOnlineImg2] = useState(null);
    const [onlineImg3, setOnlineImg3] = useState(null);
    const [onlineImg4, setOnlineImg4] = useState(null);

    const listenDoorByIp = () => {
        const socket = socketIOClient(ip);
        socket.on("terminal1", data => {
            setOnlineImg(data)
            // console.log(data)
        });
    }
    const listenDoorByIp2 = () => {
        const socket = socketIOClient(ip);
        socket.on("terminal2", data => {
            setOnlineImg2(data)
            // console.log(data)
        });
    }

    const listenDoorByIp3 = () => {
        const socket = socketIOClient(ip);
        socket.on("terminal3", data => {
            setOnlineImg3(data)
            // console.log(data)
        });
    }

    const listenDoorByIp4 = () => {
        const socket = socketIOClient(ip);
        socket.on("terminal4", data => {
            setOnlineImg4(data)
            // console.log(data)
        });
    }

    useEffect(() => listenDoorByIp(), []);
    useEffect(() => listenDoorByIp2(), []);
    useEffect(() => listenDoorByIp3(), []);
    useEffect(() => listenDoorByIp4(), []);

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

    const blob2 = new Blob([onlineImg2 && onlineImg2.guest_user && onlineImg2.guest_user.image]);
    const url2 = URL.createObjectURL(blob2);

    const blob3 = new Blob([onlineImg3 && onlineImg3.guest_user && onlineImg3.guest_user.image]);
    const url3 = URL.createObjectURL(blob3);

    const blob4 = new Blob([onlineImg4 && onlineImg4.guest_user && onlineImg4.guest_user.image]);
    const url4 = URL.createObjectURL(blob4);

    return (
        <div className="online_doors_content">
            <div className="online_doors_title">
                <div className="content_top">
                    <p className={`Content_title ${isDarkMode && 'darkModeColor'}`}>{t("Eshiklar boshqaruvi")}</p>
                </div>
            </div>

            <div className= {`online_doors_body ${isDarkMode && 'darkModeBackground'}`} >

                <div className="online_doors_info_content">

                    <div className={`online_doors_info_title ${isDarkMode && 'darkModeBackground'}`}>
                        <h3 className={`${isDarkMode && 'darkModeColor'}`}>SoftData</h3>
                    </div>
                    <div className="door_img_box">
                        {
                            onlineImg
                                ?
                                <div className="overflov_img">
                                    <img className="doors_left_img" src={url} alt=""/>
                                </div>
                                : <img className="doors_left_default" src={myImg} alt="img"/>
                        }
                    </div>

                    {
                        onlineImg
                            ? (onlineImg.hasOwnProperty('user_in_db')
                                    ?
                                    <div className="doors_right">
                                        <div className="doors_time_info">
                                            <p className="doors_time">08.01.2022 - 08:45:47</p>
                                            {/*<h1 className="doors_time">{moment( onlineImg && onlineImg.guest_user && onlineImg.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                        </div>
                                        <div className="box_right_top">
                                            <div className="right_top_info">
                                                <div className="label_box">
                                                    <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ism")}:</div>
                                                    <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.fullname}</div>
                                                </div>
                                                <div className="label_box">
                                                    <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Toifasi")}:</div>
                                                    <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg?.user_in_db?.user_type == 1 ? t("Xodim") : onlineImg?.user_in_db?.user_type == 2 ? t("Mehmon") : t("Begona")}</div>
                                                </div>
                                                <div className="label_box">
                                                    <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Lavozimi")}:</div>
                                                    <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg?.user_in_db?.rank ==1 ? t("Oddiy xodim"): onlineImg?.user_in_db?.rank ==2 ? t("Direktor") : onlineImg?.user_in_db?.rank ==3 ? t("VIP"): ''}</div>
                                                </div>
                                            </div>
                                            <div className="img_box">
                                                <img className="door_user_img" src={`${ip}/${onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.id}.jpg`} alt="img"/>
                                            </div>
                                        </div>
                                        <div className="label_box">
                                            <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:</div>
                                            <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg?.user_in_db?.access_type}</div>
                                        </div>
                                        <div className="limit_info">
                                            <div className="limit_info_top">
                                                <img className="limit_info_top_img" src={warning} alt=""/>
                                                <h1 className="limit_top_title" >{t("Xodimning kirish muddati tugagan!")}</h1>
                                            </div>
                                            <p className="limit_middle_title">{t("Ruxsat etilgan muddatni uzaytirish uchun")}</p>
                                            <div className="limit_info_bottom">
                                                <h3 className="limit_bottom_title">{t("Sozlamalarga o’ting")}</h3>
                                                <img className="limit_bottom_title_img" src={doorNext} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="doords_right_no" >
                                        <div className="doors_time_info">
                                            <p className="doors_time">08.01.2022 - 08:45:47</p>
                                            {/*<h1 className="doors_time">{moment( onlineImg && onlineImg.guest_user && onlineImg.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                        </div>
                                        <div className="doords_right_not_allowed">
                                            <img className="doors_right_icon" src={recIcon} alt=""/>

                                            <h1 className={`not_allowed_title ${isDarkMode && 'darkModeColor'}`}>{t("Ma’lumot topilmadi")}</h1>
                                            <p className={`not_allowed_text ${isDarkMode && 'darkModeColor'}`}>{t("Ushbu shaxs ma’lumotlar bazasida aniqlanmadi")}</p>

                                            <div className="not_allowed_buttons">
                                                <button className="not_allowed_buttons_cancel" onClick={reject}>{t("Bekor qilish")}</button>
                                                <button className="not_allowed_buttons_registration" >{t("Ro’yxatga olish")}</button>
                                            </div>
                                            <button onClick={openDoor} className="not_allowed_allow">{t("Ruxsat berish")}</button>
                                        </div>
                                    </div>
                            )
                            :
                            <div className="doors_right">
                                <div className="doors_time_info">
                                    <p className="doors_time">08.01.2022 - 08:45:47</p>
                                    {/*<h1 className="doors_time">{moment( onlineImg && onlineImg.guest_user && onlineImg.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                </div>
                                <div className="box_right_top">
                                    <div className="right_top_info">
                                        <div className="label_box">
                                            <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ism")}:</div>
                                            <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                        </div>
                                        <div className="label_box">
                                            <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Toifasi")}:</div>
                                            <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                        </div>
                                        <div className="label_box">
                                            <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Lavozimi")}:</div>
                                            <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                        </div>

                                    </div>

                                    <div className="img_box">
                                        <img className="no_my_img" src={noIMG} alt=""/>
                                    </div>
                                </div>
                                <div className="label_box">
                                    <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:</div>
                                    <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                </div>
                            </div>
                    }
                </div>
                <div className="online_doors_info_content">

                    <div className={`online_doors_info_title ${isDarkMode && 'darkModeBackground'}`}>
                        <h3 className={`${isDarkMode && 'darkModeColor'}`}>HiTech</h3>
                    </div>
                    <div className="door_img_box">
                        {
                            onlineImg2
                                ?
                                <div className="overflov_img">
                                    <img className="doors_left_img" src={url2} alt=""/>
                                </div>
                                : <img className="doors_left_default" src={myImg} alt="img"/>
                        }
                    </div>
                    {
                        onlineImg2
                            ? (onlineImg2.hasOwnProperty('user_in_db')
                                    ?
                                    <div className="doors_right">
                                        <div className="doors_time_info">
                                            <p className="doors_time">08.01.2022 - 08:45:47</p>
                                            {/*<h1 className="doors_time">{moment( onlineImg2 && onlineImg2.guest_user && onlineImg2.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                        </div>
                                        <div className="box_right_top">
                                            <div className="right_top_info">
                                                <div className="label_box">
                                                    <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ism")}:</div>
                                                    <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg2 && onlineImg2.user_in_db && onlineImg2.user_in_db.fullname}</div>
                                                </div>
                                                <div className="label_box">
                                                    <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Toifasi")}:</div>
                                                    <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg2 && onlineImg2.user_in_db && onlineImg2.user_in_db.rank}</div>
                                                </div>
                                                <div className="label_box">
                                                    <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Lavozimi")}:</div>
                                                    <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg2 && onlineImg2.user_in_db && onlineImg2.user_in_db.user_type}</div>
                                                </div>
                                            </div>
                                            <div className="img_box">
                                                <img className="door_user_img" src={`${ip}/${onlineImg2 && onlineImg2.user_in_db && onlineImg2.user_in_db.id}.jpg`} alt="jj"/>
                                            </div>
                                        </div>
                                        <div className="label_box">
                                            <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:</div>
                                            <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg2 && onlineImg2.user_in_db && onlineImg2.user_in_db.access_type}</div>
                                        </div>
                                        <div className="limit_info">
                                            <div className="limit_info_top">
                                                <img className="limit_info_top_img" src={warning} alt=""/>
                                                <h1 className="limit_top_title" >{t("Xodimning kirish muddati tugagan")}!</h1>
                                            </div>
                                            <p className="limit_middle_title">{t("Ruxsat etilgan muddatni uzaytirish uchun")}</p>
                                            <div className="limit_info_bottom">
                                                <h3 className="limit_bottom_title">{t("Sozlamalarga o’ting")}</h3>
                                                <img className="limit_bottom_title_img" src={doorNext} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="doords_right_no" >
                                        <div className="doors_time_info">
                                            <p className="doors_time">08.01.2022 - 08:45:47</p>
                                            {/*<h1 className="doors_time">{moment( onlineImg2 && onlineImg2.guest_user && onlineImg2.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                        </div>
                                        <div className="doords_right_not_allowed">
                                            <img className="doors_right_icon" src={recIcon} alt=""/>

                                            <h1 className={`not_allowed_title ${isDarkMode && 'darkModeColor'}`}>{t("Ma’lumot topilmadi")}</h1>
                                            <p className={`not_allowed_text ${isDarkMode && 'darkModeColor'}`}>{t("Ushbu shaxs ma’lumotlar bazasida aniqlanmadi")}</p>

                                            <div className="not_allowed_buttons">
                                                <button className="not_allowed_buttons_cancel" onClick={reject}>{t("Bekor qilish")}</button>
                                                <button className="not_allowed_buttons_registration" >{t("Ro’yxatga olish")}</button>
                                            </div>
                                            <button onClick={openDoor} className="not_allowed_allow">{t("Ruxsat berish")}</button>
                                        </div>
                                    </div>
                            )
                            :
                            <div className="doors_right">
                                <div className="doors_time_info">
                                    <p className="doors_time">08.01.2022 - 08:45:47</p>
                                    {/*<h1 className="doors_time">{moment( onlineImg2 && onlineImg2.guest_user && onlineImg2.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                </div>
                                <div className="box_right_top">
                                    <div className="right_top_info">
                                        <div className="label_box">
                                            <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ism")}:</div>
                                            <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                        </div>
                                        <div className="label_box">
                                            <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Toifasi")}:</div>
                                            <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                        </div>
                                        <div className="label_box">
                                            <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Lavozimi")}:</div>
                                            <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                        </div>

                                    </div>

                                    <div className="img_box">
                                        <img className="no_my_img" src={noIMG} alt=""/>
                                    </div>
                                </div>
                                <div className="label_box">
                                    <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:</div>
                                    <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                </div>
                            </div>
                    }
                </div>

                <div className="online_doors_info_content">

                    <div className={`online_doors_info_title ${isDarkMode && 'darkModeBackground'}`}>
                        <h3 className={`${isDarkMode && 'darkModeColor'}`}>Eshik 3</h3>
                    </div>
                    <div className="door_img_box">
                        {
                            onlineImg3
                                ?
                                <div className="overflov_img">
                                    <img className="doors_left_img" src={url3} alt=""/>
                                </div>
                                : <img className="doors_left_default" src={myImg} alt="img"/>
                        }
                    </div>
                    {
                        onlineImg3
                            ? (onlineImg3.hasOwnProperty('user_in_db')
                                    ?
                                    <div className="doors_right">
                                        <div className="doors_time_info">
                                            <p className="doors_time">08.01.2022 - 08:45:47</p>
                                            {/*<h1 className="doors_time">{moment( onlineImg3 && onlineImg3.guest_user && onlineImg3.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                        </div>
                                        <div className="box_right_top">
                                            <div className="right_top_info">
                                                <div className="label_box">
                                                    <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ism")}:</div>
                                                    <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg3 && onlineImg3.user_in_db && onlineImg3.user_in_db.fullname}</div>
                                                </div>
                                                <div className="label_box">
                                                    <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Toifasi")}:</div>
                                                    <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg3 && onlineImg3.user_in_db && onlineImg3.user_in_db.rank}</div>
                                                </div>
                                                <div className="label_box">
                                                    <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Lavozimi")}:</div>
                                                    <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg3 && onlineImg3.user_in_db && onlineImg3.user_in_db.user_type}</div>
                                                </div>
                                            </div>
                                            <div className="img_box">
                                                <img className="door_user_img" src={`${ip}/${onlineImg3 && onlineImg3.user_in_db && onlineImg3.user_in_db.id}.jpg`} alt="jj"/>
                                            </div>
                                        </div>
                                        <div className="label_box">
                                            <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:</div>
                                            <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg3 && onlineImg3.user_in_db && onlineImg3.user_in_db.access_type}</div>
                                        </div>
                                        <div className="limit_info">
                                            <div className="limit_info_top">
                                                <img className="limit_info_top_img" src={warning} alt=""/>
                                                <h1 className="limit_top_title" >{t("Xodimning kirish muddati tugagan")}!</h1>
                                            </div>
                                            <p className="limit_middle_title">{t("Ruxsat etilgan muddatni uzaytirish uchun")}</p>
                                            <div className="limit_info_bottom">
                                                <h3 className="limit_bottom_title">{t("Sozlamalarga o’ting")}</h3>
                                                <img className="limit_bottom_title_img" src={doorNext} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="doords_right_no" >
                                        <div className="doors_time_info">
                                            <p className="doors_time">08.01.2022 - 08:45:47</p>
                                            {/*<h1 className="doors_time">{moment( onlineImg3 && onlineImg3.guest_user && onlineImg3.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                        </div>
                                        <div className="doords_right_not_allowed">
                                            <img className="doors_right_icon" src={recIcon} alt=""/>

                                            <h1 className={`not_allowed_title ${isDarkMode && 'darkModeColor'}`}>{t("Ma’lumot topilmadi")}</h1>
                                            <p className={`not_allowed_text ${isDarkMode && 'darkModeColor'}`}>{t("Ushbu shaxs ma’lumotlar bazasida aniqlanmadi")}</p>

                                            <div className="not_allowed_buttons">
                                                <button className="not_allowed_buttons_cancel" onClick={reject}>{t("Bekor qilish")}</button>
                                                <button className="not_allowed_buttons_registration" >{t("Ro’yxatga olish")}</button>
                                            </div>
                                            <button onClick={openDoor} className="not_allowed_allow">{t("Ruxsat berish")}</button>
                                        </div>
                                    </div>
                            )
                            :
                            <div className="doors_right">
                                <div className="doors_time_info">
                                    <p className="doors_time">08.01.2022 - 08:45:47</p>
                                    {/*<h1 className="doors_time">{moment( onlineImg3 && onlineImg3.guest_user && onlineImg3.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                </div>
                                <div className="box_right_top">
                                    <div className="right_top_info">
                                        <div className="label_box">
                                            <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ism")}:</div>
                                            <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                        </div>
                                        <div className="label_box">
                                            <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Toifasi")}:</div>
                                            <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                        </div>
                                        <div className="label_box">
                                            <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Lavozimi")}:</div>
                                            <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                        </div>

                                    </div>

                                    <div className="img_box">
                                        <img className="no_my_img" src={noIMG} alt=""/>
                                    </div>
                                </div>
                                <div className="label_box">
                                    <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:</div>
                                    <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                </div>
                            </div>
                    }
                </div>
                <div className="online_doors_info_content">

                <div className={`online_doors_info_title ${isDarkMode && 'darkModeBackground'}`}>
                    <h3 className={`${isDarkMode && 'darkModeColor'}`}>Eshik 4</h3>
                </div>
                <div className="door_img_box">
                    {
                        onlineImg4
                            ?
                            <div className="overflov_img">
                                <img className="doors_left_img" src={url4} alt=""/>
                            </div>
                            : <img className="doors_left_default" src={myImg} alt="img"/>
                    }
                </div>
                {
                    onlineImg4
                        ? (onlineImg4.hasOwnProperty('user_in_db')
                                ?
                                <div className="doors_right">
                                    <div className="doors_time_info">
                                        <p className="doors_time">08.01.2022 - 08:45:47</p>
                                        {/*<h1 className="doors_time">{moment( onlineImg4 && onlineImg4.guest_user && onlineImg4.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                    </div>
                                    <div className="box_right_top">
                                        <div className="right_top_info">
                                            <div className="label_box">
                                                <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ism")}:</div>
                                                <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg4 && onlineImg4.user_in_db && onlineImg4.user_in_db.fullname}</div>
                                            </div>
                                            <div className="label_box">
                                                <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Toifasi")}:</div>
                                                <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg4 && onlineImg4.user_in_db && onlineImg4.user_in_db.rank}</div>
                                            </div>
                                            <div className="label_box">
                                                <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Lavozimi")}:</div>
                                                <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg4 && onlineImg4.user_in_db && onlineImg4.user_in_db.user_type}</div>
                                            </div>
                                        </div>
                                        <div className="img_box">
                                            <img className="door_user_img" src={`${ip}/${onlineImg4 && onlineImg4.user_in_db && onlineImg4.user_in_db.id}.jpg`} alt="img"/>
                                        </div>
                                    </div>
                                    <div className="label_box">
                                        <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:</div>
                                        <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg4 && onlineImg4.user_in_db && onlineImg4.user_in_db.access_type}</div>
                                    </div>
                                    <div className="limit_info">
                                        <div className="limit_info_top">
                                            <img className="limit_info_top_img" src={warning} alt=""/>
                                            <h1 className="limit_top_title" >{t("Xodimning kirish muddati tugagan")}!</h1>
                                        </div>
                                        <p className="limit_middle_title">{t("Ruxsat etilgan muddatni uzaytirish uchun")}</p>
                                        <div className="limit_info_bottom">
                                            <h3 className="limit_bottom_title">{t("Sozlamalarga o’ting")}</h3>
                                            <img className="limit_bottom_title_img" src={doorNext} alt=""/>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="doords_right_no" >
                                    <div className="doors_time_info">
                                        <p className="doors_time">08.01.2022 - 08:45:47</p>
                                        {/*<h1 className="doors_time">{moment( onlineImg4 && onlineImg4.guest_user && onlineImg4.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                    </div>
                                    <div className="doords_right_not_allowed">
                                        <img className="doors_right_icon" src={recIcon} alt=""/>

                                        <h1 className={`not_allowed_title ${isDarkMode && 'darkModeColor'}`}>{t("Ma’lumot topilmadi")}</h1>
                                        <p className={`not_allowed_text ${isDarkMode && 'darkModeColor'}`}>{t("Ushbu shaxs ma’lumotlar bazasida aniqlanmadi")}</p>

                                        <div className="not_allowed_buttons">
                                            <button className="not_allowed_buttons_cancel" onClick={reject}>{t("Bekor qilish")}</button>
                                            <button className="not_allowed_buttons_registration" >{t("Ro’yxatga olish")}</button>
                                        </div>
                                        <button onClick={openDoor} className="not_allowed_allow">{t("Ruxsat berish")}</button>
                                    </div>
                                </div>
                        )
                        :
                        <div className="doors_right">
                            <div className="doors_time_info">
                                <p className="doors_time">08.01.2022 - 08:45:47</p>
                                {/*<h1 className="doors_time">{moment( onlineImg4 && onlineImg4.guest_user && onlineImg4.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                            </div>
                            <div className="box_right_top">
                                <div className="right_top_info">
                                    <div className="label_box">
                                        <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ism")}:</div>
                                        <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                    </div>
                                    <div className="label_box">
                                        <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Toifasi")}:</div>
                                        <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                    </div>
                                    <div className="label_box">
                                        <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Lavozimi")}:</div>
                                        <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                    </div>

                                </div>

                                <div className="img_box">
                                    <img className="no_my_img" src={noIMG} alt=""/>
                                </div>
                            </div>
                            <div className="label_box">
                                <div className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:</div>
                                <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                            </div>
                        </div>
                }
            </div>



        </div>
        </div>
    );
};

export default OnlineDoors;





