import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { AuthorListRow } from './AuthorListRow'
import {CustomPageHeader} from '../CustomPageHeader'
import {Button, ButtonToolbar, FormControl, ControlLabel} from 'react-bootstrap'
import {AuthorForm} from './AuthorForm'

const API_URL_AUTHORS = "http://localhost:8080/api/v1/authors?size="

export class AuthorList extends Component {

    constructor(props){
        super(props)
        this.state = {
            authors: [],
            loading: false,
            action: "list",
            pageSize: this.props.pageSize,
            listRequestUrl: API_URL_AUTHORS + this.props.pageSize
        }

        this.handleShowAuthorForm = this.handleShowAuthorForm.bind(this)
        this.showAuthorForm = this.showAuthorForm.bind(this)
        this.showAuthorList = this.showAuthorList.bind(this)
        this.handleHideAuthorForm = this.handleHideAuthorForm.bind(this)
        this.executeOnSubmitAuthorForm = this.executeOnSubmitAuthorForm.bind(this)
        this.handleViewEdit = this.handleViewEdit.bind(this)
        this.showViewEditAuthor = this.showViewEditAuthor.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleControlLinksClick = this.handleControlLinksClick.bind(this)
        this.handlePageSizeCtrlChange = this.handlePageSizeCtrlChange.bind(this)
        this.handlePageSizeCtrlSet = this.handlePageSizeCtrlSet.bind(this)
    }

    getAuthorsFromApiAsync(){
    
        console.log(`fetching data from API url->${this.state.listRequestUrl}`)
        this.setState({loading: true})
         fetch(this.state.listRequestUrl,{
             method: 'GET',
             mode: 'cors',
             cache: 'default',
             credentials: 'same-origin'
         })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.ok){
            console.log("responseJson.authors->",responseJson._embedded.authors)
            this.setState({
                    loading: false,
                    authors: responseJson._embedded.authors,
                    controlLinks: responseJson._links
                })
            }else if(responseJson.status=="403"){
                alert("You are not authorized to view this page/data!")
            }else{
                alert("Smth went wrong->"+responseJson.statusText)
            }
          }).catch((error) => {
            console.error(error);
          })
    }

    handleControlLinksClick(newUrl){
        console.log(`new url->${newUrl}`)
        this.setState({
            listRequestUrl: newUrl
        },() => this.getAuthorsFromApiAsync())
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

    handleDelete(e,apiURI){
        console.log('author to be deleted->',apiURI)
        fetch(apiURI, {
            method: "DELETE",
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response)=>{
            if(response.ok){
                this.getAuthorsFromApiAsync() 
            }else if(response.status=="403"){
                alert("You are not authorized to perform this operation!")
            }else{
                alert(response.statusText)
            }
        })
        .catch((error) => {
            console.error(error);
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

    handlePageSizeCtrlChange(evt){

        let pageSizeValue = evt.target.value
                this.setState({
                    pageSize: pageSizeValue
                },()=>console.log("new page size->"+this.state.pageSize))
    }

    handlePageSizeCtrlSet(){
        var newPageSize = this.state.pageSize
        if(newPageSize){
            this.setState({
                listRequestUrl: API_URL_AUTHORS + newPageSize
            },() => this.getAuthorsFromApiAsync())
        }
    }

    showAuthorList(){

        //=========================== table rows ======================
        let authorsListRows = <tr><td colSpan="2">Currently 0 Authors</td></tr>
        
                if(this.state.authors.length>0){
                    authorsListRows = this.state.authors.map(function(author){
                        return <AuthorListRow 
                                    firstName={author.firstName} 
                                    lastName={author.lastName} 
                                    key={author._links.author.href}
                                    handleViewEdit={(evt) => this.handleViewEdit(evt,author._links.author.href)}
                                    handleDelete={(evt) => this.handleDelete(evt,author._links.author.href)}/>
                    },this)
                }
       
        //=========================== button controls ======================        
        let btnFirst = ''
        let btnNext = ''
        let btnLast = ''
        if(this.state.controlLinks){
            if(this.state.controlLinks.next){
                btnNext = <Button onClick={(evt) => this.handleControlLinksClick(this.state.controlLinks.next.href)}
                bsStyle="default"> Next</Button>
            }

            if(this.state.controlLinks.first){
                btnFirst = <Button onClick={(evt) => this.handleControlLinksClick(this.state.controlLinks.first.href)}
                bsStyle="default"> First </Button>
            }
          
            if(this.state.controlLinks.last){
                btnLast = <Button onClick={(evt) => this.handleControlLinksClick(this.state.controlLinks.last.href)}
                bsStyle="default"> Last </Button>
            }

        }
                
        //=========================== page size ======================

        const pageSizeCtrl = (
                            <div className="panel panel-default">
                                <div className="panel-body"> 
                                    <form className="form-inline">
                                        <div className="form-group">
                                            <label className="control-label" 
                                                    htmlFor="pageSizeCtrl">Page size:</label>
                                                    &nbsp;        
                                            <input type="text"
                                                    size="5"
                                                    className="form-control" 
                                                    id="pageSizeCtrl"
                                                    value={this.state.pageSize}
                                                    onChange={this.handlePageSizeCtrlChange}></input>
                                                    <Button onClick={(evt)=>this.handlePageSizeCtrlSet()}>Set</Button>        
                                                </div>
                                    </form>
                                </div>
                            </div>    
        )     
                           
        return (
            <div>
                {pageSizeCtrl}
                <table className="table">
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th colSpan="2"> Actions</th>
                    </tr>
                </thead>
                <tbody>    
                {authorsListRows}
                </tbody>   
            </table>
                <div>
                    <ButtonToolbar>
                        {btnFirst}{btnNext}{btnLast}
                    </ButtonToolbar>
                    <br/>
                </div>    
                <div>
                    <ButtonToolbar>
                        <Button onClick={this.handleShowAuthorForm}
                            bsStyle="primary"> Add Author </Button>
                    </ButtonToolbar>        
                </div> 
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
