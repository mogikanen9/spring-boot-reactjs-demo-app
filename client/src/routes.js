import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './components/ui/Home'
import  { Whoops404 } from './components'
import { AuthorList } from './components/ui/AuthorList'

const routes = (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/authors" component={AuthorList} />
            <Route path="*" component={Whoops404} />
        </Switch>    
    </Router>
)

export default routes