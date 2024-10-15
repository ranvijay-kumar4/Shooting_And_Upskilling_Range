import React from "react";

function Card() {
  const data = [
    {
      image:
        "https://images.unsplash.com/photo-1722641277081-7077c4eaedac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 1",
      head: "Amazon Basics",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,magni. Sit saepe deleniti",
        instock: true,
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1724411829738-2841c0f47977?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 2",
      head: "Radio",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,magni. Sit saepe",
      instock: false,
    },
    {
      image: "https://images.unsplash.com/photo-1724328617556-8882b88a12d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 3",
      head: "Flower",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,magni. Sit saepe Hello",
      instock: true,
    },
  ];
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center gap-10 bg-zinc-200">
        {data.map((element, index) => {
          return (
            <div key={index} className="w-52 bg-zinc-100 rounded-md overflow-hidden">
              <div className="w-full h-32 bg-zinc-300">
                <img
                  className="w-full h-full object-cover"
                  src={element.image}
                  alt={element.alt}
                />
              </div>
              <div className="w-full px-3 py-4">
                <h2 className="font-semibold">{element.head}</h2>
                <p className="text-xs mt-3">{element.description}</p>
              </div>
              <button className={`px-4 py-1 ${element.instock ? 'bg-blue-600' : 'bg-red-600'} text-xs rounded text-zinc-100 mt-3`}>{element.instock ? "In Stock" : "Out of Stock"}</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Card;
