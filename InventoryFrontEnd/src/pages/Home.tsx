import useAuth from '../hooks/useAuth.tsx';

function Home() {
    const { auth } = useAuth();

    const welcomeMessageFunc = () => {
        if (auth)
            return (<p>Welcome {auth?.username}</p>);
        else
            return null;
    };
    return ( 
        <>

            {welcomeMessageFunc()}
            <h1>Welcome! There is nothing here</h1>
        </>
     );
}

export default Home;