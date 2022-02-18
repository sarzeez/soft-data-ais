import React, { useRef } from "react";
import { Modal } from "antd";
import { Player } from "video-react";

import "video-react/dist/video-react.css";
import './video.css'
import { ip } from "../../../../ip";

const VideoModal = ({ visible, setVisible, loading, id }) => {

    const videoRef = useRef(null)
    const hideModal = () => {
        setVisible(false)
    };

    const pause = () => {
        videoRef && videoRef.current && videoRef.current.actions && videoRef.current.actions.pause();
    };

    return (
            <Modal
                // title="Product name"
                visible={visible}
                centered
                footer={null}
                onCancel={hideModal}
                afterClose={pause}
                bodyStyle={{ padding: 0 }}

                >
                    {
                        loading
                        ? <h1 className="loading_title">Loading...</h1>
                        :
                            <Player
                                autoPlay
                                ref={videoRef}
                            >
                                <source
                                // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                src={`${ip}/anhor_camera_video/${id}.mp4`}
                                type="video/mp4"
                                />
                            </Player>
                    }
            </Modal>
    )
}

export default VideoModal