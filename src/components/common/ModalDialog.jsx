import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Close } from '@mui/icons-material';
import { Divider } from '@mui/material';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalDialog({ open, onClose, children, optionalChildren }) {
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
                TransitionComponent={Transition}
            >
                <DialogTitle id="responsive-dialog-title" style={{ direction: 'rtl', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', }}>
                    <div > {optionalChildren} </div>
                    <Button color='error' onClick={onClose}>
                        <Close />
                    </Button>
                </DialogTitle>
                <Divider style={{ backgroundColor: '#202020' }} />
                <DialogContent className='dialog-content' style={{ padding: '0' }}>
                    {children}
                </DialogContent>
            </Dialog>

        </>
    );
}
