import { DETECTOR_WATER, DETECTOR_TOKEN, DETECTOR_FROM, DETECTOR_DOWNLOAD_FROM, DETECTOR_ADDRESSES } from './types'

export const setDetectorWater = (water) => {
    return {
        type: DETECTOR_WATER,
        water: water
    }
}

export const setDetectorToken = (token) => {
    return {
        type: DETECTOR_TOKEN,
        token: token
    }
}

export const setDetectorFrom = (from) => {
    return {
        type: DETECTOR_FROM,
        from: from
    }
}

export const setDetectorFromDownload = (downloadFrom) => {
    return {
        type: DETECTOR_DOWNLOAD_FROM,
        downloadFrom: downloadFrom
    }
}

export const setDetectorAddresses = (addresses) => {
    return {
        type: DETECTOR_ADDRESSES,
        addresses: addresses
    }
}
