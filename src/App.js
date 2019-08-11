import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import EditGenre from './EditGenre'

import Genres from './Genres'
import Header from './Header'
import Home from './Home'
import InfoSerie from './InfoSerie'
import NewGenre from './NewGenre'
import NewSerie from './NewSerie'
import Series from './Series'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/genres' exact component={Genres}/>
          <Route path='/genres/new' exact component={NewGenre}/>
          <Route path='/genres/:id' exact component={EditGenre}/>
          <Route path='/series' exact component={Series}/>
          <Route path='/series/new' exact component={NewSerie}/>
          <Route path='/series/:id' exact component={InfoSerie}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App
