import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){

  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-bar-wrapper'>
      <div className='nav-bar'>
        <div>
        <NavLink exact to="/" className='home-link'><i className="fa-regular fa-gem"></i> Luxbnb</NavLink>
        </div>
        <div style={{"width":"50px"}}></div>
        {isLoaded && (
          <div style={{"display": 'flex', 'alignItems': 'center', 'gap':'20px'}}>
            <div>
              { sessionUser && (
                <NavLink to='/new' style={{"textDecoration":"underline"}}>Luxbnb your home</NavLink>
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
