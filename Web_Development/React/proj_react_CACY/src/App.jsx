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

  /* 
   const addvalue = () => {
      if (counter <= 20) {
        setCounter(counter++);
        setCounter(counter++);
        setCounter(counter++);
        setCounter(counter++);
        setCounter(counter++);
        
      }
    }
    the above code will return as usual that 1 click increases 1 no at a time

    first result will be 11

    Since useState combines in a batch using React fibre and works single time that's where different method will be used

    that is setCounter provides a callback function as a hidden feature
    const addvalue = () => {
      if (counter <= 20) {
        setCounter((counter) => counter++ );
        setCounter((counter) => counter++);
        setCounter((counter) => counter++);
        setCounter((counter) => counter++);
        setCounter((counter) => counter++);
        
        now the output will me 15 directly by one click
      }
    }

  */


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

      <Card username = "Ranvijay" btnText = "visit us" />
      <br />
      <Card />
    </>
  )
}

export default App
