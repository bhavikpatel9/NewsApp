import React, { Component } from 'react'
import logo from './1495.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={logo} alt="loading" />
      </div>
    )
  }
}
