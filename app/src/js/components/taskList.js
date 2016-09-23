/**
* @jsx React.DOM
**/
    	
var React = require('react'),
	TaskItem = require('./taskItem');

var TaskList = React.createClass({

	render: function() {
		var taskItems = this.props.items.map(function(item){
			return <TaskItem doneItem={this.props.onDoneItem} deleteItem={this.props.onDeleteItem} key={item.key} keyValue={item.key} desc={item.description} isDone={false} />
		}.bind(this));

		return (
		<div className="col-md-12">
		<div className="panel panel-primary">
  			<div className="panel-heading">Planned tasks</div>
  			<div className="panel-body">
				<ul className="list-of-tasks">
					{taskItems}
				</ul>
			</div>
		</div>
		</div>
		);
	}

});

module.exports = TaskList;