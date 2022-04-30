import React from 'react';
import {useTheme} from "@mui/material/styles";
import {Popover, Typography} from "@mui/material";


export default function Popup({anchorEl, handleClose}) {
    const theme = useTheme()
    //const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Typography sx={{padding: theme.spacing(2)}}>The content of the Popover.</Typography>
        </Popover>
    );
}