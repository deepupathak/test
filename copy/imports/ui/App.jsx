import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

// import { Tasks } from '../api/Tasks.js';

// import Task from './Task.jsx';
// import AccountsUIWrapper from './AccountsUIWrapper.jsx';
 
// App component - represents the whole app
export default class App extends Component {
  copyText(event){
    event.preventDefault();

    var name = this.refs.name.value;
    var email = this.refs.email.value;
    var data={
      "name" : name,
      "email" : email
    }

    Meteor.call('copyToclipboard', (err, res)=>{
      if(err){
        alert( err, 'danger', 'growl-top-right');
      }else{
        if(res){
          $('#content').val(res);
          console.log("----", $('#content').val())
          if(res == ""){
            alert('Link not generated');
          }else{
            console.log(document.queryCommandSupported('copy')); // print true
            var field = document.getElementById('content');
            console.log("Invitation url >>>", field.value, "---- field.value.length ----", field.value.length)
            field.focus();
            field.setSelectionRange(0, field.value.length);
            var success = document.execCommand("copy");
            console.log("Copy success >>>>>>>", success)
          }
        }else if(res == false){
          alert('Email ID already exists');
        }
      }
    });
  }
  render() {
    return (
      <div>
        <form className="well">
          <div className="row">
            <div className="form-group col-sm-2">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" ref="name" placeholder="First Name" required />
            </div>
            <div className="form-group col-sm-2">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" ref="email"  placeholder="Email" required />
            </div>
            <div className="col-sm-2 submit-button">
              <div className="form-group">
                <button type="button" className="btn btn-default form-control" onClick={this.copyText.bind(this)}>Copy text</button>
              </div>
            </div>
            <input type="text" className="form-control CopyText" id="content" />
          </div>
        </form>
      </div>
    );
  }
}