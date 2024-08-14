import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'

const AdminHome = () => {
  let[d1,setD1]=useState([])
  let[d2,setD2]=useState([])
  let[d3,setD3]=useState([])
  let[d4,setD4]=useState([])
  let[t,setT]=useState("")
  let[dept,setDept]=useState([])
  let[emp,setEmp]=useState([])
  let[eid,setEid]=useState()
  let[af,setAf]=useState(true)
  let navigate=useNavigate()
  let obj=useContext(Ct)

  let fun=(e)=>{
    setEid(e.target.value)

  }
  let assign=(id)=>{
    setT(id)

  }
 let update=()=>{
  axios.get(`http://localhost:5000/assign/${t}/${eid}`,{"headers":{"Authorization":obj.data.token,"_id":obj.data._id}}).then(()=>{

  })
  setT("")
setAf(!af)

 }


  useEffect(()=>{
    if(obj.data.token=="")
      {
        navigate("/")
      }
    else{
    axios.get("http://localhost:5000/tasks",{"headers":{"Authorization":obj.data.token,"_id":obj.data._id}}).then((res)=>{
      setD1(res.data.filter((item)=>item.eid==undefined))
      setD2(res.data.filter((item)=>item.eid!=undefined && item.status==undefined))
      setD3(res.data.filter((item)=>item.status=="pending"))
      setD4(res.data.filter((item)=>item.status=="completed"))
    })
    axios.get("http://localhost:5000/getdept").then((res)=>{
      setDept(res.data)
    })
  }

  },[af])
  let getemp=(e)=>{
    axios.get(`http://localhost:5000/getemp/${e.target.value}`).then((res)=>{
      setEmp(res.data)
    })
  }
  let del=(taskid)=>{
    axios.delete(`http://localhost:5000/deltask/${taskid}`,{"headers":{"Authorization":obj.data.token,"_id":obj.data._id}}).then(()=>{
      setAf(!af)
    })
  }

  return (
    <div className='page'>
      <div className='table1'>
      
     {d1.length>0 &&<h1>Taskes need to assign</h1>}
     <table border={1}>
      {
        d1.map((item)=>{
          return(
            <tr>
            <td>{item.description}
            </td>
            <td>{t!=item._id && <section><button className='btn' onClick={()=>assign(item._id)}>Assign</button><br></br>
            <button className='btn' onClick={()=>del(item._id)}>Delete</button></section>}
            </td>
            {
             t==item._id && <div>
             <td><select onChange={getemp}>
             <option selected disabled>select dept</option>
             {
              dept.map((item)=>{
                return(
                  <option value={item}>{item}</option>
                )

              })
             }
             
             </select></td>
             <td><select onChange={fun}>
             <option selected disabled>select emp</option>
             {
              emp.map((item)=>{
                return(
                  <option value={item}>{item}</option>
                )
              })
             }
             </select></td>
             <td><button  className='btn' onClick={update}>Update</button></td>
             </div>
           
            }
            </tr>
            )
        })
      }
     
     </table>
     </div>
     {d2.length>0 &&<h1>Tasks are in pending at emp for accept</h1>}
     <div>
      {
        d2.map((item)=>{
          return(<div>
            <p>{item.description} {item.eid}</p>
          </div>)
        })
      }
     </div>
    {d3.length>0 && <h1>Tasks are pending to complete:</h1>}
    <div>
      {
      d3.map((item)=>{
        return(<div>
          <p>{item.description} {item.eid}</p>
        </div>)

      })
    }
    </div>
    {d4.length>0 &&<h1> tasks completed</h1>}
    <div>
      {
        d4.map((item)=>{
          return(<div>
            <p>{item.description} {item.eid}</p>
          </div>)
        })
      }
    </div>

      
   </div>
  )
}

export default AdminHome