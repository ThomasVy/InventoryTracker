import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { AxiosInstance } from "axios";

const useAuthPrivateRequest = (requester: AxiosInstance) => {
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    useEffect(() => {

        const requestIntercept = requester.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = requester.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    if (newAccessToken == null) {
                        //Refresh token expired so we need to pass the error forward
                        setAuth(null);
                        console.log("refresh token expired so setting auth to null");
                        return Promise.reject(error);
                    }
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return requester(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            requester.interceptors.request.eject(requestIntercept);
            requester.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh, setAuth])

    return requester;
}

export default useAuthPrivateRequest;