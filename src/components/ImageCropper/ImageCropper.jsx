import React, { useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import 'react-image-crop/src/ReactCrop.scss'
import demoImage from "./logo.png";


function ImageCropper(props) {
  const { imageToCrop, onImageCropped } = props;

  const [crop, setCrop] = useState({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  })

  const imageRef= useRef();
  useEffect(()=>{
    cropImage(crop)
  },[])

  async function cropImage(crop) {
    if (crop) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop
      );

      // calling the props function to expose
      // croppedImage to the parent component
      console.log("object");
      console.log(croppedImage)
      onImageCropped(croppedImage);
    }
  }
  function getCroppedImage(sourceImage, cropConfig) {
    // creating the cropped image from the source image
    sourceImage = sourceImage.current;
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width * scaleX;
    canvas.height = cropConfig.height * scaleY;
    const ctx = canvas.getContext("2d");
    
    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );
    
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
    
        blob.name = new Date().getTime() + ".jpeg";
        const croppedImageUrl = blob;
    
        resolve(croppedImageUrl);
      }, "image/jpeg");
    });
    
}

  return (
    <ReactCrop
      crop={crop}
      onComplete={(cropConfig) => cropImage(cropConfig)}
      onChange={(c) => setCrop(c)}
      crossorigin="anonymous" // to avoid CORS-related problems
    >
      <img src={imageToCrop||demoImage} alt="" ref={ref=>ref!==null&&(imageRef.current = ref)}/>
    </ReactCrop>
  );
}

ImageCropper.defaultProps = {
  onImageCropped: () => {}
};

export default ImageCropper;
