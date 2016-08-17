var expect = require('chai').expect;
var Element = require('../../prototypes/Element');
var db = 'mongodb://localhost/form-builder';
var mongoose = require('mongoose');
var clear = require('mocha-mongoose')(db);

describe('Element(data)', function() {
  before(function(done) {
    this.element = new Element({
      name: 'select-box-cities',
      type: 'select',
      htmlClass: 'select-box',
      htmlId: '',
      values: 'Portland, Austin, Boulder, Charlotte'
    });
    if (mongoose.connection.db) {
      return done();
    } else {
      mongoose.connect(db, done);
    }
  });
  it('constructs a new element object with the passed in values', function() {
    expect(this.element.values).to.eql(['Portland', 'Austin', 'Boulder', 'Charlotte']);
    expect(this.element.name).to.eql('select-box-cities');
    expect(this.element.type).to.eql('select');
    expect(this.element.htmlClass).to.eql('select-box');
    expect(this.element.htmlId).to.eql('');
  });

  it('constructs a new element object with default values', function() {
    var emptyElement = new Element();
    expect(emptyElement.values).to.eql([]);
    expect(emptyElement.name).to.eql('');
    expect(emptyElement.type).to.eql('');
    expect(emptyElement.htmlClass).to.eql('');
    expect(emptyElement.htmlId).to.eql('');
  });

  it('inserts an element object into the db', function(done) {
    this.element.insert(function(err, doc) {
      expect(err).to.be.an('undefined');
      ELEMENT_ID = doc._id;
      done();
    });
  });

  it('finds and updates an element object in the db', function(done) {
    this.element.insert(function(err, element) {
      element.name = 'Changing name!';
      Element.prototype.update(element._id, element, function(err, doc) {
        expect(err).to.be.an('undefined');
        expect(doc.name).to.eql('Changing name!');
        done();
      });
    });
  });

  it('gets all the elements from the db', function(done) {
    this.element.insert(function(err, element) {
      Element.prototype.getAll(function(err, elements) {
        expect(err).to.be.an('undefined');
        expect(elements).to.have.length(1);
        done();
      });
    });
  });

  it('deletes an element from the db', function(done) {
    this.element.insert(function(err, element) {
      Element.prototype.delete(element._id, function(err, doc) {
        expect(err).to.be.an('undefined');
        expect(doc).to.have.property('message');
        expect(doc.message).to.eql('Successfully deleted element: ' + element._id);
        Element.prototype.getAll(function(err, elements) {
          expect(elements).to.have.length(0);
          done();
        });
      });
    });
  });
});
