import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Close } from '@mui/icons-material';
import { Divider } from '@mui/material';


export default function ModalDialog({ open, onClose, children }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const dialogWidth = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"

            >
                <DialogTitle id="responsive-dialog-title" style={{ direction: 'rtl', width: dialogWidth ? '100%' : '500px' }}>
                    <Button color='error' onClick={onClose}>
                        <Close />
                    </Button>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>

        </>
    );
}
