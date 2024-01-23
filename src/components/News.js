import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {
  
  constructor(){
    super();
    this.state = {
      articles : [],
      loading : false,
      page : 1
    }
    
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4e504cde06b5401e9472e2dbe7abc4b8&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({articles : parsedData.articles, totalResults : parsedData.totalResults, loading : false});
  }

  handlePrevClick = async () => {
    // console.log("prev")
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4e504cde06b5401e9472e2dbe7abc4b8&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({articles : parsedData.articles, page : this.state.page - 1, loading : false});

  }
  handleNextClick = async () => {
    // console.log("next")
        if(this.state.page + 1 >= Math.ceil(this.state.totalResults/this.props.pageSize)){

        }
        else{
          let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4e504cde06b5401e9472e2dbe7abc4b8&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
          this.setState({loading : true});
          let data = await fetch(url);
          let parsedData = await data.json();
          // console.log(parsedData);
          this.setState({articles : parsedData.articles, page : this.state.page + 1, loading : false});
        }

  }

  
  render() {
    return (
      <div className='container my-3 bg-secondary-subtle rounded'>
        <h1 className='pt-2'>NewsMonkey - Top Headlines</h1>
        <hr />
        {this.state.loading && <Spinner/>}
        <div className="row">
        {
          !this.state.loading && this.state.articles.map((element)=>{
              return   <div className="col-md-4" key={element.url}>
                          <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>            
                      </div>
              
          })
        }
        </div>

         <div className="d-flex justify-content-between pb-2">
         <button type="button" disabled={this.state.page<=1} className="btn btn-info" onClick={this.handlePrevClick}>&larr; Prev</button>
         <button type="button" disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-info" onClick={this.handleNextClick} >Next &rarr;</button>
         </div>
      </div>
    )
  }
}
