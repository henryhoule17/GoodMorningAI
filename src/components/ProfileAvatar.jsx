import { useState } from 'react'
import { Box } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { profileBlank } from '../assets'
import { useAuthUser, useSignOut } from "react-auth-kit"
import { useNavigate } from 'react-router-dom';
import PositionedSnackBar from './PositionedSnackBar';

const settings = ['Profile', 'Settings', 'Help', 'Logout'];

const ProfileAvatar = () => {
    const signOut = useSignOut()
    const auth = useAuthUser()
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [snackBarOpen, setSnackBarOpen] = useState(false)


      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
      const handleCloseUserMenu = (action) => {
        switch (action) {
            case 'Profile':
                setSnackBarOpen(true)
                break;
            case 'Settings':
                setSnackBarOpen(true)
                break;
            case 'Help':
                setSnackBarOpen(true)
                break;
            case 'Logout':
                navigate('/')
                signOut()
                break;
            default:
                break;
        }
        setAnchorElUser(null);
    }; 

    /*const useStyles = makeStyles({
        customMenu: {
          '& .MuiPaper-root': {
            width: '500px', // Adjust as needed
            borderRadius: '10px',
            boxShadow: 'none', // Removes shadow
          },
          '& .MuiMenuItem-root': {
            // Additional styles for menu items
          },
        },
      });*/

  return (
    <>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, '&:hover': {border: '2px solid rgba(0, 0, 0, 0.1)',},}}>
                    <Avatar alt={auth().email} src={profileBlank} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
                ))}
            </Menu>
        </Box>
        <PositionedSnackBar open={snackBarOpen} handleClose={() => setSnackBarOpen(false)} message='We are still working on this :('/>
    </>
  )
}

export default ProfileAvatar
