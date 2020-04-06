import React from 'react'
import { EapmlServiceConsumer } from '../eapml-service-context'

const withEapmlService = () => (Wrapped) => (props) => (
        <EapmlServiceConsumer>
            {
                (eapmlService) => {
                    return <Wrapped {...props}
                                    eapmlService={eapmlService} />
                }
            }
        </EapmlServiceConsumer>
    )

export default withEapmlService