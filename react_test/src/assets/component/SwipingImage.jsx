import React, { useState, useEffect } from "react";

const SwipingImage = () => {
  const [imageData, setImageDate] = useState([]);
  const [productID, setProductID] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  

  const fetchWord = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productID}`
      );
      const data = await response.json();
      console.log(data);
      setImageDate(data);
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };

  useEffect(() => {
    fetchWord();
  }, [productID]);

  const handlePrevImage = () => {
    setTimeout(() => {
        setIsLoading(true)
        setProductID((productID) => productID - 1);
    }, 2000)
    
  };

  const handleNextImage = () => {
    setTimeout(() => {
        setIsLoading(true)
        setProductID((productID) => productID + 1);
    }, 2000)
    
  };

  return (
    <div>
      <div className="firstImage">
        <h1>{imageData.title}</h1>
        <img src={imageData.images && imageData.images[0]} alt="" />
        <p className="PLoading" style={{opacity: "0"}}>{isLoading}Loading</p>
        <p>${imageData.price}</p>
        <p>{imageData.description}</p>
      </div>

      <button onClick={handlePrevImage}>Prev</button>
      <button onClick={handleNextImage}>Next</button>
     
    </div>
  );
};

export default SwipingImage;


