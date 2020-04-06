import profile from './profile'
import auth from './auth'
import { combineReducers } from 'redux'

const reducer = combineReducers({
    profile,
    auth
})

export default reducer