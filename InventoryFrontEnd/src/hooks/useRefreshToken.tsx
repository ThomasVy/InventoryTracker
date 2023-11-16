import { useQueryClient } from '@tanstack/react-query';
import authRequest from '../api/authRequest';
import useAuth from './useAuth';
import useShoppingCart from './useShoppingCart';

const REFRESH_URI = '/refresh';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const queryClient = useQueryClient();
    const {clearShoppingCart} = useShoppingCart();

    const refresh = async () => {
        console.log("Refresh was called");
        try {
            const response = await authRequest.get(REFRESH_URI);
            if (response.status == 201){
                queryClient.removeQueries();
                clearShoppingCart();
                setAuth(null);
                return null;
            }
            setAuth({'username': response.data.username, 'accessToken': response.data.accessToken});
            return response.data.accessToken;
        } catch (error) {
            console.log(`Error ${error}`);
        }
        return null;
    }
    return refresh;
};

export default useRefreshToken;