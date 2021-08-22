import React, { useEffect } from 'react'
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
import Alert from '@material-ui/lab/Alert';
import Dexie from "dexie";

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
            <div className={classes.buttonWrapper}>
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

    temp.forEach((element, index) => {
        addresses.push(createData(index + 1, `https://marketplace.plantvsundead.com/farm#/farm/other/${element.ownerId}`, element.hasCrow === true ? "yes" : "no", typeof (element.activeTools.find(element => element.type === "WATER")) === 'undefined' ? 999 : element.activeTools.find(element => element.type === "WATER").count, <ActionButton urlTab={element.ownerId} />))
    })

    return addresses;
}

export function AutoDetector() {

    const db = new Dexie("IndexedDB");

    //create the database store
    db.version(2).stores({
        addresses: "++id,addresses",
        plants: "++id,plant,ownerId",
    })
    db.open().catch((err) => {
        console.log(err.stack || err)
    })

    var interval;
    const classes = useStyles();
    const dispatch = useDispatch()
    var [captha, setCaptha] = useState(false)
    // var [onCaptha, setOnCaptha] = useState(false)
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

    // async function getCaptha() {
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
    //             console.log(response.data.data)
    //             //Ensure data.gt, data.challenge and data.success are not null
    //             window.initGeetest({
    //                 // The following data are from server side
    //                 gt: response.data.data.gt,
    //                 challenge: response.data.data.challenge,
    //                 offline: !response.data.data.success,
    //                 new_captcha: true
    //             }, function (captchaObj) {
    //                 // Call instance method captchaObj
    //                 console.log(captchaObj)
    //                 captchaObj.appendTo("#captchaBox"); //Embed CAPTCHA button into "captchaBox" of the host page
    //                 captchaObj.onReady(function () {
    //                     //your code
    //                     console.log("ready")

    //                 }).onSuccess(function () {
    //                     //your code
    //                     console.log("success")
    //                     var result = captchaObj.getValidate();

    //                     let config2 = {
    //                         method: 'post',
    //                         data: {
    //                             challenge: result.geetest_challenge,
    //                             seccode: result.geetest_validate,
    //                             validate: result.geetest_seccode,
    //                         },
    //                         url: `https://backend-farm.plantvsundead.com/captcha/validate`,
    //                         headers: {
    //                             'Authorization': `Bearer ${token}`
    //                         }
    //                     }

    //                     axios(config2)
    //                         .then(function (response) {
    //                             console.log("captha kelar")
    //                             console.log(response.data)
    //                         })
    //                         .catch(function (error) {
    //                             console.log("error captha")
    //                             console.log(error)
    //                         })

    //                     console.log(result)

    //                 }).onError(function () {
    //                     //your code
    //                     console.log("error")
    //                 })

    //             })
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //             clearInterval(interval);
    //         })
    // }

    // function CapthaBox() {
    //     const classes = useStyles();

    //     return (
    //         <Modal
    //             open={onCaptha}
    //             aria-labelledby="simple-modal-title"
    //             aria-describedby="simple-modal-description"
    //         >
    //             <div id="captchaBox" className={classes.paper}>
    //                 <h2 style={{ textAlign: 'center' }} id="simple-modal-title">Complete the captha</h2>
    //                 <p style={{ textAlign: 'center' }} id="simple-modal-description">
    //                     Complete the captha to continue searching
    //                 </p>
    //                 {/* <Button fullWidth onClick={() => {
    //                     setSession(false)
    //                 }} variant="contained" color="secondary">
    //                     Close
    //                 </Button> */}
    //             </div>
    //         </Modal>
    //     )
    // }

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

    function ShowDownloaded() {

        return (
            <Collapse in={(from + 1) !== LandAddressesData.length ? true : false}>
                <Alert severity="warning">{from} of {LandAddressesData.length} Addresses Downloaded</Alert>
            </Collapse >
        )
    }

    function clearTable() {
        clearInterval(interval)
        dispatch(setDetectorAddresses([]))
    }

    const GenerateAddresses = async (waterThreshold) => {
        //get all plants from the database
        let allPlants = []
        let temp = []

        setLoading(true);
        const requestGetPlants = (el) => {
            let config = {
                method: 'get',
                url: `https://backend-farm.plantvsundead.com/farms/${el.plant}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }

            axios(config)
                .then(async function (response) {
                    if (response.data.status === 556) {
                        setCaptha(true);
                    } else {
                        setCaptha(false);

                        if (Object.keys(response.data.data).length === 0 && response.data.data.constructor === Object) {
                            setSession(true); setCaptha(false); setLoading(false); clearInterval(interval);
                        }
                        else {
                            var waterCount;

                            if (typeof (response.data.data.activeTools.find(el => el.type === "WATER")) === 'undefined')
                                waterCount = 999
                            else
                                waterCount = response.data.data.activeTools.find(el => el.type === "WATER").count

                            if (response.data.data.hasCrow || waterCount <= waterThreshold) {
                                temp.push(response.data.data)
                                var temptemp = [...temp]
                                dispatch(setDetectorAddresses(temptemp))
                            }
                            console.log(".")
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        const getPlants = async () => {
            allPlants = await db.plants.toArray();
            allPlants.forEach(async (el, index) => {
                console.log(index)
                setTimeout(() => {
                    requestGetPlants(el);
                }, 2000);
            })
        }
        await getPlants();
    }

    const downloadPlant = async (token) => {
        var count = from;
        console.log("Downloading " + LandAddressesData.length + " land addresses data")

        setLoading(true)
        interval = setInterval(async () => {

            if (count > LandAddressesData.length) {
                dispatch(setDetectorFrom(LandAddressesData.length)); clearInterval(interval); setLoading(false);
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
                    console.log("Addess ke: " + (count + 1))
                    if (response.data.status === 556) {
                        setCaptha(true); console.log("captha")
                    } else {
                        setCaptha(false);

                        if (Object.keys(response.data.data).length === 0 && response.data.data.constructor === Object) {
                            setSession(true); setCaptha(false); setLoading(false); clearInterval(interval); console.log("invalid object")
                        }
                        else {
                            await db.addresses.add({ addresses: LandAddressesData[count] })
                            response.data.data.map(async (element) => {
                                let plant = {
                                    plant: element._id,
                                    ownerId: element.ownerId,
                                }
                                await db.plants.add(plant);
                            })
                        }
                        count++
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }, 2000);
    }

    if (password === true) {
        return (
            <Box component="span" m={1}>
                <div className={classes.root}>
                    <Typography variant="h5" component="h2">
                        Kang Nyari
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
                <Typography variant="h5" component="h2">
                    Kang Nyari
                </Typography>
                <TextField
                    id="outlined-full-width"
                    label="JWT Token"
                    fullWidth
                    value={token}
                    onChange={(e) => {
                        dispatch(setDetectorToken(e.target.value))
                    }}
                    placeholder="Please input your login token before doing anything"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <ShowDownloaded />
                <Button disabled={(from + 1) !== LandAddressesData.length ? false : true} fullWidth onClick={() => {
                    downloadPlant(token)
                }} variant="contained" color="primary">
                    Download data
                </Button>
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
                <Button fullWidth onClick={() => {
                    GenerateAddresses(water)
                }} variant="contained" color="primary">
                    Detect
                </Button>
                <Button fullWidth onClick={() => {
                    clearTable()
                }} variant="contained" color="secondary">
                    Clear
                </Button>
                <Collapse in={captha}>
                    <Alert severity="warning">Input the captha on the main game!</Alert>
                    {/* <Button fullWidth onClick={() => {
                        getCaptha()
                        setOnCaptha(true);
                    }} variant="contained" color="secondary">
                        Get Captha
                    </Button> */}
                </Collapse>
                <Collapse in={loading}>
                    <LinearProgress />
                </Collapse>
                <LogoutSign />
                {/* <CapthaBox /> */}
                <DetectorTable />
            </Box>
        )
    }
}
