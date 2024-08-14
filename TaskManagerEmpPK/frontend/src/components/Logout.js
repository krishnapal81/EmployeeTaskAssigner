import React, { useContext, useEffect } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Logout=()=> {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    obj.fun({"token":"","_id":"","name":"","isadmin":false})
    navigate("/")
  },[])
  return (
    <div></div>
  )
}

export default Logout