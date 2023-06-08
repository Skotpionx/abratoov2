'use client'
import React , {useState, useEffect} from 'react'
import Footer from './footer'
import axios from 'axios';
import Login from './login.jsx'
import BoxText from './textBox.jsx'
import { useRouter } from 'next/router';
import NavImage from './navImage';
import '../styles/authBox.css'
import '../styles/font.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from './loading';

const AuthBox = () => {
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const verifyUser = async () => {
            try {
                //Verificamos si el usuario está logeado o no y redirijimos a su perfil o a que se logee/registre.
                const response = await axios.get(`${API_URL}/auth/status`, { withCredentials: true}); 
                if (response.data.isAuthenticated === true) {
                    setIsUserLogged(true);
                    router.push('/profile');
                }else{
                    setIsUserLogged(false);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error)
            }
        };

        verifyUser();
    }, []);
    
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    if (isLoading) {
        return (
            <>
                <NavImage/>
                <Loading/>
            </>
        );
    }

    return (
        <div className="parent-container">
            <NavImage/>
            <Login /> 
            <BoxText />
            <Footer />
        </div>
    )
}

export default AuthBox
