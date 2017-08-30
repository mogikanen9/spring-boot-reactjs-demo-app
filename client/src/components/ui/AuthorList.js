import { Component } from 'react'
import fetch from 'isomorphic-fetch'


export class AuthorList extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
    }

    render() {

        return (
            <div className="page">
                <div className="member-list">
                    <h1>Book AuthorList</h1>
                   <div>
                       ...
                   </div>    
                </div>
             </div>    
        )    
   }     
}
