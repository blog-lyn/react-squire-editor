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
    const currentContent = this.editor.getHTML();
    if (typeof this.props.onChange === 'function' && currentContent.length !== this.props.content.length) {
      this.props.onChange(currentContent);
    } else {
      console.log(currentContent);
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
    options.uploadFileName = options.uploadFileName || 'filename';
    options.uploadAction = options.uploadAction || '';
    options.uploadData = options.uploadData || { type: '1' };
    options.debug = options.debug || '';
    const propsImg = {
      name: options.uploadFileName,
      action: options.uploadAction,
      data: options.uploadData,
      showUploadList: false,
      accept: 'image/png,image/jpeg,image/jpg',
      headers: {
        'X-Requested-With': null,
      },
      onChange: this.addImage.bind(this),
    };
    let toolBar = '';
    if (options.uploadAction) {
      if (options.debug) {
        console.log('Your upload config: ', options)
      }
      toolBar = (
        <div>
          <hr style={{ marginBottom: '10px' }} />
          <Row style={{ padding: '0 10px' }} >
            <Col span={3}>
              <Upload {...propsImg}>
                <Button type="ghost">插入图片</Button>
              </Upload>
          </Col>
          </Row>
        </div>
      );
    }
    return (
      <div style={{ width: '100%', height: 'auto', minHeight: '50px', margin: '10px auto', border: '1px solid #d9d9d9', paddingBottom: '10px', borderRadius: '6px' }}>
        <div style={{ height: 'auto', minHeight: '50px', outline: 'none', padding: ' 10px 10px 0', fontSize: '15px' }} ref="editor">
        </div>
        {toolBar}
      </div>
    );
  }
}
