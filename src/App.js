// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ParentComponent from "./components/ParentComponent";
import ImageEditPage from "./components/ImageEditPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Image Viewer Application</h1>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<ParentComponent />} />
            <Route path="/edit" element={<ImageEditPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
