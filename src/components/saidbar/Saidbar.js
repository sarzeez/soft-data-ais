import React, { useState } from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, Switch} from 'antd';
import { BrowserRouter } from 'react-router-dom'
import {MenuUnfoldOutlined, MenuFoldOutlined,} from '@ant-design/icons';
import { useTranslation } from "react-i18next";


import {Link} from "react-router-dom";
import logo from '../../images/Logo.svg';
import shortlogo from '../../images/shortLogo.svg';
// import dashboard from '../../images/dashIMG/dashboard.svg';
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
import NewStaff from '../newStaff/newStaff';
import RootPage from '../../pages/root';

import './style.css';
import {ip} from "../../ip";


const {Header, Sider, Content} = Layout;
const { SubMenu } = Menu;

const Saidbar = ({ user}) => {

    const {t, i18n} = useTranslation()
    const [lang, setLang] = useState(localStorage.getItem('i18nextLng') || 'uz')
    const [openKeys, setOpenKeys] = React.useState(['sub1']);
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    const { width } = useWindowDimensions();
    const sidebarWidth = width < 1370 ? 200 : 300;
    const isDarkMode = useSelector(state => state.theme.theme_data);

    const [newStaffModal, setNewStaffModal] = useState(false);
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);

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

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          setOpenKeys(keys);
        } else {
          setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const onChangeLanguage = (event) => {
        const lang = event.target.value
        setLang(lang)
        i18n.changeLanguage(lang)
        localStorage.setItem('i18nextLng', lang)
    }

    const LogoComponent = () => {
        return (
                <div className="dashboard">
                    {
                        collapsed ? <p className="saidbar_title" style={{textAlign: "center"}}>{t('dashboard')}</p> :
                            <p className="close_saidbar_title " >{t('dashboard')}</p>
                    }
                </div>
        )
    }

    return (
        <BrowserRouter>
                <Layout  style={{height: '100vh'}}>
                    <Sider width={sidebarWidth} theme={isDarkMode ? 'dark' : 'light'} className={`siderBackColor ${isDarkMode && 'darkModeBackground'}`}  trigger={null} collapsible collapsed={collapsed}>
                        <div className="logo">
                            {
                                collapsed ? <img src={shortlogo} alt=""/> :  <img src={logo} alt=""/>
                            }
                        </div>
                        <Menu 
                            theme={isDarkMode ? 'dark' : 'light'} 
                            className={`siderBackColor_menu ${isDarkMode && 'darkModeBackground'}`}
                            onOpenChange={onOpenChange}
                            openKeys={openKeys}
                            mode="inline"
                            defaultSelectedKeys={['2']}
                            defaultOpenKeys={['sub1']}
                        >
                            <LogoComponent />
                            <SubMenu key="sub1" icon={<img src={face} alt=""/>} title={t('yuzni_aniqlash')} >
                                <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Face Control Qidiruv', 2)}
                                           key="2" icon={<img src={search} alt=""/>}>
                                    <Link to="/face-control-search">
                                        {t('tasvirlar')}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Face Control Statistika', 3)}
                                           key="3" icon={<img src={analisy} alt=""/>}>
                                    <Link to="/face-control-analysis">
                                      {t('Statistika')}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Face Control Sozlamalar', 4)}
                                           key="4"  icon={<img src={setting} alt=""/>}>
                                    <Link to="/face-control-setting">
                                       {t('Sozlamalar')}
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<img src={access} alt=""/>} title={t('kirishni_boshqarish')}>
                                <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Access Control', 5)} key="5"
                                           icon={<img src={tableimg} alt=""/>}>
                                    <Link to="/access-control-search">
                                        {t('jadval')}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Access Control Online Doors', 8)}  key="8"  icon={<img src={doorKey} alt=""/>}   >
                                    <Link to="/access-control-online-doors">
                                        {t('online_boshqaruv')}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Access Control', 9)} key="9"
                                           icon={<img src={setting} alt=""/>}>
                                    <Link to="/acsess-setting">
                                    {t('Sozlamalar')}
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
                                <div className="header_right">
                                    <div className="language" style={{marginRight: '15px'}}>
                                        <form >
                                            <select className='lang_dropdown' onChange={onChangeLanguage} defaultValue={lang}>
                                                <option defaultValue="uz" value="uz">O'zbekcha</option>
                                                <option value="ru">Русский</option>
                                                <option value="en">English</option>
                                            </select>
                                        </form>
                                    </div>

                                    <Switch onChange={handleChangeTheme} />
                                    <div onClick={addNewStaff} className="rount_img">
                                        {
                                            user && <img src={`${ip}/api/admins/${user.id}/img`} alt=""/>
                                        }
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




