import React from 'react';
import PropTypes, { func } from 'prop-types';
import categoriesArray from '../categoriesArray';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import search from '../images/search.png'

class Home extends React.Component {
  state = {
    searchedRecipe : "",
  }
  
  
  handleChange = (event) => {
    this.setState({searchedRecipe : event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {searchedRecipe} = this.state;
    this.props.history.push(`/search?q=${searchedRecipe}`)
  }

  render() {
    return (
      <div className="homeee">
        <form className="form-container" onSubmit={this.handleSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Search for a recipe"
            onChange={this.handleChange}
          />
          <button className="search-button" type="submit">
            <img className="search-img" alt="search" src={search}></img>
          </button>
        </form>
        <h1 className="welcoming-heading">Looking for something to tickle your taste buds? Try out our flavorful recipes.</h1>

        <ul className="home-page-container">
          <div className="recipes-container">
            {categoriesArray.map((item) => (
              <li className="home-item" key={item.idCategory}>
                <Link className="link-name" to={`/categories/${item.strCategory}`}>
                  <div className="home-recipes-img-container">
                    <img
                      className="home-recipes-img"
                      src={item.strCategoryThumb}
                    />
                    <p className="category-name" >{item.strCategory}</p>
                  </div>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </div>
    );
  }
}
Home.PropTypes = {
  history: PropTypes.shape({push:PropTypes.func.isRequired}).isRequired
}
export default Home;
