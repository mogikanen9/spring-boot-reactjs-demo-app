import { Component } from 'react'

export class AuthorFormErrors extends Component {
    render() {
        return (
            <div>
                {Object.keys(this.props.formErrors).map((fieldName, i) => {
                    if (this.props.formErrors[fieldName].length > 0) {
                        return (
                            <p key={i}>{fieldName} {this.props.formErrors[fieldName]}</p>
                        )
                    } else {
                        return '';
                    }
                })}
            </div>
        )
    }
}
