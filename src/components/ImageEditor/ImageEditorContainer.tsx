/* eslint-disable new-cap */
/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { fabric } from 'fabric';
import ImageEditorPresenter from './ImageEditorPresenter';

interface Props {
  canvasWidth: string | number;
  canvasHeight: string | number;
}

interface BgImage {
  src: fabric.Image | null;
  angle: number;
}

interface State {
  canvas: (fabric.Canvas | null);
  fileName: string | null;
  bgImage: BgImage;
  uploaded: number;
};

class ImageEditorContainer extends Component<Props, State> {

  state: State = {
    canvas: null,
    fileName: null,
    bgImage: { src: null, angle: 0 },
    uploaded: 0
  }

  componentDidMount = () => {
    const { canvasWidth, canvasHeight } = this.props;
    // create a wrapper around native canvas element (with id="~")
    this.state.canvas = new fabric.Canvas('main-canvas');
    this.state.canvas.setWidth(canvasWidth);
    this.state.canvas.setHeight(canvasHeight);
  };

  rotateBgImage = () => {
    if (this.state.bgImage.angle === 360) {
      this.setState(states => ({ ...states, bgImage: { ...states.bgImage, angle: 90 } }));
    } else {
      this.setState(states => ({ ...states, bgImage: { ...states.bgImage, angle: states.bgImage.angle + 90 } }));
    }
    if (this.state.canvas && this.state.canvas.backgroundImage && this.state.bgImage.src) {
      (this.state.canvas.backgroundImage as any).rotate(this.state.bgImage.angle);
      this.state.canvas.renderAll();
    }

  };

  setCanvasBackgroundImage = (img: fabric.Image, angle?: number) => {
    if (this.state.canvas && img) {
      this.state.canvas.setBackgroundImage(img, this.state.canvas.renderAll.bind(this.state.canvas), {
        scaleX: this.state.canvas.getWidth() / img.getScaledWidth(),
        scaleY: this.state.canvas.getHeight() / img.getScaledHeight(),
        angle: angle ? angle : 0
      });
      this.setState(states => ({ ...states, bgImage: { ...states.bgImage, src: img, angle: angle ? angle : 0 } }));
    }
  }


  handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const that = this;

    if (
      !(
        e.target.files && (
          e.target.files[0].type === 'image/png' ||
          e.target.files[0].type === 'image/jpeg' ||
          e.target.files[0].type === 'image/gif' ||
          e.target.files[0].type === 'image/webp' ||
          e.target.files[0].type === 'image/bmp')
      )
    ) {

      alert(`check-your-image-extension`);
      that.setState(states => ({ ...states, uploaded: 1 }));
      return;
    }

    this.state.fileName = e.target.files[0].name;

    const reader = new FileReader();
    reader.onload = function (f) {

      let data: string | ArrayBuffer | null = null;
      if (f.target) {
        data = f.target.result;
      }

      if (data) {
        fabric.Image.fromURL(data.toString(), (img) => that.setCanvasBackgroundImage(img));
        that.setState(states => ({ ...states, uploaded: 2 }));
      }

    };
    reader.readAsDataURL(e.target.files[0]);
  };

  addShape = () => {
    // create a rectangle with angle=45
    const rectObj = new fabric.Rect({
      fill: 'red',
      left: 230,
      top: 150,
      width: 80,
      height: 40,
    });

    if (this.state.canvas) {
      this.state.canvas.add(rectObj);
      this.state.canvas.setActiveObject(rectObj);
    }
  };

  removeShape = () => {
    if (this.state.canvas && this.state.canvas.getActiveObject()) {
      this.state.canvas.remove(this.state.canvas.getActiveObject());
    }
  };

  getImage = () => {
    if (this.state.canvas)
      return this.state.canvas.toDataURL();
  };

  downloadURI = (uri: string, name: string) => {
    const link = document.createElement("a");
    const text = document.createTextNode("Download Image");
    link.download = name;
    link.href = uri;
    link.appendChild(text);
    return link;
  }

  saveImage = () => {
    if (this.state.canvas) {
      const NEW_WINDOW = window.open('');
      const IMG = document.createElement("img");
      IMG.src = this.state.canvas.toDataURL();
      const LINK = this.downloadURI(IMG.src, "img");
      if (NEW_WINDOW) {
        NEW_WINDOW.document.body.appendChild(IMG);
        NEW_WINDOW.document.body.appendChild(LINK);
      }
 
    }
  }

  dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const bb = new Blob([ab], { type: mimeString });
    return bb;
  };

  uploadImage = () => {
  };
  
  handleUploadImage = () => {

    if (this.state.uploaded === 0) {
      alert(`check-your-image-upload`);
      return;
    }

    if (this.state.uploaded === 1) {
      alert(`check-your-image-extension`);
      return;
    }

    const confirmation = confirm(`upload-question`);
    const data = this.getImage();
    let image_data = null;

    if (data)
      image_data = data.match(/[^:/]\w+(?=;|,)/);

    if (confirmation && this.state.uploaded === 2 && image_data) {
      const extension = image_data[0];
      if (
        !(
          extension === 'png' ||
          extension === 'jpg' ||
          extension === 'jpeg' ||
          extension === 'gif'
        )
      ) {
        alert(`check-your-image-extension`);
        return;
      }

      if (data) {
        const blob = this.dataURItoBlob(data);
        const formData = new FormData();
        if (this.state.fileName)
          formData.append('image', blob, this.state.fileName);

        // this.uploadImage(formData);
      }
    } else {
    }
  };

  render() {
    const {
      handleImage,
      addShape,
      removeShape,
      rotateBgImage,
      saveImage
    } = this;
    return (
      <ImageEditorPresenter
        handleImage={handleImage}
        addShape={addShape}
        removeShape={removeShape}
        rotateBgImage={rotateBgImage}
        saveImage={saveImage}
      />
    );
  }
}

export default ImageEditorContainer;
