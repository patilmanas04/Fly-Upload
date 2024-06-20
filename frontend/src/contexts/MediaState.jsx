import MediaContext from "./mediaContext";
import { useState } from "react";

const MediaState = ({ children }) => {
    const host = "http://localhost:5000";
    const authToken = localStorage.getItem("authToken");
    const [gallery, setGallery] = useState([]);

    const getMediaDetails = (media) => {
		const mediaDetails = {
			name: media.name,
			size: media.size/1000000
		}
		
		console.log(mediaDetails)

		return mediaDetails
	}

    const uploadMedia = async (media, type) => {
        const cloudinaryCloudName = "dgszxxbcl"
        const url = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/${type}/upload`
        const formData = new FormData()
        formData.append('file', media)
        formData.append('upload_preset', type === "image" ? 'images_preset' : 'videos_preset')

        const { name, size } = getMediaDetails(media)

        try{
			const response = await fetch(url, {
				method: 'POST',
				body: formData
			})

			const recievedImageUrl = await response.json()

			const serverResponse = await fetch(`${host}/api/media/upload`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Auth-Token': localStorage.getItem('authToken'),
				},
				body: JSON.stringify({
					title: name,
					mediaType: type,
					mediaLink: recievedImageUrl.url,
					mediaSize: `${size} MB`
				})
			})

			const data = await serverResponse.json()

            setGallery([...gallery, data])
		}
		catch(error){
			console.error(error)
		}
    }

    return (
        <MediaContext.Provider value={{gallery, uploadMedia}}>
            {children}
        </MediaContext.Provider>
    )
}

export default MediaState;