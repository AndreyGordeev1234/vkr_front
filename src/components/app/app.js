import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ProfilePage, LoginPage, RegistrationPage, HomePage, ResetPasswordPage } from '../pages'
import ProtectedRoute from '../protected-route'
import { connect } from 'react-redux'

const App = (props) => {
    const { isAuthenticated, isVerifying } = props
    return (
        <Switch>
            <ProtectedRoute
                exact
                path="/profile"
                component={ProfilePage}
                isAuthenticated={isAuthenticated}
                isVerifying={isVerifying}
            />
            <Route 
                path="/login" 
                component={LoginPage} 
                exact />
            <Route 
                path="/registration" 
                component={RegistrationPage} 
                exact />
            <Route 
                path="/" 
                component={HomePage} 
                exact />
            <Route 
                path="/passreset" 
                component={ResetPasswordPage} 
                exact />
        </Switch>
    )
}

const mapStateToProps = ({ auth: { isAuthenticated, isVerifying } }) => {
    return {
        isAuthenticated,
        isVerifying
    }
}

export default connect(mapStateToProps)(App)