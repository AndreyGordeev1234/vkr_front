import React from 'react'
import { useFormik } from "formik";
import { changeusernameUser } from '../../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import{ withEapmlService } from '../../hoc'

const MainInfoTabUsername = ({ username, isChangingUsername, changeusernameSuccess, changeusernameError, changeusernameUser }) => {
    
    const formikUsername = useFormik({
        initialValues: { 
            username: username,
        },
        onSubmit: values => {
            changeusernameUser(values.username)
        }
    });

    return (
        <>
            {changeusernameError &&
                <div className="alert alert-danger" role="alert">
                    {changeusernameError}
                </div>
            }

            {isChangingUsername &&
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }

            {changeusernameSuccess &&
                <div className="alert alert-success" role="alert">
                    Имя пользователя успешно обновлено
                </div>
            }

            <form onSubmit={formikUsername.handleSubmit} className={(changeusernameError || changeusernameSuccess || isChangingUsername) ? "email-form" : ""}>
                <div className="row">
                        <div className="col-lg-8 col-sm-4">
                            <div className="input-container">
                                    <input type="text" name="username" 
                                            onChange={formikUsername.handleChange}
                                            value={formikUsername.values.username}
                                            required />
                                    <label htmlFor="username">Имя пользователя</label>		
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-8">
                            <button className="btn btn-custom change-nick" type="submit">Изменить</button>
                        </div>
                </div>
            </form>
        </>
    )
}

const mapStateToProps = ({ auth: { isChangingUsername, changeusernameError, changeusernameSuccess } } ) => {
    return {
        isChangingUsername,
        changeusernameError,
        changeusernameSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeusernameUser: changeusernameUser
    }, dispatch)
}

export default withEapmlService()(
    connect(mapStateToProps,mapDispatchToProps)(MainInfoTabUsername)
)