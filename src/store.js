import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { verifyAuth } from './actions'

const loggerMiddleware = state => next => action => {
    console.log(action.type)
    return next(action)
}

const store = createStore(reducer, applyMiddleware(
    thunkMiddleware, loggerMiddleware
))

store.dispatch(verifyAuth())

export default store