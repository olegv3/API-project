import React from 'react'
import { useDispatch } from 'react-redux'
import { removeBooking } from '../../../store/bookings'

function UserBookingDetails({ id, Spot, startDate, endDate }) {
    const dispatch = useDispatch()
    const today = new Date(Date.now())
    const formattedStartDate = new Date(startDate).toUTCString().slice(0, 16)
    const formattedEndDate = new Date(endDate).toUTCString().slice(0, 16)
    const deleteBooking = async () => {
        dispatch(removeBooking(id))
    }

    return (
        <div style={{"display":"flex", "justifyContent":"space-between", "alignContent":"center", "gap":"40px", "borderBottom":"lightGray 1px solid"}}>
            <div>
                <h3 style={{"marginBottom":"0px", "color": "#ff5d5d"}}>{Spot.name}</h3>
                <p style={{"marginTop":"0px"}}>{`${formattedStartDate} - ${formattedEndDate}`}</p>
            </div>
            <div style={{"display":"flex", "alignItems":"center", "gap":"10px"}}>
                { (new Date(startDate) > today || (new Date(startDate).getDate() + 1 === today.getDate() && today.getHours() < 16)) && <button className='demo-user-button' onClick={deleteBooking}>Delete</button>}
            </div>
        </div>
    )
}

export default UserBookingDetails
