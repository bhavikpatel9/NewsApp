import './App.css';
import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

 const App = ()=>{
  
  const pageSize = 9;
  const apiKey = process.env.REACT_APP_API_KEY;
  const [progress, setProgress] = useState(0);

    return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={  <div>
                                                        <NavBar/>
                                                        <LoadingBar
                                                          color='#f11946'
                                                          progress={progress}
                                                          shadow={false}
                                                          height={1.6}
                                                        />
                                                    </div> 
                  }>
                  
                    <Route index element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='general' country='in' category='general'/>} />
                    <Route exact path="business"  element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='in' key='business' category='business'/>} />
                    <Route exact path="entertainment"  element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='in' key='entertainment' category='entertainment'/>} />
                    <Route exact path="science"  element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='in' key='science' category='science'/>} />
                    <Route exact path="sports" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='in' key='sports' category='sports'/>} />
                    <Route exact path="technology" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='in'  key='technology' category='technology'/>} />
                  </Route>
              </Routes>
         </BrowserRouter>
   
      </div>
    )
  }

export default App


