// src/components/ParentComponent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileLoader from "./FileLoader";
import "./ParentComponent.css";

const ParentComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleEditClick = () => {
    if (selectedFile) {
      navigate("/edit", { state: { imageFile: selectedFile } });
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="parent-component">
      <FileLoader onFileSelect={handleFileSelect} />
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};

export default ParentComponent;
