import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import ImageEditorContainer from './components/ImageEditor';

ReactDOM.render(
    <ImageEditorContainer canvasWidth={400} canvasHeight={500} />,
    document.getElementById('app')
);