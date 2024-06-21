import MediaContext from "./mediaContext";
import { useState } from "react";

const MediaState = ({ children }) => {
    const host = "http://localhost:5000";
    const authToken = localStorage.getItem("authToken");
    const [gallery, setGallery] = useState([]);

    const uploadMedia = async (media, type) => {
		try{
			const formData = new FormData()
			formData.append('file', media)
			formData.append('title', media.name)
			formData.append('mediaType', type)
			formData.append('mediaSize', `${(media.size/100000).toFixed(2)} MB`)

			console.log(formData.keys())

			const serverResponse = await fetch(`${host}/api/media/upload`, {
				method: 'POST',
				headers: {
					// 'Content-Type': 'multipart/form-data',
					'Auth-Token': localStorage.getItem('authToken'),
				},
				body: formData
			})

			const data = await serverResponse.json()

            setGallery([...gallery, data])
		}
		catch(error){
			console.error(error)
		}
    }

	const getMedia = async () => {
		try{
			const response = await fetch(`${host}/api/media/getmedia`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Auth-Token': localStorage.getItem('authToken')
				}
			})

			const media = await response.json()
			setGallery(media)
		}
		catch(error){
			console.error(error)
		}
	}

    return (
        <MediaContext.Provider value={{gallery, uploadMedia, getMedia}}>
            {children}
        </MediaContext.Provider>
    )
}

export default MediaState;