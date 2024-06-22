import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import MediaContext from '../../contexts/mediaContext'
import File from '../File'

const FileExplorerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
`

const FileExplorerTitle = styled.h2`
	font-size: 24px;
	margin-bottom: 10px;
`

const Options = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
`

const OptionsList = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	list-style: none;
	gap: 10px;
`

const Option = styled.li`
	font-size: 14px;
	cursor: pointer;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid ${props => props.theme.accent};

	&:hover {
		background-color: ${props => props.theme.accent};
		color: ${props => props.theme.secondary};
	}
`

const Files = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 20px;
`

const Message = styled.p`
	font-size: 16px;
`

const FileExplorer = () => {
	const context = useContext(MediaContext)
	const { getMedia, gallery } = context

	useEffect(() => {
		getMedia()
	}, [])

	return (
		<FileExplorerWrapper>
			<FileExplorerTitle>File Explorer</FileExplorerTitle>
			{
				gallery.length > 0 ? (
					<Files>
						{
							gallery.map((media, index) => (
								<File key={index} media={media} />
							))
						}
					</Files>
				) : (
					<Message>
						Your gallery is currently empty. Upload your favorite images and videos to start your collection!
					</Message>
				)
			}
		</FileExplorerWrapper>
	)
}

export default FileExplorer