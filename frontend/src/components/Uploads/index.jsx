import React from 'react'
import styled from 'styled-components'

const UploadsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 60px;
	width: 100%;
`

const UploadsTitle = styled.h2`
	font-size: 24px;
	margin-bottom: 20px;
`
const FormsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
`

const UploadForm = styled.form`
	display: flex;
	flex-direction: column;
`

const UploadLabel = styled.label`
	font-size: 18px;
`

const UploadInput = styled.input`
	padding: 10px;
	margin-top: 10px;
	border-radius: 5px;
	border: 1px solid ${props => props.theme.border};
`

const UploadButton = styled.button`
	padding: 10px;
	margin-top: 10px;
	border-radius: 5px;
	border: 1px solid ${props => props.theme.border};
	background-color: ${props => props.theme.accent};
	color: ${props => props.theme.secondary};
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		background-color: ${props => props.theme.buttonHover};
	}
`

const Uploads = () => {
	return (
		<UploadsWrapper>
			<UploadsTitle>Upload Images or Videos</UploadsTitle>
			<FormsContainer>
				<UploadForm>
					<UploadLabel htmlFor="imageUpload">Upload Image</UploadLabel>
					<UploadInput type="file" id="imageUpload" name="imageUpload" accept="image/*" />
					<UploadButton type='submit'>Upload Image</UploadButton>
				</UploadForm>
				<UploadForm>
					<UploadLabel htmlFor="videoUpload">Upload Video</UploadLabel>
					<UploadInput type="file" id="videoUpload" name="videoUpload" accept="video/*" />
					<UploadButton type='submit'>Upload Video</UploadButton>
				</UploadForm>
			</FormsContainer>
		</UploadsWrapper>
	)
}

export default Uploads