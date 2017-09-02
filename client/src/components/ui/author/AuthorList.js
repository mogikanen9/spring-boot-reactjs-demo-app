import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { AuthorListRow } from './AuthorListRow'
import {CustomPageHeader} from '../CustomPageHeader'
import {Button} from 'react-bootstrap'
import {AuthorForm} from './AuthorForm'

export class AuthorList extends Component {


    constructor(props){
        super(props)
        this.state = {
            authors: [],
            loading: false,
            action: "list"
        }

        this.handleShowAuthorForm = this.handleShowAuthorForm.bind(this)
        this.showAuthorForm = this.showAuthorForm.bind(this)
        this.showAuthorList = this.showAuthorList.bind(this)
        this.handleHideAuthorForm = this.handleHideAuthorForm.bind(this)
        this.executeOnSubmitAuthorForm = this.executeOnSubmitAuthorForm.bind(this)
        this.handleViewEdit = this.handleViewEdit.bind(this)
        this.showViewEditAuthor = this.showViewEditAuthor.bind(this)
    }

    getAuthorsFromApiAsync(){
        this.setState({loading: true})
         fetch('http://localhost:8080/api/v1/authors')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("responseJson.authors->",responseJson._embedded.authors)
            this.setState({
                    loading: false,
                    authors: responseJson._embedded.authors
                })
          }).catch((error) => {
            console.error(error);
          })
    }

    componentDidMount(){
       this.getAuthorsFromApiAsync()
    }

    handleShowAuthorForm(e){
        this.setState({
            action: "create"
        })
    }

    handleHideAuthorForm(e){
        this.setState({
            action: "list"
        })
    }

    handleViewEdit(e,key){
        console.log('key->',key)
        this.setState({
            action: "view-edit",
            entityLink: key
        })
    }

    executeOnSubmitAuthorForm(e){
        this.handleHideAuthorForm(e)
        this.getAuthorsFromApiAsync()
    }

    showAuthorForm(){
        return <AuthorForm 
                        handleCancel={this.handleHideAuthorForm} 
                        executeOnSubmit={this.executeOnSubmitAuthorForm}
                        title="Add Author"/> 
    }

    showViewEditAuthor(){
        return <AuthorForm 
                        handleCancel={this.handleHideAuthorForm} 
                        executeOnSubmit={this.executeOnSubmitAuthorForm}
                        title="Modify Author"
                        entityLink={this.state.entityLink}/> 
    }


    showAuthorList(){

        let authorsListRows = <tr><td colSpan="2">Currently 0 Authors</td></tr>
        
                if(this.state.authors.length>0){
                    authorsListRows = this.state.authors.map(function(author){
                        return <AuthorListRow 
                                    firstName={author.firstName} 
                                    lastName={author.lastName} 
                                    key={author._links.author.href}
                                    handleViewEdit={(evt) => this.handleViewEdit(evt,author._links.author.href)}/>
                    },this)
                }

        return (
            <div>
                <table className="table">
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>    
                {authorsListRows}
                </tbody>   
            </table>
                <p>
                    <Button onClick={this.handleShowAuthorForm}
                            bsStyle="default"> Add Author </Button>
            </p> 
         </div>   
        )
    }

    render() {

        let displayElement = null

        if(this.state.action==="create"){
            displayElement = this.showAuthorForm()
        }else if(this.state.action==="view-edit"){
            displayElement = this.showViewEditAuthor()
        }else{
            displayElement = this.showAuthorList()
        }

        return (
            <div className="container">
                 <CustomPageHeader headerTitle="Manage Authors"/>
                 <div className="row">
                     <div className="col-md-12">
                           {displayElement}
                      </div>  
                </div>
             </div>    
        )    
   }     
}
