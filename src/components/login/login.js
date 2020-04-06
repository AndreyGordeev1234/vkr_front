import React from 'react'
import './login.css'
import LoginForm from './login-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginUser } from '../../actions'
import { bindActionCreators } from 'redux'
import { FirebaseAuthErrorTranslator } from '../../utils'

const Login = (props) => {
    const { isLoggingIn, loginError, isAuthenticated, loginUser } = props
    
    if (isAuthenticated) return <Redirect to="/profile"/>
    return (
        <>
            <span className="back">
                <a href="/"><i className="fa fa-chevron-circle-left on-main-i" aria-hidden="true"></i> </a>
                <a href="/" className="link after on-main">На главную</a>
            </span>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-sm-12 logo-text">
                        <h1 className="login-logo">EAPML</h1>
                        <p className="logo-text-p">Система автоматизированного машинного обучения</p>
                        
                        {loginError &&
                            <div className="alert alert-danger" role="alert">
                                {FirebaseAuthErrorTranslator(loginError)}
                            </div>
                        }

                        {isLoggingIn && 
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }

                    </div>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-sm-12">
                        <div className="login-form">
                            <h1 className="login-title">Вход</h1>    
                            <LoginForm loginUser={loginUser}/> 
                            <small className="forgot-pass"><a href="/passreset" className="link after">Забыли пароль?</a></small>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-5 col-sm-10 reg-text">
                        <p><a href="/registration" className="link after">Зарегистрируйтесь</a> для доступа к сервисам</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({ auth: { isLoggingIn, loginError, isAuthenticated } }) => {
    return {
        isLoggingIn,
        loginError,
        isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loginUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)