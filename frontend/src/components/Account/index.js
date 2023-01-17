import { NavLink, Route, Switch } from "react-router-dom"
import Profile from "./Profile/index"
import EditUserSpot from "./UserSpots/EditUserSpot"
import SpotsOfUser from './UserSpots'
import UserReviews from "./UserReviews"
import './index.css'

export default function Account () {


    return (
        <div className="routeDiv">
            <nav className="account-nav">
                <NavLink className='account-nav-buttons' exact to={'/account'}>Profile</NavLink>
                <NavLink className='account-nav-buttons' to={'/account/spots'}>Spots</NavLink>
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
