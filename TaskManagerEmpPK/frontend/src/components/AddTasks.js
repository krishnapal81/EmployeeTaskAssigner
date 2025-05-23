import React, { useContext, useState } from 'react';
import axios from 'axios';
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

const AddTasks = () => {
  let [data, setData] = useState();
  let navigate = useNavigate();
  let obj = useContext(Ct);

  let fun = (e) => {
    setData({ description: e.target.value });
  };

  let add = () => {
    axios
      .post('http://localhost:5000/addtask', data, {
        headers: {
          Authorization: obj.data.token,
          _id: obj.data._id,
        },
      })
      .then(() => {
        navigate('/adminhome');
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
          Add a New Task
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Enter task"
          onChange={fun}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={add}
          sx={{ width: '50%' }}
        >
          Add
        </Button>
      </Paper>
    </Container>
  );
};

export default AddTasks;
