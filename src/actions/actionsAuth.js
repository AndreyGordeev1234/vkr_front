import * as types from '../constants/ActionTypes'
import myFirebase from '../firebase'
import firebase from 'firebase/app'
import 'firebase/auth';

const loginRequested = () => {
    return {
        type: types.FETCH_LOGIN_REQUEST
    }
}

const loginLoaded = (user) => {
    return {
        type: types.FETCH_LOGIN_SUCCESS,
        payload: user
    }
}

const loginError = (error) => {
    return {
        type: types.FETCH_LOGIN_FAILURE,
        payload: error
    }
}

const logoutRequested = () => { 
    return {
        type: types.FETCH_LOGOUT_REQUEST
    }
}

const logoutLoaded = () => { 
    return {
        type: types.FETCH_LOGOUT_SUCCESS
    }
}

const logoutError = (error) => { 
    return {
        type: types.FETCH_LOGOUT_FAILURE,
        payload: error
    }
}

const verifyRequested = () => { 
    return {
        type: types.FETCH_VERIFY_REQUEST
    }
}

const verifyLoaded = () => { 
    return {
        type: types.FETCH_VERIFY_SUCCESS
    }
}

const registrationRequested = () => {
    return {
        type: types.FETCH_REGISTRATION_REQUEST
    }
}

const registrationLoaded = () => {
    return {
        type: types.FETCH_REGISTRATION_SUCCESS
    }
}

const registrationError = (error) => {
    return {
        type: types.FETCH_REGISTRATION_FAILURE,
        payload: error
    }
}

const resetpasswordRequested = () => {
    return {
        type: types.FETCH_RESETPASSWORD_REQUEST
    }
}

const resetpasswordLoaded = () => {
    return {
        type: types.FETCH_RESETPASSWORD_SUCCESS
    }
}

const resetpasswordError = (error) => {
    return {
        type: types.FETCH_RESETPASSWORD_FAILURE,
        payload: error
    }
}

const changeemailRequested = () => {
    return {
        type: types.FETCH_EMAILCHANGE_REQUEST
    }
}

const changeemailLoaded = () => {
    return {
        type: types.FETCH_EMAILCHANGE_SUCCESS
    }
}

const changeemailError = (error) => {
    return {
        type: types.FETCH_EMAILCHANGE_FAILURE,
        payload: error
    }
}

const changepasswordRequested = () => {
    return {
        type: types.FETCH_PASSWORDCHANGE_REQUEST
    }
}

const changepasswordLoaded = () => {
    return {
        type: types.FETCH_PASSWORDCHANGE_SUCCESS
    }
}

const changepasswordError = (error) => {
    return {
        type: types.FETCH_PASSWORDCHANGE_FAILURE,
        payload: error
    }
}

const changeusernameRequested = () => {
    return {
        type: types.FETCH_USERNAMECHANGE_REQUEST
    }
}

const changeusernameLoaded = () => {
    return {
        type: types.FETCH_USERNAMECHANGE_SUCCESS
    }
}

const changeusernameError = (error) => {
    return {
        type: types.FETCH_USERNAMECHANGE_FAILURE,
        payload: error
    }
}

const reauthenticate = (currentPassword) => {
    const user = myFirebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
}

export const loginUser = (email, password) => (dispatch) => {
    dispatch(loginRequested())
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userData) => {
            if (!userData.user.emailVerified) dispatch(loginError({message:"Пожалуйста, подтвердите свой почтовый адрес"}))
            else dispatch(loginLoaded(userData.user))
        })
        .catch((err) => {
            dispatch(loginError(err))
        })
}

export const logoutUser = () => (dispatch) => {
    dispatch(logoutRequested())
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(logoutLoaded())
        })
        .catch((err) => {
            dispatch(logoutError(err))
        })
}

export const verifyAuth = () => (dispatch) => {
    dispatch(verifyRequested())
    myFirebase
        .auth()
        .onAuthStateChanged((user) => {
            if (user !== null && user.emailVerified) dispatch(loginLoaded(user))
            dispatch(verifyLoaded())
        })
}

export const registrationUser = (eapmlService) => (username, email, password) => (dispatch) => {
    dispatch(registrationRequested())
    myFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userData) => {
            userData.user
                    .updateProfile({
                        displayName: username
                    })
            userData.user.sendEmailVerification()
            eapmlService.postUser(userData.user.uid)
                    .then(() => {
                        dispatch(registrationLoaded())
                    })
                    .catch((err) => {
                        dispatch(registrationError(err))
                    })
        })
        .catch((err) => {
            dispatch(registrationError(err))
        })
}

export const resetpasswordUser = (email) => (dispatch) => {
    dispatch(resetpasswordRequested())
    myFirebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
            dispatch(resetpasswordLoaded())
        })
        .catch((err) => {
            dispatch(resetpasswordError(err))
        })
}

export const changeemailUser = (email, password) => (dispatch) => {
    dispatch(changeemailRequested())
    reauthenticate(password)
        .then(() => {
            myFirebase
                .auth()
                .currentUser
                .updateEmail(email)
                .then(() => {
                    myFirebase.auth().currentUser.sendEmailVerification()
                    dispatch(changeemailLoaded())
                })
                .catch((err) => {
                    dispatch(changeemailError(err))
                })
        })
        .catch((err) => {
            dispatch(changeemailError(err))
        })
}

export const changepasswordUser = (oldPassword, newPassword) => (dispatch) => {
    dispatch(changepasswordRequested())
    reauthenticate(oldPassword)
        .then(() => {
            myFirebase
                .auth()
                .currentUser
                .updatePassword(newPassword)
                .then(() => {
                    dispatch(changepasswordLoaded())
                })
                .catch((err) => {
                    dispatch(changepasswordError(err))
                })
        })
        .catch((err) => {
            dispatch(changepasswordError(err))
        })
}

export const changeusernameUser = (username) => (dispatch) => {
    dispatch(changeusernameRequested())
    myFirebase
        .auth()
        .currentUser
        .updateProfile({
            displayName: username
        })
        .then(() => {
            dispatch(changeusernameLoaded())
        })
        .catch((err) => {
            dispatch(changeusernameError(err))
        })
}