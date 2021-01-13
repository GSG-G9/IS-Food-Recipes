import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

class Search extends React.Component {
  state = {
  isLoaded : true,
  searchResult : [],
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
    const {searchResult, isLoaded} = this.state;
    if(isLoaded){
      return <h1>loading ...</h1>
    } 
  
    else {
      if(!searchResult){
        return <h1 className="no-result">There is no recipes for the entered search </h1>
      } else{
          return (
            <div>
             
             <ul className="home-page-container">
             <div className="home-recipes-container">
               {searchResult.map((item) => (
                 <li className="item" key={item.idMeal}>
                   <div className="search-recipes-img-container">
                   <Link to={`/recipeDetails/${item.idMeal}`}>
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
