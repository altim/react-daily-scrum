/**
* @jsx React.DOM
**/
    	
var React = require('react'),
	TaskItem = require('./taskItem');

var DoneTaskList = React.createClass({

	render: function() {
		var taskItems = this.props.items.map(function(item){
			return <TaskItem undoneItem={this.props.onUndoneItem} deleteItem={this.props.onDeleteItem} key={item.key} keyValue={item.key} desc={item.description} isDone={true}/>
		}.bind(this));

		return (
			<div className="col-md-12">
				<div className="panel panel-default">
  					<div className="panel-heading">Finished tasks</div>
  					<div className="panel-body">
						<ul className="list-of-done-tasks">
							{taskItems}
						</ul>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = DoneTaskList;