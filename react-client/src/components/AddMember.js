import React, { Component } from 'react'
import { Home } from './Home';

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

  // regex taken from https://www.w3resource.com/javascript/form/email-validation.php
  validateEmail(mail) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      return (true)
    } else {
      return (false)
    }
  }

  async addMember() {
    // TODO
    if (this.state.name == null) {
      alert("Name cannot be empty.")
    } else if (this.state.email == null || !this.validateEmail(this.state.email)) {
      alert("Please enter a valid email address.")
    } else {
      const response = await fetch('http://localhost:5000/add/' + this.state.name + '/' + this.state.email, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email
        })
      });
      console.log(response.text());
      if (response.ok) {
        console.log("Response was ok")
        this.setState({success:true})
      }
    }
    
  }

  render() {
    if (this.state.success) {
      return <Home />
    }
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
