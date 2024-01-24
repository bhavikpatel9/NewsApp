import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

  static defaultProps = {
    pageSize: 5,
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
  }

  constructor(){
    super();
    this.state = {
      articles : [],
      loading : false,
      page : 1
    }
    
  }

  async componentDidMount(){
   this.updateNews();
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63f31841b4e14969accc56d1a26704cb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles : parsedData.articles, totalResults : parsedData.totalResults, loading : false});
  }

  handlePrevClick = async () => {
    this.setState({page: this.state.page - 1});
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({page: this.state.page + 1});
    console.log(this.state.page)
    this.updateNews();
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
                    return   <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} name={element.source.name}/>            
                            </div>
                })
              }
              </div>

              <div className="d-flex justify-content-between pb-2">
                    <button type="button" disabled={this.state.page<=1} className="btn btn-info" onClick={this.handlePrevClick}>&larr; Prev</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-info" onClick={this.handleNextClick} >Next &rarr;</button>
              </div>
      </div>
    )
  }
}
