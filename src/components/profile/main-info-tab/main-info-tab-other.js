import React from 'react'
import { useFormik } from "formik"
import { changeUserInfo } from '../../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import{ withEapmlService } from '../../hoc'

const MainInfoTabOther = ({ account: { first_name, second_name, company_name }, uid, changeUserInfo, isChangingInfo, changeinfoError, changeinfoSuccess }) => {

    const formikOther = useFormik({
        initialValues: { 
            profileImg: "",
            firstName: first_name, 
            secondName: second_name,
            companyName: company_name
        },
        onSubmit: values => {
            changeUserInfo({
                f_uid: uid, first_name: values.firstName, second_name: values.secondName, company_name: values.companyName 
            })
        }
    })

    return (
        <>
            {changeinfoError &&
                <div className="alert alert-danger" role="alert">
                    {changeinfoError}
                </div>
            }

            {isChangingInfo &&
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }

            {changeinfoSuccess &&
                <div className="alert alert-success" role="alert">
                    Данные пользователя успешно обновлены
                </div>
            }

            <form onSubmit={formikOther.handleSubmit} className={(changeinfoError || changeinfoSuccess || isChangingInfo) ? "email-form" : ""}>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" 
                                            id="customFile" 
                                            name="profileImg"
                                            onChange={formikOther.handleChange}
                                            value={formikOther.values.profileImg}
                                            accept="image/*" />
                    <label className="custom-file-label" htmlFor="customFile" data-browse="Выберите файл">
                    {(!formikOther.values.profileImg) ?
                        'Картинка профиля':
                        formikOther.values.profileImg}
                    </label>
                </div>
                <div className="input-container">
                    <input type="text" name="firstName"
                                        onChange={formikOther.handleChange}
                                        value={formikOther.values.firstName}
                                        required />
                    <label htmlFor="firstName">Имя</label>
                </div>
                <div className="input-container">
                    <input type="text" name="secondName"
                                        onChange={formikOther.handleChange}
                                        value={formikOther.values.secondName}
                                        required />
                    <label htmlFor="secondName">Фамилия</label>
                </div>
                <div className="input-container">
                    <input type="text" name="companyName"
                                        onChange={formikOther.handleChange}
                                        value={formikOther.values.companyName}
                                        required/>
                    <label htmlFor="companyName">Название компании</label>
                </div>
                <button className="btn btn-custom" type="submit">Обновить</button>
            </form>
        </>
    )
}

const mapStateToProps = ({ profile: { isChangingInfo, changeinfoError, changeinfoSuccess }, auth: { user: { uid } } }) => {
    return {
        isChangingInfo,
        changeinfoError,
        changeinfoSuccess,
        uid
    }
}

const mapDispatchToProps = (dispatch, { eapmlService }) => {
    return bindActionCreators({
        changeUserInfo: changeUserInfo(eapmlService)
    }, dispatch)
}

export default withEapmlService()(
    connect(mapStateToProps,mapDispatchToProps)(MainInfoTabOther)
)