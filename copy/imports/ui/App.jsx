import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
// App component - represents the whole app
export default class App extends Component {
	componentDidUpdate(){
		$('[data-toggle="tooltip"]').tooltip();
	}
	copyTextModal(event){
		event.preventDefault();

		Meteor.call('copyToclipboard', (err, res)=>{
			if(err){
				alert( err, 'danger', 'growl-top-right');
			}else{
				if(res){
					$('#link').val(res);
					$('#copyModal').modal('show');
					// console.log("----", $('#link').val())
					if(res == ""){
						alert('Link not generated');
					}else{
						/*console.log("Copy supported >>>>", document.queryCommandSupported('copy')); // print true
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
						}*/
					}
				}
			}
		});
	}
	CopyLink(event){
		event.preventDefault();
		if(!$('#link').val()){
			Bert.alert('Can not copy link', 'danger', 'growl-top-right');
		}else{
			// console.log(true)
			// console.log("Copy supported >>>>", document.queryCommandSupported('copy'));
			var field = document.getElementById('link');
			// console.log(field.value)
			field.focus();
			field.setSelectionRange(0, field.value.length);
			var success = document.execCommand("copy");
			// console.log("Copy success >>>>>>>", success)
			if(success){
				$('#log').css('color', 'green');
				$('#log').text('Copied to clipboard successfully');
				// document.getElementById('copyToClipboard').setAttribute('data-original-title', 'new tooltip');
				// alert('Invitation link copied to clipboard', 'info', 'growl-top-right');
			}else{
				$('#log').css('color', 'red');
				$('#log').text('Copy failed !');
				// alert('Copy not supported or blocked', 'danger', 'growl-top-right');
			}
		}
	}
	render() {
		return (
			<div>
				<form className="well">
					<h3>Copy To Clipboard</h3>
					<div className="form-group">
						<button type="button" className="btn btn-default form-control" onClick={this.copyTextModal.bind(this)}>Copy text</button><br />
					</div>
				</form>
				<div>
					<div id="copyModal" className="modal fade" role="dialog">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal">&times;</button>
									<h4 className="modal-title">Copy Invitation Link</h4>
								</div>
								<div className="modal-body">
									<form>
										<div className="input-group">
											<input type="text" className="form-control" id="link" />
											<div className="input-group-btn">
												<button className="btn btn-default" type="button" id="copyToClipboard" onClick={this.CopyLink.bind(this)} data-toggle="tooltip" title="Copy to clipboard">
													Copy
												</button>
											</div>
										</div>
										<p id="log"><br /></p>
									</form>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}