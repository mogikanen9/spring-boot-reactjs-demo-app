import { Component } from 'react'

export class AuthorFormErrors extends Component {
    render() {

        let formErrors = this.props.formErrors
        console.log("formErrors.length->", formErrors.length)

        let displayErrors = ""
        let divClassName = ""
        if(formErrors.length>0){

            divClassName = "alert alert-danger"
            displayErrors = formErrors.map(function(error){
                return <p key={error.fieldName}>{error.msg}</p>
            })
        }

        return (
            <div className={divClassName}>
                {displayErrors}
            </div>    
        )
    }
}
