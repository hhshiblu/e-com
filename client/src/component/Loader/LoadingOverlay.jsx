// LoadingOverlay.js

import React from "react";

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#00000199] z-50">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-black"></div>
    </div>
  );
};

export default LoadingOverlay;
