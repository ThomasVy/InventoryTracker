import useAuth from "../hooks/useAuth";
import { FunctionComponent } from "react";

interface AdminProps {
    
}

const Admin : FunctionComponent<AdminProps>  = ({}) => {
    const { auth } = useAuth();
    return (  
        <>
            <h3>Restricted Access</h3>
            <p> username : {auth?.username} </p>
            <p> accessToken : {auth?.accessToken} </p>
        </>
    );
}
 
export default Admin;