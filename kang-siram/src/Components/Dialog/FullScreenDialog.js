import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { KangKebonBergagak } from '../../Codes/KangKebonBergagakCode';
import { KangKebon } from '../../Codes/KangKebonCode';
import { KangGagak } from '../../Codes/KangGagakCode';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: "#58BD0C",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    button: {
        color: "#58bd0c",
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" className={classes.button} onClick={handleClickOpen}>
                Manual Script
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Manual Script
                        </Typography>
                    </Toolbar>
                </AppBar>
                <SyntaxHighlighter disableScrollLock={true} language="js" style={coy}>
                    {id === 0
                        ? KangKebon
                        : id === 1
                            ? KangGagak
                            : id === 2 ? KangKebonBergagak : ""}
                </SyntaxHighlighter>
            </Dialog>
        </div>
    );
}
