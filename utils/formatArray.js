/*
  @author Pamela Whisenhunt
  @date 08/16/2016

  This utility is responsible for transforming an element's values property
  into a array of strings so that it can be saved in the database without causing
  an error.

  Because of this utility function, the client side of this application does not
  have to care about what data structure or type that is it sending in the request
  payload.
*/

var transformToArrayOfStrings = function(values) {
  var array = [];
  switch (typeof values) {
    case 'string':
    case String:
      array = this.convertString(values);
      break;
    case 'object':
    case Object:
      array = this.convertObject(values);
      break;
    case 'number':
    case Number:
      array = this.convertNumber(values);
      break;
    case 'boolean':
    case Boolean:
      array = this.convertBoolean(values);
      break;
    case 'function':
    case Function:
      array = this.convertFunction(values);
      break;
    default:
      break;
  };
  return array;
};

var convertObject = function(values) {
  var array = [];
  if (!values) {;
    return [];
  };
  //when using the typeof operator, an 'array' or Array returns the value 'object'
  if (values.length) {
    array = this.convertArray(values);
  } else {
    array = new Array(JSON.stringify(values));
  }
  return array;
};

var convertArray = function(values) {
  var array = [];
  if (!values) {
    return [];
  };
  var merged = [].concat.apply([], values);
  for (var i = 0; i <= merged.length-1; i++) {
    if (typeof merged[i] === 'string' || typeof merged[i] === String) {
      array.push(merged[i]);
    } else if (typeof merged[i] === 'function' || typeof merged[i] === Function) {
      array.push('function(){}');
    } else {
      array.push(JSON.stringify(merged[i]));
    }
  };
  return array;
};

var convertBoolean = function(values) {
  return new Array(JSON.stringify(values));
};

var convertNumber = function(values) {
  if (!values) {
    return [];
  };
  return new Array(JSON.stringify(values));
};

var convertString = function(values) {
  var hasComma;
  var array = [];
  hasComma = values.indexOf(',') > -1;
  if (hasComma) {
    array = values.split(/\s*,\s*/);
  } else {
    array.push(values);
  };
  return array;
};

var convertFunction = function() {
  return new Array('function(){}');
};

module.exports = {
  transformToArrayOfStrings: transformToArrayOfStrings,
  convertString: convertString,
  convertObject: convertObject,
  convertNumber: convertNumber,
  convertBoolean: convertBoolean,
  convertArray: convertArray,
  convertFunction: convertFunction
};
