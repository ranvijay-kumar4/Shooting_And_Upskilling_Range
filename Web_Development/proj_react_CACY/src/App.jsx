import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Components/Card'

function App() {
  let [counter, setCounter] = useState(10);

  // let counter = 15;
  const addvalue = () => {
    if (counter <= 20) {
      setCounter(counter++);
    }
  }
  const RemoveValue = () => {
    if (counter >= 0) {
      setCounter(counter--);
    }
  }
  return (
    <>
      <h1 className='bg'>Hello World</h1>
      <h2>Counter Value : {counter}</h2>

      <button
        onClick={addvalue}>Add Value {counter} </button>
      <br />
      <br />
      <button
        onClick={RemoveValue}>Remove Value {counter}</button>

      <h1 className='bg-slate-100 text-black rounded-xl m-4'>Ranvijay</h1>

      <Card />
      <br />
      <Card />
    </>
  )
}

export default App
