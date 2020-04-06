import React from 'react'
import { useFormik } from "formik"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeemailUser } from '../../actions'
import { FirebaseAuthErrorTranslator } from '../../utils'

const EmailTab = ({ email, ...other }) => {
    const { isChangingEmail, changeemailError, changeemailSuccess, changeemailUser } = other

    const formikEmail = useFormik({
        initialValues: { 
            password: "",
            email: email,
        },
        onSubmit: values => {
            changeemailUser(values.email, values.password)
        }
    })

    return (
        <>
        {changeemailError &&
            <div className="alert alert-danger" role="alert">
                {FirebaseAuthErrorTranslator(changeemailError)}
            </div>
        }

        {isChangingEmail &&
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        }

        {changeemailSuccess &&
            <div className="alert alert-success" role="alert">
                На вашу электронную почту было отправлено письмо. Пожалуйста, подтвердите свой новый почтовый адрес
            </div>
        }

        <form onSubmit={formikEmail.handleSubmit} className={(changeemailError || changeemailSuccess || isChangingEmail) ? "email-form" : ""}>
            <div className="row">
                <div className="col-12">
                    <div className="input-container">
                        <input type="password" name="password"
                                            onChange={formikEmail.handleChange}    
                                            value={formikEmail.values.password}
                                            required/>
                        <label htmlFor="password">Текущий пароль</label>
                    </div>
                    <div className="input-container email-tab">
                        <input type="text" name="email"
                                        onChange={formikEmail.handleChange}
                                        value={formikEmail.values.email}
                                        required/>
                        <label htmlFor="email">Новый адрес электронной почты</label>		
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-custom" type="submit">Изменить</button>
                </div>
            </div>
        </form>
        </>
    )
}

const mapStateToProps = ({ auth: { isChangingEmail, changeemailError, changeemailSuccess } }) => {
    return {
        isChangingEmail,
        changeemailError,
        changeemailSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeemailUser: changeemailUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailTab)