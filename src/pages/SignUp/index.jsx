import { useState, useContext } from "react";
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../contexts/auth';
import { Spinner } from "phosphor-react";

export function SignUp() {

  const [nome,setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signUp , loadingAuth} = useContext(AuthContext);

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(nome !== '' && email !== '' && password !== ''){
      signUp(email, password, nome);

    }
  }

  const handleDisableBt = ()=>{
    if(nome !== ''&& email !== '' && password !== ''){
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
          <h1>Cadastrar</h1>
          <input type="text" placeholder='Seu Nome' value={nome} onChange={(e) => setNome(e.target.value)}/>
          <input type="text" placeholder='email@email.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder='**********'  value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit' disabled={handleDisableBt()}>{loadingAuth ? <Spinner weight="bold" size={35} className="CircleNotch"/> : 'Cadastrar'}</button>
        </form>
        <span className='span'>
            Já possuo cadastro?
        <Link to='/'>Entrar</Link>
        </span>
      </div>  
    </div>
  )
  }