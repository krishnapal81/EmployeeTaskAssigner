import React, { useContext, useState } from 'react';
import Ct from './Ct';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Box, Button, TextField, Typography, Paper } from '@mui/material';

import './WaveBackground.css'; // Import wave animation CSS

const EmpLogin = () => {
  let [data, setData] = useState({});
  let [err, setErr] = useState('');
  let obj = useContext(Ct);
  let navigate = useNavigate();

  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let login = () => {
    axios
      .post('http://localhost:5000/emplogin', data)
      .then((res) => {
        if (res.data.token !== undefined) {
          obj.fun(res.data);
          navigate('/emphome');
        } else {
          setErr(res.data.msg);
        }
      })
      .catch(() => {
        setErr('server error');
      });
  };

  return (
    <>
      {/* Wave Animation Background */}
      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>

      {/* Login Form */}
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // transparent background so waves are visible
          backgroundColor: 'transparent',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            width: '100%',
            maxWidth: 400,
            textAlign: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.9)', // semi-transparent white
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#1e3a8a' }}>
            Employee Login
          </Typography>

          {err && (
            <Typography color="error" sx={{ mb: 2 }}>
              {err}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Enter Employee ID"
            name="_id"
            onChange={fun}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Enter Password"
            name="pwd"
            type="password"
            onChange={fun}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={login}
            sx={{
              bgcolor: '#4f46e5',
              '&:hover': { bgcolor: '#4338ca' },
              fontWeight: 500,
              textTransform: 'none',
            }}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default EmpLogin;
