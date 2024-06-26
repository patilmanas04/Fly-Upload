import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const HeaderWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px 40px;
	background-color: ${props => props.theme.secondary};
	color: ${props => props.theme.text};
	border-bottom: 1px solid ${props => props.theme.border};
`

const Logo = styled.h1`
	font-size: 24px;
	font-style: italic;
	font-family: "Playwrite NG Modern", cursive;
	font-optical-sizing: auto;
	font-weight: 400;
	font-style: normal;
	user-select: none;
`

const Options = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
`

const LogInButton = styled.button`
	padding: 10px 20px;
	border-radius: 5px;
	background-color: ${props => props.theme.accent};
	color: ${props => props.theme.secondary};
	cursor: pointer;
	transition: all 0.3s;
	border: 1px solid ${props => props.theme.accent};

	&:hover {
		background-color: ${props => props.theme.buttonHover};
		border: 1px solid ${props => props.theme.buttonHover};
	}
`

const SignUpButton = styled.button`
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	background-color: ${props => props.theme.text};
	color: ${props => props.theme.secondary};
	cursor: pointer;
	transition: all 0.3s;
	border: 1px solid ${props => props.theme.text};


	&:hover {
		background-color: ${props => props.theme.secondary};
		color: ${props => props.theme.text};
	}
`

const LogOutButton = styled.button`
	padding: 10px 20px;
	border-radius: 5px;
	background-color: ${props => props.theme.accent};
	color: ${props => props.theme.secondary};
	cursor: pointer;
	transition: all 0.3s;
	border: 1px solid ${props => props.theme.accent};

	&:hover {
		background-color: ${props => props.theme.buttonHover};
		border: 1px solid ${props => props.theme.buttonHover};
	}
`

const Header = () => {
	const navigate = useNavigate()

	const handleLogOut = () => {
		localStorage.removeItem('authToken')
		navigate('/login')
	}

	const handleLogIn = () => {
		navigate('/login')
	}

	const handleSignUp = () => {
		navigate('/register')
	}

	return (
		<HeaderWrapper>
			<Logo>FlyUpload</Logo>
			<Options>
				{
					localStorage.getItem("authToken")?
					<LogOutButton onClick={handleLogOut}>Log out</LogOutButton>
					:
					<>
						<LogInButton onClick={handleLogIn}>Log in</LogInButton>
						<SignUpButton onClick={handleSignUp}>Sign up</SignUpButton>
					</>
				}
			</Options>
		</HeaderWrapper>
    )
}

export default Header