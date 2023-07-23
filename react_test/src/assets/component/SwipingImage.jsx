import React, { useState, useEffect } from "react";

const SwipingImage = () => {
  const [imageData, setImageDate] = useState([]);
  const [productID, setProductID] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  //   const [inputValue, setInputValue] = useState("");

  const newInputValue = (e) => {
    const newValue = e.currentTarget.value;
    setProductID(newValue);
  };

  const fetchWord = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productID}`
      );
      const data = await response.json();
      //   console.log(data);
      setImageDate(data);
    } catch (error) {
      console.error("Error fetching word:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const handlePrevImage = () => {
    setProductID((productID) => productID - 1);
  };

  const handleNextImage = () => {
    setProductID((productID) => productID + 1);
  };

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="firstImage">
          <p>{imageData.id}</p>
          <h1>{imageData.title}</h1>
          <div className="imageContainer">
            <img
              src={imageData.images && imageData.images[0]}
              alt=""
              className="imageDisplay"
            />
          </div>
          <div className="wordContainer">
            <p>Price: ${imageData.price}</p>
            <p>Description: {imageData.description}</p>
          </div>
        </div>

        <div className="btnContainer">
          <button onClick={handlePrevImage}>Prev</button>
          <button onClick={handleNextImage}>Next</button>
        </div>
      </div>

      <div className="inputContainer">
        <input
          type="text"
          onInput={newInputValue}
        />
        <button className="btnClicked" onClick={fetchWord}>
          Move to the desired page
        </button>
      </div>
    </div>
  );
};

export default SwipingImage;
