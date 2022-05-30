
<div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
>
    <div className="online_doors_info_content"
         onClick={() => changeTouch(3, terminalViwer3[0]?.id)}
    >
        <img src={cursor} className="cursorTouch"
            // onClick={() => changeTouch(1, terminalViwer1[0]?.id)}
            // onClickCapture={() => changeTouch(1, terminalViwer1[0]?.id)}
        />
        <div
            className={`online_doors_info_title ${isDarkMode && 'darkModeBackground'}`}>
            <h3 className={`${isDarkMode && 'darkModeColor'}`}>
                {
                    terminalViwer3[0]?.door_name
                }
            </h3>
        </div>
        <div className="door_img_box">
            {
                onlineImg4
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
            onlineImg4 ? (onlineImg4.hasOwnProperty('user_in_db') ?
                    <div className="doors_right">
                        <div className="doors_time_info">
                            <p className="doors_time">{moment(new Date(onlineImg4?.guest_user?.created_time)).format("DD.MM.YYYY - HH:mm:ss")}</p>
                            {/*<h1 className="doors_time">{moment( onlineImg4 && onlineImg4.guest_user && onlineImg4.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
                        </div>
                        <div className="box_right_top">
                            <div className="right_top_info">
                                <div className="label_box">
                                    <div
                                        className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ism")}:
                                    </div>
                                    <div
                                        className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg4 && onlineImg4.user_in_db && onlineImg4.user_in_db.fullname}</div>
                                </div>
                                <div className="label_box">
                                    <div
                                        className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Toifasi")}:
                                    </div>
                                    <div
                                        // className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg4?.user_in_db?.user_type == 1 ? t("Xodim") : onlineImg4?.user_in_db?.user_type == 2 ? t("Mehmon") : t("Begona")}</div>
                                        className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg4?.user_in_db?.user_type == 1 ? t("Xodim") : t("Begona")}</div>
                                </div>
                                <div className="label_box">
                                    <div
                                        className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Lavozimi")}:
                                    </div>
                                    <div
                                        className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>
                                        {
                                            onlineImg4?.user_in_db?.rank == 1 ? t("Oddiy xodim") :
                                                onlineImg4?.user_in_db?.rank == 2 ? t("Direktor") :
                                                    onlineImg4?.user_in_db?.rank == 3 ? t("VIP") :
                                                        onlineImg4?.user_in_db?.rank == 4 ? t("Mehmon") :
                                                            onlineImg4?.user_in_db?.rank == 5 ? t("Bloklangan") : ''
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="img_box">
                                <img className="door_user_img"
                                     src={`${ip}/${onlineImg4 && onlineImg4.user_in_db && onlineImg4.user_in_db.id}.jpg`}
                                     alt="img"/>
                            </div>
                        </div>
                        <div className="label_box">
                            <div
                                className={`doors_right_label ${isDarkMode && 'darkModeColor'}`}>{t("Ruxsat turi")}:
                            </div>
                            <div
                                // className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg4?.guest_user?.auth_type}</div>
                                className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>
                                {onlineImg4?.guest_user?.auth_type === "1" ? t("Yuz") :
                                    onlineImg4?.guest_user?.auth_type === "2" ? t("Barmoq izi") :
                                        onlineImg4?.guest_user?.auth_type === "3" ? t("ID karta") :
                                            onlineImg4?.guest_user?.auth_type === "4" ? t("Yuz va Barmoq izi") :
                                                onlineImg4?.guest_user?.auth_type === "6" ? t("Yuz va ID karta") :
                                                    onlineImg4?.guest_user?.auth_type === "8" ? t("Barmoq izi va ID karta") : ''

                                }</div>
                            {/*className={`doors_right_box ${isDarkMode && 'darkModeColor'}`}>{onlineImg4?.user_in_db?.access_type}</div>*/}
                        </div>
                        {
                            Number(onlineImg4?.guest_user?.status) !== 1 ?
                                <div className="limit_info">
                                    <div
                                        className="limit_info_top">
                                        <img
                                            className="limit_info_top_img"
                                            src={warning}
                                            alt=""/>
                                        <h1 className="limit_top_title">{t("Xodimning kirish muddati tugagan!")}</h1>
                                    </div>
                                    <p className="limit_middle_title">{t("Ruxsat etilgan muddatni uzaytirish uchun")}</p>
                                    <div
                                        className="limit_info_bottom">
                                        <h3 className="limit_bottom_title">{t("Sozlamalarga o’ting")}</h3>
                                        <img
                                            className="limit_bottom_title_img"
                                            src={doorNext}
                                            alt=""/>
                                    </div>
                                </div> : ``
                        }
                    </div>
                    :
                    <div className="doords_right_no">
                        <div className="doors_time_info">
                            <p className="doors_time">{moment(new Date(onlineImg4?.guest_user?.created_time)).format("DD.MM.YYYY - HH:mm:ss")}</p>
                        </div>
                        <div
                            className="doords_right_not_allowed">
                            <img className="doors_right_icon" src={recIcon} alt=""/>
                            <h1 className={`not_allowed_title ${isDarkMode && 'darkModeColor'}`}>{t("Ma’lumot topilmadi")}</h1>
                            <p className={`not_allowed_text ${isDarkMode && 'darkModeColor'}`}>{t("Ushbu shaxs ma’lumotlar bazasida aniqlanmadi")}</p>
                            <AddStaff
                                isOpenAddStaff={isOpenAddStaff}
                                setIsOpenAddStaff={setIsOpenAddStaff}
                            />
                            <div className="not_allowed_buttons">
                                <button className="not_allowed_buttons_cancel" onClick={reject}>{t("Bekor qilish")}</button>
                                <button onClick={addNewStaff} className="not_allowed_buttons_registration_two">{t("Ro’yxatga olish")}</button>
                                {/*<button className="not_allowed_buttons_registration"><Link to="">{t("Ro’yxatga olish")}</Link></button>*/}
                            </div>
                            <button onClick={openDoor} className="not_allowed_allow">{t("Ruxsat berish")}</button>
                        </div>
                    </div>
                )
                :
                <div className="doors_right">
                    {/*oddiy turgan xolatidagi page*/}
                    <div className="doors_time_info">
                        <p className="doors_time">Aniqlash
                            vaqti</p>
                        {/*<h1 className="doors_time">{moment( onlineImg4 && onlineImg4.guest_user && onlineImg4.guest_user.created_time).format("DD.MM.YYYY  HH:mm:ss")}</h1>*/}
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