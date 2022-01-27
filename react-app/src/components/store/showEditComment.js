const OFF = 'editComment/OFF'
const ON = 'editComment/ON'

export const editCommentOn = () => {
    return { type: ON }
}

export const editCommentOff = () => {
    return { type: OFF }
}


const editCommentFormReducer = (state = false, action) => {
    switch(action.type) {
        case OFF:
            return false
        case ON:
            return true
        default:
            return false
    }
}

export default editCommentFormReducer;
