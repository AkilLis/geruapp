var mixin = require('smart-mixin');
var assign = require('object-assign');

var mixinProto = mixin({
  componentDidMount: mixin.MANY,
  componentWillMount: mixin.MANY,
  componentWillReceiveProps: mixin.MANY,
  shouldComponentUpdate: mixin.ONCE,
  componentWillUpdate: mixin.MANY,
  componentDidUpdate: mixin.MANY,
  componentWillUnmount: mixin.MANY,
  getChildContext: mixin.MANY_MERGED
});

function setDefaultProps(reactMixin) {
  var getDefaultProps = reactMixin.getDefaultProps;

  if (getDefaultProps) {
    reactMixin.defaultProps = getDefaultProps();

    delete reactMixin.getDefaultProps;
  }
}

function setInitialState(reactMixin) {
  var getInitialState = reactMixin.getInitialState;
  var componentWillMount = reactMixin.componentWillMount;

  function applyInitialState(instance) {
    var state = instance.state || {};
    assign(state, getInitialState.call(instance));
    instance.state = state;
  }

  if (getInitialState) {
    if (!componentWillMount) {
      reactMixin.componentWillMount = function () {
        applyInitialState(this);
      };
    } else {
      reactMixin.componentWillMount = function () {
        applyInitialState(this);
        componentWillMount.call(this);
      };
    }

    delete reactMixin.getInitialState;
  }
}

function mixinClass(reactClass, reactMixin) {
  setDefaultProps(reactMixin);
  setInitialState(reactMixin);

  var prototypeMethods = {};
  var staticProps = {};

  Object.keys(reactMixin).forEach(function (key) {
    if (key === 'mixins') {
      return;
    }
    if (key === 'statics') {
      return;
    } else if (typeof reactMixin[key] === 'function') {
      prototypeMethods[key] = reactMixin[key];
    } else {
      staticProps[key] = reactMixin[key];
    }
  });

  mixinProto(reactClass.prototype, prototypeMethods);

  var mergePropTypes = function mergePropTypes(left, right, key) {
    if (!left) return right;
    if (!right) return left;

    var result = {};
    Object.keys(left).forEach(function (leftKey) {
      if (!right[leftKey]) {
        result[leftKey] = left[leftKey];
      }
    });

    Object.keys(right).forEach(function (rightKey) {
      if (left[rightKey]) {
        result[rightKey] = function checkBothContextTypes() {
          return right[rightKey].apply(this, arguments) && left[rightKey].apply(this, arguments);
        };
      } else {
        result[rightKey] = right[rightKey];
      }
    });

    return result;
  };

  mixin({
    childContextTypes: mergePropTypes,
    contextTypes: mergePropTypes,
    propTypes: mixin.MANY_MERGED_LOOSE,
    defaultProps: mixin.MANY_MERGED_LOOSE
  })(reactClass, staticProps);

  if (reactMixin.statics) {
    Object.getOwnPropertyNames(reactMixin.statics).forEach(function (key) {
      var left = reactClass[key];
      var right = reactMixin.statics[key];

      if (left !== undefined && right !== undefined) {
        throw new TypeError('Cannot mixin statics because statics.' + key + ' and Component.' + key + ' are defined.');
      }

      reactClass[key] = left !== undefined ? left : right;
    });
  }

  if (reactMixin.mixins) {
    reactMixin.mixins.reverse().forEach(mixinClass.bind(null, reactClass));
  }

  return reactClass;
}

module.exports = function () {
  var reactMixin = mixinProto;

  reactMixin.onClass = function (reactClass, mixin) {
    mixin = assign({}, mixin);
    return mixinClass(reactClass, mixin);
  };

  reactMixin.decorate = function (mixin) {
    return function (reactClass) {
      return reactMixin.onClass(reactClass, mixin);
    };
  };

  return reactMixin;
}();