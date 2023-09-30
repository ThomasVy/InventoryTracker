import { useState } from "react";

export enum ServerMessageType {
    Success,
    Fail
}

const useVerification = () => {
    const [failedMsg, setFailedMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
    const setMessage = (message: string, type: ServerMessageType) => {
        if (type === ServerMessageType.Fail) {
            setFailedMsg(message);
            setSuccessMsg(null);
        } else {
            setFailedMsg(null);
            setSuccessMsg(message);
        }
    };

    const clear = () => {
        setFailedMsg(null);
        setSuccessMsg(null);
    };

    return {
        setMessage, clear, successMsg, failedMsg
    }

}

export default useVerification;