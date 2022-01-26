const OFF = 'editOrg/OFF'
const ON = 'editOrg/ON'

export const editPhotoOn = () => {
    return {
        type: ON
    }
}

export const editPhotoOff = () => {
    return {
        type: OFF
    }
}


const editPhotoFormReducer = (state = false, action) => {
    switch(action.type) {
        case OFF:
            return false
        case ON:
            return true
        default:
            return false
    }
}

export default editPhotoFormReducer;
