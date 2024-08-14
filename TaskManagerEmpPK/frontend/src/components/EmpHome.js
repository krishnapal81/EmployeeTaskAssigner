import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import axios from 'axios'

const EmpHome=()=> {
  let[data1,setData1]=useState([])
  let [data2,setData2]=useState([])
  let [data3,setData3]=useState([])
  let[f,setF]=useState(true)
  let navigate=useNavigate()
  let obj=useContext(Ct)
   
  let accept=(taskid)=>{
    axios.get(`http://localhost:5000/accept/${taskid}`,{"headers":{"Authorization":obj.data.token}}).then(()=>{
      setF(!f)
    })

  }

  let reject=(taskid)=>{
    axios.get(`http://localhost:5000/reject/${taskid}`,{"headers":{"Authorization":obj.data.token}}).then(()=>{
      setF(!f)
    })

  }

  let com=(taskid)=>{
    axios.get(`http://localhost:5000/complet/${taskid}`,{"headers":{"Authorization":obj.data.token}}).then(()=>{
      setF(!f)
    })

  }

  useEffect(()=>{
    if(obj.data.token=="")
      {
        navigate('/')
      }
      else{
        axios.get(`http://localhost:5000/gettasks/${obj.data._id}`,{"headers":{"Authorization":obj.data.token}}).then((res)=>{
          setData1(res.data.filter((item)=>item.status==undefined))
          setData2(res.data.filter((item)=>item.status=='pending'))
          setData3(res.data.filter((item)=>item.status=='completed'))
        })
      }
  },[f])



  return (
    <div>
      {data1.length>0 &&<h1>Tasks Assigne To You:</h1>}
      {
        data1.map((item)=>{
          return(<div>
            {item.description}
            <button onClick={()=>accept(item._id)}>Accept</button>
            <button onClick={()=>reject(item._id)}>Reject</button>
          </div>)
        })
      }
      {data2.length>0 &&<h1>Tasks Accepted By You</h1>}
      {
        data2.map((item)=>{
          return(<div>
            {item.description}
            <button onClick={()=>com(item._id)}>Complet</button>
          </div>)
        })
      }
      {data3.length>0 &&<h1>Tasks Completed By You</h1>}
      {
        data3.map((item)=>{
          return(<div>
            {item.description}
          </div>)
        })
      }

    </div>
  )
}

export default EmpHome