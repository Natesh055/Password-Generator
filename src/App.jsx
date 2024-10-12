import { useState, useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)


  const [password, setPassword] = useState("")





    const passref = useRef(null)






   // Dependencies: You provide a dependency array as the
   //  second argument. The function will only be recreated 
  // if one of the dependencies changes.

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // The array [length, numberAllowed, charAllowed] lists the dependencies 
  // for the passwordgenerator function. This means that the function will
  //  be re-created whenever any of these values change



  // By using useCallback, the function is memoized, 
  // meaning that it will not be recreated on every render unless one of the dependencies changes





  const copyToClipboard = useCallback(()=>
  {
    window.navigator.clipboard.writeText(password)
    alert("Copied to clipboard")
  },
  [password])





  // useEffect(()=>{
  //   passwordgenerator()
  // },[length, numberAllowed, charAllowed,passwordgenerator])




  return (
    <>
      <div className='w-full max-w-m mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
          />
          <button className='button-34' onClick={copyToClipboard}>Copy</button>
        </div>


        <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1' >
          <input
           type="range"
           min={8}
           max={100}
           value = {length}
           className='cursor-pointer'
           onChange = {(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="">Length: {length}</label>
        </div>


        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id ='numberInput'
          onChange={() =>{
            setNumberAllowed((prev)=>!prev);
          } }

           />
           <label htmlFor="numberInput">Numbers</label>
        </div>


        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id ='characterinput'
          onChange={() =>{
            setCharAllowed((prev)=>!prev);
          } }

           />
           <label htmlFor="characterinput">Characters</label>
        </div>


      </div>
        
        <button className='button-34' onClick={passwordgenerator}>Generate Password</button>
      </div>
    </>
  );
}

export default App;
