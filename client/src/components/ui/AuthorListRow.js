import {Component} from 'react'

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
                 </tr>    
            )    
       }     
    }