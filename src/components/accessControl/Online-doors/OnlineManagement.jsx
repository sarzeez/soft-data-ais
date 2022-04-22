import React, {useState, useEffect} from 'react';
import downImg from "../../../images/newimages/downn.png";
import managmentImg from "../../../images/newimages/managmentImg.svg";
import cameraOnn from "../../../images/newimages/access-control 1.svg";
import cameraOff from "../../../images/newimages/accesscontrolOff.svg";
import cameraOn from "../../../images/newimages/cameraOn.svg";
import deleteIcon from "../../../images/newimages/deleteImg.svg";
import cursor from "../../../images/newimages/cursor.svg";
import terminalImg1 from "../../../images/newimages/terminalImg/terminalImgone.svg";
import terminalImg2 from "../../../images/newimages/terminalImg/terminalimgtwo.svg";
import terminalImg3 from "../../../images/newimages/terminalImg/terminalimgthree.svg";
import terminalImg4 from "../../../images/newimages/terminalImg/terminalimgfour.svg";
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

import {connect} from "react-redux";
import {getManagment, putManagment, getTheme} from "../../../redux/theme/themeActions";

// drag and drop
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const getItems = (count) =>
    Array.from({length: count}, (v, k) => k).map((k) => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
    // background: isDraggingOver ? "lightblue" : "lightgrey",
    // padding: grid,
    width: 550,
});


const OnlineManagement = (props) => {
    // drag and frop

    const [items, setItems] = React.useState(getItems(1));
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        setItems(reorderedItems);
    };

    ////////////////// dragg ///////////////


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

    // teminal joylashuvi
    const [terminals, setTerminals] = useState([]);

    useEffect(() => {
        axios.get(ip + "/api/adduser/terminal")
            .then((res) => {
                console.log(res)
                setTerminals(res.data);
            })
    }, []);

    const [doorOne, setDoorOne] = useState(true);
    const [doorTwo, setDoorTwo] = useState(false);
    const [doorThree, setDoorThree] = useState(false);
    const [doorFour, setDoorFour] = useState(false);

    function terminal1() {
        setDoorOne(true);
        setDoorTwo(false);
        setDoorThree(false);
        setDoorFour(false);
    }

    function terminal2() {
        setDoorOne(true);
        setDoorTwo(true);
        setDoorThree(false);
        setDoorFour(false);
    }

    function terminal3() {
        setDoorOne(true);
        setDoorTwo(true);
        setDoorThree(true);
        setDoorFour(false);
    }

    function terminal4() {
        setDoorOne(true);
        setDoorTwo(true);
        setDoorThree(true);
        setDoorFour(true);
    }

    const [selectedTerminal, setSelectedTerminal] = useState([]);
    const [selectedTerminal2, setSelectedTerminal2] = useState([]);
    const selectedTer = (item) => {
        setSelectedTerminal(item);
        modalOpen();
        axios.put(ip + "")
    }
    // terminal joylashuvi

    useEffect(() => {
        axios.get(ip + "/api/viewercount")
            .then((res) => {
                if (res.data[0].count == 1) {
                    terminal1()
                } else if (res.data[0].count == 2) {
                    terminal2()
                } else if (res.data[0].count == 3) {
                    terminal3()
                } else if (res.data[0].count == 4) {
                    terminal4()
                }
            })
    }, []);

    const editingTerminals = (index) => {
        axios.put(ip + "/api/viewer/" + index, {count: index})
            .then((res) => {
                console.log(res)
                // axios.get(ip + "/api/viewercount")
                //     .then((res) => {
                //         if (res.data[0].count==1){
                //             terminal1()
                //         }else if (res.data[0].count==2){
                //             terminal2()
                //         }else if (res.data[0].count==3){
                //             terminal3()
                //         }else if (res.data[0].count==4){
                //             terminal4()
                //         }
                //     })
            })
    }

// qo'shilgan terminalni o'chirish
    const deleteTerminal = () => {
        setSelectedTerminal([]);
    }
    const [touch, setTouch] = useState(true);
    const changeTouch = () => {
        setTouch(!touch)
    }

    //////////////////////////////////
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
// online door page value


    ///////////////////// Drag and Drop //////////////////////


    return (
        <div>
            <div className="online_managment">
                <div className="online_managment_title">

                    {/*dra*/}

                    {/*drag*/}


                    <div className="content_top">
                        <p className="content_title">Eshiklar boshqaruvi</p>
                        <div className="content_button d-flex align-items-center">
                            <button type="button" className="btn deleteButton"
                                    hidden={touch}
                                //     onMouseLeave={deleteTerminal}
                                //     onMouseOut={deleteTerminal} +
                                //     onMouseMove={deleteTerminal}
                                    onMouseOver={deleteTerminal}
                                // onClick={deleteTerminal}
                            >
                                <div className="deleteButtonImg">

                                </div>
                                <span>O'chirish</span>
                            </button>

                            <span>Terminallar joylashuvi :</span>

                            <button type="button"
                                    className={doorOne === true && doorTwo === false && doorThree === false && doorFour === false ? "btn active" : "btn"}
                                    onClick={() => editingTerminals(1)}><img src={terminalImg1}/></button>
                            <button type="button"
                                    className={doorOne === true && doorTwo === true && doorThree === false && doorFour === false ? "btn active" : "btn"}
                                    onClick={() => editingTerminals(2)}><img src={terminalImg2}/></button>
                            <button type="button"
                                    className={doorOne === true && doorTwo === true && doorThree === true && doorFour === false ? "btn active" : "btn"}
                                    onClick={() => editingTerminals(3)}><img src={terminalImg3}/></button>
                            <button type="button"
                                    className={doorOne === true && doorTwo === true && doorThree === true && doorFour === true ? "btn active" : "btn"}
                                    onClick={() => editingTerminals(4)}><img src={terminalImg4}/></button>

                            {/*<button type="button"*/}
                            {/*        className={doorOne === true && doorTwo === false && doorThree === false && doorFour === false ? "btn active" : "btn"}*/}
                            {/*        onClick={() => props.putManag(1)}><img src={terminalImg1}/></button>*/}
                            {/*<button type="button"*/}
                            {/*        className={doorOne === true && doorTwo === true && doorThree === false && doorFour === false ? "btn active" : "btn"}*/}
                            {/*        onClick={() => props.putManag(2)}><img src={terminalImg2}/></button>*/}
                            {/*<button type="button"*/}
                            {/*        className={doorOne === true && doorTwo === true && doorThree === true && doorFour === false ? "btn active" : "btn"}*/}
                            {/*        onClick={() => props.putManag(3)}><img src={terminalImg3}/></button>*/}
                            {/*<button type="button"*/}
                            {/*        className={doorOne === true && doorTwo === true && doorThree === true && doorFour === true ? "btn active" : "btn"}*/}
                            {/*        onClick={() => props.putManag(4)}><img src={terminalImg4}/></button>*/}


                        </div>
                    </div>
                </div>


                <div className="online_doors_body">

                    {/*drag and drop*/}
                    {/*<div className="online_doors_managment">*/}

                    {/*</div>*/}
                    {/*drag and drop*/}
                    {
                        selectedTerminal.id > 0 ?
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId={"droppable"}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                        >
                                            {items.map((item, idx) => (
                                                <Draggable key={item.id} draggableId={item.id} index={idx}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <div className="online_doors_info_content"
                                                                 onMouseDown={changeTouch}
                                                                 onMouseUp={changeTouch}
                                                            >

                                                                <img src={cursor} className="cursorTouch"/>
                                                                <div
                                                                    className={`online_doors_info_title ${isDarkMode && 'darkModeBackground'}`}>
                                                                    <h3 className={`${isDarkMode && 'darkModeColor'}`}>{selectedTerminal.door_name}</h3>
                                                                </div>
                                                                <div className="door_img_box">
                                                                    {
                                                                        onlineImg
                                                                            ?
                                                                            <div className="overflov_img">
                                                                                <img className="doors_left_img"
                                                                                     src={url} alt=""/>
                                                                            </div>
                                                                            : <img className="doors_left_default"
                                                                                   src={myImg} alt="img"/>
                                                                    }
                                                                </div>

                                                                {
                                                                    onlineImg
                                                                        ? (onlineImg.hasOwnProperty('user_in_db')
                                                                            ?
                                                                            <div className="doors_right">
                                                                                <div className="doors_time_info">
                                                                                    <p className="doors_time">08.01.2022
                                                                                        - 08:45:47</p>
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
                                                                                        <img
                                                                                            className="limit_info_top_img"
                                                                                            src={warning} alt=""/>
                                                                                        <h1 className="limit_top_title">{t("Xodimning kirish muddati tugagan!")}</h1>
                                                                                    </div>
                                                                                    <p className="limit_middle_title">{t("Ruxsat etilgan muddatni uzaytirish uchun")}</p>
                                                                                    <div className="limit_info_bottom">
                                                                                        <h3 className="limit_bottom_title">{t("Sozlamalarga o’ting")}</h3>
                                                                                        <img
                                                                                            className="limit_bottom_title_img"
                                                                                            src={doorNext} alt=""/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            <div className="doords_right_no">
                                                                                <div className="doors_time_info">
                                                                                    <p className="doors_time">08.01.2022
                                                                                        - 08:45:47</p>
                                                                                    {/*<h1 className="doors_time">{moment( onlineImg && onlineImg.guest_user && onlineImg.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                                                                </div>
                                                                                <div
                                                                                    className="doords_right_not_allowed">
                                                                                    <img className="doors_right_icon"
                                                                                         src={recIcon} alt=""/>

                                                                                    <h1 className={`not_allowed_title ${isDarkMode && 'darkModeColor'}`}>{t("Ma’lumot topilmadi")}</h1>
                                                                                    <p className={`not_allowed_text ${isDarkMode && 'darkModeColor'}`}>{t("Ushbu shaxs ma’lumotlar bazasida aniqlanmadi")}</p>

                                                                                    <AddStaff
                                                                                        isOpenAddStaff={isOpenAddStaff}
                                                                                        setIsOpenAddStaff={setIsOpenAddStaff}
                                                                                    />
                                                                                    <div
                                                                                        className="not_allowed_buttons">
                                                                                        <button
                                                                                            className="not_allowed_buttons_cancel"
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
                                                                                <p className="doors_time">08.01.2022 -
                                                                                    08:45:47</p>
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
                                                                                    <img className="no_my_img"
                                                                                         src={noIMG} alt=""/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="label_box">
                                                                                <div
                                                                                    className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:
                                                                                </div>
                                                                                <div
                                                                                    className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                                                            </div>
                                                                        </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {/*{provided.placeholder}*/}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
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
                        {selectedTerminal2.id > 0 ?
                            <div className="online_doors_info_content">
                                <img src={cursor} className="cursorTouch"/>
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
                                                            <div
                                                                className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ism")}:
                                                            </div>
                                                            <div
                                                                className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg2 && onlineImg2.user_in_db && onlineImg2.user_in_db.fullname}</div>
                                                        </div>
                                                        <div className="label_box">
                                                            <div
                                                                className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Toifasi")}:
                                                            </div>
                                                            <div
                                                                className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg2 && onlineImg2.user_in_db && onlineImg2.user_in_db.rank}</div>
                                                        </div>
                                                        <div className="label_box">
                                                            <div
                                                                className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Lavozimi")}:
                                                            </div>
                                                            <div
                                                                className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg2 && onlineImg2.user_in_db && onlineImg2.user_in_db.user_type}</div>
                                                        </div>
                                                    </div>
                                                    <div className="img_box">
                                                        <img className="door_user_img"
                                                             src={`${ip}/${onlineImg2 && onlineImg2.user_in_db && onlineImg2.user_in_db.id}.jpg`}
                                                             alt="jj"/>
                                                    </div>
                                                </div>
                                                <div className="label_box">
                                                    <div
                                                        className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:
                                                    </div>
                                                    <div
                                                        className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg2 && onlineImg2.user_in_db && onlineImg2.user_in_db.access_type}</div>
                                                </div>
                                                <div className="limit_info">
                                                    <div className="limit_info_top">
                                                        <img className="limit_info_top_img" src={warning} alt=""/>
                                                        <h1 className="limit_top_title">{t("Xodimning kirish muddati tugagan")}!</h1>
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
                                                    {/*<h1 className="doors_time">{moment( onlineImg2 && onlineImg2.guest_user && onlineImg2.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                                                </div>
                                                <div className="doords_right_not_allowed">
                                                    <img className="doors_right_icon" src={recIcon} alt=""/>

                                                    <h1 className={`not_allowed_title ${isDarkMode && 'darkModeColor'}`}>{t("Ma’lumot topilmadi")}</h1>
                                                    <p className={`not_allowed_text ${isDarkMode && 'darkModeColor'}`}>{t("Ushbu shaxs ma’lumotlar bazasida aniqlanmadi")}</p>

                                                    <div className="not_allowed_buttons">
                                                        <button className="not_allowed_buttons_cancel"
                                                                onClick={reject}>{t("Bekor qilish")}</button>
                                                        <button
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
                                                {/*<h1 className="doors_time">{moment( onlineImg2 && onlineImg2.guest_user && onlineImg2.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
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
                                                <div
                                                    className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}></div>
                                            </div>
                                        </div>
                                }
                            </div> :
                            <div className="online_doors_managment_body">
                                <img src={managmentImg}/>
                                <h2>Iltimos eshikni tanlang</h2>
                                <button type="button" className="btn" onClick={modalOpen}>Tanlash</button>
                            </div>
                        }


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
                                            <div
                                                className="online_doors_modal_body_inner" key={item.id}
                                                onClick={() => selectedTer(item)}>
                                                <div className="d-flex align-items-start">
                                                    <div className="imgbor"></div>
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

const mapStateToProps = (state) => {
    return {
        count: state.theme.count
    }
}

export default connect(mapStateToProps, {getManagment, putManagment, getTheme})(OnlineManagement);
