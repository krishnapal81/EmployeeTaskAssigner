import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import axios from 'axios'

import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Divider,
} from '@mui/material'

import './DataFlowAnimation.css'  // Your CSS for animation

const EmpHome = () => {
  // <-- Make sure all state & functions are declared here

  let [data1, setData1] = useState([])
  let [data2, setData2] = useState([])
  let [data3, setData3] = useState([])
  let [f, setF] = useState(true)
  let navigate = useNavigate()
  let obj = useContext(Ct)

  let accept = (taskid) => {
    axios
      .get(`http://localhost:5000/accept/${taskid}`, {
        headers: { Authorization: obj.data.token },
      })
      .then(() => {
        setF(!f)
      })
  }

  let reject = (taskid) => {
    axios
      .get(`http://localhost:5000/reject/${taskid}`, {
        headers: { Authorization: obj.data.token },
      })
      .then(() => {
        setF(!f)
      })
  }

  let com = (taskid) => {
    axios
      .get(`http://localhost:5000/complet/${taskid}`, {
        headers: { Authorization: obj.data.token },
      })
      .then(() => {
        setF(!f)
      })
  }

  useEffect(() => {
    if (obj.data.token === '') {
      navigate('/')
    } else {
      axios
        .get(`http://localhost:5000/gettasks/${obj.data._id}`, {
          headers: { Authorization: obj.data.token },
        })
        .then((res) => {
          setData1(res.data.filter((item) => item.status === undefined))
          setData2(res.data.filter((item) => item.status === 'pending'))
          setData3(res.data.filter((item) => item.status === 'completed'))
        })
    }
  }, [f])

  return (
    <div className="dataFlow"> {/* Wrap the entire return JSX */}
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto', position: 'relative', zIndex: 1, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2 }}>
        {/* Your JSX code unchanged */}
        {data1.length > 0 && (
          <>
            <Typography variant="h4" align='center' mb={2} sx={{ color: '#323033', fontWeight: 'bold'}}>
              Tasks Assigned To You:
            </Typography>
            <Stack spacing={2} mb={4}>
              {data1.map((item) => (
                <Paper
                  key={item._id}
                  elevation={3}
                  sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography>{item.description}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => accept(item._id)}
                      size="small"
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => reject(item._id)}
                      size="small"
                    >
                      Reject
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
            <Divider />
          </>
        )}

        {data2.length > 0 && (
          <>
            <Typography variant="h4" mt={4} mb={2} color="secondary">
              Tasks Accepted By You:
            </Typography>
            <Stack spacing={2} mb={4}>
              {data2.map((item) => (
                <Paper
                  key={item._id}
                  elevation={3}
                  sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography>{item.description}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => com(item._id)}
                    size="small"
                  >
                    Complete
                  </Button>
                </Paper>
              ))}
            </Stack>
            <Divider />
          </>
        )}

        {data3.length > 0 && (
          <>
            <Typography variant="h4" mt={4} mb={2} color="text.secondary">
              Tasks Completed By You:
            </Typography>
            <Stack spacing={2}>
              {data3.map((item) => (
                <Paper key={item._id} elevation={1} sx={{ p: 2 }}>
                  <Typography color="text.secondary">{item.description}</Typography>
                </Paper>
              ))}
            </Stack>
          </>
        )}
      </Box>
    </div>
  )
}

export default EmpHome
