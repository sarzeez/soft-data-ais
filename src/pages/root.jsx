import { Routes, Route } from 'react-router-dom'

import FaceControlSearch from '../components/faceControl/faceControlSearch/FaceControlSearch'
import FaceControlAnalysis from '../components/faceControl/faceControlAnalysis/FaceControlAnalysis'
import AccessControlSetting from '../components/accessControl/settings/AccessControlSetting'


import NotFound from '../components/notFound/NotFound';
import AcsessControlTable from "../components/accessControl/accessControlSearch/AccessControlTable";
import FaceControlSetting from "../components/faceControl/FaceSetting/FaceControlSetting";
import OnlineManagement from "../components/accessControl/Online-doors/OnlineManagement";
import WorkingHoursReport from "../components/accessControl/WorkingHoursReport/workingHoursReport";


const RootPage = () => {
    return (
        <Routes>
            <Route path = '/face-control-search' element = {<FaceControlSearch />}/>
            <Route path = '/face-control-analysis' element = {<FaceControlAnalysis />}/>
            <Route path='/face-control-setting' element={<FaceControlSetting />} />
            <Route path = '/access-control-search' element = {<AcsessControlTable />}/>
            <Route path = '/access-control-online-doors' element = {<OnlineManagement />}/>
            <Route path = '/access-control-setting' element = {<AccessControlSetting />}/>
            <Route path = '/working-hour-report' element = {<WorkingHoursReport />}/>
            <Route path = '*' element = {<NotFound />}/>
        </Routes>
    )
}

export default RootPage
