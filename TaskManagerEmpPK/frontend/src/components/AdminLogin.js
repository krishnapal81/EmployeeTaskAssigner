import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ct from './Ct';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import './WaveBackground.css';  // Import your waves CSS here

const AdminLogin = () => {
  let [data, setData] = useState({});
  let [err, setErr] = useState('');
  let obj = useContext(Ct);
  let navigate = useNavigate();

  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let login = () => {
    axios
      .post('http://localhost:5000/adminlogin', data)
      .then((res) => {
        if (res.data.token !== undefined) {
          obj.fun(res.data);
          navigate('/adminhome');
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
      {/* Wave animation background */}
      <div className="box" aria-hidden="true">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>

      {/* Centered login form with higher z-index */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            borderRadius: 4,
            width: '100%',
            maxWidth: 400,
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#1e3a8a' }}>
            Admin Login
          </Typography>

          {err && (
            <Typography color="error" sx={{ mb: 2 }}>
              {err}
            </Typography>
          )}

          <TextField fullWidth label="Enter Admin ID" name="_id" onChange={fun} sx={{ mb: 2 }} />

          <TextField
            fullWidth
            label="Enter Password"
            type="password"
            name="pwd"
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

export default AdminLogin;
