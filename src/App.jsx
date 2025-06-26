import React, { useState } from "react";
import "./App.css";
import bear from "./assets/bear.png"

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ left: "50%", top: "70%" });
  const [showYay, setShowYay] = useState(false);
   const [bearTransform, setBearTransform] = useState('');

  const handleYesClick = () => {
    setShowYay(true);
  };

  const moveNoButton = (e) => {
    const button = e.target;
    
    const margin = 100;
    const maxX = window.innerWidth - 600 - margin;
    const maxY = window.innerHeight - 400 - margin; 
    
    const x = Math.max(margin, Math.min(maxX, Math.random() * (maxX - margin) + margin));
    const y = Math.max(margin, Math.min(maxY, Math.random() * (maxY - margin) + margin));
    
    button.style.position = 'absolute';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    button.style.zIndex = '20';
    button.style.transform = 'none';
  };

   const handleBearMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
   
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    
    const translateZ = Math.abs(rotateX) + Math.abs(rotateY);
    
    setBearTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(1.05)`);
  };

  const handleBearMouseLeave = () => {
    setBearTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)');
  };

  return (
    <div className="w-full h-screen bg-night relative overflow-hidden flex justify-center items-center">
      
      <div className="absolute w-full h-full bg-stars z-0" />

      <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/30 shadow-2xl w-[450px] max-w-[90vw] h-[590px] max-h-[90vh] rounded-3xl flex flex-col justify-between p-8 sm:p-9 text-white">
        <div className="text-center -mt-2 text-3xl sm:text-4xl font-semibold">
          WOULD YOU LIKE <br /> TO GO ON A DATE <br /> WITH ME ??
        </div>
        <img 
          src={bear} 
          className="absolute sm:mt-35 sm:ml-8 mt-30 ml-17 sm:w-60 sm:h-60 md:w-80 md:h-80 w-44 h-44 object-cover z-0 cursor-pointer transition-all duration-200 ease-out"
          style={{ 
            transform: bearTransform,
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
          }}
          onMouseMove={handleBearMouseMove}
          onMouseLeave={handleBearMouseLeave}
        />


        <div className="flex justify-center gap-3 sm:gap-6">
          <button onClick={handleYesClick} className="sm:px-6 sm:py-2 px-4 py-1 cursor-pointer bg-blue-300 hover:bg-green-300 transition rounded-full text-3xl shadow-md text-white font-semibold">
            Yes
          </button>
          <button
            onClick={moveNoButton}
            className="sm:px-6 sm:py-2 px-4 py-1 cursor-pointer bg-black hover:bg-red-400 transition rounded-full text-3xl shadow-md text-white font-semibold"
          >
            No
          </button>
        </div>
      </div>

      {showYay && (
        <div className="fixed inset-0 bg-black opacity-85 flex items-center justify-center z-50">
          <div className="text-white text-9xl font-bold animate-bounce">
            YAYYYYYY!!!!! 
          </div>
        </div>
      )}
    </div>
    
  );
}

export default App;

