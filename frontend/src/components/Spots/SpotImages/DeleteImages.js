import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { csrfFetch } from '../../../store/csrf';
import { getSpotById } from '../../../store/spots';
import './DeleteImages.css'

function DeleteImages({images, spotId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [ selectedImages, setSelectedImages ] = useState([])
    const handleSubmit = async () => {
        selectedImages.forEach(async (imageId) => {
            await csrfFetch(`/api/spot-images/${imageId}`, {
                    method: 'DELETE',
                    headers: {"Content-Type": "application/json"}
            })
            .then(() => dispatch(getSpotById(spotId)))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) return;
                }
            );
        });
    }
    if(!images) return null
    return (
        <div className='deleteImages'>
            <h3>Select the Pictures you would like to delete</h3>
            <div className='deleteImagesContainer'>
                {Object.values(images).map((image, i) => {
                    if(image.url) {
                        return (
                            <label key={i} className='imageLabels'>
                                <img alt={i} className="imageSelect" src={image.url} />
                                <input
                                    className='radio'
                                    type="checkbox"
                                    name="pictures"
                                    value={image.id}
                                    onChange={() => {
                                        if(selectedImages.includes(image.id)) {
                                            const index = selectedImages.indexOf(image.id)
                                            selectedImages.splice(index, 1)
                                            setSelectedImages(selectedImages)
                                        } else {
                                            selectedImages.push(image.id)
                                        }
                                    }}
                                />
                            </label>
                        )
                    } else {
                        return null
                    }
                })}
            </div>
            <button className='demo-user-button' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default DeleteImages
