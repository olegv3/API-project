import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpotsOfUser } from "../../../store/spots"
import UserSpotDetails from "./UserSpotDetails"

export default function SpotsOfUser() {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.allSpots)
    const [ userSpots, setUserSpots ] = useState('')

    const getTheSpots = async () => {
        let spotsOfUser = await dispatch(getSpotsOfUser())
        setUserSpots(spotsOfUser.Spots)
    }
    useEffect(() => {
        getTheSpots()
    }, [spots])

    if(!userSpots) return null

    return (
        <div style={{"margin":"40px", "padding":"0px 10px", "display":"flex", "flexDirection":"column", "border":"lightGray solid 1px", "borderRadius":"10px"}}>
            <h2 style={{"borderBottom":"solid lightgray 1px", "padding":"10px"}}>Your Spots:</h2>
            {userSpots.length ? (
                userSpots.map((spot) => (
                    <UserSpotDetails key={spot.id} {...spot} />
                    ))
            ) : (<h5>No spots listed.</h5>)
            }
        </div>

    )
}
