import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolBar: {
        backgroundColor: "#58BD0C"
    },
    navButton: {
        marginLeft: "10px",
        backgroundColor: "#71bd26"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

export default function SearchAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolBar}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <span style={{ color: "white", fontWeight: "bold" }}>PVU Helper</span>
                    </Typography>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button className={classes.navButton} variant="contained">
                            <span style={{ color: "white", fontWeight: "bold" }}>Plot Addresses</span>
                        </Button>
                    </Link>
                    <Link to="/bot" style={{ textDecoration: 'none' }}>
                        <Button className={classes.navButton} variant="contained">
                            <span style={{ color: "white", fontWeight: "bold" }}>Bot</span>
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}
