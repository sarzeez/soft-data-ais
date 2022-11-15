import React, { useState } from 'react';
import {Layout, Menu } from 'antd';
import Switch from "react-switch"
import { BrowserRouter } from 'react-router-dom'
import {MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch} from "react-redux";
import { getTheme, isRefresh } from "../../redux";
import {Link} from "react-router-dom";
import {ip} from "../../ip";
import {BsFillCloudMoonFill, WiSunrise} from "react-icons/all";
import RootPage from '../../pages/root';
import useWindowDimensions from '../../hooks/hooks';
import 'antd/dist/antd.css';

import logo from '../../images/Logo.svg';
// import logo from '../../images/taxtLogo.svg';
import shortlogo from '../../images/shortLogo.svg';
import face from '../../images/dashIcons/face.svg';
import search from '../../images/dashIcons/search.svg';
import setting from '../../images/dashIcons/settings.svg';
import analisy from '../../images/dashIcons/statestc.svg';
import access from '../../images/dashIcons/access.svg';
import tableimg from '../../images/dashIcons/table.svg';

import parking from '../../images/dashIcons/Parking/parking.svg';
import car from '../../images/dashIcons/Parking/p-car.svg';
import phistir from '../../images/dashIcons/Parking/p-history.svg';

import doorKey from '../../images/dashIcons/doors.svg';
import working from "../../images/dashIcons/workTime.svg";
import './style.css';


const {Header, Sider, Content} = Layout;
const { SubMenu } = Menu;

const Saidbar = ({ user, setUser }) => {

    const {t, i18n} = useTranslation()
    const [lang, setLang] = useState(localStorage.getItem('i18nextLng') || 'uz')
    const [openKeys, setOpenKeys] = React.useState(['sub1']);
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];

    const { width } = useWindowDimensions();
    const sidebarWidth = width < 1370 ? 200 : 300;
    const isDarkMode = useSelector(state => state.theme.theme_data);

    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const handleChangeTheme = (state) => {
        dispatch(getTheme(state))
    }

    const handleClickListItem = (title, id) => {
        // setCheckedItemTitle(title)
        dispatch(isRefresh(id));
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

    const logout = () => {
        setUser(null)
        localStorage.removeItem('soft-ais-token')
    }

    return (
        <BrowserRouter>
            <Layout  style={{height: '100vh'}}>
                <Sider width={sidebarWidth} theme={isDarkMode ? 'dark' : 'light'} className={`siderBackColor ${isDarkMode && 'darkModeBackground'}`}  trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">
                        {
                            collapsed ?  <img className="short_logo" src={shortlogo} alt=""/> :
                                <img className="logo_img " src={logo} alt=""/>
                                // <div>  <img className="short_logo" src={shortlogo} alt=""/>
                                //     <img className="logo_img " src={logo} alt=""/>
                                // </div>
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
                                    {t('Jadval')}
                                </Link>
                            </Menu.Item>
                            {/*<Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Access Control Online Doors', 8)}  key="8"*/}
                            {/*           icon={<img src={doorKey} alt=""/>}   >*/}
                            {/*    <Link to="/access-control-online-doors">*/}
                            {/*        {t('Eshiklar boshqaruvi')}*/}
                            {/*    </Link>*/}
                            {/*</Menu.Item>*/}

                            {/*ish vaqti hisoboti*/}

                            <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Working Hour Report', 7)} key="7"
                                       icon={<img src={working} alt=""/>}>
                                <Link to="/working-hour-report">
                                    {t("Ish vaqti hisoboti")}
                                </Link>
                            </Menu.Item>

                            <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Access Control', 9)} key="9"
                                       icon={<img src={setting} alt=""/>}>
                                <Link to="/access-control-setting">
                                    {t('Sozlamalar')}
                                </Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub3" icon={<img src={parking} alt=""/>} title={t('Parking Control')}>
                            <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Access Control', 10)} key="10"
                                       icon={<img src={car} alt=""/>}>
                                <Link to="/cars">
                                    {t('Mavjud avtomonillar')}
                                </Link>
                            </Menu.Item>

                            <Menu.Item className="saidbar_link" onClick={() => handleClickListItem('Working Hour Report', 11)} key="11"
                                       icon={<img src={phistir} alt=""/>}>
                                <Link to="/">
                                    {t("Hisobot")}
                                </Link>
                            </Menu.Item>

                        </SubMenu>
                    </Menu>
                </Sider>


                <Layout   className={`site-layout ${isDarkMode && 'darkModeLayautBg'} `}>

                    <Header theme={isDarkMode ? 'dark' : 'light'}  className={`site-layout-background headerr ${isDarkMode && 'darkModeBackground'} `} style={{ padding: 0 }}>
                        <div className={`saidbar_toggle ${isDarkMode && 'darkModeColor'}`}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: toggle,
                            })}
                        </div>
                        <div className="header_navbar">
                            <div className="header_right">
                                <div className="language" style={{marginRight: '15px'}}>
                                    <select className='lang_dropdown' onChange={onChangeLanguage} defaultValue={lang}>
                                        <option defaultValue="uz" value="uz">O'zbekcha</option>
                                        <option value="ru">Русский</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>

                                <Switch
                                    onChange={handleChangeTheme}
                                    checked={isDarkMode}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    offColor="#F7F7F7"
                                    onColor="#343D50"
                                    checkedHandleIcon={
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 15,
                                                paddingRight: 2
                                            }}
                                        >
                                            <BsFillCloudMoonFill />
                                        </div>
                                    }
                                    uncheckedHandleIcon={
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 20,
                                                color: "orange",
                                            }}
                                        >
                                            <WiSunrise />
                                        </div>
                                    }
                                />

                                <div title='Chiqish' onClick={logout} className="rount_img">
                                    {
                                        user && <img src={`${ip}/api/admins/${user.id}/img`} alt=""/>
                                    }
                                </div>

                            </div>
                        </div>
                    </Header>

                    <Content  className={`site-layout-background ${isDarkMode && 'darkModeBackground'}`}>
                        <div className={`content_bottom ${isDarkMode && 'darkModeLayautBg'}`} >
                            <RootPage/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
};


export default Saidbar;




