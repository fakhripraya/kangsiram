import React from 'react'
import Button from '@material-ui/core/Button';
import { LandAddressesData } from '../Data/Addresses';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import DetectorTable from '../Components/Table/DetectorTable';
import { useSelector, useDispatch } from 'react-redux';
import { setDetectorWater, setDetectorToken, setDetectorFrom, setDetectorAddresses } from '../Redux/index';
import Modal from '@material-ui/core/Modal';
import { useState } from 'react';
import { setDetectorFromDownload } from '../Redux/Detector/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    buttonWrapper: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        position: 'relative',
        width: '20%',
        height: '20%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        left: '40%',
        top: '40%'
    },
}));

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createData(number, name, hasCrow, needWater, action) {
    return { number, name, hasCrow, needWater, action };
}

export function DetectedAddresses(callback) {
    let temp = useSelector(state => state.detectorReducer.addresses)
    var addresses = [];

    function ActionButton(props) {
        const classes = useStyles();

        const handleClick = (e) => {
            e.preventDefault();

            callback(props.urlTab);
            window.open(`https://marketplace.plantvsundead.com/farm/other/${props.urlTab}`, "_blank")
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
            <div className={classes.buttonWrapper}>
                <Button onClick={() => {
                    copyToClipboard(`https://marketplace.plantvsundead.com/farm/other/${props.urlTab}`);
                }} variant="contained" color="secondary">
                    Copy
                </Button>
                <Button onClick={handleClick} href={`https://marketplace.plantvsundead.com/farm/other/${props.urlTab}`} variant="contained" color="primary">
                    Go
                </Button>
            </div>
        )
    }

    temp.forEach((element, index) => {
        addresses.push(createData(index + 1, `https://marketplace.plantvsundead.com/farm/other/${element.ownerId}`, element.hasCrow === true ? "yes" : "no", element.activeTools.find(element => element.type === "WATER").count, <ActionButton urlTab={element.ownerId} />))
    })

    return addresses;
}

export function AutoDetectorV2() {
    const dispatch = useDispatch()
    var [captha, setCaptha] = useState(false)
    var token = useSelector(state => state.detectorReducer.token)
    var water = useSelector(state => state.detectorReducer.water)
    var from = useSelector(state => state.detectorReducer.downloadFrom)
    var interval;

    const classes = useStyles();

    async function getGeetest() {
        // https://backend-farm.plantvsundead.com/captcha/register

        // let config = {
        //     method: 'get',
        //     url: `https://backend-farm.plantvsundead.com/captcha/register`,
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }

        // axios(config)
        //     .then(function (response) {
        //         //Ensure data.gt, data.challenge and data.success are not null
        //         initGeetest({
        //             // The following data are from server side
        //             gt: response.data.gt,
        //             challenge: response.data.challenge,
        //             offline: !response.data.success,
        //             new_captcha: true
        //         }, function (captchaObj) {
        //             // Call instance method captchaObj
        //         })
        //     })
        //     .catch(function (error) {
        //         console.log(error)
        //         clearInterval(interval);
        //     })
    }

    function WarningSign() {
        const classes = useStyles();

        return (
            <Modal
                open={captha}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <h2 style={{ textAlign: 'center' }} id="simple-modal-title">Captha required</h2>
                    <p style={{ textAlign: 'center' }} id="simple-modal-description">
                        Complete the captha in the game to continue the search
                    </p>
                </div>
            </Modal>
        )
    }

    function clearTable() {
        clearInterval(interval)
        dispatch(setDetectorAddresses([]))
    }

    const generateAddress = (token, visitFrom, waterThreshold) => {
        var count = visitFrom;
        var temp = []

        interval = setInterval(() => {

            if (count > LandAddressesData.length) {
                clearInterval(interval);
            }

            let config = {
                method: 'get',
                url: `https://backend-farm.plantvsundead.com/farms/other/${LandAddressesData[count - 1]}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }

            axios(config)
                .then(async function (response) {
                    if (response.data.status === 556) {
                        setCaptha(true)
                        await sleep(5000)
                    } else {
                        setCaptha(false)
                        response.data.data.map(element => {
                            if (element.hasCrow || element.activeTools.find(element => element.type === "WATER").count <= waterThreshold) {
                                temp.push(element)
                                var temptemp = [...temp]
                                dispatch(setDetectorAddresses(temptemp))
                            }
                        })
                        count++
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    dispatch(setDetectorFromDownload(count))
                    clearInterval(interval);
                })

            dispatch(setDetectorFromDownload(count))
        }, 100);
    }

    return (
        <Box component="span" m={1}>
            <div className={classes.root}>
                <Typography variant="h5" component="h2">
                    Water & Crow Detector V2
                </Typography>
                <TextField
                    id="outlined-full-width"
                    label="JWT Token"
                    fullWidth
                    value={token}
                    onChange={(e) => {
                        dispatch(setDetectorToken(e.target.value))
                    }}
                    placeholder="Your login token"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    label="Water Threshold"
                    type="number"
                    fullWidth
                    value={water}
                    onChange={(e) => {
                        if (e.target.value < 1) {
                            dispatch(setDetectorWater(1))
                        } else {
                            dispatch(setDetectorWater(e.target.value))
                        }
                    }}
                    placeholder="The water threshold you want (it will detect lesser than what you input here)"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </div>
            <Button fullWidth onClick={() => {
                generateAddress(token, from, water)
            }} variant="contained" color="primary">
                Detect
            </Button>
            <Button fullWidth onClick={() => {
                clearTable()
            }} variant="contained" color="secondary">
                Clear
            </Button>
            <WarningSign />
            <DetectorTable />
        </Box>
    )
}
