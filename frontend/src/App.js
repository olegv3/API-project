import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as spotActions from './store/spots'
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SingleSpot from "./components/Spots/SingleSpot/SingleSpot";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import Account from "./components/Account";
import SpotsFilter from "./components/SpotsFilter";

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
      <SpotsFilter />
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
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
