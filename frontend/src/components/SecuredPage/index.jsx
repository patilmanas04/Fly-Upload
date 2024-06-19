import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
    max-width: 500px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 30px;
`

const TitleWrapper = styled.div``

const Title = styled.h1`
    font-weight: 600;
`

const SubTitle = styled.h3`
    font-weight: 500;
`

const LogoutButton = styled.button`
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: none;
    background-color: #EA454C;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #333;
    } 
`

const SecuredPage = (props) => {
    const { username, showAlert } = props
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Secured Page | Auth App"
    })

    const handleClick = () => {
        showAlert("success", "You have successfully logged out.")
        localStorage.removeItem("authToken")
        navigate('/login')
    }

    return (
        <Wrapper>
            <TitleWrapper>
                <Title>Secured Page</Title>
                <SubTitle>Welcome, {username}! You have successfully accessed the secure area.</SubTitle>
            </TitleWrapper>
            <LogoutButton onClick={handleClick}>Logout</LogoutButton>
        </Wrapper>
    )
}

export default SecuredPage