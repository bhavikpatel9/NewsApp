import React, { Component } from 'react'
import imgNotfound from './image-not-found.png'

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <div>
        <div className="card my-2">
            <img src={imageUrl?imageUrl:imgNotfound} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a href={newsUrl} target="_blank" rel="noreferrer"  className="btn btn-sm btn-primary">Read more</a>
            </div>
        </div>
      </div>
    )
  }
}
