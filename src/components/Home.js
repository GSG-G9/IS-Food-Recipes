import React from 'react';
import categoriesArray from '../categoriesArray';

class Home extends React.Component {
  state = {
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

  render() {
    console.log("histoory",this.props.history)
    return (
      <div>
        <form className="form-container" onSubmit={this.handleSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Search for a recipe"
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>

        <ul className="home-page-container">
          <div className="home-recipes-container">
            {categoriesArray.map((item) => (
              <li className="item" key={item.idCategory}>
                <div className="home-recipes-img-container">
                  <img
                    className="home-recipes-img"
                    src={item.strCategoryThumb}
                  />
                  <p>{item.strCategory}</p>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    );
  }
}

export default Home;
