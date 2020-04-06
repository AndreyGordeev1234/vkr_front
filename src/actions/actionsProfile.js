import * as types from '../constants/ActionTypes'

const profileRequested = () => {
    return {
        type: types.FETCH_PROFILE_REQUEST
    }
}

const profileLoaded = (profileData) => {
    return {
        type: types.FETCH_PROFILE_SUCCESS,
        payload: profileData
    }
}

const profileError = (error) => {
    return {
        type: types.FETCH_PROFILE_FAILURE,
        payload: error
    }
}

const changeuserinfoRequested = () => {
    return {
        type: types.FETCH_USERINFOCHANGE_REQUEST
    }
}

const changeuserinfoLoaded = () => {
    return {
        type: types.FETCH_USERINFOCHANGE_SUCCESS
    }
}

const changeuserinfoError = (error) => {
    return {
        type: types.FETCH_USERINFOCHANGE_FAILURE,
        payload: error
    }
}

export const fetchProfile = (eapmlService) => (email) => (dispatch) => {
    dispatch(profileRequested())
    eapmlService.getProfile(email)
        .then((data) => dispatch(profileLoaded(data)))
        .catch((err) => dispatch(profileError(err)))
}

export const changeUserInfo = (eapmlService) => (user) => (dispatch) => {
    dispatch(changeuserinfoRequested())
    eapmlService.changeUserInfo(user)
        .then(() => {
            dispatch(changeuserinfoLoaded())
        })
        .catch((err) => {
            dispatch(changeuserinfoError(err))
        })
}