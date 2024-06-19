// src/components/ImageEditPage.js
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import CornerstoneViewport from "react-cornerstone-viewport";
import dicomParser from "dicom-parser";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./ImageEditPage.css";

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

const ImageEditPage = () => {
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState(null);
  const [isDicom, setIsDicom] = useState(false);
  const [selectedPixel, setSelectedPixel] = useState(null);
  const cropperRef = useRef(null);

  useEffect(() => {
    // Simulate loading image based on location state or params
    const imageFile = location.state ? location.state.imageFile : null;
    if (imageFile) {
      const isDicomFile = imageFile.type === "application/dicom";
      setIsDicom(isDicomFile);

      if (isDicomFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          const byteArray = new Uint8Array(arrayBuffer);
          dicomParser.parseDicom(byteArray);
          const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(
            imageFile
          );
          setImageSrc(imageId);
        };
        reader.readAsArrayBuffer(imageFile);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target.result);
        };
        reader.readAsDataURL(imageFile);
      }
    }
  }, [location.state]);

  const handleCrop = () => {
    if (cropperRef.current) {
      console.log(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
      // You can perform further actions with the cropped image data here
    }
  };

  const handlePixelSelect = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setSelectedPixel({ x: offsetX, y: offsetY });

    // Example: Calculate pixel value at the selected coordinates
    // Replace with actual implementation based on your image data format
    const pixelValue = calculatePixelValue(offsetX, offsetY);
    console.log(`Selected Pixel Value: ${pixelValue}`);
  };

  const calculatePixelValue = (x, y) => {
    // Placeholder function to calculate pixel value (dummy logic)
    return Math.floor(Math.random() * 256); // Random value for demonstration
  };

  return (
    <div className="image-edit-page">
      {imageSrc &&
        (isDicom ? (
          <div className="cornerstone-viewport" onMouseMove={handlePixelSelect}>
            <CornerstoneViewport
              imageIds={[imageSrc]}
              style={{ minWidth: "100%", height: "512px", flex: "1" }}
            />
            {selectedPixel && (
              <div className="pixel-info">
                <p>
                  Selected Pixel: ({selectedPixel.x}, {selectedPixel.y})
                </p>
                <p>
                  Pixel Value:{" "}
                  {calculatePixelValue(selectedPixel.x, selectedPixel.y)}
                </p>
              </div>
            )}
          </div>
        ) : (
          <TransformWrapper>
            <TransformComponent>
              <div className="cropper-container">
                <Cropper
                  src={imageSrc}
                  style={{ height: "100%", width: "100%" }}
                  initialAspectRatio={1}
                  guides={false}
                  ref={cropperRef}
                />
              </div>
            </TransformComponent>
          </TransformWrapper>
        ))}
      {!isDicom && <button onClick={handleCrop}>Crop Image</button>}
    </div>
  );
};

export default ImageEditPage;
