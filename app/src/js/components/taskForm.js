/**
* @jsx React.DOM
**/
    	
var React = require('react'),
	ReactDom =require('react-dom'),
	CookieHelper = require('../helpers/CookieHelper');

var TaskForm = React.createClass({

	handleForm : function(e){
		e.preventDefault();

		var newItem = {
			'description' : ReactDom.findDOMNode(this.refs.desc).value,
			'status' : 'todo',
			'owner' : CookieHelper.get().username
		};

		ReactDom.findDOMNode(this.refs.taskForm).reset();

		this.props.onNewItem(newItem);
	},

	render: function() {
		return (
			<div className="col-md-12">
				<form ref="taskForm" id="taskForm" onSubmit={this.handleForm}>

					<div className="form-group">
						<label htmlFor="new-task">Enter new task</label>
						<input ref="desc" type="text" className="form-control" name="new-task" id="new-task" />
						<button type="submit" className="btn btn-primary btn-raised btn-add-new-task">Add task</button>
					</div>
				</form>
			</div>
		)
	}

});

module.exports = TaskForm;