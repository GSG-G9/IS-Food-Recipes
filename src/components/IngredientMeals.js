import React from 'react';
import {Link} from 'react-router-dom'

class IngredientMeals extends React.Component {
    state = {
    isLoaded : true,
    allMeals : [],
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
          return this.state;
        })
        .then((res)=>console.log(res.allMeals))
      }

    render(){
        const {allMeals, isLoaded} = this.state;
        const {ingredientName}=this.props.match.params;
       
        if(isLoaded){
          return(
            <div className="loading-img">
          </div> 
          )
        }
        else{
        return (
            <div>
            <p>{ingredientName}</p>
            <img
            className="home-recipes-img"
            src={`https://www.themealdb.com/images/ingredients/${ingredientName}.png`}
          />
          
            <ul className="home-page-container">
            <div className="home-recipes-container">
              {allMeals.map((item) => (
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

export default IngredientMeals;