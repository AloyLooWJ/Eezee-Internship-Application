import React from "react";

// Handle quantity change when users change the quantity from product page
function quantityCounter({quantity , onQuantityChange}) {

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="counter">
      <span className="down" onClick={handleDecrement}>
        {" "}
        -{" "}
      </span>
      <div className="value">{quantity}</div>
      <span className="up" onClick={handleIncrement}>
        {" "}
        +{" "}
      </span>

      <style jsx>{`
        .counter {
          width: 150px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ccc;
        }
        .counter .value {
          width: 70px;
          height: 40px;
          line-height: 30px;
          font-size: 20px;
          text-align: center;
          background: white;
          color: black;
          appearance: none;
          outline: 0;
          border: 1px solid #ccc;
        }
        .counter span {
          display: block;
          font-size: 25px;
          padding: 0 10px;
          cursor: pointer;
          color: #0052cc;
          user-select: none;
        }
      `}</style>
    </div>
  );
}

export default quantityCounter;
