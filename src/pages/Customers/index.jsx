import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import firebase from '../../services/firebaseConnection';
import './customers.css';



export function Customers(){

    const [nomefantasia, setNomefantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleAdd(e){
        e.preventDefault();
        if(nomefantasia !== '' && cnpj !== '' && endereco !== ''){
            await firebase.firestore().collection('customers')
            .add({
                nomefantasia: nomefantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(()=>{
                setNomefantasia('');
                setCnpj('');
                setEndereco('');
                toast.success(`Cliente cadastrado com sucesso: ${nomefantasia}`);
            })
            .catch((error)=>{
                console.log(error);
                toast.error('Erro ao cadastrar empresa.');
            })
        }else{
            toast.info('Preencha todos os campos.', {theme: 'colored'});
        }
    }

    return(
        <div>
            <Header/>
            <div className='content'>
            <Title name={'Clientes'}>
                <FiUser size={25}/>
            </Title>
            <div className='container'>
                <form className='form-profile customers' onSubmit={handleAdd}>
                    <label>Nome Fantasia</label>
                    <input type="text" placeholder='Nome da Empresa' value={nomefantasia} onChange={(e)=> setNomefantasia(e.target.value)} />

                    <label>CNPJ</label>
                    <input type="text" placeholder='00.000.000/000-0' value={cnpj} onChange={(e)=> setCnpj(e.target.value)} />

                    <label>Endereço</label>
                    <input type="text" placeholder='Endereço da Empresa' value={endereco} onChange={(e)=> setEndereco(e.target.value)} />

                    <button type='submit'>Cadastrar</button>
                </form>
            </div>
            </div>
        </div>
    )
}