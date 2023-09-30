import { Typography } from '@mui/material';
import useAuth from '../hooks/useAuth.tsx';

function Home() {
    const { auth } = useAuth();

    if (auth){
        return <Typography variant="h1" textAlign="center">Welcome {auth.username}</Typography>
    }
    return ( 
        <>
            <Typography variant="h1" textAlign="center">Welcome to the Home Page</Typography>
        </>
     );
}

export default Home;