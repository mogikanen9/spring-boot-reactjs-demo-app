import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { Home } from './components/ui/home/Home'
import  { Whoops404 } from './components/ui/err/Whoops404'
import { AuthorList } from './components/ui/author/AuthorList'
import { BookList } from './components/ui/book/BookList'
import { PublisherList } from './components/ui/publisher/PublisherList'

function authorList(){
   return (<AuthorList pageSize="6"/>)
}

const routes = (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route path="/authors" component={authorList} />
            <Route path="/books" component={BookList} />
            <Route path="/publishers" component={PublisherList} />
            <Route path="*" component={Whoops404} />
        </Switch>    
    </Router>
)

export default routes