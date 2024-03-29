import React from 'react'
import imgNotfound from './image-not-found.png'

const NewsItem = (props)=> {
    let {title,description,imageUrl,newsUrl,author,date,name} = props;
    return (
      <div>
        <div className="card my-2">
            <img style={{height : '230px'}} src={imageUrl?imageUrl:imgNotfound} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title.slice(0,91)}...</h5>
              <p className="card-text">{description.length>204?description.slice(0,204):description}...</p>
              <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} On {new Date(date).toGMTString()}</small></p>
              <div className="d-flex justify-content-between align-items-end">
                    <a href={newsUrl} target="_blank" rel="noreferrer"  className="btn btn-sm btn-primary">Read more</a>
                    <span className="badge text-bg-danger ms-2">{name}</span>
             </div>
            </div>
        </div>
      </div>
    )
  }

export default NewsItem
