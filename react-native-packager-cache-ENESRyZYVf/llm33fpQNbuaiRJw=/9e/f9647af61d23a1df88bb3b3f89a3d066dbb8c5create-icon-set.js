Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};var _jsxFileName = './lib/create-icon-set.js';var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();exports.default = createIconSet;var _react = require('react');var _react2 = _interopRequireDefault(_react);var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);var _reactNative = require('./react-native');var _iconButton = require('./icon-button');var _iconButton2 = _interopRequireDefault(_iconButton);var _tabBarItemIos = require('./tab-bar-item-ios');var _tabBarItemIos2 = _interopRequireDefault(_tabBarItemIos);var _toolbarAndroid = require('./toolbar-android');var _toolbarAndroid2 = _interopRequireDefault(_toolbarAndroid);function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}var NativeIconAPI = _reactNative.NativeModules.RNVectorIconsManager || _reactNative.NativeModules.RNVectorIconsModule;var DEFAULT_ICON_SIZE = 12;var DEFAULT_ICON_COLOR = 'black';function createIconSet(glyphMap, fontFamily, fontFile) {
  var fontReference = fontFamily;if (_reactNative.Platform.OS === 'android' && fontFile) {
    fontReference = fontFile.replace(/\.(otf|ttf)$/, '');
  }if (_reactNative.Platform.OS === 'windows' && fontFile) {
    fontReference = 'Assets/' + fontFile + '#' + fontFamily;
  }var IconNamePropType = _propTypes2.default.oneOf(Object.keys(glyphMap));var Icon = function (_Component) {
    _inherits(Icon, _Component);function Icon() {
      var _ref;var _temp, _this, _ret;_classCallCheck(this, Icon);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Icon.__proto__ || Object.getPrototypeOf(Icon)).call.apply(_ref, [this].concat(args))), _this), _this.root = null, _this.handleRef = function (ref) {
        _this.root = ref;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }_createClass(Icon, [{ key: 'setNativeProps', value: function setNativeProps(nativeProps) {
        if (this.root) {
          this.root.setNativeProps(nativeProps);
        }
      } }, { key: 'render', value: function render() {
        var _props = this.props,
            name = _props.name,
            size = _props.size,
            color = _props.color,
            style = _props.style,
            props = _objectWithoutProperties(_props, ['name', 'size', 'color', 'style']);var glyph = name ? glyphMap[name] || '?' : '';if (typeof glyph === 'number') {
          glyph = String.fromCharCode(glyph);
        }var styleDefaults = { fontSize: size, color: color };var styleOverrides = { fontFamily: fontReference, fontWeight: 'normal', fontStyle: 'normal' };props.style = [styleDefaults, style, styleOverrides];props.ref = this.handleRef;return _react2.default.createElement(_reactNative.Text, _extends({}, props, { __source: { fileName: _jsxFileName, lineNumber: 82 } }), glyph, this.props.children);
      } }]);return Icon;
  }(_react.Component);Icon.propTypes = { name: IconNamePropType, size: _propTypes2.default.number, color: _propTypes2.default.string, children: _propTypes2.default.node, style: _propTypes2.default.any };Icon.defaultProps = { size: DEFAULT_ICON_SIZE, allowFontScaling: false };var imageSourceCache = {};function ensureNativeModuleAvailable() {
    if (!NativeIconAPI) {
      if (_reactNative.Platform.OS === 'android') {
        throw new Error('RNVectorIconsModule not available, did you properly integrate the module? Try running `react-native link react-native-vector-icons` and recompiling.');
      }throw new Error('RNVectorIconsManager not available, did you add the library to your project and link with libRNVectorIcons.a? Try running `react-native link react-native-vector-icons` and recompiling.');
    }
  }function getImageSource(name) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_ICON_SIZE;var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_ICON_COLOR;ensureNativeModuleAvailable();var glyph = glyphMap[name] || '?';if (typeof glyph === 'number') {
      glyph = String.fromCharCode(glyph);
    }var processedColor = (0, _reactNative.processColor)(color);var cacheKey = glyph + ':' + size + ':' + processedColor;var scale = _reactNative.PixelRatio.get();return new Promise(function (resolve, reject) {
      var cached = imageSourceCache[cacheKey];if (typeof cached !== 'undefined') {
        if (!cached || cached instanceof Error) {
          reject(cached);
        } else {
          resolve({ uri: cached, scale: scale });
        }
      } else {
        NativeIconAPI.getImageForFont(fontReference, glyph, size, processedColor, function (err, image) {
          var error = typeof err === 'string' ? new Error(err) : err;imageSourceCache[cacheKey] = image || error || false;if (!error && image) {
            resolve({ uri: image, scale: scale });
          } else {
            reject(error);
          }
        });
      }
    });
  }function loadFont() {
    var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fontFile;if (_reactNative.Platform.OS === 'ios') {
      ensureNativeModuleAvailable();if (!file) {
        return Promise.reject(new Error('Unable to load font, because no file was specified. '));
      }return NativeIconAPI.loadFontWithFileName.apply(NativeIconAPI, _toConsumableArray(file.split('.')));
    }return Promise.resolve();
  }Icon.Button = (0, _iconButton2.default)(Icon);Icon.TabBarItem = (0, _tabBarItemIos2.default)(IconNamePropType, getImageSource);Icon.TabBarItemIOS = Icon.TabBarItem;Icon.ToolbarAndroid = (0, _toolbarAndroid2.default)(IconNamePropType, getImageSource);Icon.getImageSource = getImageSource;Icon.loadFont = loadFont;return Icon;
}