var expect = require('chai').expect;
var Control = require('../../prototypes/Control');
var db = 'mongodb://localhost/form-builder';
var mongoose = require('mongoose');
var clear = require('mocha-mongoose')(db);

describe('Control(data)', function() {
  before(function(done) {
    this.control = new Control({
      name: 'select-box-cities',
      type: 'select',
      htmlClass: 'select-box',
      htmlId: '',
      position: 2,
      isCustom: true,
      options: 'Portland, Austin, Boulder, Charlotte'
    });
    if (mongoose.connection.db) {
      return done();
    } else {
      mongoose.connect(db, done);
    }
  });
  before(function(done) {
   clear(done);
  });
  it('constructs a new FormControl object with the passed in values', function() {
    expect(this.control.options).to.eql(['Portland', 'Austin', 'Boulder', 'Charlotte']);
    expect(this.control.name).to.eql('select-box-cities');
    expect(this.control.type).to.eql('select');
    expect(this.control.htmlClass).to.eql('select-box');
    expect(this.control.htmlId).to.eql('');
    expect(this.control.position).to.eql(2);
    expect(this.control.isCustom).to.eql(true);
  });

  it('constructs a new FormControl object with default values', function() {
    var emptyControl = new Control();
    expect(emptyControl.options).to.eql([]);
    expect(emptyControl.name).to.eql('');
    expect(emptyControl.type).to.eql('');
    expect(emptyControl.htmlClass).to.eql('');
    expect(emptyControl.htmlId).to.eql('');
    expect(emptyControl.position).to.eql(0);
    expect(emptyControl.isCustom).to.eql(false);
  });

  it('inserts an FormControl object into the db', function(done) {
    this.control.insert(function(err, doc) {
      expect(err).to.be.an('undefined');
      Control.prototype.getAll(function(err, formControls) {
        expect(err).to.be.an('undefined');
        expect(formControls).to.have.length(1);
      });
      done();
    });
  });

  it('finds and updates an FormControl object in the db', function(done) {
    this.control.insert(function(err, formControl) {
      formControl.name = 'Changing name!';
      Control.prototype.update(formControl._id, formControl, function(err, doc) {
        expect(err).to.be.an('undefined');
        expect(doc.name).to.eql('Changing name!');
        done();
      });
    });
  });

  it('gets all the FormControls from the db', function(done) {
    this.control.insert(function(err, formControl) {
      Control.prototype.getAll(function(err, formControls) {
        expect(err).to.be.an('undefined');
        expect(formControls).to.have.length(1);
        done();
      });
    });
  });

  it('finds a form control object from the db and returns it', function(done) {
    this.control.insert(function(err, formControl) {
      expect(err).to.be.an('undefined');
      Control.prototype.find(formControl._id, function(err, fc) {
        expect(err).to.be.an('undefined');
        expect(fc._id).to.eql(formControl._id);
        done();
      });
    });
  });

  it('deletes an FormControl from the db', function(done) {
    this.control.insert(function(err, formControl) {
      Control.prototype.delete(formControl._id, function(err, doc) {
        expect(err).to.be.an('undefined');
        expect(doc).to.have.property('message');
        expect(doc.message).to.eql('Successfully deleted Control: ' + formControl._id);
        Control.prototype.getAll(function(err, formControls) {
          expect(formControls).to.have.length(0);
          done();
        });
      });
    });
  });
});
