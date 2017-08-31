import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './components/ui/home/Home'
import  { Whoops404 } from './components/ui/err/Whoops404'
import { AuthorList } from './components/ui/author/AuthorList'

const routes = (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route path="/authors" component={AuthorList} />
            <Route path="*" component={Whoops404} />
        </Switch>    
    </Router>
)

export default routes