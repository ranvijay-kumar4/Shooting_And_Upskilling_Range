import React, { useState } from 'react'

// By using Controlled Components : Jab bhi kuch likhe usestate k through data real time par update kr do
// jaise hi kuch type ho set state kardo new value ke equal 


function FormHandling2() {
    const [val, setVal] = useState({name: "", email: ""});

    const handleSubmit = (event) => {
            event.preventDefault();
            console.log(val);
        }
    
       // Event Handler function to update the state based on user input
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input onChange={(event)=>setVal({...val, name: event.target.value}, console.log(event.target.value))} type="text" placeholder='Name' name="" id="" />
        <input onChange={(event)=>setVal({...val, email: event.target.value})} type="text" placeholder='Email' name="" id="" />
        <input type="submit" value="Submit" />

      </form>
    </>
  )
}

export default FormHandling2
