import React from 'react'
import Uploads from '../Uploads/index.jsx'
import FileExplorer from '../FileExplorer/index.jsx'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const MainAreaContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 40px;
`

const WelcomeMessage = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 60px;
	gap: 8px;
`

const Heading = styled.h1`
	font-size: 36px;
`
	
const SubHeading = styled.p`
	font-size: 18px;
	max-width: 800px;
	width: 100%;
`

const LogInFirstMessage = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-top: 60px;
	gap: 8px;
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

const MainContentArea = () => {
	const navigate = useNavigate()

	const handleLogIn = () => {
		navigate('/login')
	}

	return (
		<>
		<MainAreaContentWrapper>
			<WelcomeMessage>
				<Heading>Welcome to FlyUpload!</Heading>
				<SubHeading>Manage your drone data effortlessly. Upload and organize your images and videos, all in one place. Get started by uploading your files below.</SubHeading>
			</WelcomeMessage>
			{
				localStorage.getItem("authToken")?
				<>
				<Uploads />
				<FileExplorer />
				</>
				:
				<LogInFirstMessage>
					<Heading>Log in to access your files</Heading>
					<SubHeading>Log in to access your files and manage your uploads</SubHeading>
					<LogInButton type="button" onClick={handleLogIn}>Log In</LogInButton>
				</LogInFirstMessage>
			}
		</MainAreaContentWrapper>
		</>
    )
}

export default MainContentArea