import { useState } from 'react'
import { Drawer } from '@mui/material';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectDrawerOpen } from '../services/drawerState';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ChatIcon from '@mui/icons-material/Chat';
import InventoryIcon from '@mui/icons-material/Inventory';
import PositionedSnackBar from './PositionedSnackBar';
import TollIcon from '@mui/icons-material/Toll';
import { SubjectOutlined, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const drawerWidth = 240;

const DashDrawer = () => {
    const navigate = useNavigate()
  const drawerOpen = useSelector(selectDrawerOpen)
  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const menuItems = [
    {
        text: 'Home',
        icon: <Home sx={{ color: '#ffc255'}} />,
        path: '/',
        action: () => navigate('/user/'),

    },
    {
        text: 'My Plans',
        icon: <InventoryIcon sx={{ color: '#ffc255'}}  />,
        path: '/plans',
        action: () => setSnackBarOpen(true),
    },
    {
        text: 'Test Message',
        icon: <ChatIcon sx={{ color: '#ffc255'}}  />,
        path: '/test',
        action: () => navigate('/user/testmsg'),
    },
    {
        text: 'My Credits',
        icon: <TollIcon sx={{ color: '#ffc255'}}  />,
        path: '/credits',
        action: () => setSnackBarOpen(true),
    },
  ]

  return (
    <div className=''>
      <Drawer 
        variant='persistent' 
        sx={{ width: drawerWidth, zIndex: 1200, ".MuiDrawer-paper": {width: drawerWidth}}}
        anchor='left'
        open={drawerOpen}
      >
        <div className='pt-20 items-center justify-center flex'>
            <Typography variant="h6">
            </Typography>
        </div>

        <List>
            {menuItems.map(item => (
            <ListItemButton key={item.text} onClick={item.action}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItemButton>
            ))} 
        </List>
      </Drawer>
      <PositionedSnackBar open={snackBarOpen} handleClose={() => setSnackBarOpen(false)} message='We are still working on this :('/>
    </div>
  )
}

export default DashDrawer
