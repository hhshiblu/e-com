import React from "react";
import "./SellerLoader.css"

function SellerLoader() {
  return (
    <div className="body h-[calc(100vh-64px)]">
      <div className="container">
        <h2>R D</h2>

        <div className="loader">
          <span style={{ "--i": 0 }}></span>
          <span style={{ "--i": 1 }}></span>
          <span style={{ "--i": 2 }}></span>
          <span style={{ "--i": 3 }}></span>
          <span style={{ "--i": 4 }}></span>
          <span style={{ "--i": 5 }}></span>
          <span style={{ "--i": 6 }}></span>
          <span style={{ "--i": 7 }}></span>
        </div>
      </div>

      <svg className="svg">
        <filter id="Gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          <feColorMatrix
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10"
          />
        </filter>
      </svg>
    </div>
  );
}

export default SellerLoader;
