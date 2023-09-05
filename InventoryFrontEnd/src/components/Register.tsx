import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Input from "../react_helpers/Input";
import axios from "../api/axios";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';


interface RegisterProps {
    
}
 
const Register: FunctionComponent<RegisterProps> = () => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const usernameErrorRef = useRef<HTMLParagraphElement>(null);

    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordErrorRef = useRef<HTMLParagraphElement>(null);

    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordErrorRef = useRef<HTMLParagraphElement>(null);

    const msgRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    const verifyUsername = (username: string) => {
        if (!usernameErrorRef.current) return;
        if(!USER_REGEX.test(username)){
            usernameErrorRef.current.innerHTML = 
                    "Username must be 4 to 24 characters.<br />\
                    Must begin with a letter.<br />\
                    Letters, numbers, underscores, hyphens allowed.";
            return;
        }
        usernameErrorRef.current.innerHTML = "";
    };

    const verifyPassword = (password: string) => {
        if (!passwordErrorRef.current) return;
        if (!PWD_REGEX.test(password)) {
            passwordErrorRef.current.innerHTML =  
                "Password must be 8 to 24 characters.<br />\
                Must include uppercase and lowercase letters, a number and a special character.";
            return;
        }
        passwordErrorRef.current.innerHTML = "";
    };

    const verifyConfirmPassword = (confirmPassword: string) => {
        if (!confirmPasswordErrorRef.current) return;
        if (passwordRef.current?.value !== confirmPassword)
        {
            confirmPasswordErrorRef.current.innerHTML = "Passwords do not match";
            return;
        }
        confirmPasswordErrorRef.current.innerHTML = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if( msgRef.current ) msgRef.current.innerText = '';
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;
        if (!username || !password ||  !confirmPassword )
        {
            if( msgRef.current ) msgRef.current.innerText = "Username, Password, or Confirm Password missing"
            return;
        }
        
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = confirmPassword === password;
        if (!v1 || !v2 || !v3) {
            if( msgRef.current ) msgRef.current.innerText = "Invalid Entry - One of the entries below do not meet the requirements";
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username, password })
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            if( msgRef.current ) msgRef.current.innerText = "Successfully created user";
            usernameRef.current.value = '';
            passwordRef.current.value = '';
            confirmPasswordRef.current.value = '';
        } catch (err) {
            if( msgRef.current ){            
                if (!err?.response) {
                    msgRef.current.innerText = 'No Server Response';
                } else if (err.response?.status === 409) {
                    msgRef.current.innerText = 'Username Taken';
                } else {
                    msgRef.current.innerText = 'Registration Failed';
                }
            }
            msgRef.current?.focus();
        }
    }

    return(
        <>
            <p ref={msgRef} aria-live="assertive"/>
            <h1> Register for an Account</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    id="username"
                    label="username"
                    ref={usernameRef}
                    verificationFunction={verifyUsername}
                    required     
                />
                <p ref={usernameErrorRef} aria-live="assertive" />

                <Input 
                    type="password"
                    id="password"
                    label="password"
                    ref={passwordRef}
                    verificationFunction={verifyPassword}
                    required
                    autoComplete="true"
                />
                <p ref={passwordErrorRef} aria-live="assertive"/>

                <Input 
                    type="password" 
                    id="confirmPassword" 
                    label="Confirm Password" 
                    ref={confirmPasswordRef}
                    verificationFunction={verifyConfirmPassword}
                    required
                    autoComplete="true"
                />
                <p ref={confirmPasswordErrorRef} aria-live="assertive"/>

                <input type="submit" value="Sign Up" />
            </form>
            <p>
                Already have an account?<br />
                <span className="line">
                    <Link to="/login">Login</Link>
                </span>
            </p>
        </>
    );

}
 
export default Register;