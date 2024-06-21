import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import Register from './components/Register/index.jsx';
import Login from './components/Login/index.jsx';
import AlertBox from './components/AlertBox/index.jsx';
import { useState } from 'react';
import Dashboard from './components/Dashboard/index.jsx';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme } from './utils/Theme.js';
import MediaState from './contexts/MediaState.jsx';

const Body = styled.div`
	width: 100%;
	background-color: ${props => props.theme.background};
	color: ${props => props.theme.text};
`


const App = () => {
	const [username, setUsername] = useState("")
	const [alert, setAlert] = useState(false)

	const showAlert = (type, message) => {
		setAlert({
			type: type,
			message: message
		})

		setTimeout(() => {
			setAlert(false)
		}, 5000)
	}

	const closeAlert = () => {
		setAlert(false)
	}

	return (
		<>
		<MediaState>
			<ThemeProvider theme={lightTheme}>
				<Router>
					<AlertBox alert={alert} closeAlert={closeAlert} />
					<Routes>
						<Route exact path="/" element={<Register showAlert={showAlert} setUsername={setUsername} />} />
						<Route exact path="/register" element={<Register showAlert={showAlert} setUsername={setUsername} />} />
						<Route exact path="/login" element={<Login setUsername={setUsername} showAlert={showAlert} />} />
						{/* <Route exact path="/secured" element={<SecuredPage username={username} showAlert={showAlert} />} /> */}
						<Route exact path="/dashboard" element={<Dashboard username={username}/>} />
					</Routes>
				</Router>
			</ThemeProvider>
		</MediaState>
		</>
	);
}

export default App;
