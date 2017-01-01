import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Upload, message, Col, Row } from 'antd';
import Squire from '../util/squire-raw';
export default class Editor extends React.Component {

  componentDidMount() {
    this.editor = new Squire(
      ReactDOM.findDOMNode(this.refs.editor), { blockTag: 'p' }
    );
    this.editor.addEventListener('blur', this.editorValueChanged.bind(this));
    this.editor.setHTML(this.props.content)
  }
  componentDidUnMount() {
    this.editor.removeEventListener('blur', this.editorValueChanged.bind(this));
    this.editor = null;
  }
  editorValueChanged(e) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.editor.getHTML());
    } else {
      console.log(this.editor.getHTML());
    }
  }
  addImage(info) {
    if (info.file.status === 'done') {
      const src = info.file.response.data;
      message.success(`${info.file.name} 图片插入成功.`);
      this.editor.insertImage(src);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 图片插入失败!`);
    }
  }
  render() {
    const { options = {} } = this.props;
    if (this.editor) {
      this.editor.setHTML(this.props.content);
    }
    options.uploadApi = options.uploadApi || '';
    const propsImg = {
      name: 'filename',
      action: options.uploadApi, // 'http://service.handsight.cn/common/upload?action=uploadimage&encode=utf-8',
      data: {
        type: '1',
      },
      showUploadList: false,
      accept: 'image/png,image/jpeg,image/jpg',
      headers: {
        'X-Requested-With': null,
      },
      onChange: this.addImage.bind(this),
    };
    let uploadImgBtn = '';
    if (options.uploadApi) {
      uploadImgBtn = (
        <Col span={3}>
            <Upload {...propsImg}>
              <Button type="ghost">插入图片</Button>
            </Upload>
        </Col>);
    }
    return (
      <div style={{ width: '100%', height: 'auto', border: '1px solid #d9d9d9', paddingBottom: '10px', borderRadius: '6px' }}>
        <div id="firstEditor" style={{ height: 'auto', outline: 'none', padding: ' 10px 10px 0', fontSize: '15px' }} ref="editor"></div>
        <hr style={{ marginBottom: '10px' }} />
        <Row style={{ padding: '0 10px' }} >
           {uploadImgBtn}
        </Row>
      </div>
    );
  }
}
