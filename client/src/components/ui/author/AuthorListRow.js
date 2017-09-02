import {Component} from 'react'
import {Button} from 'react-bootstrap'

export class AuthorListRow extends Component {
    
        constructor(props){
            super(props)
        }
    
        componentDidMount(){
        }
    
        render() {
    
            return (
                <tr>
                    <td>
                        {this.props.firstName}
                    </td>
                    <td>
                        {this.props.lastName}  
                    </td>
                    <td>
                        <Button bsStyle="info" onClick={this.props.handleViewEdit} >View/Edit</Button> 
                    </td>
                    <td>
                        <Button bsStyle="danger" onClick={this.props.handleDelete} >Delete</Button> 
                    </td>    
                 </tr>    
            )    
       }     
    }