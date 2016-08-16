var expect = require('chai').expect;
var formatArray = require('../../utils/index.js').formatArray;

describe('#transformToArrayOfStrings(values)', function() {
  it('receives data, determines the data type, and calls the appropriate function to convert the data into an array of strings', function() {
    describe('if the data type is a string', function() {
      it('should return an array with string elements', function() {
        var cities = 'Boulder, Austin, Portland, New York';
        var state = 'Colorado';
        var citiesArray = formatArray.transformToArrayOfStrings(cities);
        var stateArray = formatArray.transformToArrayOfStrings(state);
        expect(citiesArray).to.have.length(4);
        expect(citiesArray).to.eql(['Boulder', 'Austin', 'Portland', 'New York']);
        expect(stateArray).to.have.length(1);
        expect(stateArray).to.eql(['Colorado']);
      });
    });
    describe('if the data type is an object', function() {
      it('should return an array with stringified obejects', function() {
        var cityObject = {name: 'Portland', state: 'OR'};
        var cityStringifiedObjectArray = formatArray.transformToArrayOfStrings(cityObject);
        expect(cityStringifiedObjectArray).to.have.length(1);
        expect(cityStringifiedObjectArray).to.eql([JSON.stringify(cityObject)]);
      });
    });
    describe('if the data type is a number', function() {
      it('should return an array of numbers converted to strings', function() {
        var number = 3;
        var numbersArrayOfString = formatArray.transformToArrayOfStrings(number);
        expect(numbersArrayOfString).to.have.length(1);
        expect(numbersArrayOfString).to.eql(['3']);
      });
    });
    describe('if the data type is an array', function() {
      it('should return a flattened array with it\'s elements as strings', function() {
        var numbers = [1,2,3,4,5];
        var nestedArray = [[1],[2]];
        var numbersArrayOfStrings = formatArray.transformToArrayOfStrings(numbers);
        var nestArrayToArrayOfStrings = formatArray.transformToArrayOfStrings(nestedArray);
        expect(numbersArrayOfStrings).to.have.length(5);
        expect(numbersArrayOfStrings).to.eql(['1','2','3','4','5']);
        expect(nestArrayToArrayOfStrings).to.have.length(2);
        expect(nestArrayToArrayOfStrings).to.eql(['1','2']);
      });
    });
    describe('if the data type is a boolean', function() {
      it('should return an array of boolean values represented as strings', function() {
        var booleanValueTrue = true;
        var booleanValueFalse = false;
        var trueArrayOfString = formatArray.transformToArrayOfStrings(booleanValueTrue);
        var falseArrayOfString = formatArray.transformToArrayOfStrings(booleanValueFalse);
        expect(trueArrayOfString).to.have.length(1);
        expect(trueArrayOfString).to.eql(['true']);
        expect(falseArrayOfString).to.have.length(1);
        expect(falseArrayOfString).to.eql(['false']);
      });
    });
  });
});

describe('#convertString(value)', function() {

});

describe('#convertNumber(values)', function() {

});

describe('#convertArray(values)', function() {

});

describe('#convertObject(values)', function() {

});

describe('#convertBoolean(values)', function() {

});
