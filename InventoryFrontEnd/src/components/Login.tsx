import { useRef, useEffect } from 'react'
import InputField from '../react_helpers/InputField'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axiosPrivate from '../api/axios';

const LOGIN_URL = '/auth/login';

function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const errRef = useRef<HTMLParagraphElement | null>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post(LOGIN_URL,
                JSON.stringify({ username: usernameRef.current?.value, password: passwordRef.current?.value })
            );
            console.log(JSON.stringify(response?.data));
            const data = response?.data;
            
            if (setAuth)
            {
                setAuth({ 'username': data?.username, 'accessToken': data?.accessToken});
            }
            navigate(from, { replace: true });
        } catch (err) {
            if (!errRef.current)
                return;
            if (!err?.response) {
                errRef.current.innerText = 'No Server Response';
            } else if (err.response?.status === 400) {
                errRef.current.innerText = 'Missing Username or Password';
            } else if (err.response?.status === 401) {
                errRef.current.innerText = 'Unauthorized';
            } else {
                errRef.current.innerText = 'Login Failed';
            }
            errRef?.current?.focus();
        }
    }
    return ( 
        <>
            <p ref={errRef} aria-live="assertive"></p>
            <h1> Welcome Please Login </h1>
            <form onSubmit={handleSubmit}>
                <InputField type="text" id="username" label="username" ref={usernameRef} required/>
                <InputField type="password" id="password" label="password" ref={passwordRef} required autoComplete="true"/>
                <input type="submit" value="Submit" />
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </>
     );
}

export default Login;