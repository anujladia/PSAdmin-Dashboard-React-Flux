"use-strict";

var React = require('react');

var About = React.createClass({
	statics : {
		willTransitionTo: function(transition, params, query, callback) {
			if(!confirm("Are you sure you want to read the page this boring?")) {
				transition.abort();
			} else {
				callback();
			}
		},

		willTransitionFrom: function(transition, components) {
			if(!confirm("Are you sure you want to leave the page this exciting?")) {
				transition.abort();
			}
		}
	},
	render: function() {
		return(
			<div>
				<h1>About</h1>
				<p>
					This application uses the following techniologies.
					<ul>
						<li>React</li>
						<li>React Router</li>
						<li>Flux</li>
						<li>Node</li>
						<li>Gulp</li>
						<li>Browserify</li>
						<li>Bootstrap</li>
					</ul>
				</p>
			</div>	
		);
	}
});

module.exports = About;