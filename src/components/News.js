import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  
  constructor(){
    super();
    this.state = {
      articles : [],
      loading : false
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=4e504cde06b5401e9472e2dbe7abc4b8";
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({articles : parsedData.articles});
  }
  render() {
    return (
      <div className='container my-3 bg-secondary-subtle rounded'>
        <h1 className='pt-2'>NewsMonkey - Top Headlines</h1>
        <hr />
        <div className="row">
        {
          this.state.articles.map((element)=>{
              return   <div className="col-md-4" key={element.url}>
                          <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>            
                      </div>
              

          })
        }
        </div>
      </div>
    )
  }
}
