import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import {CustomPageHeader} from '../CustomPageHeader'

export class PublisherList extends Component {

    constructor(props){
        super(props)
        this.state = {
            publishers: [],
            loading: false
        }
    }

    getPublishersFromApiAsync(){
    }

    componentDidMount(){
       this.getPublishersFromApiAsync()
    }

    render() {

        return (
            <div className="container">
                 <CustomPageHeader headerTitle="Publishers"/>
                 <div className="row">
                     <div className="col-md-12">
                           
                      </div>      
                </div>
             </div>    
        )    
   }     
}
