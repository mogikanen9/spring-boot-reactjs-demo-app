import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { AuthorListRow } from './AuthorListRow'
import {CustomPageHeader} from '../CustomPageHeader'
import Jumbotron from 'react-bootstrap/lib/PageHeader'

export class AuthorList extends Component {

    constructor(props){
        super(props)
        this.state = {
            authors: [],
            loading: false
        }
    }

    getAuthorsFromApiAsync(){
        this.setState({loading: true})
         fetch('http://localhost:8080/api/author/all')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("responseJson.authors->",responseJson)
            this.setState({
                    loading: false,
                    authors: responseJson
                })
          }).catch((error) => {
            console.error(error);
          })
    }

    componentDidMount(){
       this.getAuthorsFromApiAsync()
    }

    render() {

        {(this.state.loading) ?
            <span>loading...</span> :
            <span>{this.state.authors.length} authors</span>
        }

        let authorsListRows = <tr><td colSpan="2">Currently 0 Authors</td></tr>

        if(this.state.authors.length>0){
            authorsListRows = this.state.authors.map(function(author){
                return <AuthorListRow 
                            firstName={author.firstName} 
                            lastName={author.lastName} 
                            key={author.id}/>
            })
        }

        return (
            <div className="container">
                 <CustomPageHeader headerTitle="Authors"/>
                 <div className="row">
                     <div className="col-md-12">
                            <table className=".table">
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
