import React from 'react'
import Success from '../Icons/Success.jsx'
import Error from '../Icons/Error.jsx'
import styled from 'styled-components'
import Close from '../Icons/Close.jsx'

const AlertBox = (props) => {
    const { alert, closeAlert } = props

    const { type, message } = alert

    const AlertBoxWrapper = styled.div`
        background-color: ${type==="success"?"#DDF3D5":"#EDC8C5"};
        width: 400px;
        height: 60px;
        position: absolute;
        top: -70px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
        border-radius: 8px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
    `

    const Wrapper = styled.div`
        display: flex;
        gap: 10px;
    `

    const Message = styled.div`
        color: ${(type=="success")?"#597151":"#B4302B"};
        font-weight: 500;
    `

    const Button = styled.button`
        background-color: transparent;
        border: none;
        cursor: pointer;
    `

    return (
        <AlertBoxWrapper className={alert?"show":""}>
            <Wrapper>
                {type==="success"?<Success/>:<Error/>}
                <Message>
                    {message}
                </Message>
            </Wrapper>
            <Button type="button" onClick={closeAlert}><Close type={type}/></Button>
        </AlertBoxWrapper>
    )
}

export default AlertBox