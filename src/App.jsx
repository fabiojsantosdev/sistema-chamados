import AuthProvider from './contexts/auth';
import DrawerProvider from './contexts/drawerContext';
import { BrowserRouter } from 'react-router-dom';
import { Routers } from './routes';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <AuthProvider>
      <DrawerProvider>
        <BrowserRouter>
          <ToastContainer autoClose={4000} />
          <Routers />
        </BrowserRouter>
      </DrawerProvider>
    </AuthProvider>
  )
}

export default App;
