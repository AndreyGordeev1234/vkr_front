import React from 'react'
import './home.css'
import { Navbar, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import Spinner from '../spinner'

const Home = (props) => {
    const { isAuthenticated, isVerifying } = props
    if (isVerifying) return <Spinner />
    return (
        <>
            <Navbar className="navbar navbar-expand-lg nav-home" expand="sm">
                <h1 className="nav-logo">EAPML</h1>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar-nav ml-auto">
                        {
                            (isAuthenticated) ? (
                                <>
                                    <Nav.Item className="nav-item">
                                        <a className="link after" href="/profile">Профиль</a>
                                    </Nav.Item>
                                </>
                            ) : (
                                <>
                                    <Nav.Item className="nav-item">
                                        <a className="link after" href="/login">Вход</a>
                                    </Nav.Item>
                                    <div className="col-1"></div>
                                    <Nav.Item className="nav-item">
                                        <a className="link after" href="/registration">Регистрация</a>
                                    </Nav.Item>
                                </>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="container home">
                <div className="index-text">
                    <h1>EasyAsPieML</h1>
                    <p>Модели прогнозирования в одно касание</p>
                </div>
            </div>

            <div className="waveWrapper waveAnimation">
                <div className="waveWrapperInner bgTop">
                    <div className="wave waveTop" style={{ backgroundImage: `url(${require('./wave-top.png')})` }}></div>
                </div>
                <div className="waveWrapperInner bgMiddle">
                    <div className="wave waveMiddle" style={{ backgroundImage: `url(${require('./wave-top.png')})` }}></div>
                </div>
                <div className="waveWrapperInner bgBottom">
                    <div className="wave waveBottom" style={{ backgroundImage: `url(${require('./wave-top.png')})` }}></div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({ auth: { isAuthenticated, isVerifying } }) => {
    return {
        isAuthenticated,
        isVerifying
    }
}

export default connect(mapStateToProps)(Home)