import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Divider, Drawer, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Swal from 'sweetalert2';
import avatar from '../../assets/avatar.png';
import cover from '../../assets/cover.png';
import 'sweetalert2/dist/sweetalert2.css';


export function Header() {

    const { user, signOut, isDrawerOpen, toggleDrawerOpen } = useContext(AuthContext);
    const navigate = useNavigate();
    const theme = useTheme();
    

    const routeDashboard = ()=>{
        navigate('/dashboard');
        toggleDrawerOpen()
    }

    const routeCustomers = ()=>{
        navigate('/customers');
        toggleDrawerOpen()
    }
    const routeProfile = ()=>{
        navigate('/profile');
        toggleDrawerOpen()
    }

    const handleLogout = () => {
        toggleDrawerOpen()
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
        <Drawer
            open={isDrawerOpen}
            variant='temporary'
            onClose={toggleDrawerOpen}
            PaperProps={{
                sx: {
                    backgroundColor: '#161616',
                    border: 'none',
                }
            }}
        >
            <Box
                display='flex'
                flexDirection={'column'}
                justifyContent='center'
                width={theme.spacing(25)}
                alignItems='center'
                marginTop={theme.spacing(.5)}
                marginBottom={theme.spacing(.5)}
                sx={
                    { height: theme.spacing(16), 
                      backgroundImage: `url(${cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >

                <Avatar
                    sx={{ width: theme.spacing(12), height: theme.spacing(12), boxShadow: 2 }}
                    alt="Remy Sharp"
                    src={user.avatarUrl === null ? avatar : user.avatarUrl}
                />
            </Box>

            <Box
                display='flex'
                flexDirection={'column'}
                justifyContent='start'
                alignItems='flex-start'
                marginTop={theme.spacing(5)}
            >
                <Button sx={{ color: '#FFF' }} variant="text" startIcon={<AddToQueueIcon />} onClick={routeDashboard}>Chamados</Button>
                <Button sx={{ color: '#FFF' }} variant="text" startIcon={<PersonIcon />} onClick={routeCustomers}>Clientes</Button>
                <Button sx={{ color: '#FFF' }} variant="text" startIcon={<ManageAccountsIcon />} onClick={routeProfile}>Perfil</Button>
                <Button sx={{ color: '#FFF' }} variant="text" startIcon={<LogoutIcon />} onClick={() => handleLogout()}>Sair</Button>
            </Box>
        </Drawer>

    )
}