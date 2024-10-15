import React from "react";

function Card1() {
  const data = [{
    name : "Khudaya",
    description : "This song belongs to sarfira movie.",
  },
   {
name : "Maiya Mainu",
description : "This song belongs to Jersey Movie based on a cricketer",
  },
   {
name : "Thada Bhartar",
description : "This song belongs to Haryanavi music industry.",
  },];
  return (
    <>
      <div className="w-full h-screen bg-zinc-300 flex flex-col gap-4 justify-center items-center">
        {data.map((item, index) => {
          return (
            <div key={index} className="w-1/4 px-3 py-2 bg-zinc-100 rounded">
              <h3 className="font-semibold text-xl">{item.name}</h3>
              <p className="text-xs mt-2">
                {item.description}
              </p>
              <button className="px-2 py-1 bg-blue-400 text-xs font-semibold text-zinc-100 rounded mt-3">Download Now</button>
            </div>
          );
        })}
        ;
      </div>
    </>
  );
}

export default Card1;
