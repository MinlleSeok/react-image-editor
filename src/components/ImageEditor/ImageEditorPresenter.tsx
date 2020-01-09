/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, ChangeEvent } from 'react';
import './ImageEditor.scss';

interface ImageEditorPresenterProps {
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
  addShape: () => void;
  removeShape: () => void;
  rotateBgImage: () => void;
  saveImage: () => void;
}

const ImageEditorPresenter: React.FC<ImageEditorPresenterProps> = props => {

  const { handleImage, addShape, removeShape, rotateBgImage, saveImage } = props;

  return (
    <div className="container">
      <div id="ImageEditor">
        <div className="image-editor-menu">
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImage}
          />
          <label htmlFor="imageUpload">
            <div className="image-editor-button">Image Upload</div>
          </label>
          <div className="image-editor-button" onClick={addShape}>
            Add Shape
        </div>
          <div className="image-editor-button" onClick={removeShape}>
            Remove Shape
        </div>
          <div className="image-editor-button" onClick={rotateBgImage}>
            Rotate Image
        </div>
          <div className="image-editor-button" onClick={saveImage}>
            View My Image
        </div>
        </div>
        <canvas id="main-canvas" />
      </div>
      <h1>React Image Editor</h1>
    </div>
  );
};

export default ImageEditorPresenter;
