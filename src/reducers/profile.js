import * as types from '../constants/ActionTypes'

const profile = (state, action) => {

    if (state === undefined) {
        return {
            data: {
                account: {},
                subs: {}
            },
            loading: false,
            error: null,
            isChangingInfo: false,
            changeinfoError: null,
            changeinfoSuccess: false
        }
    }

    switch (action.type) {
        case types.FETCH_PROFILE_REQUEST:
            return {
                ...state,
                data: {},
                loading: true,
                error: null
            }

        case types.FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            }

        case types.FETCH_PROFILE_FAILURE:
            return {
                ...state,
                data: {},
                loading: false,
                error: action.payload
            }

        case types.FETCH_USERINFOCHANGE_REQUEST:
            return {
                ...state,
                isChangingInfo: true,
                changeinfoError: null,
                changeinfoSuccess: false
            }
            
        case types.FETCH_USERINFOCHANGE_SUCCESS:
            return {
                ...state,
                isChangingInfo: false,
                changeinfoError: null,
                changeinfoSuccess: true
            }

        case types.FETCH_USERINFOCHANGE_FAILURE:
            return {
                ...state,
                isChangingInfo: false,
                changeinfoError: action.payload,
                changeinfoSuccess: false
            }

        default:
            return state
    }

}

export default profile