import React from "react";

import styles_name from "./style.module.css"
function Navbar1({data}) {
  return (
    <>
      <div className="w-full px-20 py-3 flex justify-between items-center">
        <h3 className={`${styles_name.a} ${styles_name.b}`}>Orange</h3>
        <div className="flex p-2 px-4 bg-orange-600 text-white rounded-md text-sm gap-3">
          <h3>Favourite</h3>
          <h2>{data.filter(item => item.added).length}</h2>
        </div>
      </div>
    </>
  );
}

export default Navbar1;
