import React from 'react'

// function Friend({image, color, name, profession}) {
    function Friend({values, click, index}) {
        const {image, friend, name, profession} = values;
  
  return (
    <>
      <div className="w-52 bg-white rounded-md overflow-hidden">
        <div className="w-full h-40 bg-sky-200">
            <img className='w-full h-full object-cover' src={image} alt="Image" />
        </div>
        <div className="w-full p-3">
            <h3 className="text-xl font-semibold">{name}</h3>
            <h5 className="text-xs">{profession}</h5>
            <button onClick={()=>click(index)} className={`mt-4 px-3 py-1 text-xs text-white ${friend === true ? "bg-red-500" : "bg-green-500"} font-semibold rounded-md`}>{friend === true ? "Not Friend" : "Friend"}</button>
        </div>
      </div>
    </>
  )
}

export default Friend
