import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

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

const File = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: 300px;
	border-radius: 5px;
	padding: 15px;
	border: 1px solid ${props => props.theme.border};
	gap: 10px;
`

const FileIcon = styled.img`
	width: 100%;
	aspect-ratio: 1/1;
	border-radius: 3px;
	cursor: pointer;
`

const FileName = styled.p`
	font-size: 18px;
`

const FileSize = styled.p`
	font-size: 14px;
`

const FileDeleteButton = styled.button`
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

const FileExplorer = () => {
	const option1 = useRef(null)
	const option2 = useRef(null)
	const option3 = useRef(null)

	useEffect(() => {
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
			<Files>
				{
					[1, 2, 3, 4, 5].map(file => (
						<File key={file}>
							<FileIcon src="https://via.placeholder.com/150" alt="file" />
							<FileName>File {file}</FileName>
							<FileSize>1.5 MB</FileSize>
							<FileDeleteButton type="button">Delete</FileDeleteButton>
						</File>
					))
				}
			</Files>
		</FileExplorerWrapper>
	)
}

export default FileExplorer