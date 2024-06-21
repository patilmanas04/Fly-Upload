import React, { useContext } from 'react'
import styled from 'styled-components'
import MediaContext from '../../contexts/mediaContext'

const FileWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 300px;
	height: 350px;
	border-radius: 5px;
	padding: 15px;
	border: 1px solid ${props => props.theme.border};
	gap: 10px;
`

const FileDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 10px;
`

const FileIconContainer = styled.div`
    width: 100%;
    height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    overflow: hidden;
`

const FileIcon = styled.img`
	width: 100%;
    object-fit: cover;
`

const Video = styled.video`
    width: 100%;
    object-fit: cover;
`   

const FileName = styled.p`
	font-size: 18px;
`

const FileSize = styled.p`
	font-size: 14px;
`

const FileOptions = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	gap: 10px;
`

const FileOptionButton = styled.button`
	padding: 10px;
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

const File = (props) => {
    const context = useContext(MediaContext)
    const { deleteMedia } = context
    const { media } = props
    const mediaType = media.mediaType
    const mediaLink = media.mediaLink
    const mediaTypeExtension = mediaLink.split('/').pop().split('.').pop()

    const handleDeleteRequest = () => {
        deleteMedia(media._id)
    }

    return (
        <FileWrapper>
            <FileDetails>
                <FileIconContainer>
                    {
                        mediaType === 'image' ? <FileIcon src={media.mediaLink} alt="image" loading='lazy' />
                        :
                        <Video controls>
                            <source src={media.mediaLink} type={`video/${mediaTypeExtension}`} />
                        </Video>
                    }
                </FileIconContainer>
                <FileName>{media.title}</FileName>
                <FileSize>{media.mediaSize}</FileSize>
            </FileDetails>
            <FileOptions>
                <FileOptionButton type="button" onClick={handleDeleteRequest}>Delete</FileOptionButton>
                <FileOptionButton type="button">View</FileOptionButton>
            </FileOptions>
        </FileWrapper>
    )
}

export default File