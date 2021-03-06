Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.newProject = newProject;
exports.tagRemove = tagRemove;
exports.tagDiselect = tagDiselect;
exports.tagSelected = tagSelected;
exports.getTags = getTags;
exports.suggestedImageChoosed = suggestedImageChoosed;
exports.getSuggestedShowcases = getSuggestedShowcases;
exports.setSelectedProject = setSelectedProject;
exports.saveProject = saveProject;
exports.newProjectImageRemoved = newProjectImageRemoved;
exports.newProjectImageUploaded = newProjectImageUploaded;
exports.checkProjectValidation = checkProjectValidation;
exports.getProjectsWithSkills = getProjectsWithSkills;
exports.onProjectFormFieldChange = onProjectFormFieldChange;
exports.toggleSelectedSkills = toggleSelectedSkills;
exports.priceBundleChanged = priceBundleChanged;
exports.durationTypeChanged = durationTypeChanged;
exports.durationValueChanged = durationValueChanged;

var _ProjectConstants = require('./ProjectConstants');

var _moment = require('moment');

var _moment2 = babelHelpers.interopRequireDefault(_moment);

var BackendFactory = require('../BackendFactory').default;

function newProject() {
	return function (dispatch) {
		dispatch({ type: _ProjectConstants.NEW_PROJECT });
	};
}

function tagRemove() {
	return function (dispatch) {
		dispatch({ type: _ProjectConstants.TAG_REMOVE });
	};
}

function tagDiselect(tag) {
	return function (dispatch) {
		dispatch({ type: _ProjectConstants.TAG_DISELECT, payload: tag });
	};
}

function tagSelected(tag) {
	return function (dispatch) {
		dispatch({ type: _ProjectConstants.TAG_SELECTED, payload: tag });
	};
}

function getTags() {
	var searchValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'a';

	return function (dispatch) {
		dispatch({ type: _ProjectConstants.GET_TAGS });

		BackendFactory().getTags({
			searchValue: searchValue,
			tags: tags,
			type: type
		}).then(function (res) {
			dispatch({ type: _ProjectConstants.GET_TAGS_FULFILLED, payload: res.data.tags });
		}).catch(function (error) {
			dispatch({ type: _ProjectConstants.GET_TAGS_FAILED, payload: error });
		});
	};
}

function suggestedImageChoosed(item) {
	return {
		type: _ProjectConstants.SUGGESTED_IMAGE_CHOOSED,
		payload: item
	};
}

function getSuggestedShowcases() {
	var tags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var pageIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	return function (dispatch) {
		dispatch({ type: _ProjectConstants.GET_SUGGESTED_SHOWCASES });

		var data = [{
			id: 1,
			caption: 'Дээл нь Монголчуудын олон зуун жилийн турш өмсөж ирсэн ...',
			collage: {
				url: 'http://ur-undrakh.com/files/images/20170106/EM/M-240.JPG',
				ratio: 1.62
			},
			price: 150000,
			tags: [{
				name: 'дээл'
			}, {
				name: 'гоёмсог'
			}]
		}, {
			id: 2,
			caption: 'Дээл нь Монголчуудын олон зуун жилийн турш өмсөж ирсэн ...',
			collage: {
				url: 'http://ur-undrakh.com/files/images/20170106/EM/c-41-copy.jpg',
				ratio: 1.9
			},
			price: 150000,
			tags: [{
				name: 'дээл'
			}, {
				name: 'гоёмсог'
			}]
		}, {
			id: 3,
			caption: 'Дээл нь Монголчуудын олон зуун жилийн турш өмсөж ирсэн ...',
			collage: {
				url: 'http://ur-undrakh.com/files/images/20170106/EM/m-225-copy.jpg',
				ratio: 1.1
			},
			price: 150000,
			tags: [{
				name: 'дээл'
			}, {
				name: 'гоёмсог'
			}]
		}, {
			id: 4,
			caption: 'Дээл нь Монголчуудын олон зуун жилийн турш өмсөж ирсэн ...',
			collage: {
				url: 'http://ur-undrakh.com/files/images/20170106/EM/m-225-copy.jpg',
				ratio: 1.1
			},
			price: 150000,
			tags: [{
				name: 'дээл'
			}, {
				name: 'гоёмсог'
			}]
		}, {
			id: 5,
			caption: 'Дээл нь Монголчуудын олон зуун жилийн турш өмсөж ирсэн ...',
			collage: {
				url: 'http://ur-undrakh.com/files/images/20170106/EM/M-240.JPG',
				ratio: 1.62
			},
			price: 150000,
			tags: [{
				name: 'дээл'
			}, {
				name: 'гоёмсог'
			}]
		}, {
			id: 6,
			caption: 'Дээл нь Монголчуудын олон зуун жилийн турш өмсөж ирсэн ...',
			collage: {
				url: 'http://ur-undrakh.com/files/images/20170106/EM/c-41-copy.jpg',
				ratio: 1.9
			},
			price: 150000,
			tags: [{
				name: 'дээл'
			}, {
				name: 'гоёмсог'
			}]
		}, {
			id: 7,
			caption: 'Дээл нь Монголчуудын олон зуун жилийн турш өмсөж ирсэн ...',
			collage: {
				url: 'http://ur-undrakh.com/files/images/20170106/EM/m-225-copy.jpg',
				ratio: 1.1
			},
			price: 150000,
			tags: [{
				name: 'дээл'
			}, {
				name: 'гоёмсог'
			}]
		}, {
			id: 8,
			caption: 'Дээл нь Монголчуудын олон зуун жилийн турш өмсөж ирсэн ...',
			collage: {
				url: 'http://ur-undrakh.com/files/images/20170106/EM/m-225-copy.jpg',
				ratio: 1.1
			},
			price: 150000,
			tags: [{
				name: 'дээл'
			}, {
				name: 'гоёмсог'
			}]
		}];

		dispatch({ type: _ProjectConstants.GET_SUGGESTED_SHOWCASES_FULFILLED, payload: data });
	};
}

function setSelectedProject(project) {
	return {
		type: _ProjectConstants.SET_SELECTED_PROJECT,
		payload: project
	};
}

function saveProject(form, selectedPriceBundle, selectedDurationType, durationValue, tags) {
	return function (dispatch) {
		dispatch({ type: _ProjectConstants.FETCHING });

		var data = new FormData();
		data.append('title', form.fields.title);
		data.append('description', form.fields.description);
		data.append('plan_id', selectedPriceBundle.id);
		data.append('duration_type', selectedDurationType.id);
		data.append('duration_length', durationValue);
		data.append('award_date', (0, _moment2.default)(form.fields.awardDate).format('YYYY-MM-DD'));
		data.append('award_time', (0, _moment2.default)(form.fields.awardTime).format('HH:mm:ss'));
		data.append('tags', tags);

		BackendFactory().saveProject({
			formData: data
		}).then(function (response) {
			dispatch({ type: _ProjectConstants.SAVE_PROJECT_FULFILLED, response: response });
		}).catch(function (error) {
			dispatch({ type: _ProjectConstants.SAVE_PROJECT_FAILED, error: error });
		});
	};
}

function newProjectImageRemoved(data) {
	return {
		type: _ProjectConstants.NEW_PROJECT_IMAGE_REMOVED,
		payload: data
	};
}

function newProjectImageUploaded(data) {
	return {
		type: _ProjectConstants.NEW_PROJECT_IMAGE_UPLOADED,
		payload: data
	};
}

function checkProjectValidation() {
	return {
		type: _ProjectConstants.CHECK_PROJECT_VALIDATION
	};
}

function getProjectsWithSkills(page) {
	return function (dispatch) {
		dispatch({
			type: _ProjectConstants.GET_PROJECTS_WITH_SKILLS
		});

		var temp = [{
			id: 1,
			name: 'Дээр үеийн хамбан дээл оёуулья',
			description: 'Эрхэм үйлчлүүлэгчиддээ ирж буй 2017 ондоо эрүүл энх аз жаргал бүхий л сайн сайхан бүхнийг хүсье ээ. Та бүхэндээ шинэ оны мэнд хүргэе ээ сайхан баярлаарай…',
			min_amount: '100000',
			max_amount: '200000',
			bid_count: 17,
			time_left: '3 цаг дутуу',
			seen: false,
			fetching: true
		}, {
			id: 2,
			name: 'I need you to develop some software for me. I would like this software to be developed for Windows using Java.',
			description: 'Эрхэм үйлчлүүлэгчиддээ ирж буй 2017 ондоо эрүүл энх аз жаргал бүхий л сайн сайхан бүхнийг хүсье ээ. Та бүхэндээ шинэ оны мэнд хүргэе ээ сайхан баярлаарай…',
			min_amount: '5 000 000',
			max_amount: '11 000 000',
			bid_count: 2,
			time_left: '2 өдөр дутуу',
			seen: true,
			fetching: true
		}, {
			id: 3,
			name: 'Торгон хантааз',
			description: 'Эрхэм үйлчлүүлэгчиддээ ирж буй 2017 ондоо эрүүл энх аз жаргал бүхий л сайн сайхан бүхнийг хүсье ээ. Та бүхэндээ шинэ оны мэнд хүргэе ээ сайхан баярлаарай…',
			min_amount: '50000',
			max_amount: '110000',
			bid_count: 2,
			time_left: '2 өдөр дутуу',
			seen: false,
			fetching: true
		}, {
			id: 4,
			name: 'Торгон хантааз',
			description: 'Эрхэм үйлчлүүлэгчиддээ ирж буй 2017 ондоо эрүүл энх аз жаргал бүхий л сайн сайхан бүхнийг хүсье ээ. Та бүхэндээ шинэ оны мэнд хүргэе ээ сайхан баярлаарай…',
			min_amount: '50000',
			max_amount: '110000',
			bid_count: 2,
			time_left: '2 өдөр дутуу',
			seen: false,
			fetching: true
		}, {
			id: 5,
			name: 'Торгон хантааз',
			description: 'Эрхэм үйлчлүүлэгчиддээ ирж буй 2017 ондоо эрүүл энх аз жаргал бүхий л сайн сайхан бүхнийг хүсье ээ. Та бүхэндээ шинэ оны мэнд хүргэе ээ сайхан баярлаарай…',
			min_amount: '50000',
			max_amount: '110000',
			bid_count: 2,
			time_left: '2 өдөр дутуу',
			seen: true,
			fetching: true
		}, {
			id: 6,
			name: 'Торгон хантааз',
			description: 'Эрхэм үйлчлүүлэгчиддээ ирж буй 2017 ондоо эрүүл энх аз жаргал бүхий л сайн сайхан бүхнийг хүсье ээ. Та бүхэндээ шинэ оны мэнд хүргэе ээ сайхан баярлаарай…',
			min_amount: '50000',
			max_amount: '110000',
			bid_count: 2,
			time_left: '2 өдөр дутуу',
			seen: false,
			fetching: true
		}, {
			id: 7,
			name: 'Торгон хантааз',
			description: 'Эрхэм үйлчлүүлэгчиддээ ирж буй 2017 ондоо эрүүл энх аз жаргал бүхий л сайн сайхан бүхнийг хүсье ээ. Та бүхэндээ шинэ оны мэнд хүргэе ээ сайхан баярлаарай…',
			min_amount: '50000',
			max_amount: '110000',
			bid_count: 2,
			time_left: '2 өдөр дутуу',
			seen: true,
			fetching: true
		}];

		dispatch({
			type: _ProjectConstants.GET_PROJECTS_WITH_SKILLS_FULFILLED,
			payload: {
				data: temp,
				pageLast: 3
			}
		});
	};
}

function onProjectFormFieldChange(field, value) {
	return {
		type: _ProjectConstants.ON_PROJECT_FORM_FIELD_CHANGE,
		payload: { field: field, value: value }
	};
}

function toggleSelectedSkills(skill) {
	return function (dispatch) {
		dispatch({ type: _ProjectConstants.SELECTED_SKILL_TOGGLE, payload: skill });
	};
}

function priceBundleChanged(type) {
	return function (dispatch) {
		dispatch({ type: _ProjectConstants.PRICE_BUNDLE_CHANGED, payload: type });
	};
}

function durationTypeChanged(type) {
	return function (dispatch) {
		dispatch({ type: _ProjectConstants.DURATION_TYPE_CHANGED, payload: type });
	};
}

function durationValueChanged(type) {
	return function (dispatch) {
		dispatch({ type: _ProjectConstants.DURATION_VALUE_CHANGED, payload: type });
	};
}