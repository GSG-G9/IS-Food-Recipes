import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import '../recipeDetails.css'

class IngredientMeals extends React.Component {
    state = {
    isLoaded : true,
    allMeals : [],
    error:null
    }
    componentDidMount(){
        const {ingredientName}=this.props.match.params;
        let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;
        fetch(url)
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            allMeals : res.meals,
            isLoaded : false
          })
        },
         (error) => {
           this.setState({
             isLoaded:false,
             error
           })
          }
        )
    }

    render(){
        const {allMeals, isLoaded, error} = this.state;
        const {ingredientName}=this.props.match.params;
        if(error){
          return <h1 className="failed">{error.message}</h1>
        }
        else if(isLoaded){
          return(
            <div className="loading-img">
          </div> 
          )
        }
        else{
        return (
            <div className="recipe-cont">
              <div className="first-section">
            <p className="recipe-title">{ingredientName}</p>
            <img
              className="recipe-img"
            src={`https://www.themealdb.com/images/ingredients/${ingredientName}.png`}
          />
          </div>
          <div className="second-section">
            <ul className="ingredient-list1">
          
              {allMeals.map((item) => (
                <li  className="ingredient-item1" key={item.idMeal}>
                  <div >
                    <Link className="ingredient-name" to={`/recipeDetails/${item.idMeal}`}>
                    <img
                    className="ingredient-item"
                      src={item.strMealThumb}
                    />
                    <p className="ingredient-name">{item.strMeal}</p>
                    </Link>
                  </div>
                </li>
              ))}
           
          </ul>
          </div>
          </div>
         )
        }
}
}
IngredientMeals.PropTypes = {
  match :PropTypes.shape({params:PropTypes.shape({ingredientName:PropTypes.string.isRequired})})

}
export default IngredientMeals;