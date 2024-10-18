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
                maxWidth="xl"

                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
                className='myDialog'
            >
                <DialogTitle id="responsive-dialog-title" style={{ direction: 'rtl', }}>
                    <Button color='error' onClick={onClose}>
                        <Close />
                    </Button>
                </DialogTitle>
                <Divider />
                <DialogContent className='dialog-content'>
                    {children}
                </DialogContent>
            </Dialog>

        </>
    );
}
