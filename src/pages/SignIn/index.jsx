import { useState, useContext } from 'react';
import './signin.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../contexts/auth';
import { Spinner } from "phosphor-react";


export function SignIn() {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn, loadingAuth} = useContext(AuthContext)

  //Function logar
  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(email !== '' && password !== ''){
      signIn(email, password);
      
    }
  }

  const handleDisableBt = ()=>{
    if(email !== '' && password !== ''){
      return(false);

    }else{
        return(true);
    }
  }

  return (
    <div className='container-center' >
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt='Logo Sistema'/>
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input type="text" placeholder='email@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='**********'  value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit' hidden={handleDisableBt()}>{loadingAuth ? <Spinner weight="bold" size={35} className="CircleNotch"/> : 'Acessar'}</button>
        </form>
        <Link to='/register'>Criar nova conta</Link>
      </div>  
    </div>
  )
}