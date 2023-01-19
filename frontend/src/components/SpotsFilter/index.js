import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './SpotsFilter.css'

function SpotsFilter() {

    useEffect(() => {
    })

    const spotsObj = useSelector(state => state.spots.allSpots)

    const spots = Object.values(spotsObj)
    if(!spots) return null

    return (
        <div className='filter-container'>
            <div className='filter-icons'>
                <div className='filter-icon'>
                    <img className='filter-icon' src='https://cdn-icons-png.flaticon.com/512/2855/2855440.png' alt='Mansions' />
                    <p>Mansions</p>
                </div>
                <div className='filter-icon'>
                <img className='filter-icon' src='https://cdn-icons-png.flaticon.com/512/5776/5776806.png' alt='Beachfront' />
                    <p>Beachfront</p>
                </div>
                <div className='filter-icon'>
                <img className='filter-icon' src='https://cdn-icons-png.flaticon.com/512/619/619097.png' alt='Castles' />
                    <p>Castles</p>
                </div>
                <div className='filter-icon'>
                <img className='filter-icon' src='https://cdn-icons-png.flaticon.com/512/2189/2189572.png' alt='Yachts' />
                    <p>Yachts</p>
                </div>
                <div className='filter-icon'>
                <img className='filter-icon' src='https://cdn-icons-png.flaticon.com/512/2315/2315556.png' alt='Skiing' />
                    <p>Skiing</p>
                </div>
                <div className='filter-icon'>
                <img className='filter-icon' src='https://cdn-icons-png.flaticon.com/512/1008/1008165.png' alt='OMG!' />
                    <p>OMG!</p>
                </div>
            </div>
        </div>
    )
}


export default SpotsFilter



