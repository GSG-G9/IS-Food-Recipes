import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import search from '../images/search.png';

class Search extends React.Component {
  state = {
  isLoaded : true,
  searchResult : [],
  searchedRecipe : "",
  }
  
  componentDidMount(){
    const searchedRecipe = this.props.location.search.split('=')[1];
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedRecipe}`;
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        searchResult : res.meals,
        isLoaded : false
      })
      return this.state;
    })
    .then((res)=>console.log(res.searchResult))
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
  
  render(){
    const {searchResult, isLoaded} = this.state;
    if(isLoaded){
      return <h1>loading ...</h1>
    } 
  
    else {
      if(!searchResult){
        return (
          <div>
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
             <h1 className="no-result">There is no recipes for the entered search </h1>
          </div>
        )
      } else{
          return (
            <div>
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
                <div className="home-recipes-container">
                  {searchResult.map((item) => (
                    <li className="item" key={item.idMeal}>
                      <div className="search-recipes-img-container">
                        <Link className="link-name" to={`/recipeDetails/${item.idMeal}`}>
                          <img
                            className="home-recipes-img"
                            src={item.strMealThumb}
                          />
                          <p>{item.strMeal}</p>
                        </Link>
                      </div>
                    </li>
                  ))}
                </div>
            </ul>
         </div>
        )
       }
    
    }
  }
}
Search.PropTypes = {
  isLoaded: PropTypes.bool,
  searchResult:PropTypes.array

}
export default Search;
