import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { AuthorListRow } from './AuthorListRow'

export class AuthorList extends Component {

    constructor(props){
        super(props)
        this.state = {
            authors: [],
            loading: false
        }
    }

    getAuthorsFromApiAsync(){
        return fetch('http://localhost:8080/api/author/all')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.authors;
          }).catch((error) => {
            console.error(error);
          })
    }

    componentDidMount(){
        let authors =  this.getAuthorsFromApiAsync()
        console.log("authors->",authors)
    }

    render() {

        {(this.state.loading) ?
            <span>loading...</span> :
            <span>{this.state.authors.length} authors</span>
        }

        let authorsListRows = <tr><td colSpan="2">Currently 0 Authors</td></tr>

        if(this.state.authors.length>0){
            authorsListRows = <AuthorListRow firstName="Vasia" lastName="Pupkin" />
        }

        return (
            <div className="page">
                <div className="member-list">
                    <h1>Book AuthorList</h1>
                   <div>
                      <table>
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                            </tr>
                        </thead>
                        <tbody>    
                           {authorsListRows}
                        </tbody>   
                      </table>
                   </div>    
                </div>
             </div>    
        )    
   }     
}
