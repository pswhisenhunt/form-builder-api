var expect = require('chai').expect;
var Element = require('../../prototypes/Element');

describe('#Element(data)', function() {
  it('should create a new instance of the Element Object Prototype', function() {
    var element = new Element({
      name: 'select-box-cities',
      type: 'select',
      htmlClass: 'select-box',
      htmlId: '',
      values: 'Portland, Austin, Boulder, Charlotte'
    });
    expect(element).to.have.ownProperty('name');
    expect(element).to.have.ownProperty('type');
    expect(element).to.have.ownProperty('htmlClass');
    expect(element).to.have.ownProperty('htmlId');
    expect(element).to.have.ownProperty('values');
    expect(element.values).to.be.instanceOf(Array);
    expect(element.values).to.eql(['Portland', 'Austin', 'Boulder', 'Charlotte']);
    expect(element.name).to.eql('select-box-cities');
    expect(element.type).to.eql('select');
    expect(element.htmlClass).to.eql('select-box');
    expect(element.htmlId).to.eql('');
  });

  it('should initialize the object\'s values if no data is passed into the constructor', function() {
    var element = new Element();
    expect(element).to.have.ownProperty('name');
    expect(element).to.have.ownProperty('type');
    expect(element).to.have.ownProperty('htmlClass');
    expect(element).to.have.ownProperty('htmlId');
    expect(element).to.have.ownProperty('values');
    expect(element.values).to.have.length(0);
    expect(element.values).to.be.instanceOf(Array);
    expect(element.values).to.eql([]);
    expect(element.name).to.eql('');
    expect(element.type).to.eql('');
    expect(element.htmlClass).to.eql('');
    expect(element.htmlId).to.eql('');
  })
});
