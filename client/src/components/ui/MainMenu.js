import React, {Component} from 'react'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

export class MainMenu extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
                <Navbar>
                    <Nav>
                        <NavItem eventKey={1} href="#/home">Home</NavItem>
                        <NavItem eventKey={2} href="#/books">Books</NavItem>
                        <NavItem eventKey={2} href="#/authors">Authors</NavItem>
                        <NavItem eventKey={2} href="#/publishers">Publishers</NavItem>
                    </Nav>
                </Navbar>
        )
    }
}