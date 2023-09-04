import { useRef, useEffect, useCallback, useState } from 'react'
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Input from '../react_helpers/Input'
import { LoginForm, login } from '../api/backend'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axiosPrivate from '../api/axios';

const LOGIN_URL = '/auth/login';

function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [inputValue, setInputValue] = useState<LoginForm>({ username: "", password: "" });
    const [errMsg, setErrMsg] = useState<string>('');
    const { username, password } = inputValue;

    const errRef = useRef<HTMLParagraphElement | null>(null);

    const handleChange = useCallback((e) => {
        const { id, value } = e.target;
        setInputValue((prev) => ({
        ...prev,
        [id]: value,
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post(LOGIN_URL,
                JSON.stringify({ username, password })
            );
            console.log(JSON.stringify(response?.data));
            const data = response?.data;
            
            if (setAuth)
            {
                setAuth({ 'username': data?.username, 'accessToken': data?.accessToken});
            }
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef?.current?.focus();
        }
    }
    return ( 
        <>
            <p ref={errRef} aria-live="assertive">{errMsg}</p>
            <h1> Welcome Please Login </h1>
            <form onSubmit={handleSubmit}>
                <Input type="text" value={username} id="username" label="username" onChange={handleChange}/>
                <Input type="password" value={password} id="password" label="password" onChange={handleChange}/>
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