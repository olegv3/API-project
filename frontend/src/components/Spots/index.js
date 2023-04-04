import React from 'react'
import { useSelector } from 'react-redux'
import SpotDetailCard from './SpotDetailCard'
import './index.css'
import Footer from '../Footer'


function Spots() {

    const spotsObj = useSelector(state => state.spots.allSpots)

    const spots = Object.values(spotsObj)

    if(!spots) return null
    return (
        <div className='main-wrapper'>
            <div className='card-wrapper'>
                {spots.map((spot) => (
                <SpotDetailCard key={spot.id} {...spot} />
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default Spots
