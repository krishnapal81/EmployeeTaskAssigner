import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'

const AddTasks=()=> {
  let [data,setData]=useState()
  let navigate=useNavigate()
  let obj=useContext(Ct)

  let fun=(e)=>{
    setData({"description":e.target.value})

  }

  let add=()=>{
    axios.post("http://localhost:5000/addtask",data,{"headers":{"Authorization":obj.data.token,"_id":obj.data._id}}).then(()=>{
        navigate('/adminhome')
    })

  }
  return (
    <div className='con'>
        <div className='form'>
            <input type='text' placeholder='enter tasks' onChange={fun}/>
            <button onClick={add}>add</button>
        </div>

    </div>
  )
}

export default AddTasks