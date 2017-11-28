import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { Home } from './components/ui/home/Home'
import { Whoops404 } from './components/ui/err/Whoops404'
import { AuthorList } from './components/ui/author/AuthorList'
import VisibleBookList from './components/ui/book/containers/VisibleBookList'
import { PublisherList } from './components/ui/publisher/PublisherList'

import { createStore } from 'redux'
import rootReducer from './components/reducers/index'
import { Provider } from 'react-redux'

const store = createStore(rootReducer)

function authorList() {
    return (<AuthorList pageSize="6" />)
}

function bookList() {
    return (<VisibleBookList/>)
}

const routes = (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route path="/authors" component={authorList} />
                <Route path="/books" component={bookList} />
                <Route path="/publishers" component={PublisherList} />
                <Route path="*" component={Whoops404} />
            </Switch>
        </Router>
    </Provider>
)

export default routes