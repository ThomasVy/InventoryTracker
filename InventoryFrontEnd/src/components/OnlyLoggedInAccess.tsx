import useAuth from "../hooks/useAuth";
import { FunctionComponent } from "react";

interface OnlyLoggedInAccessProps {
    
}
 
const OnlyLoggedInAccess : FunctionComponent<OnlyLoggedInAccessProps>  = ({}) => {
    const { auth } = useAuth();
    return (  
        <>
            <h3>Restricted Access</h3>
            <p> username : {auth?.username} </p>
            <p> accessToken : {auth?.accessToken} </p>
        </>
    );
}
 
export default OnlyLoggedInAccess;