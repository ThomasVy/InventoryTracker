import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axiosPrivate from '../api/axios';
import useAuth from '../hooks/useAuth';

const LOGOUT_URL = '/auth/logout';

function Logout() {
    const [errMsg, setErrMsg] = useState<string>('');
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.get(LOGOUT_URL);
            if (response.status != 200 && response.status != 204)
            {
                setErrMsg(`Failed to log out ${response.status}`);
                return;
            }

            if (response.status == 200)
                setErrMsg("Successfully logged out");
            else if (response.status == 204)
                setErrMsg(`No refresh token was supplied`);
        } catch (error) {
            setErrMsg(`Failed to log out catched error ${error}`);            
        }
        if (setAuth) setAuth(null);
        navigate('/', { replace: true });
    };
    return ( 
    <>
        {errMsg}
        <button onClick={handleSubmit}>Signout</button>
    </> 
    );
}

export default Logout;