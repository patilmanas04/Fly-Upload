import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
    max-width: 500px;
    width: 100%;
    gap: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
`

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Title = styled.h1`
    font-weight: 600;
`

const SubTitle = styled.h3`
    font-weight: 500;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 90%;
    padding: 0 30px;    
`

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 3px;
`

const Label = styled.label`
    width: 100%;
    text-align: left;
`

const Input = styled.input`
    width: 100%;
    border-radius: 8px;
    padding: 10px;
    border: 1px solid ${props => props.theme.border};
    outline: none;
    font-size: 14px;

    &:focus {
        border: 1px solid ${props => props.theme.borderFocus};
    }
`

const RememberMe = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 100%;
    font-size: 14px;
    height: 30px;
`

const Checkbox = styled.input`
    width: 20px;
    height: 20px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.border};
    transition: 0.3s;      
`

const LoginButton = styled.button`
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: none;
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.secondary};
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: ${props => props.theme.buttonHover};
    } 
`

const Switch = styled.div`
    font-size: 14px;
`

const Span = styled.a`
    color: ${props => props.theme.accent};
    cursor: pointer;
    transition: 0.3s;
`

const Login = (props) => {
    const { setUsername, showAlert } = props
    // const checkBoxRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Login | FlyUpload"
    })

    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    })

    const onChange = (e) => {
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        
        const url = "http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userCredentials)
        })

        const json = await response.json()

        if(json.success){
            // if(checkBoxRef.current.checked){
            // }
            localStorage.setItem("authToken", json.authToken)
            // localStorage.setItem("loggedIn", true)
            setUsername(userCredentials.username)
            showAlert("success", "Login successful!")
            navigate(`/dashboard/${userCredentials.username}`)
        }
        else{
            showAlert("error", "Invalid credentials!")
        }
    }

    return (
        <Wrapper>
            <TitleWrapper>
                <Title>WELCOME BACK 👋</Title>
                <SubTitle>Welcome back! Please enter your details.</SubTitle>
            </TitleWrapper>
            <Form onSubmit={onSubmit}>
                <FieldWrapper>
                    <Label>Username</Label>
                    <Input type="text" name="username" placeholder="Enter your username" onChange={onChange} required/>
                </FieldWrapper>
                <FieldWrapper>
                    <Label>Password</Label>
                    <Input type="password" name="password" placeholder="Enter your password" onChange={onChange} required/>
                </FieldWrapper>
                {/* <RememberMe>
                    <Checkbox ref={checkBoxRef} type="checkbox" id="rememberMe" name="rememberMe"/>
                    <Label htmlFor="rememberMe">Remember Me</Label>
                </RememberMe> */}
                <LoginButton type="submit">Login</LoginButton>
            </Form>
            <Switch>
                <SubTitle>Don't have an account? <Span><Link to="/register">Sign up for free!</Link></Span></SubTitle>
            </Switch>
        </Wrapper>
    )
}

export default Login