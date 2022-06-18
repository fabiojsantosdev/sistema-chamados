import AuthProvider from './contexts/auth';
import { Routers } from './routes';
import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer} from 'react-toastify';


function App() {

  return (
      <AuthProvider>
       <ToastContainer autoClose={4000} />
       <Routers/>
      </AuthProvider>
  )
}

export default App;
