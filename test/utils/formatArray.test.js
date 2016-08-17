var expect = require('chai').expect;
var formatArray = require('../../utils/formatArray');

describe('#transformToArrayOfStrings(values)', function() {
    describe('if the data type is a string without a commas', function() {
      it('returns an array whose length is 1, with the string at index 0', function() {
        var state = 'Colorado';
        var stateArray = formatArray.transformToArrayOfStrings(state);
        expect(stateArray).to.have.length(1);
        expect(stateArray).to.eql(['Colorado']);
      });
    });
    describe('if the data type if a string with commas', function() {
      it('returns an array whose length is over 1, and it\'s values the string split at the commas', function() {
        var cities = 'Boulder, Austin, Portland, New York';
        var citiesArray = formatArray.transformToArrayOfStrings(cities);
        expect(citiesArray).to.have.length(4);
        expect(citiesArray).to.eql(['Boulder', 'Austin', 'Portland', 'New York']);
      });
    });
    describe('if the data type is an object', function() {
      it('returns an array with stringified obejects', function() {
        var cityObject = {name: 'Portland', state: 'OR'};
        var cityStringifiedObjectArray = formatArray.transformToArrayOfStrings(cityObject);
        expect(cityStringifiedObjectArray).to.eql([JSON.stringify(cityObject)]);
      });
    });
    describe('if the data type is a number', function() {
      it('returns an array whose length is 1, with the number converted to a string at index 0', function() {
        var number = 3;
        var numbersArrayOfString = formatArray.transformToArrayOfStrings(number);
        expect(numbersArrayOfString).to.have.length(1);
        expect(numbersArrayOfString).to.eql(['3']);
      });
    });
    describe('if the data type is an array', function() {
      it('returns a array whose values are converted to strings', function() {
        var numbers = [1,2,3,4,5];
        var numbersArrayOfStrings = formatArray.transformToArrayOfStrings(numbers);
        expect(numbersArrayOfStrings).to.have.length(5);
        expect(numbersArrayOfStrings).to.eql(['1','2','3','4','5']);
      });
    });
    describe('if the data type is aleady an array of strings', function() {
      it('returns the original array', function() {
        var strings = ['hello', 'world'];
        var alreadyAnArrayOfStrings = formatArray.transformToArrayOfStrings(strings);
        expect(alreadyAnArrayOfStrings).to.eql(strings);
      });
    });
    describe('if the data type is an array with mixed data types', function() {
      it('returns a flattedned array of strings', function() {
        var mixedTypesArray = [[1], 'hello', 3, [5, 6], true, false, function(){}];
        var arrayOfStrings = formatArray.transformToArrayOfStrings(mixedTypesArray);
        expect(arrayOfStrings).to.eql(['1','hello','3','5', '6', 'true','false', 'function(){}']);
      });
    });
    describe('if the data type is a nested array', function() {
      it('returns a flattened array whose values are converted to strings', function() {
        var nestedArray = [[1],[2]];
        var nestArrayToArrayOfStrings = formatArray.transformToArrayOfStrings(nestedArray);
        expect(nestArrayToArrayOfStrings).to.eql(['1','2']);
      });
    });
    describe('if the data type is a boolean whose value is true', function() {
      it('returns an array of the boolean value represented as a string', function() {
        var booleanValueTrue = true;
        var trueArrayOfString = formatArray.transformToArrayOfStrings(booleanValueTrue);
        expect(trueArrayOfString).to.eql(['true']);
    });
    describe('if the data type is a boolean whose values is false', function() {
      it('returns an array of the boolean value represented as a string', function() {
        var booleanValueFalse = false;
        var falseArrayOfString = formatArray.transformToArrayOfStrings(booleanValueFalse);
        expect(falseArrayOfString).to.eql(['false']);
      });
    });
    describe('if the data type is a function', function() {
      it('returns an array whose length is 1 with the value at index 0 a stringified anonymous function definition', function() {
        var testFunction = function() {};
        var arrayWithStringifiedFunction = formatArray.transformToArrayOfStrings(testFunction);
        expect(arrayWithStringifiedFunction).to.eql(['function(){}']);
      });
    });
  });
});

describe('#convertString(value)', function() {
  it('returns an array with a string at index 0', function() {
    var string = 'hello';
    var stringArray = formatArray.convertString(string);
    expect(stringArray).to.eql(['hello']);
  });
  it('returns an array with strings', function() {
    var strings = 'hello,world';
    var stringsArray = formatArray.convertString(strings);
    expect(stringsArray).to.eql(['hello','world']);
  });
});

describe('#convertNumber(values)', function() {
  it('returns an array whose value is a number converted to a string', function() {
    var num = 5989;
    var numStringArray = formatArray.convertNumber(num);
    expect(numStringArray).to.eql(['5989']);
  });
});

describe('#convertArray(values)', function() {
  it('returns a flattened array whose value are converted to strings', function() {
    var nestedArray = [[1],[2],[3], 4];
    var flattenedArrayOfStrings = formatArray.convertArray(nestedArray);
    expect(flattenedArrayOfStrings).to.eql(['1','2','3','4']);
  });
  it('returns the original array if it is already an array of strings', function() {
    var original = ['Pamela','Whisenhunt'];
    var originalArrayOfStrings = formatArray.convertArray(original);
    expect(originalArrayOfStrings).to.eql(original);
  });
});

describe('#convertObject(values)', function() {
  it('returns an array whose values at index 0 is a stringified object', function() {
    var obj = {fname: 'Pamela', lname: 'Whisenhunt', age: 28};
    var arrayOfStrings = formatArray.convertObject(obj);
    expect(arrayOfStrings).to.eql([JSON.stringify(obj)]);
  });
});

describe('#convertBoolean(values)', function() {
  it('returns an array with a string representation of true', function() {
    var booleanTrue = true;
    var arrayOfStrings = formatArray.convertBoolean(booleanTrue);
    expect(arrayOfStrings).to.eql(['true']);
  });
  it('returns an array with a string representation of the false', function() {
    var booleanFalse = false;
    var arrayOfStrings = formatArray.convertBoolean(booleanFalse);
    expect(arrayOfStrings).to.eql(['false']);
  });
});
