function objToStr(x) {
    return Object.prototype.toString.call(x);
};

function returner(x) {
    return x;
}

function wrapIfFunction(thing) {
    return typeof thing !== "function" ? thing : function () {
        return thing.apply(this, arguments);
    };
}

function setNonEnumerable(target, key, value) {
    if (key in target) {
        target[key] = value;
    } else {
        Object.defineProperty(target, key, {
            value: value,
            writable: true,
            configurable: true
        });
    }
}

function defaultNonFunctionProperty(left, right, key) {
    if (left !== undefined && right !== undefined) {
        var getTypeName = function getTypeName(obj) {
            if (obj && obj.constructor && obj.constructor.name) {
                return obj.constructor.name;
            } else {
                return objToStr(obj).slice(8, -1);
            }
        };
        throw new TypeError('Cannot mixin key ' + key + ' because it is provided by multiple sources, ' + 'and the types are ' + getTypeName(left) + ' and ' + getTypeName(right));
    }
    return left === undefined ? right : left;
};

function assertObject(obj, obj2) {
    var type = objToStr(obj);
    if (type !== '[object Object]') {
        var displayType = obj.constructor ? obj.constructor.name : 'Unknown';
        var displayType2 = obj2.constructor ? obj2.constructor.name : 'Unknown';
        throw new Error('cannot merge returned value of type ' + displayType + ' with an ' + displayType2);
    }
};

var mixins = module.exports = function makeMixinFunction(rules, _opts) {
    var opts = _opts || {};

    if (!opts.unknownFunction) {
        opts.unknownFunction = mixins.ONCE;
    }

    if (!opts.nonFunctionProperty) {
        opts.nonFunctionProperty = defaultNonFunctionProperty;
    }

    return function applyMixin(source, mixin) {
        Object.keys(mixin).forEach(function (key) {
            var left = source[key],
                right = mixin[key],
                rule = rules[key];

            if (left === undefined && right === undefined) return;

            if (rule) {
                var fn = rule(left, right, key);
                setNonEnumerable(source, key, wrapIfFunction(fn));
                return;
            }

            var leftIsFn = typeof left === "function";
            var rightIsFn = typeof right === "function";

            if (leftIsFn && right === undefined || rightIsFn && left === undefined || leftIsFn && rightIsFn) {
                setNonEnumerable(source, key, wrapIfFunction(opts.unknownFunction(left, right, key)));
                return;
            }

            source[key] = opts.nonFunctionProperty(left, right, key);
        });
    };
};

mixins._mergeObjects = function (obj1, obj2) {
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        return obj1.concat(obj2);
    }

    assertObject(obj1, obj2);
    assertObject(obj2, obj1);

    var result = {};
    Object.keys(obj1).forEach(function (k) {
        if (Object.prototype.hasOwnProperty.call(obj2, k)) {
            throw new Error('cannot merge returns because both have the ' + JSON.stringify(k) + ' key');
        }
        result[k] = obj1[k];
    });

    Object.keys(obj2).forEach(function (k) {
        result[k] = obj2[k];
    });
    return result;
};

mixins.ONCE = function (left, right, key) {
    if (left && right) {
        throw new TypeError('Cannot mixin ' + key + ' because it has a unique constraint.');
    }
    return left || right;
};

mixins.MANY = function (left, right, key) {
    return function () {
        if (right) right.apply(this, arguments);
        return left ? left.apply(this, arguments) : undefined;
    };
};

mixins.MANY_MERGED_LOOSE = function (left, right, key) {
    if (left && right) {
        return mixins._mergeObjects(left, right);
    }
    return left || right;
};

mixins.MANY_MERGED = function (left, right, key) {
    return function () {
        var res1 = right && right.apply(this, arguments);
        var res2 = left && left.apply(this, arguments);
        if (res1 && res2) {
            return mixins._mergeObjects(res1, res2);
        }
        return res2 || res1;
    };
};

mixins.REDUCE_LEFT = function (_left, _right, key) {
    var left = _left || returner;
    var right = _right || returner;
    return function () {
        return right.call(this, left.apply(this, arguments));
    };
};

mixins.REDUCE_RIGHT = function (_left, _right, key) {
    var left = _left || returner;
    var right = _right || returner;
    return function () {
        return left.call(this, right.apply(this, arguments));
    };
};