import MediaContext from "./mediaContext";
import { useState } from "react";

const MediaState = ({ children }) => {
    const host = "http://localhost:5000";
    const authToken = localStorage.getItem("authToken");
    const [gallery, setGallery] = useState([]);
	const [loading, setLoading] = useState(false)

    const uploadMedia = async (media, type) => {
		try{
			setLoading(true)

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

            setGallery(gallery.concat(data))

			setLoading(false)
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

	const deleteMedia = async (id) => {
		try{
			const updatedGallery = gallery.filter(media => {
				return media._id !== id
			})
			setGallery(updatedGallery)
			
			const response = await fetch(`${host}/api/media/deletemedia/${id}`, {
				method: 'DELETE',
				headers: {
					'Auth-Token': localStorage.getItem('authToken')
				}
			})
		}
		catch(error){
			console.error(error)
		}
	}

    return (
        <MediaContext.Provider value={{gallery, uploadMedia, getMedia, deleteMedia, loading}}>
            {children}
        </MediaContext.Provider>
    )
}

export default MediaState;