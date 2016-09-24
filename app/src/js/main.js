/** @jsx React.DOM **/


var React = require('react'),
	ReactDOM = require('react-dom'),
	Tasks = require('./components/tasks'),
	CookieHelper =  require('./helpers/CookieHelper');

if(CookieHelper.isLoggedIn){
	CookieHelper.validateCookies();
}
else {
	window.location.href = 'https://www.simscale.com/authentication'
}

ReactDOM.render(
	<Tasks />,
	document.getElementById('app')
);		