// import { useEffect } from "react"
import { NavLink, Route, Switch } from "react-router-dom"
import Profile from "./Profile/index"
import EditUserSpot from "./UserSpots/EditUserSpot"
import SpotsOfUser from './UserSpots'
import UserReviews from "./UserReviews"
import './index.css'
import UserBookings from "./UserBookings"

export default function Account () {

    // useEffect(() => {
    //     // dispatch the get current reviews or users with if statement
    // })


    return (
        <div className="routeDiv">
            <nav className="account-nav">
                <NavLink className='account-nav-buttons' exact to={'/account'}>Profile</NavLink>
                <NavLink className='account-nav-buttons' to={'/account/spots'}>Spots</NavLink>
                <NavLink className='account-nav-buttons' to={'/account/bookings'}>Bookings</NavLink>
                <NavLink className='account-nav-buttons' to={'/account/reviews'}>Reviews</NavLink>
            </nav>
            <div className="switch-wrapper">

            <Switch>
                <Route exact path='/account'>
                    <Profile />
                </Route>

                <Route exact path='/account/spots'>
                    <SpotsOfUser />
                </Route>

                <Route exact path='/account/bookings'>
                    <UserBookings />
                </Route>

                <Route path='/account/reviews'>
                    <UserReviews />
                </Route>

                <Route path='/account/spots/edit/:id'>
                    <EditUserSpot />
                </Route>
            </Switch>
            </div>


        </div>
    )
}
