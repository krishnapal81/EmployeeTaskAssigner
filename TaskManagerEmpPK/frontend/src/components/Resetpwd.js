import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'

const Resetpwd=()=> {
  let[data,setData]=useState()
  let navigate=useNavigate()
  let obj=useContext(Ct)

  let fun=(e)=>{
    setData({"pwd":e.target.value})

  }
  let change=()=>{
    axios.post("http://localhost:5000/resetpwd",{...data,"_id":obj.data._id},{"headers":{"Authorization":obj.data.token}}).then(()=>{
      obj.fun({"token":"","_id":"","name":"","isadmin":false})
      navigate("/")
    })

  }
  return (
    <div className='con'>
      <div className='form'>
        <input type='password' placeholder='enter new password' onChange={fun}/>
        <button onClick={change}>Change PWD</button>

      </div>

    </div>
  )
}

export default Resetpwd