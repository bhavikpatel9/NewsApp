import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize = 9;
 
  render() {
    return (
      <div>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<NavBar/>}>
          <Route index element={<News pageSize={this.pageSize} key='general' country='in' category='general'/>} />
          <Route exact path="business"  element={<News pageSize={this.pageSize} country='in' key='business' category='business'/>} />
          <Route exact path="entertainment"  element={<News pageSize={this.pageSize} country='in' key='entertainment' category='entertainment'/>} />
          <Route exact path="science"  element={<News pageSize={this.pageSize} country='in' key='science' category='science'/>} />
          <Route exact path="sports" element={<News pageSize={this.pageSize} country='in' key='sports' category='sports'/>} />
          <Route exact path="technology" element={<News pageSize={this.pageSize} country='in'  key='technology' category='technology'/>} />
        </Route>
      </Routes>
    </BrowserRouter>


        
        
        
        
        
        
        
        
      </div>
    )
  }
}


