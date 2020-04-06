import React from 'react'
import { useFormik } from 'formik'

const LoginForm = ({ loginUser }) => {

    const formikLogin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: values => {
            loginUser(values.email, values.password)
        }
    })

    return (
        <form onSubmit={formikLogin.handleSubmit}>
            <div className="input-container">
                <input type="text" name="email"
                                    onChange={formikLogin.handleChange}
                                    value={formikLogin.values.email}
                                    required/>
                <label>Почта</label>		
            </div>
            <div className="input-container">
                <input type="password" name="password"
                                        onChange={formikLogin.handleChange}
                                        value={formikLogin.values.password}
                                        required/>
                <label>Пароль</label>
            </div>
            <button className="btn btn-custom" type="submit">Войти</button>
        </form>
    )
}

export default LoginForm