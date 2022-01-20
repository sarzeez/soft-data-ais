import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const DashboarFirstRoute = (props) => {
    
    const isDarkMode = useSelector(state => state.theme.theme_data)

    const navigate = useNavigate()
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)

    useEffect(() => {
        if(!is_refresh_value) {
            return navigate('/face-control-search')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className={`${isDarkMode && 'darkModeColor'}`} style={{display: "flex", justifyContent: "center",}}>Dashboard</div>
        </>
    )
}

export default DashboarFirstRoute
