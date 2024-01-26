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
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.props.setProgress(50);
    this.setState({articles : parsedData.articles, totalResults : parsedData.totalResults, loading : false});
    this.props.setProgress(100);
  }

  async componentDidMount(){
   this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({page : this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
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
      </>
    )
  }
}
