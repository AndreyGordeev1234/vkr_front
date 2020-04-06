import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import ErrorBoundry from './components/error-boundry'
import { EapmlServiceProvider } from './components/eapml-service-context'
import store from './store'
import EapmlServiceReal from './services/eapml-service-real'

const eapmlService = new EapmlServiceReal()

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <EapmlServiceProvider value={eapmlService}>
                <Router>
                    <App />
                </Router>
            </EapmlServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
)