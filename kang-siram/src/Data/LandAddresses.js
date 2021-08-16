import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { LandAddressesData } from './Addresses';

const customStyles = makeStyles((theme) => ({
    buttonWrapper: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function createData(number, name, action) {
    return { number, name, action };
}

export default function LandAddresses(callback) {
    var addresses = [];

    function ActionButton(props) {
        const externalClasses = customStyles();

        const handleClick = (e) => {
            e.preventDefault();

            callback(props.urlTab);
            window.open(`https://marketplace.plantvsundead.com/farm#/farm/other/${props.urlTab}`, "_blank")
        };

        const copyToClipboard = (content) => {
            const el = document.createElement('textarea');
            el.value = content;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        };

        return (
            <div className={externalClasses.buttonWrapper}>
                <Button onClick={() => {
                    copyToClipboard(`https://marketplace.plantvsundead.com/farm#/farm/other/${props.urlTab}`);
                }} variant="contained" color="secondary">
                    Copy
                </Button>
                <Button onClick={handleClick} href={`https://marketplace.plantvsundead.com/farm#/farm/other/${props.urlTab}`} variant="contained" color="primary">
                    Go
                </Button>
            </div>
        )
    }

    LandAddressesData.forEach((element, index) => {
        addresses.push(createData(index + 1, element, <ActionButton urlTab={element} />))
    })

    return addresses;
}