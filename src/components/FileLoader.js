// src/components/FileLoader.js
import React, { useState } from "react";

const FileLoader = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="file-loader">
      <input type="file" id="file-input" onChange={handleFileChange} />
      <label htmlFor="file-input">Choose a file</label>
      {fileName && <div className="file-name">{fileName}</div>}
    </div>
  );
};

export default FileLoader;
