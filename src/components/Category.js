import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import search from '../images/search.png';


class Category extends React.Component {

  state = {
    isLoaded : true,
    categoryResult : [],
    trackScrolling:false,
    searchedRecipe : "",
    }
    

    handleChange = (event) => {
      this.setState({searchedRecipe : event.target.value})
      console.log(this.state)
    }
  
    handleSubmit = (event) => {
      event.preventDefault();
      const {searchedRecipe} = this.state;
      // let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedRecipe}`;
      // fetch(url)
      // .then((res) => res.json())
      // .then((res) => {
      //   this.setState({
      //     searchResult : res,
      //     isLoaded : false
      //   })
      // })
     
      
      this.props.history.push(`/search?q=${searchedRecipe}`)
      
      
    }
    componentDidMount(){
      const {category} = this.props.match.params;
      let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          categoryResult : res.meals,
          isLoaded : false
        })
        return this.state;
      })
      .then((res)=>console.log(res.categoryResult))

      
    }
    
    render(){
      const {category} = this.props.match.params;
      const {categoryResult, isLoaded} = this.state;
      if(isLoaded){
        return(
          <div className="loading-img">
        </div> 
        )
      }
    
      else {
        if(!categoryResult){
          return <h1 className="no-result">There is no recipes for the entered search </h1>
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
                <h1 className="category-heading">{category} Recipes</h1>
                <ul className="home-page-container">
                  <div className="home-recipes-container">
                    {categoryResult.map((item) => (
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
Category.PropTypes = {
  history: PropTypes.shape({push:PropTypes.func.isRequired}).isRequired,
  match :PropTypes.shape({params:PropTypes.shape({category:PropTypes.string.isRequired})})
}


export default Category;
