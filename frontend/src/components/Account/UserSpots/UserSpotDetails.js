import { Link } from "react-router-dom"
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem"
import DeleteSpot from "./DeleteSpot";

export default function UserSpotDetails (spot) {

    if(!spot) return null
    return (
        <div style={{"display":"flex", "justifyContent":"space-between", "alignContent":"center", "gap":"40px", "borderBottom":"lightGray 1px solid"}}>
            <div>
                <h3 style={{"marginBottom":"0px", "color": "#ff5d5d"}}>{spot.name}</h3>
                <p style={{"marginTop":"0px"}}>{spot.city}, {spot.state}</p>
            </div>
            <div style={{"display":"flex", "alignItems":"center", "gap":"10px"}}>
                <Link to={`/account/spots/edit/${spot.id}`}>Edit</Link>
                <div style={{"listStyleType":"none"}} className='demo-user-button'>
                    <OpenModalMenuItem
                        className='imageFormButton'
                        style={{"minWidth":"10em"}}
                        itemText="Delete"
                        modalComponent={<DeleteSpot spot={spot}/>}
                    />
                </div>
            </div>
        </div>
    )
}
