import React from 'react';
import {Link} from 'react-router-dom'


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
        .then((res)=>console.log(res.RecipeInformation))
      }
    //   back=()=>{
    //       console.log("Hiiii",this.props.history)
    //       this.props.history.goBack
    //   }

    render(){
       
            const {RecipeInformation, isLoaded} = this.state;
            if(isLoaded){
              return <h1>loading ...</h1>
            }
            else{
        return(
        
            <div className="home-recipes-container">
                  <div>{RecipeInformation[0].strMeal}</div>
                  <img
                     className="home-recipes-img"
                     src={RecipeInformation[0].strMealThumb}
                   />
                  <div>Instructions <br/>{RecipeInformation[0].strInstructions}</div>
                
                  <ul className="home-page-container">
          <div className="home-recipes-container">
                  {
           
                     Object.keys(RecipeInformation[0]).map(item=>(
                        // console.log("item"+item)
                        
                       (item.includes("strIngredient")&& RecipeInformation[0][item])?
                         
                        <li className="item" key={item}>
                        <div className="home-recipes-img-container">
                        <Link to={`/ingredientMeals/${RecipeInformation[0][item]}`}>
                          <img
                            className="home-recipes-img"
                            src={`https://www.themealdb.com/images/ingredients/${RecipeInformation[0][item]}.png`}
                          />
                          <p>{RecipeInformation[0][item]}</p>
                          </Link>
                        </div>
                      </li>
                       :
                      ("")
                       
                     )) 
                  }
                  </div>  
                  </ul>
                  {/* <button onClick={this.back()}>Back to Recipes</button> */}
                  </div> 
          
        )
    }
}
}

export default RecipeDetails;