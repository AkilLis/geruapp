'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutable = require('immutable');

var InitialState = (0, _immutable.Record)({
	fetching: false,
	error: null,
	portfolios: (0, _immutable.Record)({
		fetching: false,
		pageLast: 0,
		paginate: 10,
		data: []
	})(),

	recentlySearch: (0, _immutable.List)([{
		search_string: 'цагаан сараар ууц чанах',
		searched_on: ''
	}, {
		search_string: 'ууц чанах',
		searched_on: ''
	}, {
		search_string: 'ул боов тарган мах',
		searched_on: ''
	}]),

	tags: [],

	suggestedTags: (0, _immutable.Record)({
		fetching: false,
		tags: []
	})(),

	searchByTag: (0, _immutable.Record)({
		fetching: false,
		searchValue: '',
		searchResult: []
	})()
});

exports.default = InitialState;