import React from 'react'
import MainInfoTabUsername from './main-info-tab-username'
import MainInfoTabOther from './main-info-tab-other'

const MainInfoTab = ({ mainInfo, username }) => {
    return (
        <>
            <MainInfoTabUsername username={username}/>
            <hr/>
            <MainInfoTabOther account={mainInfo.account} />
        </>
    )
}

export default MainInfoTab