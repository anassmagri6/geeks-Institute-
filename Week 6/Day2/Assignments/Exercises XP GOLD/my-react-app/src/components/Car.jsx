import { useState } from "react";

function Car({ carInfo }) {
    const [color,setcolor]=useState('red');
  return (
    <div>
    <h1>
      This car is a {color} {carInfo.model}
    </h1>
    
    </div>
  );
}

export default Car;


