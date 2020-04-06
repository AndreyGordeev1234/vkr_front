import React from 'react'
import './reset-password.css'
import ResetPasswordForm from './reset-password-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { resetpasswordUser } from '../../actions'

const ResetPassword = (props) => {
    const { isResettingPass, resettingPassError, resettingPassSuccess, resetpasswordUser } = props
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
                        
                        {resettingPassError &&
                            <div className="alert alert-danger" role="alert">
                                {resettingPassError.message}
                            </div>
                        }

                        {isResettingPass && 
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }

                        {resettingPassSuccess &&
                            <div className="alert alert-success" role="alert">
                                На вашу электронную почту было отправлено письмо для сброса пароля
                            </div>
                        }

                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-sm-12">
                        <div className="login-form">
                            <h1 className="login-title reset-pass">Забыли пароль?</h1>
                            <ResetPasswordForm resetpasswordUser={resetpasswordUser}/> 
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-5 col-sm-10 reg-text">
                        <p><a href="/login" className="link after">Войти</a> в систему</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({ auth: { isResettingPass, resettingPassError, resettingPassSuccess } }) => {
    return {
        isResettingPass,
        resettingPassError,
        resettingPassSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        resetpasswordUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)