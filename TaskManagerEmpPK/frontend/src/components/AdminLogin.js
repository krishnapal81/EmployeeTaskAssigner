import axios from 'axios'
import React, { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'

const AdminLogin = () => {
  let [data,setData]=useState({})
  let [err,setErr]=useState("")
  let obj=useContext(Ct)
  let  navigate=useNavigate()
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let login=()=>{
    axios.post("http://localhost:5000/adminlogin",data).then((res)=>{
      if(res.data.token!=undefined)
        {
          obj.fun(res.data)
          navigate('/adminhome')

        }
        else
        {
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
        <input type='text' placeholder='enter adminID' name='_id' onChange={fun}/>
        <input type='password' placeholder='enter password' name='pwd' onChange={fun}/>
        <button onClick={login}>Login</button>

      </div>
    </div>
  )
}

export default AdminLogin