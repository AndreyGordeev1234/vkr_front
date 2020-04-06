import React from 'react'
import './registration.css'
import RegistrationForm from './registration-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { FirebaseAuthErrorTranslator } from '../../utils'

const Registration = (props) => {
    const { isRegistering, registrationError, isAuthenticated, registrationSuccess } = props
    
    if (isAuthenticated) return <Redirect to="/profile" />
    return (
        <>
            <span className="back">
                <a href="/"><i className="fa fa-chevron-circle-left on-main-i" aria-hidden="true"></i> </a> 
                <a href="/" className="link after on-main">На главную</a>
            </span>

            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-lg-5 col-md-10 col-sm-12 logo-text">
                        <h1 className="login-logo">EAPML</h1>
                        <p className="logo-text-p">Система автоматизированного машинного обучения.</p>

                        {registrationError &&
                            <div className="alert alert-danger" role="alert">
                                {FirebaseAuthErrorTranslator(registrationError)}
                            </div>
                        }

                        {isRegistering && 
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }

                        {registrationSuccess &&
                            <div className="alert alert-success" role="alert">
                                На вашу электронную почту было отправлено письмо. Пожалуйста, подтвердите свой почтовый адрес
                            </div>
                        }

                    </div>
                </div>
                <RegistrationForm />
                <div className="row justify-content-md-center">
                    <div className="col-lg-5 col-md-10 col-sm-12 reg-text">
                        <p>Уже зарегистрированы? <a href="/login" className="link after">Войдите</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({ auth: { isRegistering, registrationError, isAuthenticated, registrationSuccess } }) => {
    return {
        isRegistering,
        registrationError,
        isAuthenticated,
        registrationSuccess
    }
}

export default connect(mapStateToProps)(Registration)