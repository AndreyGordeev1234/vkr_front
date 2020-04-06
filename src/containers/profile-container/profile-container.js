import React, { Component } from 'react'
import { withEapmlService } from '../../components/hoc'
import { connect } from 'react-redux'
import { fetchProfile } from '../../actions'
import { bindActionCreators } from 'redux'
import { compose } from '../../utils'
import Spinner from '../../components/spinner'
import ErrorIndicator from '../../components/error-indicator'
import Profile from '../../components/profile'

class ProfileContainer extends Component {

    componentWillMount() {
        const { uid, fetchProfile } = this.props
        fetchProfile(uid)
    }

    render () {
        const { data, loading, error, isLoggingIn, isVerifying } = this.props
        
        //start test notification
        try{
            Notification.requestPermission(result => {
                if (result === 'granted') {
                showNotification(`Привет!`, `Рад тебя видеть!`)
                }
            });
            
            function showNotification(title, message) {
                if ('Notification' in window) {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.showNotification(title, {
                            body: message,
                            tag: 'vibration-sample'
                        });
                    });
                }
            }
        }
        catch{
            console.log('Уведомления недоступны')
        }
        //end test notification

        if (loading || isLoggingIn || isVerifying) return <Spinner />
        
        if (error) return <ErrorIndicator />

        return (
            <Profile profile={data}/>
        )
    }
}

const mapStateToProps = ({ profile: { data, loading, error }, auth: { user: { uid }, isVerifying, isLoggingIn } }) => {
    return {
        data,
        loading,
        error,
        isVerifying,
        isLoggingIn,
        uid
    }
}

const mapDispatchToProps = (dispatch, { eapmlService }) => {
    return bindActionCreators({ 
        fetchProfile: fetchProfile(eapmlService)
     }, dispatch)
}

export default compose(
    withEapmlService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ProfileContainer)