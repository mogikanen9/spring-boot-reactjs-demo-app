import React from 'react'
import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { AuthorListRow } from './AuthorListRow'
import { CustomPageHeader } from '../CustomPageHeader'
import { Button, ButtonToolbar, Modal } from 'react-bootstrap'
import { AuthorForm } from './AuthorForm'

const API_URL_AUTHORS = "http://localhost:8080/api/v1/authors?size="

export class AuthorList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            authors: [],
            loading: false,
            action: "list",
            pageSize: this.props.pageSize,
            listRequestUrl: API_URL_AUTHORS + this.props.pageSize,
            errorDialog: {
                show: false,
                title: "",
                displayMessage: ""
            }
        }

        this.handleShowAuthorForm = this.handleShowAuthorForm.bind(this)
        this.showAuthorForm = this.showAuthorForm.bind(this)
        this.showAuthorList = this.showAuthorList.bind(this)
        this.handleHideAuthorForm = this.handleHideAuthorForm.bind(this)
        this.executeOnSubmitAuthorForm = this.executeOnSubmitAuthorForm.bind(this)
        this.handleViewEdit = this.handleViewEdit.bind(this)
        this.showViewEditAuthor = this.showViewEditAuthor.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleControlLinksClick = this.handleControlLinksClick.bind(this)
        this.handlePageSizeCtrlChange = this.handlePageSizeCtrlChange.bind(this)
        this.handlePageSizeCtrlSet = this.handlePageSizeCtrlSet.bind(this)
        this.showErrorModal = this.showErrorModal.bind(this)
        this.closeErrorModal = this.closeErrorModal.bind(this)
    }

    showErrorModal(errorMsg, errorTitle) {
        this.setState(
            {
                errorDialog: {
                    show: true,
                    title: errorTitle,
                    displayMessage: errorMsg
                }
            })
    }

    closeErrorModal() {
        this.setState({
            errorDialog: {
                show: false,
                title: "",
                displayMessage: ""
            }
        })
    }

    getAuthorsFromApiAsync() {

        console.log(`fetching data from API url->${this.state.listRequestUrl}`)
        this.setState({ loading: true })
        fetch(this.state.listRequestUrl, {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("responseJson.status->", responseJson.status)
                if (responseJson.status === 403) {
                    this.showErrorModal('You are not authorized to perform this operation!','Authorization Error')
                } else {
                    console.log("responseJson.authors->", responseJson._embedded.authors)
                    this.setState({
                        loading: false,
                        authors: responseJson._embedded.authors,
                        controlLinks: responseJson._links
                    })
                }
            }).catch((error) => {
                console.error(error);
            })
    }

    handleControlLinksClick(newUrl) {
        console.log(`new url->${newUrl}`)
        this.setState({
            listRequestUrl: newUrl
        }, () => this.getAuthorsFromApiAsync())
    }

    componentDidMount() {
        this.getAuthorsFromApiAsync()
    }

    handleShowAuthorForm(e) {
        this.setState({
            action: "create"
        })
    }

    handleHideAuthorForm(e) {
        this.setState({
            action: "list"
        })
    }

    handleViewEdit(e, key) {
        console.log('key->', key)
        this.setState({
            action: "view-edit",
            entityLink: key
        })
    }

    handleDelete(e, apiURI) {
        console.log('author to be deleted->', apiURI)
        fetch(apiURI, {
            method: "DELETE",
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            console.log("handleDelete: response.status->", response.status)
            if (response.ok) {
                this.getAuthorsFromApiAsync()
            } else {
                if (response.status === 403) {
                    this.showErrorModal('You are not authorized to perform this operation!','Authorization Error')
                } else if (response.status === 409) {
                    this.showErrorModal("This author cannot be deleted since it's already refenrenced in books!",'Operation Error')
                } else {
                    throw Error(response.statusText)
                }
            }
        })
            .catch((error) => {
                console.error(error);
            })

    }

    executeOnSubmitAuthorForm(e) {
        this.handleHideAuthorForm(e)
        this.getAuthorsFromApiAsync()
    }

    showAuthorForm() {
        return <AuthorForm
            handleCancel={this.handleHideAuthorForm}
            executeOnSubmit={this.executeOnSubmitAuthorForm}
            title="Add Author" />
    }

    showViewEditAuthor() {
        return <AuthorForm
            handleCancel={this.handleHideAuthorForm}
            executeOnSubmit={this.executeOnSubmitAuthorForm}
            title="Modify Author"
            entityLink={this.state.entityLink} />
    }

    handlePageSizeCtrlChange(evt) {

        let pageSizeValue = evt.target.value
        this.setState({
            pageSize: pageSizeValue
        }, () => console.log("new page size->" + this.state.pageSize))
    }

    handlePageSizeCtrlSet() {
        var newPageSize = this.state.pageSize
        if (newPageSize) {
            this.setState({
                listRequestUrl: API_URL_AUTHORS + newPageSize
            }, () => this.getAuthorsFromApiAsync())
        }
    }

    showAuthorList() {

        //=========================== table rows ======================
        let authorsListRows = <tr><td colSpan="2">Currently 0 Authors</td></tr>

        if (this.state.authors.length > 0) {
            authorsListRows = this.state.authors.map(function (author) {
                return <AuthorListRow
                    firstName={author.firstName}
                    lastName={author.lastName}
                    key={author._links.author.href}
                    handleViewEdit={(evt) => this.handleViewEdit(evt, author._links.self.href)}
                    handleDelete={(evt) => this.handleDelete(evt, author._links.self.href)} />
            }, this)
        }

        //=========================== button controls ======================        
        let btnFirst = ''
        let btnNext = ''
        let btnLast = ''
        if (this.state.controlLinks) {
            if (this.state.controlLinks.next) {
                btnNext = <Button onClick={(evt) => this.handleControlLinksClick(this.state.controlLinks.next.href)}
                    bsStyle="default"> Next</Button>
            }

            if (this.state.controlLinks.first) {
                btnFirst = <Button onClick={(evt) => this.handleControlLinksClick(this.state.controlLinks.first.href)}
                    bsStyle="default"> First </Button>
            }

            if (this.state.controlLinks.last) {
                btnLast = <Button onClick={(evt) => this.handleControlLinksClick(this.state.controlLinks.last.href)}
                    bsStyle="default"> Last </Button>
            }

        }

        //=========================== page size ======================

        const pageSizeCtrl = (
            <div className="panel panel-default">
                <div className="panel-body">
                    <form className="form-inline">
                        <div className="form-group">
                            <label className="control-label"
                                htmlFor="pageSizeCtrl">Page size:</label>
                            &nbsp;
                                            <input type="text"
                                size="5"
                                className="form-control"
                                id="pageSizeCtrl"
                                value={this.state.pageSize}
                                onChange={this.handlePageSizeCtrlChange}></input>
                            <Button onClick={(evt) => this.handlePageSizeCtrlSet()}>Set</Button>
                        </div>
                    </form>
                </div>
            </div>
        )

        return (
            <div>
                {pageSizeCtrl}
                <table className="table">
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th colSpan="2"> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authorsListRows}
                    </tbody>
                </table>
                <div>
                    <ButtonToolbar>
                        {btnFirst}{btnNext}{btnLast}
                    </ButtonToolbar>
                    <br />
                </div>
                <div>
                    <ButtonToolbar>
                        <Button onClick={this.handleShowAuthorForm}
                            bsStyle="primary"> Add Author </Button>
                    </ButtonToolbar>
                </div>
            </div>
        )
    }

    render() {

        let displayElement = null

        if (this.state.action === "create") {
            displayElement = this.showAuthorForm()
        } else if (this.state.action === "view-edit") {
            displayElement = this.showViewEditAuthor()
        } else {
            displayElement = this.showAuthorList()
        }

        return (
            <div className="container">
                <CustomPageHeader headerTitle="Manage Authors" />
                <div>
                    <Modal show={this.state.errorDialog.show} onHide={this.closeErrorModal}>
                        <Modal.Header closeButton>
                            <Modal.Title><strong>{this.state.errorDialog.title}</strong></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                {this.state.errorDialog.displayMessage}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeErrorModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {displayElement}
                    </div>
                </div>
            </div>
        )
    }
}
