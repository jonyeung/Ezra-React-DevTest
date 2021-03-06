import React, { Component } from 'react'
import { Home } from './Home';
import {validateEmail} from '../Validation'

import "./AddMember.css"

export class AddMember extends Component {
  static displayName = AddMember.name

  constructor(props) {
    super(props)
    this.state = { name: null, email: null, success: false}

    this.handleChange = this.handleChange.bind(this)
    this.addMember = this.addMember.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  async addMember() {
    // TODO
    if (this.state.name == null || this.state.name.length == 0) {
      alert("Name cannot be empty.")
    } else if (this.state.email == null || !validateEmail(this.state.email)) {
      alert("Please enter a valid email address.")
    } else {
      const response = await fetch('http://localhost:5000/add/' + this.state.name + '/' + this.state.email, {method: 'POST'});
      if (response.ok) {
        alert("Successfully added new member.")
        this.setState({success:true})
      }
    }
    
  }

  render() {
    if (this.state.success) {
      return <Home />
    } else {
      return (
        <div>
          <h1>Add Member</h1>
  
          {/* TODO */}
          {/* Implement me */}
          <div id="addInputs">
            <div>
              <span id="nameTxt">Name:</span>
              <input id="name" onChange={this.handleChange}></input>
            </div>
            <div>
              <span id="emailTxt">Email:</span>
              <input id="email" onChange={this.handleChange}></input>
            </div>
          </div>
  
          <button className="btn btn-primary" onClick={this.addMember}>
            Add
          </button>
        </div>
      )
    }
    
  }
}
