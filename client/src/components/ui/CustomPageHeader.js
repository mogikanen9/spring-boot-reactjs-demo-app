import React, {Component} from 'react'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import {MainMenu} from './MainMenu'

export class CustomPageHeader extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <MainMenu />
                    <PageHeader>{this.props.headerTitle}</PageHeader>
                 </div>   
            </div>    
        )
    }
}