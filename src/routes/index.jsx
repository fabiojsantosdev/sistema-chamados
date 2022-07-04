import {useContext} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import {Profile} from '../pages/Profile';
import {AuthContext} from '../contexts/auth';
import { Customers } from '../pages/Customers';
import { New } from '../pages/New';


export function Routers(){

    const {isLogged} = useContext(AuthContext);

    return(
        
            <Routes>
                <Route exact path="/" element={ isLogged ? <Dashboard/> : <SignIn/>}/>
                <Route exact path="/register" element={isLogged ? <Dashboard/> : <SignUp/>}/>
                <Route exact path="/dashboard" element={ isLogged ? <Dashboard/> : <SignIn/>}/>
                <Route exact path="/profile" element={ isLogged ? <Profile/> : <SignIn/>}/>
                <Route exact path="/customers" element={ isLogged ? <Customers/> : <SignIn/>}/>
                <Route exact path="/new" element={ isLogged ? <New/> : <SignIn/>}/>
                <Route exact path="/new/:id" element={ isLogged ? <New/> : <SignIn/>}/>
            </Routes>
    )
}
