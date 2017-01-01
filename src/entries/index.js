import React from 'react';
import ReactDOM from 'react-dom';
import Editor from '../components/Editor';

const app = document.getElementById('app');
const editorOptions = {
  uploadApi: 'http://service.handsight.cn/common/upload?action=uploadimage&encode=utf-8',
}
function handleChange(value) {
  console.log(value)
}
ReactDOM.render(
  <Editor options={editorOptions} content={''} onChange={handleChange} />,
app);
