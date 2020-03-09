import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../home";
// import Salas from "../Salas";
// import EbootCamp from "../eBootCamp";

const Main = () => (
    <Switch>
        {/**  --------- Rutas en Español  --------------- */}
        <Route exact path="/" component={Home}/>

    </Switch>
);

export default Main;