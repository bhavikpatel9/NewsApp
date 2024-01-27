import React from 'react'
import logo from './loading.gif'

const Spinner = ()=> {   
    return (
      <div className='text-center my-2'>
        <img src={logo} alt="loading" />
      </div>
    )
}

export default Spinner
