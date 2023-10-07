import { Alert, AlertTitle } from "@mui/material";
import { FunctionComponent } from "react";

interface AlertMsgProps {
  title: string;
  message: string | null;
  severity: "error"|"warning"|"info"|"success";
}

const AlertMsg: FunctionComponent<AlertMsgProps> = ({ message, severity, title }) => {
  if (!message || message.length === 0) return null;

  return (
    <>
      <Alert sx={{ display: 'flex', justifyContent: 'center', width:'100%' }} variant="outlined" severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </>
  );
};

export default AlertMsg;
