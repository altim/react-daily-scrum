/**  @jsx React.DOM **/

var React = require('react'),
	TaskForm = require('./taskForm'),
	TaskList = require('./taskList'),
	DoneTaskList = require('./doneTaskList'),
	firebase = require('firebase');

var config = {
	    apiKey: "AIzaSyDGT07zHFpV1N9bCwuY75yGQRT77L7VDLA",
	    authDomain: "sprint-8b2da.firebaseapp.com",
	    databaseURL: "https://sprint-8b2da.firebaseio.com",
	    storageBucket: "sprint-8b2da.appspot.com",
	    messagingSenderId: "477230113757"
	  };

var app = firebase.initializeApp(config);

var Tasks = React.createClass({

	loadData : function(){
		app.database().ref('/tasks').on('value',function(snap){
			var items = [],
			doneItems = [];

			snap.forEach(function(itemSnap){

				var item = itemSnap.val();
				item.key = itemSnap.getKey();

				if(item.status === 'todo'){
					items.push(item);
				}
				else {
					doneItems.push(item);
				}
			});

			this.setState({
				items : items,
				doneItems : doneItems
			});

		}.bind(this));

	},

	componentDidMount : function(){
		this.loadData();	
	},	

	getInitialState : function(){
		return {
			items : [],
			doneItems : []
		}

	},

	onNewItem: function(newItem){
		app.database().ref('/tasks').push(newItem);
	},

	deleteItem : function(key){
		app.database().ref('/tasks').child(key).remove();
	},

	doneItem: function(key){
		var doneItems = this.state.items.filter(function( obj ) {
		    return obj.key === key;
		});

		var doneItem = doneItems[0],
			newDoneItem = {};
		newDoneItem.description = doneItem.description;
		newDoneItem.status = 'done';

		app.database().ref('/tasks').child(key).update(newDoneItem);
	},

	undoneItem : function(key){
		var undoneItems = this.state.doneItems.filter(function( obj ) {
		    return obj.key === key;
		});

		var undoneItem = undoneItems[0],
			newUndoneItem = {};

		newUndoneItem.description = undoneItem.description;
		newUndoneItem.status = 'todo';

		app.database().ref('/tasks').child(key).update(newUndoneItem);
	},

	render: function() {
		return (
			<div className="container">

				<div className="row">	
					<TaskForm onNewItem={this.onNewItem}/>
				</div>

				<div className="row">
					
					<br/><br/>
					<TaskList items={this.state.items} onDeleteItem={this.deleteItem} onDoneItem={this.doneItem}/>	
						
				</div>

				<div className="row">
					<hr/>
					<DoneTaskList items={this.state.doneItems} onUndoneItem={this.undoneItem}/>
				</div>

			</div>
		);
	}


});

module.exports = Tasks;