import * as React from 'react';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/auth';
import AppBar from '@mui/material/AppBar';
import avatar from '../../assets/avatar.png';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Menu, useTheme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


const Appbar = () => {

    const { user, signOut, toggleDrawerOpen} = useContext(AuthContext);
    const navigate = useNavigate();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        Swal.fire({
            title: 'Deseja sair do Sistema?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Não',
            cancelButtonColor: '#CF0E0E',
            confirmButtonText: 'Sim',
            confirmButtonColor: '#181C2E',
            timer: '10000',
        }).then((result) => {
            if (result.isConfirmed) {
                signOut();
            }
        })
    }

    return (
        <Box
            sx={{ flexGrow: 1,}}
        >
            <AppBar
                position="fixed"
                style={{ background: '#161616' }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: .1 }}
                        onClick={toggleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="div" sx={{ flexGrow: 1 }} >
                        Menu
                    </Typography>    
                    <>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar
                                about='Foto Perfil'
                                src={user.avatarUrl === null ? avatar : user.avatarUrl}
                            />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={()=> navigate('/profile')}>Perfil</MenuItem>
                            <MenuItem onClick={()=> handleLogout()}>Sair</MenuItem>
                        </Menu>
                    </>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Appbar;