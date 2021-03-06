Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _ImageCard = require('./ImageCard');

var _ImageCard2 = babelHelpers.interopRequireDefault(_ImageCard);

var _variables = require('../../styles/variables');

var _variables2 = babelHelpers.interopRequireDefault(_variables);

var constHeight = 100;

var ImagesSlider = function (_Component) {
	babelHelpers.inherits(ImagesSlider, _Component);

	function ImagesSlider(props) {
		babelHelpers.classCallCheck(this, ImagesSlider);

		var _this = babelHelpers.possibleConstructorReturn(this, (ImagesSlider.__proto__ || Object.getPrototypeOf(ImagesSlider)).call(this, props));

		_this._renderBlank = _this._renderBlank.bind(_this);
		_this._renderImages = _this._renderImages.bind(_this);
		_this.toggleImage = _this.toggleImage.bind(_this);
		return _this;
	}

	babelHelpers.createClass(ImagesSlider, [{
		key: 'toggleImage',
		value: function toggleImage() {}
	}, {
		key: '_renderBlank',
		value: function _renderBlank() {
			return _react2.default.createElement(
				_reactNative.View,
				{ style: [styles.container, { justifyContent: 'center', alignItems: 'center' }] },
				_react2.default.createElement(
					_reactNative.Text,
					{ style: { fontSize: 24, fontFamily: _variables2.default.FONT_HEAVY, textAlign: 'center' } },
					'Upload some photos will help your freelancer.'
				)
			);
		}
	}, {
		key: '_renderImages',
		value: function _renderImages(images) {
			var _this2 = this;

			return _react2.default.createElement(
				_reactNative.ScrollView,
				{ horizontal: true },
				images.map(function (image, i) {
					return _react2.default.createElement(_ImageCard2.default, { uri: image.url,
						ratio: image.ratio,
						selected: true,
						pinned: false,
						onPress: _this2.toggleImage
					});
				})
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var images = this.props.images;


			return _react2.default.createElement(
				_reactNative.View,
				{ style: styles.container },
				images.get('count') == 0 ? this._renderBlank() : this._renderImages(images.get('data'))
			);
		}
	}]);
	return ImagesSlider;
}(_react.Component);

exports.default = ImagesSlider;


ImagesSlider.propTypes = {
	images: _react.PropTypes.array
};

var styles = _reactNative.StyleSheet.create({
	container: {
		height: constHeight,
		padding: 10
	},

	overlayNavbar: {
		position: 'absolute',
		top: 0,
		left: 0
	},

	wrapper: {
		height: constHeight,
		justifyContent: 'center',
		alignItems: 'center'
	}
});