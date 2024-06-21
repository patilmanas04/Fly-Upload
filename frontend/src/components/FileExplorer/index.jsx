import React, { useContext, useEffect, useRef } from 'react'
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

	const option1 = useRef(null)
	const option2 = useRef(null)
	const option3 = useRef(null)

	useEffect(() => {
		getMedia()
		option1.current.style.backgroundColor = "#EA454C"
		option1.current.style.color = "#ffffff"
	}, [])

	const setActive = (e) => {
		const options = [option1, option2, option3]
		options.forEach(option => {
			option.current.style.backgroundColor = ""
			option.current.style.color = ""
		})

		e.target.style.backgroundColor = "#EA454C"
		e.target.style.color = "#ffffff"
	}

	return (
		<FileExplorerWrapper>
			<FileExplorerTitle>File Explorer</FileExplorerTitle>
			<Options>
				<OptionsList>
					<Option ref={option1} onClick={setActive}>All</Option>
					<Option ref={option2} onClick={setActive}>Images</Option>
					<Option ref={option3} onClick={setActive}>Videos</Option>
				</OptionsList>
			</Options>
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