import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as spotActions from './store/spots'
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SingleSpot from "./components/Spots/SingleSpot/SingleSpot";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import Account from "./components/Account";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(spotActions.getAllSpots());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Spots />
          </Route>

          <Route path='/spots/:id'>
            <SingleSpot isLoaded={isLoaded}/>
          </Route>

          <Route path='/account'>
            <Account />
          </Route>

          <Route path='/new'>
            <CreateSpotForm />
          </Route>

          <Route>
  <div className="centered-content">
    <h1></h1>
    <div className="photo-no-exist">
      <img src="https://www.publicdomainpictures.net/pictures/60000/velka/abandoned-house.jpg" alt="Error 404" />
      <p>Oops! Looks like you took a wrong turn.</p>
      <Link to="/" className="link-underline">Go back to home page</Link>
    </div>
  </div>
</Route>

        </Switch>
      )}
    </>
  );
}

export default App;
