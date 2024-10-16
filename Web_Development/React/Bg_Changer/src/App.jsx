import React, { useState } from 'react'

function App() {

  const [color, setColor] = useState("black");
  const [counter, setCounter] = useState(0);


  return (

    <div className="w-full h-screen duration-200"
      // Can be also written as : style={{backgroundColor: "#000"}}
      style={{ backgroundColor: color }}>
      <div className="my-auto flex justify-center flex-col items-center">
        <h1 className='text-5xl m-2 font-bold border-4 border-solid rounded-lg bg-white'>Count : {counter}</h1>

        <button className='text-xl border-4 border-solid p-1 gap-2 m-1 rounded-lg bg-green-500 color text-white' onClick={() => {
          setCounter(counter + 1);
        }}>Increment</button>

        <button className='text-xl border-4 border-solid p-1 gap-2 m-1 rounded-lg bg-red-500 color text-white' onClick={() => {
          if (counter > 0) {
            setCounter(counter - 1);
          }
        }}>Decrement</button>
      </div>
      <div className=" fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">

        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-2 py-1 rounded-3xl">

          <button
            onClick={() => setColor("Red")}
            className="outline-none px-4 py-2 rounded-full text-white shadow-lg " style={{ backgroundColor: "Red" }}>
            Red
          </button>

          <button
            onClick={() => setColor("Green")}
            className="outline-none px-4 py-2 rounded-full text-white shadow-lg " style={{ backgroundColor: "Green" }}>
            Green
          </button>

          <button
            onClick={() => setColor("Blue")}
            className="outline-none px-4 py-2 rounded-full text-white shadow-lg " style={{ backgroundColor: "Blue" }}>
            Blue
          </button>

          <button
            onClick={() => setColor("Grey")}
            className="outline-none px-4 py-2 rounded-full text-white shadow-lg " style={{ backgroundColor: "Grey" }}>
            Grey
          </button>

          <button
            onClick={() => setColor("Yellow")}
            className="outline-none px-4 py-2 rounded-full text-black shadow-lg " style={{ backgroundColor: "Yellow" }}>
            Yellow
          </button>

          <button
            onClick={() => setColor("Pink")}
            className="outline-none px-4 py-2 rounded-full text-black shadow-lg " style={{ backgroundColor: "Pink" }}>
            Pink
          </button>

          <button
            onClick={() => setColor("Purple")}
            className="outline-none px-4 py-2 rounded-full text-white shadow-lg " style={{ backgroundColor: "Purple" }}>
            Purple
          </button>

          <button
            onClick={() => setColor("White")}
            className="outline-none px-4 py-2 rounded-full text-black shadow-lg " style={{ backgroundColor: "White" }}>
            White
          </button>


          <button
            onClick={() => setColor("Black")}
            className="outline-none px-4 py-2 rounded-full text-white shadow-lg " style={{ backgroundColor: "Black" }}>
            Black
          </button>
        </div>
      </div>
    </div>
  )
}

export default App