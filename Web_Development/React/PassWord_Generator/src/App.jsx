import { useCallback, useState, useRef, useEffect } from 'react'



function App() {
  const [length, setlength] = useState(8)
  const [numinp, setnuminp] = useState(false)
  const [charinp, setcharinp] = useState(false)
  const [password, setpassword] = useState("")


  const passwordRef = useRef(null)

  const passgen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numinp) str += "0123456789"
    if (charinp) str += "!@#$%^&*()_-+=~`{}[]?/<,>.:;"

      for (let i = 0; i < length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }
      setpassword(pass)
    }, [length, numinp, charinp, setpassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passgen();
  }, [length, numinp, charinp, passgen])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-10 text-orange-500 bg-gray-800'>
        <h1 className=" text-5xl text-center text-white p-5 my-3">Project Password Generator</h1>
        <div className=" flex shadow rounded-lg overflow-hidden mt-5 mb-4">
          <input
            type="text"
            value={password}
            className=" outline-none w-full py-4 px-3"
            placeholder='Password'
            readOnly 
            ref={passwordRef}
            />

          <button onClick={copyToClipboard}
          className="outline-none bg-blue-400 text-white px-7 py-1 shrink-0">Copy</button>

        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className=' cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numinp}
              id='numeral_input'
              onChange={() => {
                setnuminp((prev) => !prev);
              }} />

            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charinp}
              id='char_input'
              onChange={() => {
                setcharinp((prev) => !prev);
              }} 
              />

            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App