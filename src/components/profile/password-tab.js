import React from 'react'
import { useFormik } from "formik"
import { changepasswordUser } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FirebaseAuthErrorTranslator } from '../../utils'

const PasswordTab = (props) => {
    const { isChangingPass, changepassSuccess, changepassError, changepasswordUser } = props

    const formikPassword = useFormik({
        initialValues: { 
            oldPassword: "",
            newPassword: "",
        },
        onSubmit: values => {
            changepasswordUser(values.oldPassword, values.newPassword)
        }
    })

    return (
        <>
            {changepassError &&
            <div className="alert alert-danger" role="alert">
                {FirebaseAuthErrorTranslator(changepassError)}
            </div>
            }

            {isChangingPass &&
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }

            {changepassSuccess &&
                <div className="alert alert-success" role="alert">
                    Пароль успешно изменен
                </div>
            }

            <form onSubmit={formikPassword.handleSubmit} className={(changepassError || changepassSuccess || isChangingPass) ? "email-form" : ""}>
                <div className="input-container">
                    <input type="password" name="oldPassword"
                                            onChange={formikPassword.handleChange}
                                            value={formikPassword.values.oldPassword}
                                            required/>
                    <label htmlFor="oldPassword">Текущий пароль</label>
                </div>
                <div className="input-container">
                    <input type="password" name="newPassword"
                                            onChange={formikPassword.handleChange}
                                            value={formikPassword.values.newPassword}
                                            required/>
                    <label htmlFor="newPassword">Новый пароль</label>
                </div>
                <button className="btn btn-custom" type="submit">Изменить</button>
            </form>
        </>
    )
}

const mapStateToProps = ({ auth: { isChangingPass, changepassError, changepassSuccess } }) => {
    return {
        isChangingPass,
        changepassError,
        changepassSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changepasswordUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordTab)