import { ReactNode, useState } from 'react'
import ConfirmationDialog from './ConfirmationDialog'
import { Button, ButtonProps, IconButton, IconButtonProps } from '@mui/material'
import { LoadingButton, LoadingButtonProps } from '@mui/lab';


type LoadingButton = {
    type: "Loading",
    isLoading: boolean,
    props?: Omit<Partial<LoadingButtonProps>, "onClick">,
};

type NormalButton = {
    type: "Normal",
    props?: Omit<Partial<ButtonProps>, "onClick">,
};

type IconButton = {
    type: "Icon",
    props?: Omit<Partial<IconButtonProps>, "onClick">
}

type Props = {
    dialogTitle: string,
    dialogContent: ReactNode,
    onConfirm: () => void,
    children: ReactNode,
    shouldConfirmationDialogOpen?: () => boolean,
    buttonInfo: LoadingButton | NormalButton | IconButton
};

const DEFAULT_BUTTON_PROPS = {
    color: "error",
    component: "label",
    variant: "contained",
};

const ConfirmationButton = ({ children, dialogTitle, dialogContent, onConfirm, shouldConfirmationDialogOpen, buttonInfo }: Props) => {
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const handleButtonClick = () => {
        if (shouldConfirmationDialogOpen == null || shouldConfirmationDialogOpen()) {
            setOpenConfirmation(true)
        }
        else {
            onConfirm()
        }
    }
    const renderButton = () => {
        if (buttonInfo.type === "Normal") {
            return (<Button
                onClick={handleButtonClick}
                {...buttonInfo.props}
            >
                {children}
            </Button>);
        }
        else if (buttonInfo.type === "Loading") {
            return (
                <LoadingButton
                    onClick={handleButtonClick}
                    loading={buttonInfo.isLoading}
                    {...buttonInfo.props}
                >
                    {children}
                </LoadingButton>
            );
        }
        else if (buttonInfo.type === "Icon")
        {
            return (
                <IconButton {...buttonInfo.props} onClick={handleButtonClick}>
                    {children}
                </IconButton>
            );
        }
        return null;
    }
    return (
        <>
            {renderButton()}

            <ConfirmationDialog
                title={dialogTitle}
                open={openConfirmation}
                setOpen={setOpenConfirmation}
                onConfirm={onConfirm}
            >
                {dialogContent}
            </ConfirmationDialog>
        </>
    )
}

export default ConfirmationButton;