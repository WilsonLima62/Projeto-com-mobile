import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
  

import Landing from "./pages/Landing";
import pontosHistoricosMap from "./pages/PontosHistoricosMap";
import pontosHistoricos from './pages/PontosHistoricos';
import CreatePontosHistoricos from './pages/CreatePontosHistoricos';

function Routes(){
return (
  <BrowserRouter>
  <Switch>
      <Route  path="/" exact  component={Landing}/>
      <Route path="/app" component={pontosHistoricosMap}/>
      <Route path="/pontosHistoricos/create" component={CreatePontosHistoricos}/>
      <Route path="/pontosHistoricos/:id" component={pontosHistoricos}/>
    </Switch>
  </BrowserRouter>
);
}

export default Routes;