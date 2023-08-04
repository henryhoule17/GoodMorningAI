import React from 'react'
import { Drawer } from '@mui/material';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectDrawerOpen } from '../services/drawerState';

const drawerWidth = 240;

const DashDrawer = () => {
  const drawerOpen = useSelector(selectDrawerOpen)

  return (
    <div className=''>
      <Drawer 
        variant='persistent' 
        sx={{ width: drawerWidth, zIndex: 1200}}
        anchor='left'
        open={drawerOpen}
      >
        <div>
            <Typography variant="h6">
            GoodMorningAI
            </Typography>
        </div>
      </Drawer>
    </div>
  )
}

export default DashDrawer
