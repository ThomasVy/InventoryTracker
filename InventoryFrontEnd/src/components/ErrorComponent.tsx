import { Typography } from "@mui/material";

type ErrorComponentProps = {
    error: string
};
function ErrorComponent({error}: ErrorComponentProps) {
    return (
        <>
            <Typography color="red" >
                {error}
            </Typography>
        </>
    );
}
export default ErrorComponent;