import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import { FiPlusCircle, FiEdit } from 'react-icons/fi';
import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import './new.css';


export function New() {
    const { id } = useParams();
    const [customers, setCustomers] = useState([]);
    const [customersSelected, setCustomersSelected] = useState(0);
    const [loadCustomers, setLoadCustomers] = useState(true);
    const [assunto, setAssunto] = useState('Suporte');
    const [statuscode, setStatuscode] = useState('Aberto');
    const [complemento, setComplemento] = useState('');
    const { user } = useContext(AuthContext);
    const [idCustomer,setIdCustomer] = useState(false);


    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
                .get()
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomefantasia: doc.data().nomefantasia
                        })
                    })

                    if (lista.length === 0) {
                        console.log('Nenhuma empresa encontrada');
                        setCustomers([{ id: '1', nomefantasia: 'FREELA' }]);
                        setLoadCustomers(false);
                        return;
                    }

                    setCustomers(lista);
                    setLoadCustomers(false);

                    if(id){
                        loadId(lista);    
                    }

                })
                .catch((error) => {
                    console.log('Algo deu errado', error);
                    setLoadCustomers(false);
                    setCustomers([{ id: 1, nomefantasia: '' }]);
                })
        }
        loadCustomers();
    }, [id]);


    async function loadId(lista){
        await firebase.firestore().collection('chamados').doc(id)
        .get()
        .then((snapshot)=>{
            setAssunto(snapshot.data().assunto);
            setStatuscode(snapshot.data().statuscode);
            setComplemento(snapshot.data().complemento);

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
            setCustomersSelected(index);
            setIdCustomer(true);
            
        })
        .catch((err)=>{
            console.log('chamado não encontado com id', err);
        })
    }


    async function handleChamado(e) {
        e.preventDefault();

        if(idCustomer){
            await firebase.firestore().collection('chamados')
            .doc(id)
            .update({
                cliente: customers[customersSelected].nomefantasia,
                clienteId: customers[customersSelected].id,
                assunto: assunto,
                complemento: complemento,
                statuscode: statuscode,
                userId: user.uid
            })
            .then(()=>{
                toast.success('Chamado editado com sucesso');
                setCustomersSelected(0);
                setComplemento('');
                window.location.pathname = '/dashboard';
                console.log("🚀 ~ file: index.jsx ~ line 101 ~ .then ~ window.location.pathname", window.location.pathname);
                
            })
            .catch((err)=>{
                console.log('Erro ao editar chamado', err);
            })
            return;
        }

        await firebase.firestore().collection('chamados')
            .add({
                created: new Date(),
                cliente: customers[customersSelected].nomefantasia,
                clienteId: customers[customersSelected].id,
                assunto: assunto,
                complemento: complemento,
                statuscode: statuscode,
                userId: user.uid
            })
            .then(() => {
                toast.success('Chamado registrado com sucesso');
                setComplemento('');
                setCustomersSelected(0);
            })
            .catch((error) => {
                toast.error('Erro ao registrar chamado');
                console.log(error);
            })


    }

    function handleChangeCustomers(e) {
        setCustomersSelected(e.target.value);
    }


    function handleChangeSelect(e) {
        setAssunto(e.target.value);
    }

    function handleOptionChange(e) {
        setStatuscode(e.target.value);
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name={idCustomer ? 'Alterar chamado': 'Novo chamado'}>
                    {idCustomer ? <FiEdit size={25}/>: <FiPlusCircle size={25} />}
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleChamado}>
                        <label>Cliente</label>

                        {loadCustomers ? (
                            <input type="text" disabled={true} value={'Carregando clientes...'} />
                        ) : (
                            <select value={customersSelected} onChange={handleChangeCustomers}>
                                {customers.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index}>
                                            {item.nomefantasia}
                                        </option>
                                    )
                                })}
                            </select>
                        )}


                        <label>Assunto</label>

                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Técnica</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Sugestao">Sugestão</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input type="radio" name='radio' value={'Aberto'} onChange={handleOptionChange} checked={statuscode === 'Aberto'} />
                            <span>Em aberto</span>

                            <input type="radio" name='radio' value={'Em andamento'} onChange={handleOptionChange} checked={statuscode === 'Em andamento'} />
                            <span>Em andamento</span>

                            <input type="radio" name='radio' value={'Finalizado'} onChange={handleOptionChange} checked={statuscode === 'Finalizado'} />
                            <span>Finalizado</span>
                        </div>

                        <label>Complemento</label>
                        <textarea type='text' placeholder='Descreva seu problema (Opcional).' value={complemento} onChange={(e) => setComplemento(e.target.value)}></textarea>

                        <button type='submit'>{idCustomer ? 'Salvar': 'Registrar'}</button>
                    </form>
                </div>

            </div>

        </div>
    )
}