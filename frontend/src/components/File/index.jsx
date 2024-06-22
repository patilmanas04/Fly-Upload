import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import MediaContext from '../../contexts/mediaContext'
import CloseIcon from '@mui/icons-material/Close';

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

const FileViewer = styled.div`
    display: none;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: 20px;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.8);
`

const ImageContainer = styled.div`
    height: 100%;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Img = styled.img`
    height: 100%;
    /* object-fit: cover; */
`

const File = (props) => {
    const context = useContext(MediaContext)
    const { deleteMedia } = context
    const { media } = props
    const mediaType = media.mediaType
    const mediaLink = media.mediaLink
    const mediaTypeExtension = mediaLink.split('/').pop().split('.').pop()
    const fileViewer = useRef(null)

    const handleDeleteRequest = () => {
        deleteMedia(media._id)
    }

    const showFileViewer = () => {
        fileViewer.current.style.display = 'flex'
    }

    const closeFileViewer = () => {
        fileViewer.current.style.display = 'none'
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
                <FileSize>{media.mediaType.toUpperCase()}</FileSize>
                <FileSize>{media.mediaSize}</FileSize>
            </FileDetails>
            <FileOptions>
                <FileOptionButton type="button" onClick={handleDeleteRequest}>Delete</FileOptionButton>
                {
                    mediaType === 'image' ? <FileOptionButton type="button" onClick={showFileViewer}>View</FileOptionButton>
                    :
                    ""
                }
            </FileOptions>
            <FileViewer ref={fileViewer}>
                <ImageContainer>
                    <Img src={mediaLink} alt="media" />
                </ImageContainer>
                <CloseIcon style={{
                    cursor: 'pointer',
                    color: '#fff',
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontSize: '30px',
                }} onClick={closeFileViewer}/>
            </FileViewer>
        </FileWrapper>
    )
}

export default File