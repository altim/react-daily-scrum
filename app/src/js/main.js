/** @jsx React.DOM **/
    	
var React = require('react'),
	ReactDOM = require('react-dom'),
	Tasks = require('./components/tasks');


ReactDOM.render(
	<Tasks />,
	document.getElementById('app')
);		