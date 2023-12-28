import { FunctionComponent } from "react";
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingComponentProps {
};
 
const LoadingComponent: FunctionComponent<LoadingComponentProps> = ({}) => {

    return (
        <>
            <CircularProgress />
        </>
    )
}
 
export default LoadingComponent;