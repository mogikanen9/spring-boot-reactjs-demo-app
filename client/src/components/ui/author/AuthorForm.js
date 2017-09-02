import {Component} from 'react'
import {FieldGroup} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import fetch from 'isomorphic-fetch'
import { PropTypes } from 'prop-types'

export class AuthorForm extends Component{
    constructor(props){
        super(props)
        this.state={
                firstName: "",
                lastName: "",
                entityLink: this.props.entityLink || ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }

    componentDidMount(){
        console.log('mounted, entityLink->',this.state.entityLink)
        if(this.state.entityLink && this.state.entityLink!==""){
            fetch(this.state.entityLink)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("responseJson",responseJson)
                this.setState({
                        firstName: responseJson.firstName,
                        lastName: responseJson.lastName
                    })
              }).catch((error) => {
                console.error(error);
              })
        }
    }

    handleFirstNameChange(e) {
        this.setState({firstName: e.target.value});
     }

     handleLastNameChange(e) {
        this.setState({lastName: e.target.value});
     }

    handleSubmit(e){
        e.preventDefault()
        let author = {
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }
        console.log("new author->",author)

        fetch('http://localhost:8080/api/v1/authors/', {
            method: 'POST', 
            body: JSON.stringify(author),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("responseJson->",responseJson)
            this.setState({
                firstName: "",
                lastName: ""
            })
            this.props.executeOnSubmit(e)
          }).catch((error) => {
            console.error(error);
          })
    }

    render(){
        return(
            <div className="container">
                 <div className="row">
                     <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">{this.props.title}</h3>
                            </div>
                            <div className="panel-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="firstName">First name:</label>
                                        <input type="text" 
                                                className="form-control" 
                                                id="firstName"
                                                value={this.state.firstName}
                                                onChange={this.handleFirstNameChange}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last name:</label>
                                        <input type="text" 
                                                className="form-control" 
                                                id="lastName"
                                                value={this.state.lastName}
                                                onChange={this.handleLastNameChange}></input>
                                    </div>
                                    <div className="form-group">
                                        <Button 
                                            bsStyle="default"
                                            onClick={this.props.handleCancel}>
                                            Cancel
                                            </Button>
                                        <Button 
                                            bsStyle="default"
                                            type="submit"
                                            onClick={this.handleSubmit}>
                                            Submit
                                            </Button>
                                    </div>     
                                </form>
                            </div>
                        </div>    
                      
                    </div> 
                </div>  
            </div>   
        )
    }
}

AuthorForm.contextTypes = {
    router: PropTypes.object.isRequired
    }