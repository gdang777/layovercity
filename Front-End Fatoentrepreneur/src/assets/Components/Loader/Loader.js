import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center loader" >
      <div className="loading">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
