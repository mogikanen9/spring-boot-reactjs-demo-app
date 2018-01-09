import React from 'react'
import { Component } from 'react'

export default class BookFormErrors extends Component {
    render() {

        let displayErrors = ""
        let divClassName = ""

        let formErrors = this.props.formErrors
        if(formErrors){
                console.log("formErrors.length->", formErrors.length)                
                        
                        if(formErrors.length>0){
                
                            divClassName = "alert alert-danger"
                            displayErrors = formErrors.map(function(error){
                                return <p key={error.fieldName}>{error.msg}</p>
                            })
            }
        }

        return (
            <div className={divClassName}>
                {displayErrors}
            </div>    
        )
    }
}
