import { useQueryClient } from '@tanstack/react-query';
import authRequest from '../api/authRequest';
import useAuth from './useAuth';
import useShoppingCart from './useShoppingCart';

const REFRESH_URI = '/refresh';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const queryClient = useQueryClient();
    const {clearShoppingCart, closeCart} = useShoppingCart();

    const refresh = async () => {
        try {
            const response = await authRequest.get(REFRESH_URI);
            if (response.status == 403) {
                queryClient.removeQueries();
                clearShoppingCart();
                closeCart();
                setAuth(null);
                return null;
            }
            if (response.status == 201){
                queryClient.removeQueries();
                clearShoppingCart();
                closeCart();
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