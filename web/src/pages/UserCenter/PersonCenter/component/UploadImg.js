import React from 'react';
import { Upload, message, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class UploadImg extends React.Component {

  state = {
  };


  handleChange = info => {
    const { saveImg } = this.props;
    if (info.file.status === 'done') {
      message.success('头像上传成功');
      getBase64(info.file.originFileObj, imageUrl => {
        saveImg(imageUrl);
      }
      );
    }
  };

  render() {
    return (
      <Upload
        name="avatar"
        showUploadList={false}
        action="http://localhost:9999/api/user/uploadUserAvatar"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        <Button style={{ marginLeft: 15 }}>
          <PlusOutlined />
          上传头像
        </Button>
      </Upload>
    );
  }
}