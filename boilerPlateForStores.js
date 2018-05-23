"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;	// to broadcast events from the stores to the react components
var assign = require('object-assign');	// to glue the authorstore with the event emitter prototype
var CHANGE_EVENT = 'change';

var AuthorStore =  assign({}, EventEmitter.prototype. {
	
	// tell react components whenever store changes
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);	
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	}
});

Dispatcher.register(function(action) {
	switch(action.actionTypes) {
		
	}
});

module.exports = AuthorStore;