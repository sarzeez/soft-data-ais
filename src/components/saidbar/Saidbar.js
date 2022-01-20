import React, { useState} from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Switch} from 'antd';
import { BrowserRouter } from 'react-router-dom'
import {MenuUnfoldOutlined, MenuFoldOutlined,} from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";

import dashboard from '../../images/dashIMG/dashboard.svg';
import face from '../../images/dashIMG/face.svg';
import search from '../../images/dashIMG/search.svg';
import setting from '../../images/dashIMG/settings.svg';
import analisy from '../../images/dashIMG/analisy.svg';
import access from '../../images/dashIMG/access.svg';
import tableimg from '../../images/dashIMG/table.svg';
import doorKey from '../../images/dashIMG/doorKey.svg';

import { useSelector, useDispatch} from "react-redux";
import { getTheme, isRefresh } from "../../redux";

import useWindowDimensions from '../../hooks/hooks';


import searchIcon from "../../images/headerimg/searchIcon.png";
import headerImg from "../../images/headerimg/headerImg.png";

import NewStaff from '../newStaff/newStaff';
import RootPage from '../../pages/root';

import './style.css';


const {Header, Sider, Content} = Layout;
const { SubMenu } = Menu;

const Saidbar = () => {

    const { width } = useWindowDimensions();
    const sidebarWidth = width < 1370 ? 200 : 300;
    const isDarkMode = useSelector(state => state.theme.theme_data);

    const [newStaffModal, setNewStaffModal] = useState(false);
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);

    const [user, setUser] = useState(null)

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const handleChangeTheme = (state) => {
        dispatch(getTheme(state))
    }

    const addNewStaff = () => {
        setNewStaffModal(true)
    }

    const handleClickListItem = (title, id) => {
        // setCheckedItemTitle(title)
        dispatch(isRefresh(id))
    }

    


    return (
        <BrowserRouter>
                <Layout  style={{height: '100vh'}}>
                    <Sider width={sidebarWidth} theme={isDarkMode ? 'dark' : 'light'} className={`siderBackColor ${isDarkMode && 'darkModeBackground'}`}  trigger={null} collapsible collapsed={collapsed}>
                        <div className="logo">
                            {
                                collapsed ? <span className={`logoText ${isDarkMode && 'darkModeColor'}`}> <span className="grenText">S</span>D</span> :
                                    <div className="fullText"> <span className={`logoText ${isDarkMode && 'darkModeColor'}`} ><span className="grenText">Soft</span>Data</span> <p className={`softdev ${isDarkMode && 'darkModeColor'}`}>Software Development</p> </div>
                            }
                        </div>
                        <hr/>

                        <Menu theme={isDarkMode ? 'dark' : 'light'} className={`siderBackColor ${isDarkMode && 'darkModeBackground'}`}
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                        >
                            <div>
                                {
                                    collapsed ? <p className="close_saidbar_title" style={{textAlign: "center"}}>Boshqaruv paneli</p> :
                                        <p className="saidbar_title" style={{textAlign: "center"}}>Boshqaruv paneli</p>
                                }
                            </div>
                            {/*<SubMenu key="sub1" icon={<img src={dashboard} alt=""/>} title="Ko'rsatkichlar paneli">*/}
                            {/*    <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Dashboard', 1)}*/}
                            {/*               icon={<img src={dashboard} alt=""/>} key="1" >*/}
                            {/*        <Link to="/">*/}
                            {/*            Ko'rsatkichlar paneli*/}
                            {/*        </Link>*/}
                            {/*    </Menu.Item>*/}
                            {/*</SubMenu>*/}

                            <SubMenu key="sub2" icon={<img src={face} alt=""/>} title=" Yuzni aniqlash" >
                                <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Face Control Qidiruv', 2)}
                                           key="2" icon={<img src={search} alt=""/>}>
                                    <Link to="/face-control-search">
                                        Qidiruv
                                    </Link>
                                </Menu.Item>
                                <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Face Control Sozlamalar', 3)}
                                           key="3"  icon={<img src={setting} alt=""/>}>
                                    <Link to="/face-control-setting">
                                        Sozlamalar
                                    </Link>
                                </Menu.Item>
                                <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Face Control Statistika', 4)}
                                           key="4" icon={<img src={analisy} alt=""/>}>
                                    <Link to="/face-control-analysis">
                                      Statistika
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<img src={access} alt=""/>} title="Kirishni boshqarish">
                                <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Access Control', 5)} key="5"
                                           icon={<img src={tableimg} alt=""/>}>
                                    <Link to="/access-control-search">
                                        Jadval
                                    </Link>
                                </Menu.Item>
                                <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Access Control', 6)} key="6"
                                           icon={<img src={setting} alt=""/>}>
                                    <Link to="/acsess-setting">
                                        Sozlamalar
                                    </Link>
                                </Menu.Item>
                                <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Access Control', 7)} key="7"
                                           icon={<img src={setting} alt=""/>} >
                                    <Link to="/access-control-addUser">
                                        Odam qo'shish
                                    </Link>
                                </Menu.Item>
                                {/*<Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Access Control', 8)} key="8"*/}
                                {/*           icon={<img src={doorKey}/>}  >*/}
                                {/*    <Link to="/access-control-online">*/}
                                {/*        Online*/}
                                {/*    </Link>*/}
                                {/*</Menu.Item>*/}
                                <Menu.Item className="saidbar_link"  key="9"  icon={<img src={doorKey} alt=""/>}   >
                                    <Link to="/access-control-online-doors">
                                        Onlayn boshqaruv
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>


                    <Layout   className={`site-layout ${isDarkMode && 'darkModeLayautBg'} `}>
                        <NewStaff newStaffModal = {newStaffModal} setNewStaffModal = {setNewStaffModal} />
                        <Header theme={isDarkMode ? 'dark' : 'light'}  className={`site-layout-background headerr ${isDarkMode && 'darkModeBackground'} `} style={{ padding: 0 }}>
                            <div className={`${isDarkMode && 'darkModeColor'}`}>
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: toggle,
                                })}
                            </div>
                            <div className="header_navbar">
                                <div className="search">
                                    <img className="searchIcon" src={searchIcon} alt=""/>
                                    <input className={`search_input ${isDarkMode && 'darkModeBackground, darkModeColor'} `} type="search" placeholder="Поиск..."/>
                                </div>
                                <div className="header_right">
                                    <Switch onChange={handleChangeTheme} />
                                    <div onClick={addNewStaff} className="rount_img">
                                        <img src={headerImg} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </Header>
                        <Content  className={`site-layout-background ${isDarkMode && 'darkModeBackground'}`}>
                            <div className={`content_bottom ${isDarkMode && 'darkModeLayautBg'}`} >
                                <RootPage />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
        </BrowserRouter>
    );
};


export default Saidbar;




