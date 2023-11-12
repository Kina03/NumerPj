import React from "react";
import Navbar from "./components/Navbar";
import { Home } from "./Home";
import Bisection from "./RootOfEquations/Bisection";
import FalsePosition from "./RootOfEquations/FalsePosition";
import Onepoint from "./RootOfEquations/Onepoint";
import NewtonRaphson from "./RootOfEquations/Newtonraphson";
import Secant from "./RootOfEquations/Secant";
import {Elimination} from "./Linearalgebraic/Elimination";
import {Cramer} from "./Linearalgebraic/Cramer";
import NewtonDivided from "./interpolation/NewtonDivided";
import Lagrange from "./interpolation/Lagrange";
import MultiRegression from "./Regression/Multi";
import LinearRegression from "./Regression/Linear";
import PolyRegression from "./Regression/Poly";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// function App() { 
const App = () => {
  return (
    <Router>
      <header>
      <div className="nav-area">
        <a href="/#" className="logo">
          Numerical Method
        </a>
        <Navbar />
      </div>
    </header>
      <Switch>
      
      <Route path="/" exact component={Home} />      
        <Route path="/Home" exact component={Home} />
        <Route path="/Bisection" component={Bisection} />
        <Route path="/FalsePosition" component={FalsePosition} />
        <Route path="/Newtonraphson" component={NewtonRaphson} />
        <Route path="/Onepoint" component={Onepoint} />
        <Route path="/Secant" component={Secant} />
        <Route path="/Linear" component={LinearRegression} />
        <Route path="/MultiRegression" component={MultiRegression} />
        <Route path="/PolyRegression" component={PolyRegression} />
        <Route path="/Cramer" component={Cramer} />
        <Route path="/Elimination" component={Elimination} />
        <Route path="/Lagrange" component={Lagrange} />
        <Route path="/NewtonDivided" component={NewtonDivided} />
        
        </Switch>
    </Router>
  );
};

export default App;