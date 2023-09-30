import { FunctionComponent } from "react";
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingComponentProps {
    isLoading : boolean;
    alt?: any;
    children?: React.ReactNode;
};
 
const LoadingComponent: FunctionComponent<LoadingComponentProps> = ({isLoading, alt, children}) => {

    return (
        <>
            {children}
            {isLoading? <CircularProgress color="secondary" sx={{ ml: 1 }} size="1rem" /> : alt}
        </>
    )
}
 
export default LoadingComponent;