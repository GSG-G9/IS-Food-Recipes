import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../recipeDetails.css'


class RecipeDetails extends React.Component {
    state = {
    isLoaded : true,
    RecipeInformation : [],
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
          return this.state;
        })
        .then((res)=>console.log("hiiiiiiii",res.RecipeInformation))
      }
      back=()=>{
          console.log("Hiiii",this.props.history)
          this.props.history.goBack()
      }

    render(){
       
            const {RecipeInformation, isLoaded} = this.state;
            if(isLoaded){
              return <h1>loading ...</h1>
            }
            else{
        return(
        
            <div className="recipe-cont">
              <div className="first-section">
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
                        // console.log("item"+item)
                        
                       (item.includes("strIngredient")&& RecipeInformation[0][item])?
                         
                        <li className="iingredient-item" key={item}>
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
                  {/* <button onClick={this.back()}>Back to Recipes</button> */}
                  </div> 
          
        )
    }
}
}
RecipeDetails.PropTypes = {
  isLoaded: PropTypes.bool,
  RecipeInformation:PropTypes.array

}
export default RecipeDetails;