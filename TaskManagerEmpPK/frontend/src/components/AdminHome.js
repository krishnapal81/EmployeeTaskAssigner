import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'

import {
  Box,
  Button,
  Container,
  dividerClasses,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

const AdminHome = () => {
  let [d1, setD1] = useState([])
  let [d2, setD2] = useState([])
  let [d3, setD3] = useState([])
  let [d4, setD4] = useState([])
  let [t, setT] = useState('')
  let [dept, setDept] = useState([])
  let [emp, setEmp] = useState([])
  let [eid, setEid] = useState()
  let [af, setAf] = useState(true)
  let navigate = useNavigate()
  let obj = useContext(Ct)

  let fun = (e) => {
    setEid(e.target.value)
  }
  let assign = (id) => {
    setT(id)
  }
  let update = () => {
    axios
      .get(`http://localhost:5000/assign/${t}/${eid}`, {
        headers: { Authorization: obj.data.token, _id: obj.data._id },
      })
      .then(() => {})
    setT('')
    setAf(!af)
  }

  useEffect(() => {
    if (obj.data.token === '') {
      navigate('/')
    } else {
      axios
        .get('http://localhost:5000/tasks', {
          headers: { Authorization: obj.data.token, _id: obj.data._id },
        })
        .then((res) => {
          setD1(res.data.filter((item) => item.eid === undefined))
          setD2(res.data.filter((item) => item.eid !== undefined && item.status === undefined))
          setD3(res.data.filter((item) => item.status === 'pending'))
          setD4(res.data.filter((item) => item.status === 'completed'))
        })
      axios.get('http://localhost:5000/getdept').then((res) => {
        setDept(res.data)
      })
    }
  }, [af])

  let getemp = (e) => {
    axios.get(`http://localhost:5000/getemp/${e.target.value}`).then((res) => {
      setEmp(res.data)
    })
  }
  let del = (taskid) => {
    axios
      .delete(`http://localhost:5000/deltask/${taskid}`, {
        headers: { Authorization: obj.data.token, _id: obj.data._id },
      })
      .then(() => {
        setAf(!af)
      })
  }

  return (
    <div 
      style={{
    maxHeight: '100vh',  // or '500px', etc.
     overflowY: 'scroll',
    scrollbarWidth: 'none',
    overflowX: 'hidden',
    padding: '16px',
    mb:10,
    boxSizing: 'border-box',
  }}
    >
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* Tasks to assign */}
      {d1.length > 0 && (
        <Typography
          variant="h4"
          component="h1"
          align="center"
          
          gutterBottom
          sx={{ mb: 3 }}
        >
          Tasks need to assign
        </Typography>
      )}

      <TableContainer component={Paper} sx={{ maxHeight: 300, mb: 5 }}>
        <Table stickyHeader aria-label="tasks to assign table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="center">Actions</TableCell>
              {t && <TableCell>Department</TableCell>}
              {t && <TableCell>Employee</TableCell>}
              {t && <TableCell>Update</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {d1.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">
                  {t !== item._id ? (
                    <>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => assign(item._id)}
                        sx={{ mr: 1 }}
                      >
                        Assign
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => del(item._id)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    'Assigning...'
                  )}
                </TableCell>

                {t === item._id && (
                  <>
                    <TableCell>
                      <Select
                        displayEmpty
                        onChange={getemp}
                        fullWidth
                        size="small"
                        defaultValue=""
                      >
                        <MenuItem value="" disabled>
                          Select dept
                        </MenuItem>
                        {dept.map((d) => (
                          <MenuItem key={d} value={d}>
                            {d}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        displayEmpty
                        onChange={fun}
                        fullWidth
                        size="small"
                        defaultValue=""
                      >
                        <MenuItem value="" disabled>
                          Select emp
                        </MenuItem>
                        {emp.map((e) => (
                          <MenuItem key={e} value={e}>
                            {e}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={update}
                        disabled={!eid}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Tasks pending to accept */}
      {d2.length > 0 && (
        <>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Tasks are in pending at emp for accept
          </Typography>
          <Paper sx={{ maxHeight: 200, overflow: 'auto', mb: 5, p: 2 }}>
            {d2.map((item) => (
              <Typography key={item._id} sx={{ mb: 1 }}>
                {item.description} - {item.eid}
              </Typography>
            ))}
          </Paper>
        </>
      )}

      {/* Tasks pending to complete */}
      {d3.length > 0 && (
        <>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Tasks pending to complete:
          </Typography>
          <Paper sx={{ maxHeight: 200, overflow: 'auto', mb: 5, p: 2 }}>
            {d3.map((item) => (
              <Typography key={item._id} sx={{ mb: 1 }}>
                {item.description} - {item.eid}
              </Typography>
            ))}
          </Paper>
        </>
      )}

      {/* Tasks completed */}
      {d4.length > 0 && (
        <>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Tasks completed
          </Typography>
          <Paper sx={{ maxHeight: 200, overflow: 'auto', mb: 5, p: 2 }}>
            {d4.map((item) => (
              <Typography key={item._id} sx={{ mb: 1 }}>
                {item.description} - {item.eid}
              </Typography>
            ))}
          </Paper>
        </>
      )}
    </Container>
    </div>
  )
}

export default AdminHome
