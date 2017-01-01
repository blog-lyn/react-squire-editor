# react-squire-editor

this package is a react version of  Squire editor(an rich text editor),

it has two simple function:

-  use content props to  set the html content to the editor.

-  use onchange function to get the html content form the editor.


# Usage:

```
npm install react-squire-editor antd
```

in your component:

```
import React from 'react';
import ReactDOM from 'react-dom';
import Editor from 'react-squire-editor';

const app = document.getElementById('app');

const editorOptions = {
  uploadAction: 'http://youruploadApi?action=uploadimage&encode=utf-8',
  uploadFileName: 'filename',
  uploadData: { type: '1' },
}
function handleChange(value) {
  console.log(value)
}
ReactDOM.render(
  <Editor options={editorOptions} content={''} onChange={handleChange} />,
app);
```
