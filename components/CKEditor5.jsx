import React
  // { Component }
  from 'react';
// import PropTypes from 'prop-types';
import { Promise, openNotificationWithIcon } from '../utils';
import { API } from '../constants/apis';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

class MyUploadAdapter {
  constructor(loader, onUpload) {
    this.loader = loader;
    this.url = API.UPLOAD_IMAGE_API;
    this.onUpload = onUpload;
  }
  upload() {
    return this.loader.file.then(async (file) => {
      return new Promise((resolve, reject) => {
        this.onUpload(true);
        this._initRequest();
        if (file.size > 2000000) {
          this.onUpload(false);
          reject();
          openNotificationWithIcon('error', 'Something went wrong!', 'The image upload failed because the image was too big (max 2MB).');
        } else {
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        }
      });
    });
  }
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();
    xhr.open('POST', this.url, true);
    xhr.responseType = 'json';
  }
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;
    xhr.addEventListener('error', () => {
      this.onUpload(false);
      reject(genericErrorText);
    });
    xhr.addEventListener('abort', () => {
      this.onUpload(false);
      reject();
    });
    xhr.addEventListener('load', () => {
      const response = xhr.response;
      this.onUpload(false);
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }
      resolve({
        default: response.location
      });
    });
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', evt => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }
  _sendRequest(file) {
    const data = new FormData();
    data.append('image', file);
    this.xhr.send(data);
  }
}

const DNXCustomUploadAdapterPlugin = (editor, onUpload) => {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    loader.onUpload = editor.onUpload;
    loader.accessToken = editor.accessToken;
    return new MyUploadAdapter(loader, onUpload);
  };
};
export const CKEditor5 = (props) => {
  const [comp, setComp] = React.useState({
    CKEditor: null,
    ClassicEditor: null
  });
  const [loaded, setLoaded] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  React.useEffect(() => {
    setComp({
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('ckeditor5-build-classic-dna')
    });
    setLoaded(true);
  }, []);
  return (
    loaded &&
    <React.Fragment>
      {
        uploading &&
        <div className='fw-6 fc-primary'><Spin indicator={<LoadingOutlined />} /> Uploading ...</div>
      }
      <comp.CKEditor
        editor={comp.ClassicEditor}
        data={props.value}
        config={{
          table: {
            customClass: ['ui', 'table', 'celled'],
          },
          mediaEmbed: {
            previewsInData: true
          },
          image: {
            customClass: ['ui', 'fluid', 'image'],
          },
          toolbar: [
            'code',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'imageUpload',
            'insertImage',
            'codeBlock',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
          ],
          link: {
            rators: {
              dTargetToExternalLinks: {
                de: 'automatic',
                llback: (url) => /^(https?:)?\/\//.test(url),
                attributes: {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                },
              },
            },
          },
        }}
        onReady={(editor) => {
          // editor.onUpload = this.props.onUpload;
          // editor.accessToken = this.props.accessToken;
          DNXCustomUploadAdapterPlugin(editor, e => setUploading(e));
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          props.onChange(data);
        }}
      />
    </React.Fragment>
  );
};
/*
class CKEditor5 extends Component {
  constructor (props) {
    super(props);
    this.state = {
      comp: {
        CKEditor: null,
        ClassicEditor: null
      },
      loaded: false,
      uploading: false
    };
  }
  componentDidMount () {
    this.setState({
      comp: {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        ClassicEditor: require('ckeditor5-build-classic-dna')
      },
      loaded: true,
    });
  }
  static get propTypes () {
    return {
      value: PropTypes.string,
      onChange: PropTypes.func,
      accessToken: PropTypes.string,
      onUpload: PropTypes.func,
    };
  }
  render () {
    return (
      this.state.loaded &&
      <React.Fragment>
        {
          this.state.uploading &&
          <div className='fw-6 fc-primary'><Spin indicator={<LoadingOutlined />} /> Uploading ...</div>
        }
        <this.state.comp.CKEditor
          editor={this.state.comp.ClassicEditor}
          data={this.props.value}
          config={{
            table: {
              customClass: ['ui', 'table', 'celled'],
            },
            image: {
              customClass: ['ui', 'fluid', 'image'],
            },
            toolbar: [
              'code',
              '|',
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'indent',
              'outdent',
              '|',
              'imageUpload',
              'insertImage',
              'codeBlock',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'undo',
              'redo',
            ],
            link: {
              rators: {
                dTargetToExternalLinks: {
                  de: 'automatic',
                  llback: (url) => /^(https?:)?\/\//.test(url),
                  attributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  },
                },
              },
            },
          }}
          onReady={(editor) => {
            // editor.onUpload = this.props.onUpload;
            // editor.accessToken = this.props.accessToken;
            DNXCustomUploadAdapterPlugin(editor, e => this.setState({ ...this.state, uploading: e }));
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.props.onChange(data);
          }}
        />
      </React.Fragment>
    );
  }
}
export default CKEditor5;
*/