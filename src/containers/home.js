import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./home.css";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

import ReactTable from "react-table";
import "react-table/react-table.css";

import Moment from "moment";

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			email: false,
			firstname: "",
			lastname: "",
			notes: []
		};
	}

	async componentDidMount() {
		if (!this.props.isAuthenticated) {
			return;
		}
		try {
			const notes = await this.notes();
			this.setState({ notes });
		} catch (e) {
			alert(e);
		}
				
		const info = await Auth.currentUserInfo();

		if(!this.props.isFedAuth)
		{
			console.log("Dipti1: ");
			console.log(info);

			var strEmail = info.attributes['email'];
			if(strEmail.trim() === "admin@example.com")
			this.setState({email : true});

			console.log(strEmail + this.state.email);

	    	var strFirstName = info.attributes['given_name'];
	    	this.setState({firstname : strFirstName });

	    	var strLastName = info.attributes['family_name'];
	    	this.setState({lastname : strLastName });
	    }
		this.setState({ isLoading: false });
	}

	notes() {
		return API.get("notes", "/notes");
	}

	renderNotesList(notes) {
		return [{}].concat(notes).map(
			(note, i) =>
				i !== 0
					? <LinkContainer
							key={note.noteId}
							to={`/notes/${note.noteId}`}
						>
							<ListGroupItem header={note.description.trim().split("\n")[0]}>
								{"Created: " + new
								Date(note.createdAt).toLocaleString()}
								{"\t"}
								{"Updated: " + new
								Date(note.updatedAt).toLocaleString()}

							</ListGroupItem>
						</LinkContainer>
					: <LinkContainer
						key="new"
						to="/notes/new"
					>
						<ListGroupItem>
							<h4>
							<b>{"\uFF0B"}</b> Create a new note
							</h4>
						</ListGroupItem>
					</LinkContainer>
			);
	}
	
	handleNoteClick = event => {
		event.preventDefault();
		this.props.history.push(event.currentTarget.getAttribute("href"));
	}

	renderLander() {
		return (
			<div className="lander">
				<img src={process.env.PUBLIC_URL + '/travel_logo.png'} alt="logo" />
				<div>
				<br />
				<br />
					<Link to="/login" className="btn btn-primary btn-lg">
						Login
					</Link>

					<Link to="/signup" className="btn btn-info btn-lg ">
						Signup
					</Link>
				</div>
			</div>
		);
	}

	renderAdminPage(){

		return (
			
				<div>
					<LinkContainer
						key="admin"
						to="/admin"
					>
						<ListGroupItem>
							<h4>
							<b>{"\uFF0B"}</b> Go to admin display
							</h4>
						</ListGroupItem>
					</LinkContainer>
				</div>
			)
	}


	renderNotesTable(){
		const convertedObject = Object.values(this.state.notes);
		console.log(convertedObject);
		return (
			
				<div>
					<LinkContainer
						key="new"
						to="/notes/new"
					>
						<ListGroupItem>
							<h4>
							<b>{"\uFF0B"}</b> Create a new note
							</h4>
						</ListGroupItem>
					</LinkContainer>
					        <ReactTable

					        getTdProps={(state, rowInfo, column, instance) => {
							    return {
							      onClick: (e, handleOriginal) => {
							        var href= "/notes/" + rowInfo.row.noteId;

							        this.props.history.push(href);
							      }
							    };
							}}

					          data={convertedObject}
					          columns={[
					            {
					              Header: "Your Travel Notes",
					              columns: [
					                {
					                  Header: "Description",
					                  accessor: "description"
					                },
					                {
					                  id: "createdAt",
					                  Header: "Created on",
					                  accessor: d => {
          								return Moment(d.createdAt).local().format("DD-MM-YYYY hh:mm:ss a")
          								}
					                  
					                },
					                {
					                  id: "updatedAt",
					                  Header: "Updated on",
					                  accessor: d => {
          								return Moment(d.updatedAt).local().format("DD-MM-YYYY hh:mm:ss a")
          								}
					                  
					                },
					                {
					                	Header: "Note ID",
					                	id: "noteId",
					                	accessor: d => d.noteId,
					                	show: false
					                }
					              ]
					            }
					          ]}
					          defaultPageSize={10}
					          className="-striped -highlight"
					        />
					        <br />
				</div>
        );   
	}

	

	renderNotes() {
		return (
			<div className="notes">
				<PageHeader>Hey, Welcome {this.state.firstname} {this.state.lastname} </PageHeader>


				<table>
					<tr>
						{this.state.email ? this.renderAdminPage() : ""}
					</tr>
					<tr>
						<ListGroup>
							{!this.state.isLoading &&   this.renderNotesTable(this.state.notes)}
						</ListGroup>
					</tr>
				</table>
			</div>

		);
	}

	render() {
		return (
			<div className="Home">
				{this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
			</div>
		);
	}
}