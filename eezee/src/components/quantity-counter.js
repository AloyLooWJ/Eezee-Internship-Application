import React from "react";

function quantityCounter() {
  function increaseCount(a, b) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
  }

  function decreaseCount(a, b) {
    var input = b.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 1) {
      value = isNaN(value) ? 0 : value;
      value--;
      input.value = value;
    }
  }

  return (
    <div className="counter">
        <span className="down" onClick={(event) => decreaseCount(event, event.target)}> - </span>
        <input type="text" value="1" />
        <span className="up" onClick={(event) => increaseCount(event, event.target)}> + </span>
    
        <style jsx>{`
        .counter {
            width: 150px;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #ccc;
        }
        .counter input {
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
        }`}</style>
    </div>
  );
}

export default quantityCounter;
