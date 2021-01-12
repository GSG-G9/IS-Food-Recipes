import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import './App.css';
import background from './images/background.jpg'

 const Home = (props) =>{

  return(
    
      <div >
        <ul className="home-page-container">
          <div className="home-recipes-container">
         {props.categories.map(item=>(
           <li className="item" key={item.idCategory}>
            
             <div className="home-recipes-img-container">
               <img className="home-recipes-img" src={item.strCategoryThumb}></img>
             <p>{item.strCategory}</p>
            </div>
            
           </li>
         ))}</div>
        </ul>
      </div>
   
    
   )
  }
class App extends React.Component {

  
  state={
    isLoaded:false,
    category:[],

  }
  componentDidMount(){
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
    fetch(url)
    .then(res=>res.json())
    .then((result)=>{
      this.setState({
        category:result.categories,
        isLoaded: true,
      })
    })
    
  }

  render() {
  
    const {isLoaded, category} = this.state;
    return (
      
      <div className="App">
        <ul className="navbar">
          <li className="nav_title">IS Food Recipes</li>
          <li className="nav_item">
            <Link className="nav_link" to="/about">
              About
            </Link>
          </li>
          <li className="nav_item">
            <Link className="nav_link" to="/">
              Home
            </Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" render={
            (props)=> <Home categories={category} {...props}/>

          }/>
          {/* <Route path="/about" component={About}/> */}
        </Switch>
      </div>
      
    );
  }
}
export default App;
