import React, { useContext, useState } from 'react'
import Ct from './Ct'
import{useNavigate} from 'react-router-dom'
import axios from 'axios'

const EmpLogin=()=> {
  let[data,setData]=useState({})
  let[err,setErr]=useState("")
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})

  }
  let login=()=>{
    axios.post("http://localhost:5000/emplogin",data).then((res)=>{
      if(res.data.token!=undefined)
        {
          obj.fun(res.data)
          navigate("/emphome")
        }
        else{
          setErr(res.data.msg)
        }

    }).catch((err)=>{
      setErr("server error")
    })

  }
  return (
    <div className='con'>
      <div className='form'>
        <div>{err}</div>
        <input type='text' placeholder='enter empID' name='_id' onChange={fun}/>
        <input type='password' placeholder='enter password' name='pwd' onChange={fun}/>
        <button onClick={login}>login</button>

      </div>

    </div>
  )
}

export default EmpLogin