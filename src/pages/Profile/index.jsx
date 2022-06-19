import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';
import firebase from '../../services/firebaseConnection';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import './profile.css';


export function Profile() {
    const navigate = useNavigate();
    const { user, signOut, setUser, storageUser } = useContext(AuthContext);
    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);


    function handleFile(e){
        const image = e.target.files[0];

        if(image.type === 'image/jpg' || image.type === 'image/png'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }else{
            Swal.fire('Formato invalido e aceito apenas JPG/PNG','', 'info' ).then(()=>{
            setImageAvatar(null);
            return null;
            });
        }
        //console.log(e.target.files[0]);
    }

    async function handleUpload(){
        const currentUid = user.uid;

        const uploadTask =  await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async ()=>{
            console.log('Foto enviada');
            
            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then(async (url)=>{
                let urlFoto = url;

                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl: urlFoto,
                    nome: nome
                })
                .then(()=>{
                    let data = {
                        ...user,
                        avatarUrl: urlFoto,
                        nome: nome
                    };
                    setUser(data);
                    storageUser(data);
                })
            })
        })
    }

    function handleSave(e) {
        e.preventDefault();
        if (imageAvatar === null && nome !== '') {
            Swal.fire({
                title: 'Deseja salvar as alterações?',
                icon: 'question',
                timer: '5000',
                showDenyButton: true,
                denyButtonText: 'Não Salvar',
                denyButtonColor: '#CF0E0E',
                confirmButtonText: 'Salvar',
                confirmButtonColor: '#181C2E',
            }).then(async (result) => {
                if (result.isConfirmed) {
                  await  firebase.firestore().collection('users')
                        .doc(user.uid)
                        .update({
                            nome: nome
                        })
                        .then(() => {
                            let data = {
                                ...user,
                                nome: nome
                            };
                            setUser(data);
                            storageUser(data);
                        })
                    Swal.fire('Perfil alterado com Sucesso!', '', 'success').then(()=> {
                        
                    })

                } else if (result.isDenied || result.isDismissed) {
                    Swal.fire('As alterações não foram salvas.', '', 'info').then(()=> {
                        navigate('/profile');
                    })

                }
            })
        }else if(nome !== '' && imageAvatar !== null){
            Swal.fire({
                title: 'Deseja salvar as alterações?',
                icon: 'question',
                timer: '5000',
                showDenyButton: true,
                denyButtonText: 'Não Salvar',
                denyButtonColor: '#CF0E0E',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Salvar',
                confirmButtonColor: '#181C2E',
            }).then((result) => {
                if (result.isConfirmed) {
                    handleUpload();
                    Swal.fire('Perfil alterado com Sucesso!', '', 'success').then(()=> {
                        navigate('/profile');
                    })

                } else if (result.isDenied || result.isDismissed) {
                    Swal.fire('As alterações não foram salvas.', '', 'info').then(()=> {
                        navigate('/profile');
                    })

                }
            })
            
        }
    }

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

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name="Meu Perfil">
                    <FiSettings size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={25} />
                            </span>

                            <input type="file" accept='image/*' onChange={handleFile}/><br />

                            {avatarUrl === null ?
                                <img src={avatar} width='250' height='250' alt='Foto de perfil do usuário' />
                                : <img src={avatarUrl} width='250' height='250' alt='Foto de perfil do usuário' />
                            }

                        </label>

                        <label>Nome:</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>E-mail:</label>
                        <input type="text" value={email} disabled={true} />

                        <button type='submit'>Salvar</button>
                    </form>
                </div>

                <div className='container'>
                    <button className='logout-btn' onClick={() => handleLogout()}>Sair</button>
                </div>

            </div>
        </div>
    )
}

