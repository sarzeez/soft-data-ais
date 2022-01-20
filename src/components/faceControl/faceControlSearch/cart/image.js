import React from 'react';
import { Image, Space } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';

import { ip } from '../../../../ip'

function ImageDemo(id) {
    return (
        <Image
            // width={80}
            src={`${ip}/api/face/face_image/${id.id}`}
            preview={{
                src: `${ip}/api/face/full_image/${id.id}`,
                maskClassName: 'customize-mask',
                mask: (
                    <Space direction="vertical" align="center">
                        <ZoomInOutlined />
                        Ko'rish
                    </Space>
                ),
            }}
        />
    );
}

export default ImageDemo