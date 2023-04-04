import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../../context/Modal'
import { getAllSpots, removeSpot } from '../../../store/spots'
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import './DeleteSpot.css'

function DeleteSpot({spot, closeMenu}) {
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')
    const { closeModal } = useModal()
    const history = useHistory(); // Initialize the useHistory hook

    const deleteSpot = async () => {
        await dispatch(removeSpot(spot.id))
        await dispatch(getAllSpots()).then(closeModal)
        history.push('/'); // Navigate to the homepage route
    }

    const updateName = (e) => setName(e.target.value)

    return (
        <div className='p1 g1 fdc'>
            <div className='fwb'>Delete Spot</div>
            <div className='jcc'>
                To delete this spot, type <span className='fwb' style={{"color":"rgb(255, 93, 93)"}}>"{spot.name}"</span>.
            </div>
            <div className='jcc'>
                This cannot be undone!
            </div>
            <input
                style={{"width":"100%"}}
                type='text'
                onChange={updateName}
            />
            {name === spot.name ? <button className="demo-user-button" onClick={deleteSpot}>Delete</button>
            :
            <button disabled className="demo-user-button deleteDisabled" onClick={deleteSpot}>Delete</button>}
        </div>
    )
}

export default DeleteSpot
