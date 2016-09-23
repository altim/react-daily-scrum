/**
* @jsx React.DOM
**/
    	
var React = require('react');

var TaskItem = React.createClass({

	handleDelete : function(e){
		e.preventDefault();

		this.props.deleteItem(this.props.keyValue);
	},

	handleDone : function(e){
		e.preventDefault();
		this.props.doneItem(this.props.keyValue);
	},

	handleUndone : function(e){
		e.preventDefault();
		this.props.undoneItem(this.props.keyValue);
	},

	render: function() {
		if(this.props.isDone){
			var itemStyle = { 'display' : 'none'};
			var itemStyle2 = { 'display' : 'block'};
		}
		else {
			var itemStyle2 = { 'display' : 'none'};
		}

		return (
			<li>
				<div className="col-md-9">
					<p>{this.props.desc}</p>
				</div>
				<div className="col-md-3 controls"> 
					<div className="pull-right" role="group" aria-label="">
						<button className="btn btn-primary btn-raised btn-sm" onClick={this.handleDone} style={itemStyle}>Done</button>
						<button className="btn btn-default btn-raised btn-sm" onClick={this.handleUndone} style={itemStyle2}>Undone</button>
						<button className="btn btn-danger btn-raised btn-sm" onClick={this.handleDelete} style={itemStyle}>Delete</button>
					</div>
				</div>
					
			</li>
		)
	}

});

module.exports = TaskItem;