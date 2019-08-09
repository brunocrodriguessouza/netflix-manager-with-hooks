import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import EditGenre from './EditGenre'
import Genres from './Genres'
import Header from './Header'
import Home from './Home'
import NewGenre from './NewGenre'

function App() {
  const [data, setData] = useState({})
  useEffect(()=> {
    axios.get('/api').then(res => {
      setData(res.data)
    })
  }, [])
  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home}/>
        <Route path='/genres/:id' exact component={EditGenre}/>
        <Route path='/genres/new' exact component={NewGenre}/>
        <Route path='/genres' exact component={Genres}/>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  )
}

export default App;
