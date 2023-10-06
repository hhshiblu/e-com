import React, { useState } from "react";

function BecomeSellerPage() {
  const [image, setImage] = useState(null);
console.log(image.data);
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; // Get the first dropped file

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = () => {
        // Set the result of the FileReader as the image source
        setImage(reader.result);
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="w-full h-[100vh] bg-gray-300">
      <p>Drag and drop an image</p>
      <h2>kfajkfjkajk akjfjk akfjk</h2>
      {image && <img src={image} alt="Dropped Image" />}
    </div>
  );
}

export default BecomeSellerPage;
