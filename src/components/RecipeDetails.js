import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../recipeDetails.css'


class RecipeDetails extends React.Component {
    state = {
    isLoaded : true,
    RecipeInformation : [],
    error:null
    
    }
    componentDidMount(){
        const {recipeId}=this.props.match.params;
        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
        fetch(url)
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            RecipeInformation : res.meals,
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
            const {goBack} = this.props.history
            const {RecipeInformation, isLoaded, error} = this.state;
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
        return(
        
            <div className="recipe-cont">
              
              <div className="first-section">
                  <button className="back-btn" onClick={()=>goBack()}>Back to Recipes</button>
                  <div className="recipe-title">{RecipeInformation[0].strMeal}</div>
                  <img
                     className="recipe-img"
                     src={RecipeInformation[0].strMealThumb}
                   />
                   <p className="instructions">Instructions</p>
                  <div className="recipe-instructions">{RecipeInformation[0].strInstructions}</div>
                  </div>
                  <div className="second-section">
                    <p className="instructions" >Ingredients</p>
                  <ul className="ingredient-list">
                  {
                     Object.keys(RecipeInformation[0]).map(item=>(
                        
                       (item.includes("strIngredient")&& RecipeInformation[0][item])?
                         
                        <li className="ingredient-item" key={item}>
                        <div >
                        <Link className="ingredient-name"  to={`/ingredientMeals/${RecipeInformation[0][item]}`}>
                          <img
                            className="ingredient-item"
                            src={`https://www.themealdb.com/images/ingredients/${RecipeInformation[0][item]}.png`}
                          />
                          <p className="ingredient-name">{RecipeInformation[0][item]}</p>
                          </Link>
                        </div>
                      </li>
                       :
                      ("")
                       
                     )) 
                  }
                   
                  </ul>
                 
                  </div>
                   
                  </div> 
          
        )
    }
}
}
RecipeDetails.PropTypes = {
  history: PropTypes.shape({goBack:PropTypes.func.isRequired}).isRequired,
  match :PropTypes.shape({params:PropTypes.shape({recipeId:PropTypes.string.isRequired})})

}
export default RecipeDetails;