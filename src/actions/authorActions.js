"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');	// constant file that contains all the actionTypes at one place

var AuthorActions = {
	createAuthor: function(author) {
		var newAuthor = AuthorApi.saveAuthor(author);

		// Hey dispatcher go tell al the stores that a dispatcher was just created.
		Dispatcher.dispatch({
			actionTypes: ActionTypes.CREATE_AUTHOR,
			author: newAuthor
		});
	},

	updateAuthor: function(author) {
		var updatedAuthor = AuthorApi.saveAuthor(author);

		Dispatcher.dispatch({
			actionTypes: ActionTypes.UPDATE_AUTHOR,
			author: updatedAuthor
		});
	},

	deleteAuthor: function(id) {
		AuthorApi.deleteAuthor(id);

		Dispatcher.dispatch({
			actionTypes: ActionTypes.DELETE_AUTHOR,
			id: id
		})
	}
};

module.exports = AuthorActions;