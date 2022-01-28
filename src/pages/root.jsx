import { Routes, Route } from 'react-router-dom'

import DashboarFirstRoute from '../components/dashboard/dashboarFirstRoute'
import FaceControlSearch from '../components/faceControl/faceControlSearch/FaceControlSearch'
import FaceControlAnalysis from '../components/faceControl/faceControlAnalysis/FaceControlAnalysis'
import OnlineRecognation from "../components/accessControl/OnlineRecognation/OnlineRecognation";
import OnlineDoors from "../components/accessControl/Online-doors/OnlineDoors";
import AccessControlSetting from '../components/accessControl/settings/AccessControlSetting'

import AddUser from '../components/accessControl/RealTime/RealTime/AddUser'



import NotFound from '../components/notFound/NotFound'
import AcsessControlTable from "../components/accessControl/accessControlSearch/AccessControlTable";

const RootPage = () => {
    return (
        <Routes>
            <Route index path = '/' element = {<DashboarFirstRoute />}/>
            <Route path = '/face-control-search' element = {<FaceControlSearch />}/>
            <Route path = '/face-control-analysis' element = {<FaceControlAnalysis />}/>
            <Route path = '/access-control-search' element = {<AcsessControlTable />}/>
            <Route path = '/access-control-addUser' element = {<AddUser />}/>
            <Route path = '/access-control-online' element = {<OnlineRecognation />}/>
            <Route path = '/access-control-online-doors' element = {<OnlineDoors />}/>
            <Route path = '/access-control-setting' element = {<AccessControlSetting />}/>
            <Route path = '/access-control-user' element = {<AddUser />}/>
            <Route path = '*' element = {<NotFound />}/>
        </Routes>
    )
}

export default RootPage
