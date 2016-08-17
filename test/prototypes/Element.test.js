var expect = require('chai').expect;
var Element = require('../../prototypes/Element');

describe('Element(data)', function() {
  it('constructs a new element object with the passed in values', function() {
    var element = new Element({
      name: 'select-box-cities',
      type: 'select',
      htmlClass: 'select-box',
      htmlId: '',
      values: 'Portland, Austin, Boulder, Charlotte'
    });
    expect(element.values).to.eql(['Portland', 'Austin', 'Boulder', 'Charlotte']);
    expect(element.name).to.eql('select-box-cities');
    expect(element.type).to.eql('select');
    expect(element.htmlClass).to.eql('select-box');
    expect(element.htmlId).to.eql('');
  });

  it('constructs a new element object with default values', function() {
    var element = new Element();
    expect(element.values).to.eql([]);
    expect(element.name).to.eql('');
    expect(element.type).to.eql('');
    expect(element.htmlClass).to.eql('');
    expect(element.htmlId).to.eql('');
  })
});
