import React, { useState } from "react";

import Form from "./Form";
import FormCards from "./FormCards";

function FormHandle_Card() {
    const [users, setUsers] = useState([]);

const handleSubmitData = (data)=>{
    setUsers([...users, data])
}

const handleRemove = (id)=>{
    setUsers(()=>users.filter((item, index)=>index!=id))
}

  return (
    <>
      <div className="w-full h-screen bg-zinc-200 flex items-center justify-center">
        <div className="container mx-auto">
          <FormCards handleRemove={handleRemove} users={users} />
          <Form handleSubmitData={handleSubmitData}/>
        </div>
      </div>
    </>
  );
}

export default FormHandle_Card;
