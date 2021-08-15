import React, { Fragment, useEffect } from 'react'
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
import LinearProgress from '@material-ui/core/LinearProgress';
import Collapse from '@material-ui/core/Collapse';
import { whitelist } from '../Data/Cred';

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
        addresses.push(createData(index + 1, `https://marketplace.plantvsundead.com/farm/other/${element.ownerId}`, element.hasCrow === true ? "yes" : "no", typeof (element.activeTools.find(element => element.type === "WATER")) === 'undefined' ? 999 : element.activeTools.find(element => element.type === "WATER").count, <ActionButton urlTab={element.ownerId} />))
    })

    return addresses;
}

export function AutoDetector() {
    var interval;
    const classes = useStyles();
    const dispatch = useDispatch()
    var [captha, setCaptha] = useState(false)
    var [session, setSession] = useState(false)
    var [loading, setLoading] = useState(false)
    var [password, setPassword] = useState(true)
    var [pwd, setInputPwd] = useState("")
    var token = useSelector(state => state.detectorReducer.token)
    var water = useSelector(state => state.detectorReducer.water)
    var from = useSelector(state => state.detectorReducer.from)

    useEffect(() => {
        const script = document.createElement('script')

        script.src = '../../public/gt.js'
        script.async = true;

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    // async function getGeetest() {
    //     //https://backend-farm.plantvsundead.com/captcha/register

    //     let config = {
    //         method: 'get',
    //         url: `https://backend-farm.plantvsundead.com/captcha/register`,
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     }

    //     axios(config)
    //         .then(function (response) {
    //             console.log("masuk")
    //             console.log(response    )
    //             //Ensure data.gt, data.challenge and data.success are not null
    //             window.initGeetest({
    //                 // The following data are from server side
    //                 gt: response.data.gt,
    //                 challenge: response.data.challenge,
    //                 offline: !response.data.success,
    //                 new_captcha: true
    //             }, function (captchaObj) {
    //                 // Call instance method captchaObj
    //             })
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //             clearInterval(interval);
    //         })
    // }

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
                <Button fullWidth onClick={() => {
                    setCaptha(false)
                }} variant="contained" color="secondary">
                    Hide
                </Button>
            </Modal>
        )
    }

    function LogoutSign() {
        const classes = useStyles();

        return (
            <Modal
                open={session}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <h2 style={{ textAlign: 'center' }} id="simple-modal-title">Ingame session invalid</h2>
                    <p style={{ textAlign: 'center' }} id="simple-modal-description">
                        Your ingame session done, comeback with a valid ingame session
                    </p>
                    <Button fullWidth onClick={() => {
                        setSession(false)
                    }} variant="contained" color="secondary">
                        Close
                    </Button>
                </div>
            </Modal>
        )
    }

    function clearTable() {
        clearInterval(interval)
        dispatch(setDetectorAddresses([]))
    }

    const generateAddress = async (token, visitFrom, waterThreshold) => {
        var count = visitFrom;
        var temp = []

        setLoading(true)
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
                        setCaptha(true); setLoading(false);
                    } else {
                        setLoading(true); setCaptha(false);

                        if (Object.keys(response.data.data).length === 0 && response.data.data.constructor === Object) {
                            setSession(true); setCaptha(false); setLoading(false); clearInterval(interval);
                        }
                        else {
                            console.log(count)
                            response.data.data.map(element => {
                                var waterCount;

                                if (typeof (element.activeTools.find(el => el.type === "WATER")) === 'undefined')
                                    waterCount = 999
                                else
                                    waterCount = element.activeTools.find(el => el.type === "WATER").count

                                if (element.hasCrow || waterCount <= waterThreshold) {
                                    console.log("valid")
                                    temp.push(element)
                                    var temptemp = [...temp]
                                    dispatch(setDetectorAddresses(temptemp))
                                }
                            })
                            count++
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error); setSession(false); setCaptha(false); setLoading(false); clearInterval(interval);
                })
        }, 500);

        await sleep(3000); setSession(false); setCaptha(false); setLoading(false);
    }

    if (password === true) {
        return (
            <Box component="span" m={1}>
                <div className={classes.root}>
                    <Typography variant="h5" component="h2">
                        Water & Crow Detector
                    </Typography>
                    <TextField
                        id="outlined-full-width"
                        label="Input Password"
                        fullWidth
                        value={pwd}
                        onChange={(e) => {
                            setInputPwd(e.target.value)
                        }}
                        placeholder="Input whitelist password here"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <Button fullWidth onClick={() => {
                        if (typeof (whitelist.find(el => el === pwd)) !== 'undefined') {
                            setPassword(false)
                        }
                    }} variant="contained" color="primary">
                        Submit
                    </Button>
                </div>
            </Box>
        )
    } else {
        return (
            <Box component="span" m={1}>
                <div className={classes.root}>
                    <Typography variant="h5" component="h2">
                        Water & Crow Detector
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
                    <TextField
                        id="outlined-full-width"
                        label="Visit from"
                        type="number"
                        fullWidth
                        value={from}
                        onChange={(e) => {
                            if (e.target.value < 1) {
                                dispatch(setDetectorFrom(1))
                            } else {
                                dispatch(setDetectorFrom(e.target.value))
                            }
                        }}
                        placeholder="Determine the first address to visit, this behave incrementally"
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
                <Collapse in={loading}>
                    <LinearProgress />
                </Collapse>
                <LogoutSign />
                <WarningSign />
                <DetectorTable />
            </Box>
        )
    }
}
