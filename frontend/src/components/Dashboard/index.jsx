import React, { useEffect, useState } from 'react'
import Header from '../Header/index.jsx'
import MainContentArea from '../MainContentArea/index.jsx'

const Dashboard = (props) => {
    const { username } = props
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        document.title = `Dashboard | ${username} | FlyUpload`
    }, [])

    return (
        <>
            <Header setLoggedIn={setLoggedIn}/>
            <MainContentArea loggedIn={loggedIn}/>
        </>
    )
}

export default Dashboard