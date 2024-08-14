import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'


const Nav=()=> {
  let obj=useContext(Ct)
  return (
    <nav>
    {obj.data.token=="" &&<Link to='/'>EmpLogin</Link>}
    {obj.data.token=="" &&<Link to='/adminlogin'>AdminLogin</Link>}
    {obj.data.token!="" && !obj.data.isadmin&&<Link to='/emphome'>Home</Link>}
    {obj.data.token!="" && obj.data.isadmin&&<Link to='/adminhome'>Home</Link>}
    {obj.data.token!="" && obj.data.isadmin&&<Link to='/addtasks'>AddTasks</Link>}
    {obj.data.token!="" &&<Link to='/logout'>Logout</Link>}
    {obj.data.token!="" && !obj.data.isadmin&&<Link to='/resetpwd'>Reset PWD</Link>}
    </nav>
  )
}

export default Nav