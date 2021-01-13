import React from 'react';
import background from '../images/backgroung2.jpg'

class Category extends React.Component {

  state = {
    isLoaded : true,
    categoryResult : [],
    trackScrolling:false
    }
    
  trackScrolling = () =>{
    this.setState({trackScrolling:true})
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
    
      const {categoryResult, isLoaded} = this.state;
      if(isLoaded){
        return <h1>loading ...</h1>
      }
    
      else {
        if(!categoryResult){
          return <h1 className="no-result">There is no recipes for the entered search </h1>
        } else{
          
            return (
              <div>
                 <div className="background-img-con">
              <img  className="background-img" src={background}></img>
            </div>
             <ul className="home-page-container">
             <div className="home-recipes-container">
               {categoryResult.map((item) => (
                 <li className="item" key={item.idMeal}>
                   <div className="search-recipes-img-container">
                     <img
                       className="home-recipes-img"
                       src={item.strMealThumb}
                     />
                     <p>{item.strMeal}</p>
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

export default Category;
