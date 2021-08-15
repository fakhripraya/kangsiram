import { DETECTOR_WATER, DETECTOR_TOKEN, DETECTOR_FROM, DETECTOR_DOWNLOAD_FROM, DETECTOR_ADDRESSES } from './types'

const detectorState = {
    token: "",
    water: 1,
    from: 1,
    downloadFrom: 1,
    addresses: [],
}

const detectorReducer = (state = detectorState, action) => {
    switch (action.type) {
        case DETECTOR_WATER: return {
            ...state,
            water: action.water,
        }
        case DETECTOR_TOKEN: return {
            ...state,
            token: action.token,
        }
        case DETECTOR_FROM: return {
            ...state,
            from: action.from
        }
        case DETECTOR_DOWNLOAD_FROM: return {
            ...state,
            downloadFrom: action.downloadFrom
        }
        case DETECTOR_ADDRESSES: return {
            ...state,
            addresses: action.addresses
        }
        default: return state
    }
}

export default detectorReducer;