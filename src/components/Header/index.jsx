import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { DrawerContext } from '../../contexts/drawerContext';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Drawer, useTheme } from '@mui/material';
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

    const { user, signOut } = useContext(AuthContext );
    const { isDrawerOpen, toggleDrawerOpen } = useContext(DrawerContext);
    const navigate = useNavigate();
    const theme = useTheme();
    
    const handleBtClick = (rota)=>{
        navigate(rota);
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
                <Button sx={{ color: '#FFF' }} variant="text" startIcon={<AddToQueueIcon />} onClick={(e)=> handleBtClick('/dashboard')}>Chamados</Button>
                <Button sx={{ color: '#FFF' }} variant="text" startIcon={<PersonIcon />} onClick={(e)=> handleBtClick('/customers') }>Clientes</Button>
                <Button sx={{ color: '#FFF' }} variant="text" startIcon={<ManageAccountsIcon />} onClick={(e)=> handleBtClick('/profile')}>Perfil</Button>
                <Button sx={{ color: '#FFF' }} variant="text" startIcon={<LogoutIcon />} onClick={() => handleLogout()}>Sair</Button>
            </Box>
        </Drawer>

    )
}