import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
// App component - represents the whole app
export default class App extends Component {
	componentDidMount(){
		/*var Clipboard = require('clipboard');
		var clipboard = new Clipboard('.copyButton');

		clipboard.on('success', function(e) {
			alert("Text copied successfully");
			e.clearSelection();
		});

		clipboard.on('error', function(e) {
			console.error("Error -->", e);
		});*/
	}
  copyText(event){
    event.preventDefault();

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
            console.log("Copy supported >>>>", document.queryCommandSupported('copy')); // print true
            var field = document.getElementById('content');
            console.log("Invitation url >>>", field.value, "---- field.value.length ----", field.value.length)
            field.focus();
            field.setSelectionRange(0, field.value.length);
            var success = document.execCommand("copy");
            console.log("Copy success >>>>>>>", success)
            if(success){
            	$('#log').text('Copy success');
            }else{
            	$('#log').text('Copy failed !');
            }
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
        	<h3>Copy To Clipboard</h3>
          <div className="submit-button">
          	<div className="form-group">
          		<button type="button" className="btn btn-default form-control copyButton" onClick={this.copyText.bind(this)}>Copy text</button><br />
          		<p id="log" style={{"color":"red"}}></p>
          	</div>
          </div>
          <input type="text" className="form-control CopyText" id="content" />
        </form>
      </div>
    );
  }
}