import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../../context/Modal'
import { csrfFetch } from '../../../store/csrf'
import { getSpotById } from '../../../store/spots'
import './ImageForm.css'

function ImageForm({spotId}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    // const [ numImages, setNumImages ] = useState(1)
    const [ image, setImage ] = useState('')
    const [ errors, setErrors ] = useState([])

    const clearData = () => {
        setImage('')

        history.push('/spots/' + spotId)
    }

    const handleSubmit = async (e) => {
        const formData = new FormData();
        e.preventDefault()
        if (image) formData.append("image", image);
        formData.append('preview', false)

        await csrfFetch(`/api/spots/${spotId}/images`, {
            method: "POST",
            headers: {
            "Content-Type": "multipart/form-data",
            },
            body: formData,
        })
        .then(() => dispatch(getSpotById(spotId)))
        .then(() => clearData())
        .then(closeModal)
        .catch(
          async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
          });
        // e.preventDefault()
        // await csrfFetch(`/api/spots/${spotId}/images`, {
        //     method: 'POST',
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify({url: image, preview: false})
        //   })
        //   .then(createdImage => dispatch(getSpotById(spotId)))
        //   .then(() => clearData())
        //   .catch(
        //     async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     });
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    }



    return (
        <div className='createImageFormContainer'>
            <form className='imageForm' onSubmit={handleSubmit}>
                {errors.length !== 0 &&
                    <ul style={{"marginBottom":"0px"}}>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
                <label className="fwb g1 fdc">
                    Add your Image
                    <input type='file'
                    style={{"width":"100%"}}
                    onChange={updateFile}
                    />
                </label>
                <button className='demo-user-button'>Submit</button>
            </form>
        </div>
    )
}

export default ImageForm
