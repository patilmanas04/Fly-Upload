import React, { useEffect, useState } from 'react'
import Header from '../Header/index.jsx'
import MainContentArea from '../MainContentArea/index.jsx'

const Dashboard = (props) => {
    const { username } = props

    useEffect(() => {
        document.title = `Dashboard | ${username} | FlyUpload`
    }, [])

    return (
        <>
            <Header/>
            <MainContentArea/>
        </>
    )
}

export default Dashboard