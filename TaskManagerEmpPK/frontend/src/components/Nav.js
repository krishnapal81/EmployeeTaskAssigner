import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Ct from './Ct';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Nav = () => {
  const obj = useContext(Ct);

  return (
    <AppBar
      position="static"
      elevation={3}
      sx={{
        background: 'linear-gradient(to right, #1e3a8a, #312e81)', // attractive dark blue gradient
        paddingY: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Stack direction="row" spacing={3}>
          {obj.data.token === '' && (
            <>
              <Button
                component={Link}
                to="/"
                variant="contained"
                sx={{
                  backgroundColor: '#4f46e5',
                  '&:hover': { backgroundColor: '#4338ca' },
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                EmpLogin
              </Button>
              <Button
                component={Link}
                to="/adminlogin"
                variant="contained"
                sx={{
                  backgroundColor: '#4f46e5',
                  '&:hover': { backgroundColor: '#4338ca' },
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                AdminLogin
              </Button>
            </>
          )}

          {obj.data.token !== '' && !obj.data.isadmin && (
            <>
              <Button component={Link} to="/emphome" color="inherit">Home</Button>
              <Button component={Link} to="/resetpwd" color="inherit">Reset PWD</Button>
              <Button component={Link} to="/logout" color="inherit">Logout</Button>
            </>
          )}

          {obj.data.token !== '' && obj.data.isadmin && (
            <>
              <Button component={Link} to="/adminhome" color="inherit">Home</Button>
              <Button component={Link} to="/addtasks" color="inherit">AddTasks</Button>
              <Button component={Link} to="/logout" color="inherit">Logout</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
