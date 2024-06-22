import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import MediaContext from '../../contexts/mediaContext'
import BarLoader from 'react-spinners/BarLoader'

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

const Loader = styled.div`
	width: 100%;
	margin-top: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
`

const Uploads = () => {
	const context = useContext(MediaContext)
	const { uploadMedia, loading } = context

	const [image, setImage] = useState(null)
	const [video, setVideo] = useState(null)

	const handleImageSubmit = async (e) => {
		try{
			e.preventDefault()
			uploadMedia(image, 'image')
			e.target.reset()
			console.log('Image Uploaded Successfully!!')
		}
		catch(error){
			console.error(error)
		}
	}

	const handleVideoSubmit = async (e) => {
		try{
			e.preventDefault()
			uploadMedia(video, 'video')
			e.target.reset()
			console.log('Video Uploaded Successfully!!')
		}
		catch(error){
			console.error(error)
		}
	}

	return (
		<UploadsWrapper>
			<UploadsTitle>Upload Images or Videos</UploadsTitle>
			<FormsContainer>
				<UploadForm onSubmit={handleImageSubmit}>
					<UploadLabel htmlFor="imageUpload">Upload Image</UploadLabel>
					<UploadInput type="file" id="imageUpload" name="imageUpload" accept="image/*" onChange={(e) => setImage((prev) => e.target.files[0])} required/>
					<UploadButton type='submit'>Upload Image</UploadButton>
				</UploadForm>
				<UploadForm onSubmit={handleVideoSubmit}>
					<UploadLabel htmlFor="videoUpload">Upload Video</UploadLabel>
					<UploadInput type="file" id="videoUpload" name="videoUpload" accept="video/*" onChange={(e) => setVideo((prev) => e.target.files[0])} required/>
					<UploadButton type='submit'>Upload Video</UploadButton>
				</UploadForm>
			</FormsContainer>
			<Loader>
				<BarLoader color="#EA454C" loading={loading} width="100%"/>
			</Loader>
		</UploadsWrapper>
	)
}

export default Uploads