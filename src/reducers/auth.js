import * as types from '../constants/ActionTypes'

const auth = (state, action) => {

    if (state === undefined) {
        return {
            isLoggingIn: false,
            isLoggingOut: false,
            isVerifying: false,
            isRegistering: false,
            isResettingPass: false,
            isChangingEmail: false,
            isChangingPass: false,
            isChangingUsername: false,
            loginError: null,
            logoutError: null,
            registrationError: null,
            resettingPassError: null,
            changeemailError: null,
            changepassError: null,
            changeusernameError: null,
            registrationSuccess: false,
            resettingPassSuccess: false,
            changeemailSuccess: false,
            changepassSuccess: false,
            changeusernameSuccess: false,
            isAuthenticated: false,
            user: {}
        }
    }

    switch (action.type) {
        case types.FETCH_LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: null
            }
        
        case types.FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user: action.payload
            }

        case types.FETCH_LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: action.payload
            }

        case types.FETCH_LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: null
            }

        case types.FETCH_LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                user: {}
            }

        case types.FETCH_LOGOUT_FAILURE:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: action.payload
            }

        case types.FETCH_REGISTRATION_REQUEST:
            return {
                ...state,
                isRegistering: true,
                registrationError: null,
                registrationSuccess: false
            }

        case types.FETCH_REGISTRATION_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                registrationError: null,
                registrationSuccess: true
            }

        case types.FETCH_REGISTRATION_FAILURE:
            return {
                ...state,
                isRegistering: false,
                registrationError: action.payload,
                registrationSuccess: false
            }
        
        case types.FETCH_VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
            }

        case types.FETCH_VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false
            }

        case types.FETCH_RESETPASSWORD_REQUEST:
            return {
                ...state,
                isResettingPass: true,
                resettingPassError: null,
                resettingPassSuccess: false
            }
        
        case types.FETCH_RESETPASSWORD_SUCCESS:
            return {
                ...state,
                isResettingPass: false,
                resettingPassError: null,
                resettingPassSuccess: true
            }
        
        case types.FETCH_RESETPASSWORD_FAILURE:
            return {
                ...state,
                isResettingPass: false,
                resettingPassError: action.payload,
                resettingPassSuccess: false
            }

        case types.FETCH_EMAILCHANGE_REQUEST:
            return {
                ...state,
                isChangingEmail: true,
                changeemailError: null,
                changeemailSuccess: false
            }
            
        case types.FETCH_EMAILCHANGE_SUCCESS:
            return {
                ...state,
                isChangingEmail: false,
                changeemailError: null,
                changeemailSuccess: true
            }

        case types.FETCH_EMAILCHANGE_FAILURE:
            return {
                ...state,
                isChangingEmail: false,
                changeemailError: action.payload,
                changeemailSuccess: false
            }

        case types.FETCH_PASSWORDCHANGE_REQUEST:
            return {
                ...state,
                isChangingPass: true,
                changepassError: null,
                changepassSuccess: false
            }
        
        
        case types.FETCH_PASSWORDCHANGE_SUCCESS:
            return {
                ...state,
                isChangingPass: false,
                changepassError: null,
                changepassSuccess: true
            }

        
        case types.FETCH_PASSWORDCHANGE_FAILURE:
            return {
                ...state,
                isChangingPass: false,
                changepassError: action.payload,
                changepassSuccess: false
            }

        case types.FETCH_USERNAMECHANGE_REQUEST:
            return {
                ...state,
                isChangingUsername: true,
                changeusernameError: null,
                changeusernameSuccess: false
            }
   
        case types.FETCH_USERNAMECHANGE_SUCCESS:
            return {
                ...state,
                isChangingUsername: false,
                changeusernameError: null,
                changeusernameSuccess: true
            }
        
        case types.FETCH_USERNAMECHANGE_FAILURE:
            return {
                ...state,
                isChangingUsername: false,
                changeusernameError: action.payload,
                changeusernameSuccess: false
            }

        default:
            return state
    }
}

export default auth