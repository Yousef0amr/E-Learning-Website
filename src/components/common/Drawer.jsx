import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AnchorTemporaryDrawer({ state, toggleDrawer, listItems }) {

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '50vw',
                color: 'white',

            }}

            role="presentation"
            onClick={() => toggleDrawer()}
            onKeyDown={() => toggleDrawer()}
        >
            <List style={{ justifyContent: 'center', width: '100%', gap: '10px' }}>

                {listItems.map((item) => (
                    <Link to={item.href} style={{ textDecoration: 'none', color: 'white' }} key={item.label}>
                        <ListItem disablePadding style={{ color: 'white', marginBottom: '2px', backgroundColor: '#202020', }} >

                            <ListItemButton style={{ color: 'white' }}>

                                <ListItemText primary={item.label} style={{ fontSize: '10px !important', textAlign: 'end', marginRight: '10px' }} />
                                <FontAwesomeIcon icon={item.icon} />
                            </ListItemButton>

                        </ListItem></Link>
                ))}

            </List>

        </Box>
    );


    return (
        <Drawer
            anchor={'right'}
            open={state}
            onClose={() => toggleDrawer()}
            transitionDuration={{
                appear: 100,
                enter: 400,
                exit: 400
            }}

            PaperProps={{
                sx: {
                    bgcolor: 'var(--primary-color)',
                    color: 'white',
                    boxShadow: 'var(--shadow-effect)',       // Apply text color
                }
            }}
        >
            {list('right')}
        </Drawer>
    );
}
