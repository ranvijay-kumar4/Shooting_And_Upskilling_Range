import { useCallback, useState } from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numinp, setnuminp] = useState(false)
  const [charinp, setcharinp] = useState(false)
  const [password, setpassword] = useState("")

  const passgen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numinp)
    {
      str += "0123456789"
    }
    if(charinp)
    {
      str += "!@#$%^&*()_-+=~`{}[]?/<,>.:;"

      for (let i = 0; i < array.length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass = str.charAt(char);
      }
      setpassword(pass);
    }
  }, [length, numinp, charinp, setpassword])

  return (
    <>
      <h1 className=" text-5xl text-center text-white">Project Password Generator</h1>
    </>
  )
}

export default App
