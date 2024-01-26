import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


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

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading : true,
      page : 1,
      totalResults : 0
    }
    // console.log(this.state.page)
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79659df3eff24558ae01e74566f9c4f6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles : parsedData.articles, totalResults : parsedData.totalResults, loading : false});
  }

  async componentDidMount(){
   this.updateNews();
  }


  // handlePrevClick = async () => {
  //   this.setState({page: this.state.page - 1});
  //   this.updateNews();
  // }

  // handleNextClick = async () => {
  //   this.setState({page: this.state.page + 1});
  //   console.log(this.state.page)
  //   this.updateNews();
  //   }
  fetchMoreData = async () => {
    console.log(this.state.page  + 'i am before')
    this.setState({page : this.state.page + 1})
    console.log(this.state.page  + 'i am after')
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79659df3eff24558ae01e74566f9c4f6&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles : this.state.articles.concat(parsedData.articles), totalResults : parsedData.totalResults});
  };
  
 render() {
  return (
     <>
              <h1 className='pt-2 text-center'>NewsMonkey - Top Headlines On {this.capitalizeFirstLetter(this.props.category)}</h1>
              <hr />
              {this.state.loading && <Spinner/>}
              <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container bg-secondary-subtle">
              <div className="row">
              {
                 this.state.articles.map((element,index)=>{
                    return   <div className='col-md-4' key={index}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} name={element.source.name}/>            
                            </div>
                })
              }
              </div>
        </div>

              </InfiniteScroll>

              {/* <div className="d-flex justify-content-between pb-2">
                    <button type="button" disabled={this.state.page<=1} className="btn btn-info" onClick={this.handlePrevClick}>&larr; Prev</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-info" onClick={this.handleNextClick} >Next &rarr;</button>
              </div> */}
      </>
    )
  }
}
