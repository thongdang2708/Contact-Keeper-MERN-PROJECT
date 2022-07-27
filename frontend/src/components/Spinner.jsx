
import React from 'react';
import Loading from "../assets/loading.gif";

function Spinner() {
  return (
    <div className="text-center w-100">
        <img src={Loading} alt="loading" width={180} className="inline-block text-center"/>
    </div>
  )
}

export default Spinner