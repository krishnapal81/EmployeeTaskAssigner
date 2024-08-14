import React,{useState} from 'react'
import{BrowserRouter,Route,Routes} from 'react-router-dom'
import EmpLogin from './components/EmpLogin'
import AdminLogin from './components/AdminLogin'
import AdminHome from './components/AdminHome'
import EmpHome from './components/EmpHome'
import Logout from './components/Logout'
import Resetpwd from './components/Resetpwd'
import Nav from './components/Nav'
import './App.css'
import Ct from './components/Ct'
import AddTasks from './components/AddTasks'




const App=()=> {
  let[data,setData]=useState({"token":"","_id":"","name":"","isadmin":false})
  let fun=(obj)=>{
    setData({...obj})
  }
  let obj={"data":data,"fun":fun}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
    <Nav/>
    <Routes>
      <Route path='/' element={<EmpLogin/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/adminhome' element={<AdminHome/>}/>
      <Route path='/emphome' element={<EmpHome/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/resetpwd' element={<Resetpwd/>}/>
      <Route path='/addtasks' element={<AddTasks/>}/>
    </Routes>
    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App