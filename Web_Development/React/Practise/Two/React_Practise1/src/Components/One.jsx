import React from "react";

function One() {
  const data = ["Hello", "Hi", "Ok", "Fine"];
  return (
    <>
      <div>
        {data.map((element, index) => (
          <div key={index} className="px-3 py-4 bg-zinc-300 rounded-md w-fit">
            {element}
          </div>
        ))}
      </div>
    </>
  );
}

export default One;
