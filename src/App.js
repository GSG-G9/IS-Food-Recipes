import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import Home from './components/Home';
import Search from './components/Search';
import RecipeDetails from './components/RecipeDetails'
import IngredientMeals from './components/IngredientMeals'
import Category from './components/Category';
import background from './images/background.jpg';
import About from './components/About';
import NotFound from './components/NotFound';


class App extends React.Component {

  state = {
    category:[],
  }

  render() {

    const {category} = this.state;
    
    return (
      <div className="App">
         <div className="background-img-con">
          <img  className="background-img" src={background}></img>
        </div>
        <ul className="navbar">
          <li className="nav_title">IS Food Recipes</li>
          <li className="nav_item">
            <Link className="nav_link" to="/about">
              About
            </Link>
          </li>
          <li className="nav_item">
            <Link className="nav_link" to="/">
              Home
            </Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" render={
            (props)=> <Home categories={category} {...props}/>
          }/>
          <Route path="/search" component={Search}/>
          <Route path="/categories/:category" component={Category}/>
          <Route path="/about" component={About}/>
          <Route path="/recipeDetails/:recipeId" render={
            (props) => <RecipeDetails {...props} />}
          />
          <Route path="/ingredientMeals/:ingredientName" render={
            (props) => <IngredientMeals {...props} />}
          />
          <Route component={NotFound}/>
        </Switch>
      </div>
      
    );
  }
}

App.PropTypes = {
  isLoaded: PropTypes.bool,
  category:PropTypes.array,
  trackScrolling:PropTypes.bool

}
export default App;
