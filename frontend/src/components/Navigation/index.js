import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import '../SpotsFilter/SpotsFilter.css'

function Navigation({ isLoaded }){

  const sessionUser = useSelector(state => state.session.user);

return (
    <div className='nav-bar-wrapper'>
      <div className='nav-bar'>
        <div>
          <NavLink exact to='/' className='home-link'>

            <img className='home-link-img' src='https://cdn-icons-png.flaticon.com/128/2111/2111283.png' alt='luxbnb' />Luxbnb
          </NavLink>
            </div>

            {/* <div className='filter-icon'>
                <img className='filter-icon1' src='https://cdn-icons-png.flaticon.com/128/2855/2855440.png' alt='Mansions' />
                <h1>Mansions</h1>
            </div>
            <div className='filter-icon'>
            <img className='filter-icon2' src='https://cdn-icons-png.flaticon.com/128/5776/5776806.png' alt='Beachfront' />
                <h2>Beachfront</h2>
            </div>
            <div className='filter-icon'>
            <img className='filter-icon3' src='https://cdn-icons-png.flaticon.com/128/619/619097.png' alt='Castles' />
                <h3>Castles</h3>
            </div>
            <div className='filter-icon'>
            <img className='filter-icon4' src='https://cdn-icons-png.flaticon.com/128/2189/2189572.png' alt='Yachts' />
                <h4>Yachts</h4>
            </div>
            <div className='filter-icon'>
            <img className='filter-icon5' src='https://cdn-icons-png.flaticon.com/128/2315/2315556.png' alt='Skiing' />
                <h5>Skiing</h5>
            </div>
            <div className='filter-icon'>
            <img className='filter-icon6' src='https://cdn-icons-png.flaticon.com/128/1008/1008165.png' alt='OMG!' />
                <h6>OMG!</h6>
            </div> */}
        <div style={{"width":"50px"}}></div>
        {isLoaded && (
          <div style={{"display": 'flex', 'alignItems': 'center', 'gap':'20px'}}>
            <div>

              { sessionUser && (
                <NavLink to='/new' style={{'color':'black', 'textDecoration':'none', 'fontSize':'20px', 'fontWeight':'200', 'fontFamily':'helvetica'}}>Luxbnb your home</NavLink>
              )}
            </div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>
  );
}


export default Navigation;
