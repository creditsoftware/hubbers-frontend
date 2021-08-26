import React from 'react';
import { Image as Img, Upload, message, Badge, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { API } from '../constants';
import { fetchJson } from '../utils';

export const MultipleImgUpload = (props) => {
  const [state, setState] = React.useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: []
  })
  React.useEffect(() => {
    if(props.entryList) {
      const v = props.entryList.filter((entry) => entry.id === props.entryId)[0];
      if(v) {
        setState({fileList: v.fileList})
      }
    }
  },[props.entryList])
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  const handleRemove = (fileList) => {
    if(fileList) {
      fetch(`${API.CONTEST_ENTRY_LIST_API}/del-entry-image/${fileList.uid}`, {
        method: 'DELETE'
      }).then(res => {
      })
    }
  }
  const handleUpload = (fileList) => {
    setState(fileList)
    if(fileList.file.response && fileList.file.status === 'done') {
      fetchJson(`${API.CONTEST_ENTRY_LIST_API}/entry-image`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: props.auth.id,
          contestId: props.data.id,
          entryId: props.entryId,
          uid: fileList.file.uid,
          name: fileList.file.name,
          status: 'done',
          url: fileList.file.response.location
        })
      }).then(res => {
        props.handleFetch(res.data[0].entryId);
        // setState({...state, fileList: res.data})
      })
    }
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
    <div style={{height: '420px'}}>
      <Upload
        name={'image'}
        action={API.UPLOAD_IMAGE_API}
        listType="picture-card"
        fileList={state.fileList}
        onPreview={handlePreview}
        onChange={handleUpload}
        onRemove={handleRemove}
        style={{
          height: '100%'
        }}
      >
        {state.fileList.length >= 12 ? null : uploadButton}
      </Upload>
      <Modal
        visible={state.previewVisible}
        title={state.previewTitle}
        footer={null}
        onCancel={() => setState({...state, previewVisible: false })}
      >
        <img alt="example" style={{ width: '100%' }} src={state.previewImage} />
      </Modal>
    </div>
    </>
  );
};