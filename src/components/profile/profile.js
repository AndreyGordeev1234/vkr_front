import React from 'react'
import './profile.css'
import { Tab, Row, Col, ListGroup } from 'react-bootstrap'
import MainInfoTab from './main-info-tab'
import EmailTab from './email-tab'
import PasswordTab from './password-tab'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logoutUser } from '../../actions'

const Profile = (props) => {
    const { ...mainInfo } = props.profile
    const { isLoggingOut, logoutError, logoutUser, email, username } = props
    
    return (
        <>
            <nav className="nav fixed-top nav-profile">
                <span className="back">
                    <a href="/">
                        <i className="fa fa-chevron-circle-left on-main-i" aria-hidden="true"> </i> 
                    </a>
                    <a href="/" className="link after on-main">
                        <span> На главную</span>
                    </a>
                </span>

                <span className="back exit">
                    <button onClick={logoutUser} className="link after">
                    
                        {isLoggingOut &&
                        <div className="spinner-border logout-loading" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        }

                    <span className="on-main">Выход
                    </span> 
                    <i className="fa fa-times-circle exit on-main-i" aria-hidden="true"></i>
                    </button> 
                </span>
            </nav>

            <div className="container profile-container">
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#main-info">
                <Row className="justify-content-center">
                    <Col lg={3} sm={12}>
                    <ListGroup className="profile-sections">
                        <ListGroup.Item action href="#main-info">
                            Личная информация
                        </ListGroup.Item>
                        <ListGroup.Item action href="#email">
                            Электронный адрес
                        </ListGroup.Item>
                        <ListGroup.Item action href="#password">
                            Пароль
                        </ListGroup.Item>
                    </ListGroup>
                    </Col>
                    <Col lg={7} sm={12}>
                    
                        {logoutError &&
                            <div class="alert alert-danger" role="alert">
                                A simple danger alert—check it out!
                            </div>
                        }

                        <Tab.Content className="profile-content">
                            <Tab.Pane eventKey="#main-info">
                                <MainInfoTab mainInfo={mainInfo} username={username}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="#email">
                                <EmailTab email={email}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="#password">
                                <PasswordTab />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
            </div>
         </>
    )
}

const mapStateToProps = ({ auth: { isLoggingOut, logoutError, user: { email, displayName } } }) => {
    return {
        isLoggingOut,
        logoutError,
        email,
        username: displayName
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logoutUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)