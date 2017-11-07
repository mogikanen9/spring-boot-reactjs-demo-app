import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import {CustomPageHeader} from '../CustomPageHeader'

export class BookList extends Component {

    constructor(props){
        super(props)
        this.state = {
            books: [],
            loading: false
        }
    }

    getBooksFromApiAsync(){
    }

    componentDidMount(){
       this.getBooksFromApiAsync()
    }

    render() {

        return (
            <div className="container">
                 <CustomPageHeader headerTitle="Books"/>
                 <div className="row">
                     <div className="col-md-12">
                           
                      </div>      
                </div>
             </div>    
        )    
   }     
}
