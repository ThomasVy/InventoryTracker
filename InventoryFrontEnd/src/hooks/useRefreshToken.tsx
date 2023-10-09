import authRequest from '../api/authRequest';
import useAuth from './useAuth';

const REFRESH_URI = '/refresh';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        console.log("Refresh was called");
        try {
            const response = await authRequest.get(REFRESH_URI);
            if (response.status == 201){
                if (setAuth) setAuth(null);
                return null;
            }
            if (setAuth) setAuth({'username': response.data.username, 'accessToken': response.data.accessToken});
            return response.data.accessToken;
        } catch (error) {
            console.log(`Error ${error}`);
        }
        return null;
    }
    return refresh;
};

export default useRefreshToken;