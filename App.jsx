import { useState,useCallback,useEffect} from "react"
import { useRef } from "react"


function App() {
const [password, setPassword] = useState('')
const [length, setLength] = useState(5)
const [charAllowed,setCharAllowed] = useState(false)
const [numAllowed,setNumAllowed] = useState(false)
const [upperAllowed,setUpperAllowed] = useState(false)

const passwordref = useRef()

const copy = ()=>{
  passwordref.current?.select()
  navigator.clipboard.writeText(password)
}

const password_generator = useCallback(() =>{
  let str1 = "abcdefghijklmnopqrstuvwxyz"
  let str2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let str3 = "0123456789"
  let str = "!@#$%^&*()_+-={}:<>?,./"
  let pass = ""
  
  if(numAllowed){
    str1 += str3
  }
  
  if(charAllowed){
    str1 += str
  }
  
  if(upperAllowed){
    str1 += str2
  }
  
  for(let i = 0;i<=length-1;i++){
    pass += str1.charAt(Math.floor(Math.random()*str1.length))
  }
  setPassword(pass)
  },[charAllowed,numAllowed,upperAllowed,length,setPassword])
  

useEffect(()=>{
  password_generator()
},[charAllowed,numAllowed,upperAllowed,length])
console.log(password)


return(
    <>
    <div className="h-screen bg-[#FFA07A]">
      
      <div className="flex flex-col items-center bg-[#F08080] ">
      <h1 className="">Password Generator</h1>
        <div className="flex ">
          <label htmlFor="pass">Password:</label>
          <input
          type = 'text'
          id = 'pass'
          value = {password}
          onChange={(e)=>e.target.value}
          className=""
          placeholder="Password..."
          readOnly
          ref={passwordref}
          />
          
          <button onClick={copy} 
          className="bg-black text-white py-1 px-2 rounded-lg ml-2 shadow-lg hover:bg-gray-500 "
          >
            Copy
          </button>
        </div>
        <div>
          <label htmlFor="length">Length:</label>
        <input
          type = 'range'
          id = 'length'
          min={5}
          max={100}
          value = {length}
          onChange={(e)=>setLength(e.target.value)} 
          />
          <p>{`${length}`}</p>

          <label htmlFor="char">Characters:</label>
          <input
          type="checkbox"
          id="char"
          checked={charAllowed}
          onChange={()=>setCharAllowed((prev)=>!prev)}
          />
          <label htmlFor="num">Numebers:</label>
          <input
          type="checkbox"
          id="num"
          checked={numAllowed}
          onChange={()=>setNumAllowed((prev)=>!prev)}
          />
          <label htmlFor="upper">UpperCase:</label>
          <input
          type = 'checkbox'
          id = 'upper'
          checked={upperAllowed}
          onChange = {()=> setUpperAllowed((prev) => !prev)}
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default App
