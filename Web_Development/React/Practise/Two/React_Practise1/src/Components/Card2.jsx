import React, {useState} from 'react'

import { FaArrowCircleRight } from "react-icons/fa";
// React Icons are getting used.
function Card2() {
    const [val, setVal] = useState(false); 
  return (
    <>
      <div className="w-full h-screen bg-zinc-300 flex justify-center items-center">
        <div className="relative w-60 h-32 bg-zinc-500 rounded-md flex overflow-hidden">
            <img src="https://plus.unsplash.com/premium_photo-1669050701946-d34455dce075?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image1" className={`w-full h-full object-cover ${val===false? "-translate-x-[0%]" : "-translate-x-[100%]"} shrink-0 transition-transform duration-500 ease-in-out`} />
            <img src="https://images.unsplash.com/photo-1723920515274-ace3503adad6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" alt="Image1" className={`w-full h-full object-cover ${val===false? "-translate-x-[0%]" : "-translate-x-[100%]"} shrink-0 transition-transform duration-500 ease-in-out`} />
            <span onClick={()=>{
                setVal(()=>!val)
            }} className='w-5 h-5 absolute flex items-center justify-center rounded-full bg-[#dadada8b] bottom-[0%] left-1/2 -translate-x-[50%] -translate-y-[50%] cursor-pointer'>
                <FaArrowCircleRight size={".7em"}/>
            </span>
        </div>
      </div>
    </>
  )
}

export default Card2
