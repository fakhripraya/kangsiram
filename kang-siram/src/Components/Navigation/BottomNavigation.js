import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    root: {
        width: "auto",
    },
});

export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction showLabel label="Created by : PakPres" value="Created" />
            <BottomNavigationAction showLabel label="" value="left" />
            <BottomNavigationAction showLabel label="Donation : 0xf0F16b80Ff38F882dD5b3C0Ed6ec4e06774324D7" value="Donation" />
            <BottomNavigationAction showLabel label="" value="right" />
            <BottomNavigationAction showLabel label="Credit to : Altergogi" value="Credit" />
        </BottomNavigation>
    );
}