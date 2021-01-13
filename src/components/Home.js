import React from 'react';
import PropTypes from 'prop-types';
import categoriesArray from '../categoriesArray';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import search from '../images/search.png'

class Home extends React.Component {
  state = {
    searchedRecipe : "",
  }
  
  
  handleChange = (event) => {
    this.setState({searchedRecipe : event.target.value})
    console.log(this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {searchedRecipe} = this.state;
    this.props.history.push(`/search?q=${searchedRecipe}`)
  }

  render() {
    console.log("histoory",this.props.history)
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
                    <p className="category-name">{item.strCategory}</p>
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
  searchedRecipe: PropTypes.string
}
export default Home;
