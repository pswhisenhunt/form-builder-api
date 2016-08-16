exports.transformToArrayOfStrings = function(values) {
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
    default:
      break;
  };
  return array;
};

exports.convertObject = function(values) {
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

exports.convertArray = function(values) {
  var array = [];
  if (!values) {
    return [];
  };
  var merged = [].concat.apply([], values);
  for (var i = 0; i <= merged.length-1; i++) {
    array.push(JSON.stringify(merged[i]));
  };
  return array;
};

exports.convertBoolean = function(values) {
  return new Array(JSON.stringify(values));
};

exports.convertNumber = function(values) {
  if (!values) {
    return [];
  };
  return new Array(JSON.stringify(values));
};

exports.convertString = function(values) {
  var hasComma;
  var array = [];
  hasComma = values.indexOf(',') > -1;
  if (hasComma) {
    array = values.split(', ');
  } else {
    array.push(values);
  };
  return array;
};
