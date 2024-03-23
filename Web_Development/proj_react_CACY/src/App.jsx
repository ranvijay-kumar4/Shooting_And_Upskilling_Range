import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let counter = 15;
  const addvalue = () => {
    console.log (counter++)
  }
  return (
    <>
        <h1>Hello World</h1>
        <h2>Counter Value : {counter}</h2>    

        <button
        onClick={addvalue}>Add Value</button>
        <br />
        <br />
        <button>Remove Value</button>



    </>
  )
}

export default App
