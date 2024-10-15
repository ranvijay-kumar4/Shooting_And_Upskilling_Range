import React from "react";

function FormCard({ user, handleRemove, id }) {
  return (
    <>
      {users.map((item, index) => {
        return (
          <div className="w-52 h-full bg-zinc-100 rounded-lg flex flex-col items-center p-2">
            <div className="image w-[3vw] h-[3vw] rounded-full bg-zinc-200 overflow-hidden">
              <image className="w-full h-full object-cover" src={user.image} alt="" />
            </div>
            <h1 className="mt-1 text-xl text-center leading-none font-semibold">{user.name}</h1>
            <h4 className="opacity-60 text-xl font-semibold">{user.email}</h4>
            <p className="mt-1 text-center text-xs font-semibold leading-1 tracking-tight">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur enim obcaecati pariatur.
            </p>
            <button onClick={()=>handleRemove(id)} className="px-3 py-1 bg-red-600 text-xs rounded-md font-semibold text-white mt-4">
              Remove It
            </button>
          </div>
        );
      })}
    </>
  );
}

export default FormCard;
