import React, {useState, useEffect} from 'react';
import downImg from "../../../images/newimages/downn.png";
import managmentImg from "../../../images/newimages/managmentImg.svg";
import cameraOnn from "../../../images/newimages/access-control 1.svg";
import cameraOff from "../../../images/newimages/accesscontrolOff.svg";
import cameraOn from "../../../images/newimages/cameraOn.svg";
import terminalImg1 from "../../../images/newimages/terminalImg/terminalImgone.svg"
import terminalImg2 from "../../../images/newimages/terminalImg/terminalimgtwo.svg"
import terminalImg3 from "../../../images/newimages/terminalImg/terminalimgthree.svg"
import terminalImg4 from "../../../images/newimages/terminalImg/terminalimgfour.svg"
import Modal from "react-modal";
import "./onlineManegment.css";
import {Form, Input, Select} from "antd";
import uzbek from "../../../images/uzbek.svg";
import russia from "../../../images/russia.svg";
import engliz from "../../../images/engliz.svg";
import axios from "axios";
import {ip} from "../../../ip";
import "bootstrap/dist/css/bootstrap.css";
import myImg from "../../../images/myImg.svg";
import warning from "../../../images/warning.svg";
import doorNext from "../../../images/doorNext.svg";
import recIcon from "../../../images/recognationIcon.svg";
import AddStaff from "../modals/add-staff/AddStaff";
import noIMG from "../../../images/noIMG.svg";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import socketIOClient from "socket.io-client";
import "./onlineDoors.css";


const OnlineManagement = () => {
    const [openModal, setOpenmodal] = useState(false);
    const modalOpen = () => {
        setOpenmodal(!openModal);
    }

    const customStyles = {
        content: {
            width: "30%",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },
    };
    let subtitle;

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    const [terminals, setTerminals] = useState([]);
    useEffect(() => {
        axios.get(ip + "/api/adduser/terminal")
            .then((res) => {
                console.log(res)
                setTerminals(res.data);
            })
    }, [])

    const [doorOne, setDoorOne] = useState(true);
    const [doorTwo, setDoorTwo] = useState(false);
    const [doorThree, setDoorThree] = useState(false);
    const [doorFour, setDoorFour] = useState(false);

    const terminal1 = () => {
        setDoorOne(true);
        setDoorTwo(false);
        setDoorThree(false);
        setDoorFour(false);
    }
    const terminal2 = () => {
        setDoorOne(true);
        setDoorTwo(true);
        setDoorThree(false);
        setDoorFour(false);
    }
    const terminal3 = () => {
        setDoorOne(true);
        setDoorTwo(true);
        setDoorThree(true);
        setDoorFour(false);
    }
    const terminal4 = () => {
        setDoorOne(true);
        setDoorTwo(true);
        setDoorThree(true);
        setDoorFour(true);
    }
    const [selectedTerminal, setSelectedTerminal] = useState([]);
    const selectedTer = (item) => {
        setSelectedTerminal(item);
        modalOpen();
    }

    // to select the location of the terminals!

    useEffect(() => {
        axios.get(ip + "/api/terminal/updateviewer")
            .then((res) => {
                console.log(res)
                setTerminals(res.data);
            })
    }, [])

    const editingTerminals = (index) => {
        axios.put(ip + "/api/terminal/updateviewer/" + index)
            .then((res) => {
                console.log(res)
            })
    }


    //////////////////////////////////
    // online Door page value
    const {t} = useTranslation()
    const navigate = useNavigate()
    const isDarkMode = useSelector(state => state.theme.theme_data);
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value);
    const [onlineImg, setOnlineImg] = useState(null);
    const [onlineImg2, setOnlineImg2] = useState(null);
    const [onlineImg3, setOnlineImg3] = useState(null);
    const [onlineImg4, setOnlineImg4] = useState(null);

    const [isOpenAddStaff, setIsOpenAddStaff] = useState(false)
    const addNewStaff = () => {
        setIsOpenAddStaff(true)
    }

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

    const reject = () => {
        setOnlineImg(null)
    }

    // const

    const openDoor = () => {
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
        if (!is_refresh_value) {
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
        <div>
            <div className="online_managment">
                <div className="online_managment_title">
                    <div className="content_top">
                        <p className="content_title">Eshiklar boshqaruvi</p>
                        <div className="content_button d-flex align-items-center">
                            <span>Terminallar joylashuvi :</span>
                            <button type="button" className="btn" onClick={terminal1}><img src={terminalImg1}/></button>
                            <button type="button" className="btn" onClick={terminal2}><img src={terminalImg2}/></button>
                            <button type="button" className="btn" onClick={terminal3}><img src={terminalImg3}/></button>
                            <button type="button" className="btn" onClick={terminal4}><img src={terminalImg4}/></button>
                        </div>
                    </div>
                </div>

                <div className="online_doors_body">
                    {
                        selectedTerminal.id > 0 ? <div className="online_doors_info_content">

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
                                                            <div
                                                                className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ism")}:
                                                            </div>
                                                            <div
                                                                className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.fullname}</div>
                                                        </div>
                                                        <div className="label_box">
                                                            <div
                                                                className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Toifasi")}:
                                                            </div>
                                                            <div
                                                                className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg?.user_in_db?.user_type == 1 ? t("Xodim") : onlineImg?.user_in_db?.user_type == 2 ? t("Mehmon") : t("Begona")}</div>
                                                        </div>
                                                        <div className="label_box">
                                                            <div
                                                                className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Lavozimi")}:
                                                            </div>
                                                            <div
                                                                className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg?.user_in_db?.rank == 1 ? t("Oddiy xodim") : onlineImg?.user_in_db?.rank == 2 ? t("Direktor") : onlineImg?.user_in_db?.rank == 3 ? t("VIP") : ''}</div>
                                                        </div>
                                                    </div>
                                                    <div className="img_box">
                                                        <img className="door_user_img"
                                                             src={`${ip}/${onlineImg && onlineImg.user_in_db && onlineImg.user_in_db.id}.jpg`}
                                                             alt="img"/>
                                                    </div>
                                                </div>
                                                <div className="label_box">
                                                    <div
                                                        className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:
                                                    </div>
                                                    <div
                                                        className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg?.user_in_db?.access_type}</div>
                                                </div>
                                                <div className="limit_info">
                                                    <div className="limit_info_top">
                                                        <img className="limit_info_top_img" src={warning} alt=""/>
                                                        <h1 className="limit_top_title">{t("Xodimning kirish muddati tugagan!")}</h1>
                                                    </div>
                                                    <p className="limit_middle_title">{t("Ruxsat etilgan muddatni uzaytirish uchun")}</p>
                                                    <div className="limit_info_bottom">
                                                        <h3 className="limit_bottom_title">{t("Sozlamalarga o’ting")}</h3>
                                                        <img className="limit_bottom_title_img" src={doorNext} alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="doords_right_no">
                                                <div className="doors_time_info">
                                                    <p className="doors_time">08.01.2022 - 08:45:47</p>
                                                    {/*<h1 className="doors_time">{moment( onlineImg && onlineImg.guest_user && onlineImg.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                                </div>
                                                <div className="doords_right_not_allowed">
                                                    <img className="doors_right_icon" src={recIcon} alt=""/>

                                                    <h1 className={`not_allowed_title ${isDarkMode && 'darkModeColor'}`}>{t("Ma’lumot topilmadi")}</h1>
                                                    <p className={`not_allowed_text ${isDarkMode && 'darkModeColor'}`}>{t("Ushbu shaxs ma’lumotlar bazasida aniqlanmadi")}</p>

                                                    <AddStaff
                                                        isOpenAddStaff={isOpenAddStaff}
                                                        setIsOpenAddStaff={setIsOpenAddStaff}
                                                    />
                                                    <div className="not_allowed_buttons">
                                                        <button className="not_allowed_buttons_cancel"
                                                                onClick={reject}>{t("Bekor qilish")}</button>
                                                        <button onClick={addNewStaff}
                                                                className="not_allowed_buttons_registration">{t("Ro’yxatga olish")}</button>
                                                    </div>
                                                    <button onClick={openDoor}
                                                            className="not_allowed_allow">{t("Ruxsat berish")}</button>
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
                                                        <div
                                                            className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ism")}:
                                                        </div>
                                                        <div
                                                            className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                                    </div>
                                                    <div className="label_box">
                                                        <div
                                                            className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Toifasi")}:
                                                        </div>
                                                        <div
                                                            className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                                    </div>
                                                    <div className="label_box">
                                                        <div
                                                            className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Lavozimi")}:
                                                        </div>
                                                        <div
                                                            className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                                    </div>

                                                </div>

                                                <div className="img_box">
                                                    <img className="no_my_img" src={noIMG} alt=""/>
                                                </div>
                                            </div>
                                            <div className="label_box">
                                                <div
                                                    className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:
                                                </div>
                                                <div className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                            </div>
                                        </div>
                                }
                            </div>
                            :
                            <div
                                className={doorOne === true && doorTwo === false && doorThree === false && doorFour === false ? "online_doors_managment_one" :
                                    ("online_doors_managment")
                                }>
                                <div className="online_doors_managment_body">
                                    <img src={managmentImg}/>
                                    <h2>Iltimos eshikni tanlang</h2>
                                    <button type="button" className="btn" onClick={modalOpen}>Tanlash</button>
                                </div>
                            </div>
                    }


                    <div className={doorTwo === true ? "online_doors_managment" : "online_doors_managment d-none"}>
                        <div className="online_doors_managment_body">
                            <img src={managmentImg}/>
                            <h2>Iltimos eshikni tanlang</h2>
                            <button type="button" className="btn" onClick={modalOpen}>Tanlash</button>
                        </div>
                    </div>
                    <div className={doorThree === true ? "online_doors_managment" : "online_doors_managment d-none"}>
                        <div className="online_doors_managment_body">
                            <img src={managmentImg}/>
                            <h2>Iltimos eshikni tanlang</h2>
                            <button type="button" className="btn" onClick={modalOpen}>Tanlash</button>
                        </div>
                    </div>
                    <div className={doorFour === true ? "online_doors_managment" : "online_doors_managment d-none"}>
                        <div className="online_doors_managment_body">
                            <img src={managmentImg}/>
                            <h2>Iltimos eshikni tanlang</h2>
                            <button type="button" className="btn" onClick={modalOpen}>Tanlash</button>
                        </div>
                    </div>
                </div>

                <>
                    <Modal
                        isOpen={openModal}
                        onRequestClose={() => setOpenmodal(!openModal)}
                        // onRequestClose={() => setIsOpenAddCamera(cancel)}
                        contentLabel="My dialog"
                        className="mymodal"
                        overlayClassName="myoverlay"
                        closeTimeoutMS={0}
                    >

                        <div className="online_doors_modal">
                            <h4>Terminallar ro'yxati</h4>
                            <div className="online_doors_modal_bodyOne">
                                <div className="online_doors_modal_body">
                                    {terminals.map((item, index) => {
                                        return (
                                            <div className="online_doors_modal_body_inner" key={item.id}
                                                 onClick={() => selectedTer(item)}>
                                                <div className="d-flex align-items-start">
                                                    <img src={cameraOff}/>
                                                    <div className="ml-2">
                                                        <h5>{item.door_name}</h5>
                                                        <span>{item.direction === "Entry" ? "Kirish eshigi" : "Chiqish eshigi"}</span>
                                                    </div>
                                                </div>
                                                <div className="linee">

                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </Modal>
                </>
            </div>
        </div>
    );
};

export default OnlineManagement;
