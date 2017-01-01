# react-squire-editor

this package is a react version of  Squire editor(an rich text editor),

it has two simple function:

1. it allows you to use content props to  set the html content to the editor.

2. it allows you to use onchange function to  get the html content form the editor.


# Usage:

```
npm install react-squire-editor

```

in your component:

```
import React from 'react';
import ReactDOM from 'react-dom';
import Editor from 'react-squire-editor';

const app = document.getElementById('app');
const editorOptions = {
  uploadApi: 'http://yourUploadApi/common/upload?action=uploadimage&encode=utf-8',
}
function handleChange(value) {
  console.log(value)
}
ReactDOM.render(
  <Editor options={editorOptions} content={''} onChange={handleChange} />,
app);
```
