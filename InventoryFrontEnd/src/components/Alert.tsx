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
      <Alert variant="outlined" style={{width:'100%'}} severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </>
  );
};

export default AlertMsg;
