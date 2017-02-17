/* eslint-env mocha, browser*/
/* global proclaim, it */

var createArrayLikeFromArray = function createArrayLikeFromArray(arr) {
	var o = {};
	Array.prototype.forEach.call(arr, function (e, i) {
		o[i] = e;
	});
	o.length = arr.length;
	return o;
};

var testSubject, expected, actual;

beforeEach(function () {
	testSubject = [2, 3, undefined, true, 'hej', null, false, 0];
	delete testSubject[1];
	expected = {0: 2, 2: undefined, 3: true, 4: 'hej', 5: null, 6: false, 7: 0 };
	actual = {};
});


it('should pass the right parameters', function () {
	var args = [];
	var argsspy = function() { args = [].slice.call(arguments); }
	var array = ['1'];
	array.forEach(argsspy);
	proclaim.deepEqual(args, ['1', 0, array]);
});
it('should not affect elements added to the array after it has begun', function () {
	var arr = [1,2,3],
		i = 0;
	arr.forEach(function (a) {
		i++;
		arr.push(a + 3);
	});
	proclaim.deepEqual(arr, [1,2,3,4,5,6]);
	proclaim.equal(i, 3);
});

it('should set the right context when given none', function () {
	var context;
	[1].forEach(function () { context = this; });
	proclaim.strictEqual(context, function () { return this; }.call());
});

// IE6-8 does not distinguish between dense and sparse arrays
// it('should iterate all', function () {
// 	testSubject.forEach(function (obj, index) {
// 		actual[index] = obj;
// 	});

// 	proclaim.deepEqual(actual, expected);
// });

// it('should iterate all using a context', function () {
// 	var o = { a: actual };

// 	testSubject.forEach(function (obj, index) {
// 		this.a[index] = obj;
// 	}, o);
// 	proclaim.deepEqual(actual, expected);
// });

// it('should iterate all in an array-like object', function () {
// 	var ts = createArrayLikeFromArray(testSubject);

// 	Array.prototype.forEach.call(ts, function (obj, index) {
// 		actual[index] = obj;
// 	});

// 	proclaim.deepEqual(actual, expected);
// });

// it('should iterate all in an array-like object using a context', function () {
// 	var ts = createArrayLikeFromArray(testSubject),
// 		o = { a: actual };

// 	Array.prototype.forEach.call(ts, function (obj, index) {
// 		this.a[index] = obj;
// 	}, o);
// 	proclaim.deepEqual(actual, expected);
// });

describe('strings', function () {
	var str = 'Hello, World!';

	it('should iterate all in a string', function () {
		actual = [];

		Array.prototype.forEach.call(str, function (item, index) {
			actual[index] = item;
		});

		proclaim.deepEqual(actual, str.split(''));
	});

	it('should iterate all in a string using a context', function () {
		actual = [];

		var o = { a: actual };

		Array.prototype.forEach.call(str, function (item, index) {
			this.a[index] = item;
		}, o);

		proclaim.deepEqual(actual, str.split(''));
	});
});

it('should have a boxed object as list argument of callback', function () {
	var actual;

	Array.prototype.forEach.call('foo', function (item, index, list) {
		actual = list;
	});

	proclaim.isTypeOf(actual, 'object');
	proclaim.equal(Object.prototype.toString.call(actual), '[object String]');
});
