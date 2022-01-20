import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const FaceControlSettings = () => {

    const navigate = useNavigate()
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)

    useEffect(() => {
        if(!is_refresh_value) {
            return navigate('/face-control-search')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            jhhhhh
        </div>
    )
}

export default FaceControlSettings
