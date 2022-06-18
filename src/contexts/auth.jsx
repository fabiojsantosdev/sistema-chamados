import { useEffect, useState, createContext } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});


function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    //const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadStorage = () => {
            const storageUser = localStorage.getItem('SistemaUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                //setLoading(false);
            }

            //setLoading(false);
        }

        loadStorage();
    }, []);

    //Function logar 
    async function signIn(email,password){
      setLoadingAuth(true);

      await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async(value)=>{
        let uid = value.user.uid;

        const userProfile = await firebase.firestore().collection('users')
        .doc(uid).get();

        let data = {
              uid: uid,
              nome: userProfile.data().nome,
              email: value.user.email,
              avatarUrl: userProfile.data().avatarUrl
        }

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success(`Bem vindo de volta: ${data.nome}`);

      })
      .catch((error)=>{
          console.log(error);
          if(error.code === "auth/wrong-password" || error.code === 'auth/user-not-found'){
            toast.error('E-mail ou senha incorreto.');
          }else{toast.error('Ops Algo deu errado');}
          setLoadingAuth(false);
        
      })
    }


    //Function cadastro
    async function signUp(email, password, nome){
        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async (value)=>{
          let uid = value.user.uid;
    
          await firebase.firestore().collection('users')
          .doc(uid).set({
            nome: nome,
            avatarUrl: null,
          })
          .then( () => {
    
            let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
              avatarUrl: null
            };
    
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success(`Bem vindo ao Sistema: ${data.nome}`);
            
          })
    
        })
        .catch((error)=>{
          console.log(error);
          if(error.code === "auth/email-already-in-use"){
            toast.error('O endereço de e-mail já está sendo usando.');
          }else if(error.code === 'auth/invalid-email'){
            toast.error('Endereço de e-mail formato inválido.' );
          }else{toast.error('Ops Algo deu errado');}
          setLoadingAuth(false);
          
        })
    
      }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    //Function sair do sistema
    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
        window.location.pathname = '/'
    }

    return (
        <AuthContext.Provider value={{ isLogged: !!user, user, signUp , signOut, signIn ,loadingAuth, setUser, storageUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;