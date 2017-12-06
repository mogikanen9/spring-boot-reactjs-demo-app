import React from 'react'
import { Component } from 'react'
import { CustomPageHeader } from '../CustomPageHeader'

export class Whoops404 extends Component {

    render() {
        return (
            <div className="container">
                <CustomPageHeader headerTitle="Whoops, resource not found" />
                <div className="row">
                    <p>Could not find {this.props.location.pathname}</p>
                </div>
            </div>
        )
    }
}