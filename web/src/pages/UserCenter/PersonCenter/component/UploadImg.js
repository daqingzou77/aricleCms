import React from 'react';
import { Upload, message, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

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
    loading: false,
    imageUrl: ''
  };

  saveImg = imageUrl => {
    this.props.saveImg();
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
     console.log('file', info.file);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        // this.saveImg(imageUrl);
        this.setState({
          imageUrl,
          loading: false,
        }); 
      }
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state; 
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        // action="http://localhost:9999/api/user/UploadUserAvatar"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {/* <Button icon="upload" type="ghost">
          更换头像
        </Button> */}
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}