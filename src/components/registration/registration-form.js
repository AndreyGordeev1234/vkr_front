import React from 'react'
import { useFormik } from 'formik'
import{ withEapmlService } from '../hoc'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { registrationUser } from '../../actions'

const RegistrationForm = ({ registrationUser }) => {

    const formikRegistration = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        onSubmit: values => {
            registrationUser(values.username, values.email, values.password)
        }
    })

    return (
        <div className="row justify-content-md-center">
            <div className="col-lg-5 col-md-10 col-sm-12">
                <div className="login-form reg">
                    <h1 className="login-title">Регистрация</h1>    
                    <form onSubmit={formikRegistration.handleSubmit}>
                        <div className="input-container">
                            <input type="text" name="username"
                                                onChange={formikRegistration.handleChange}
                                                value={formikRegistration.values.username}
                                                required/>
                            <label>Имя пользователя</label>		
                        </div>
                        <div className="input-container">
                            <input type="text" name="email"
                                                onChange={formikRegistration.handleChange}
                                                value={formikRegistration.values.email}
                                                required/>
                            <label>Почта</label>		
                        </div>
                        <div className="input-container">
                            <input type="password" name="password"
                                                    onChange={formikRegistration.handleChange}
                                                    value={formikRegistration.values.password}
                                                    required/>
                            <label>Пароль</label>		
                        </div>
                        <button className="btn btn-custom reg-btn" type="submit">Зарегистрироваться</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = () => {
    return {

    }
}

const mapDispatchToProps = (dispatch, { eapmlService }) => {
    return bindActionCreators({
        registrationUser: registrationUser(eapmlService)
    }, dispatch)
}

export default withEapmlService()(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm))