import React, { useState } from "react";
import Card3 from "./Card3";
import Navbar1 from "./Navbar1";
function Song() {
  const data = [
    {
      image:
        "https://images.unsplash.com/photo-1724226224544-b244b08e505e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Feather",
      artist: "Vivek Kumar",
      added: false,
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1692833836807-7c2ec90aec19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Food",
      artist: "Amazed",
      added: false,
    },
    {
      image:
        "https://images.unsplash.com/photo-1723718283396-01bc394cdf5d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "SunFlower",
      artist: "Hero",
      added: false,
    },
    {
      image:
        "https://images.unsplash.com/photo-1724086572650-685ff295750e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Girl",
      artist: "Female",
      added: false,
    },
    {
      image:
        "https://images.unsplash.com/photo-1724454216479-340fff563a19?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Baloon",
      artist: "Hot Air",
      added: false,
    },
    {
      image:
        "https://images.unsplash.com/photo-1724105266499-fceb8fbe7bb5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "City",
      artist: "Light",
      added: false,
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1718400026904-84abfa334942?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Blur",
      artist: "Vision",
      added: false,
    },
    {
      image:
        "https://images.unsplash.com/photo-1724403126398-ea3505a400c9?q=80&w=2054&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Female",
      artist: "Bold",
      added: false,
    },
  ];

 const[songData, setSongData] = useState(data);
 const handleClick = (index) => {
setSongData((prev)=>{
return prev.map((item, itemIndex) => {
    if (itemIndex === index) {
        return {
            ...item, added: !item.added
        };
    }
    return item;
})
})
 }
  return (
    <>
      <div className="w-full h-screen bg-zinc-300">
        <Navbar1 data={songData}/>
        <div className="px-20 flex flex-wrap gap-10 mt-10">
          {songData.map((item, index) => {
            return <Card3 key={index} index={index} handleClick={handleClick} values={item} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Song;
