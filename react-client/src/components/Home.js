import React, { Component } from 'react'
import {validateEmail} from '../Validation'

import './Home.css'

export class Home extends Component {
  static displayName = Home.name

  constructor(props) {
    super(props)
    this.state = { members: [], loading: true, editMode: false, editId: null, editMember: null, newName: null, newEmail: null }

    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderEditInputs = this.renderEditInputs.bind(this);
  }

  componentDidMount() {
    this.populateMembers()
  }

  componentDidUpdate() {
    if (!this.state.editMode) {
      this.populateMembers()
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  renderEditInputs() {
    const member = this.state.editMember
    return (
      <div>
        <div id="editInputs">
          <span>Editing MemberID: {member.id}</span>
            <div>
              <span id="nameTxt">Name:</span>
              <input id="newName" onChange={this.handleChange} defaultValue={member.name}></input>
            </div>
            <div>
              <span id="emailTxt">Email:</span>
              <input id="newEmail" onChange={this.handleChange} defaultValue={member.email}></input>
            </div>
        </div>
        <button className="btn btn-primary" onClick={this.handleSave}>
        Save
        </button>
        <button className="btn btn-primary" onClick={this.handleCancel}>
        Cancel
        </button>
      </div>
    )
  }

  renderMembersTable(members) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td className="btn-group">
                <button
                  className="img-btn btn-link"
                  onClick={() => this.deleteMember(member.id)}
                >
                  <img src="/delete.svg" width="12px" height="12px" />
                </button>
                <button
                  className="img-btn btn-link"
                  onClick={() => this.editMember(member.id)}
                >
                  <img src="/edit.svg" width="12px" height="12px" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  async handleSave() {
    if (this.state.newName == null || this.state.newName.length == 0) {
      alert("Name cannot be empty.")
    } else if (this.state.newEmail == null || !validateEmail(this.state.newEmail)) {
      alert("Please enter a valid email address.")
    } else {
      const response = await fetch('http://localhost:5000/update/' + this.state.editId + '/' + this.state.newName + '/' + this.state.newEmail, {method: 'POST'});
      if (response.ok) {
        alert("Successfully edited " + this.state.editId + ".")
        this.setState({ editMode: false, editId: null, editMember: null, newName: null, newEmail: null})
      }
    }
  }

  handleCancel() {
    this.setState({editMode:false, editId: null, editMember: null, newName: null, newEmail: null})
  }

  render() {
    let contents = <p></p>
    if (this.state.loading) {
      contents = 
      <p>
        <em>Loading...</em>
      </p>
    } else {
      if (this.state.editMode) {
        contents = this.renderEditInputs()
      } else {
        contents = this.renderMembersTable(this.state.members)
      }
    }

    return (
      <div>
        <h1 id="tabelLabel">Ezra Members</h1>

        {contents}
      </div>
    )
  }

  async populateMembers() {
    const response = await fetch('http://localhost:5000/members')
    const data = await response.json()
    this.setState({ members: data, loading: false })
  }

  async deleteMember(memberId) {
    // TODO
    const response = await fetch('http://localhost:5000/delete/' + memberId, {method: 'POST'})
    if (response.ok) {
      alert("User: " + memberId + " successfully deleted.")
      this.populateMembers();
    }
  }

  async editMember(memberId) {
    // TODO
    const response = await fetch('http://localhost:5000/' + memberId, {method: 'GET'})
    const data = await response.json()
    this.setState({ editMode: true, editMember: data, loading: false, editId: memberId, newName: data.name, newEmail:data.email })
  }
}
