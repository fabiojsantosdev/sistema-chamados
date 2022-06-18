import {useContext} from 'react';
import {AuthContext} from '../../contexts/auth';
import avatar from '../../assets/avatar.png';
import { FiHome ,FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import './header.css';


export function Header(){

    const { user, signOut } = useContext(AuthContext);

    const handleLogout = () => {
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

    return(
        <div className='sidebar'>
            <div>
              <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt=" Foto avatar"/>
            </div>
            
            <Link to={'/dashboard'}>
                <FiHome color='#FFF' size={24}/>
                Chamados
            </Link>

            <Link to={'/customers'}>
                <FiUser color='#FFF' size={24}/>
                Clientes
            </Link>

            <Link to={'/profile'}>
                <FiSettings color='#FFF' size={24}/>
                Configurações
            </Link>

            <a className='logout' onClick={handleLogout}>
                <FiLogOut color='#FFF' size={24}/>
                Sair
            </a>
        </div>
    )
}