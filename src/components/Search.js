import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
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

  
 
  
  render(){
    const searchedRecipe = this.props.location.search.split('=')[1];
    const {searchResult, isLoaded} = this.state;
    if(isLoaded){
      return(
        <div className="loading-img">
      </div> 
      )
    } 
  
    else {
      if(!searchResult){
        return (
          <div>
             <h1 className="no-result">There is no recipes for the entered search </h1>
          </div>
        )
      } else{
          return (
            <div>
              <h1 className="category-heading">Search Results for '{searchedRecipe}' Recipes</h1>
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
location:PropTypes.shape({search:PropTypes.string}).isRequired

}
export default Search;
