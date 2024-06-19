import React, { useState } from 'react'
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
	const [image, setImage] = useState(null)
	const [video, setVideo] = useState(null)

	const uploadImage = async (type) => {
		const cloudinaryCloudName = "dgszxxbcl"
		const url = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/${type}/upload`
		const formData = new FormData()
		formData.append('file', image)
		formData.append('upload_preset', 'images_preset')

		try{
			const response = await fetch(url, {
				method: 'POST',
				body: formData
			})

			const recievedImageUrl = await response.json()
			return recievedImageUrl.url
		}
		catch(error){
			console.error(error)
		}

	}

	const handleImageSubmit = async (e) => {
		try{
			e.preventDefault()
			const imageUrl = await uploadImage('image')
			console.log(imageUrl)
			console.log('Image Uploaded Successfully!!')
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
					<UploadInput type="file" id="imageUpload" name="imageUpload" accept="image/*" onChange={(e) => setImage((prev) => e.target.files[0])}/>
					<UploadButton type='submit'>Upload Image</UploadButton>
				</UploadForm>
				<UploadForm>
					<UploadLabel htmlFor="videoUpload">Upload Video</UploadLabel>
					<UploadInput type="file" id="videoUpload" name="videoUpload" accept="video/*" onChange={(e) => setVideo((prev) => e.target.files[0])}/>
					<UploadButton type='submit'>Upload Video</UploadButton>
				</UploadForm>
			</FormsContainer>
		</UploadsWrapper>
	)
}

export default Uploads