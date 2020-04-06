import React from 'react'
import { useFormik } from 'formik'

const ResetPasswordForm = ({ resetpasswordUser }) => {

    const formikResetPass = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: values => {
            resetpasswordUser(values.email)
        }
    })

    return (
        <form onSubmit={formikResetPass.handleSubmit}>
            <div className="input-container">
                <input type="text" name="email"
                                    onChange={formikResetPass.handleChange}
                                    value={formikResetPass.values.email}
                                    required/>
                <label>Почта</label>		
            </div>
            <button className="btn btn-custom" type="submit">Сбросить пароль</button>
        </form>
    )
}

export default ResetPasswordForm