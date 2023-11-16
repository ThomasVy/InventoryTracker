import {ToastOptions, toast} from "react-toastify"
type ToastType = "error"|"warning"|"info"|"success";
const TOAST_FUNCTIONS = {
    "error" : toast.error,
    "warning" : toast.warning,
    "info" : toast.info,
    "success" : toast.success
}
const TOAST_DEFAULT_OPTIONS : ToastOptions= {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar:false,
    closeOnClick : true,
    pauseOnHover: true,
    draggable : true,
    progress: undefined,
    theme: "dark"
}
export const showToast = ( text: string, type : ToastType = "error", options?: Partial<ToastOptions>) =>
{
    const toastFn = TOAST_FUNCTIONS[type];
    toastFn(text, {...TOAST_DEFAULT_OPTIONS, ...options})
}