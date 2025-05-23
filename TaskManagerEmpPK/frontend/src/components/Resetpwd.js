import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ct from './Ct';

import {
  Box,
  Container,
  TextField,
  Button,
  Paper,
  Typography,
} from '@mui/material';

const Resetpwd = () => {
  let [data, setData] = useState();
  let navigate = useNavigate();
  let obj = useContext(Ct);

  let fun = (e) => {
    setData({ pwd: e.target.value });
  };

  let change = () => {
    axios
      .post(
        'http://localhost:5000/resetpwd',
        { ...data, _id: obj.data._id },
        {
          headers: {
            Authorization: obj.data.token,
          },
        }
      )
      .then(() => {
        obj.fun({ token: '', _id: '', name: '', isadmin: false });
        navigate('/');
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary">
          Reset Your Password
        </Typography>

        <TextField
          type="password"
          fullWidth
          variant="outlined"
          label="Enter new password"
          onChange={fun}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={change}
          sx={{ width: '60%' }}
        >
          Change Password
        </Button>
      </Paper>
    </Container>
  );
};

export default Resetpwd;
