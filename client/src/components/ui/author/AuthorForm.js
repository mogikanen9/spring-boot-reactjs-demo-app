import {Component} from 'react'
import {FieldGroup} from 'react-bootstrap'
import Button from 'react-bootstrap'

export class AuthorForm extends Component{
    constructor(props){
        super(props)
    }

    componentidiMount(){

    }

    render(){
        return(
            <div className="container">
                 <div className="row">
                     <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Add Author</h3>
                            </div>
                            <div className="panel-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="firstName">First name:</label>
                                        <input type="text" className="form-control" id="firstName"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last name:</label>
                                        <input type="text" className="form-control" id="lastName"></input>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-default">Submit</button>
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