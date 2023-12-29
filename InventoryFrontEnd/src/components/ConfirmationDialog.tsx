
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FunctionComponent, ReactNode } from 'react';

interface ConfirmationDialogProps {
    open : boolean;
    setOpen : (state: boolean) => void;
    title? : string;
    onConfirm: () => void;
    children?: ReactNode
};

const ConfirmationDialog : FunctionComponent<ConfirmationDialogProps> = ({open, setOpen, title, onConfirm, children}) =>  {
    return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="confirm-dialog"
      >
        {title && <DialogTitle id="confirm-dialog">{title}</DialogTitle>}
        {children && <DialogContent>{children}</DialogContent>}
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            color="error"
          >
            No
          </Button>
          <Button
            variant="contained"

            onClick={() => {
              setOpen(false);
              onConfirm();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default ConfirmationDialog