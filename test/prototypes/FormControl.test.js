var expect = require('chai').expect;
var FormControl = require('../../prototypes/FormControl');
var db = 'mongodb://localhost/form-builder';
var mongoose = require('mongoose');
var clear = require('mocha-mongoose')(db);

describe('FormControl(data)', function() {
  before(function(done) {
    this.formControl = new FormControl({
      name: 'select-box-cities',
      type: 'select',
      htmlClass: 'select-box',
      htmlId: '',
      position: 2,
      isCustom: true,
      form: 'new-form',
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
    expect(this.formControl.options).to.eql(['Portland', 'Austin', 'Boulder', 'Charlotte']);
    expect(this.formControl.name).to.eql('select-box-cities');
    expect(this.formControl.type).to.eql('select');
    expect(this.formControl.htmlClass).to.eql('select-box');
    expect(this.formControl.htmlId).to.eql('');
    expect(this.formControl.position).to.eql(2);
    expect(this.formControl.form).to.eql('new-form');
    expect(this.formControl.isCustom).to.eql(true);
  });

  it('constructs a new FormControl object with default values', function() {
    var emptyFormControl = new FormControl();
    expect(emptyFormControl.options).to.eql([]);
    expect(emptyFormControl.name).to.eql('');
    expect(emptyFormControl.type).to.eql('');
    expect(emptyFormControl.htmlClass).to.eql('');
    expect(emptyFormControl.htmlId).to.eql('');
    expect(emptyFormControl.position).to.eql(0);
    expect(emptyFormControl.form).to.eql('');
    expect(emptyFormControl.isCustom).to.eql(false);
  });

  it('inserts an FormControl object into the db', function(done) {
    this.formControl.insert(function(err, doc) {
      expect(err).to.be.an('undefined');
      FormControl.prototype.getAll(function(err, formControls) {
        expect(err).to.be.an('undefined');
        expect(formControls).to.have.length(1);
      });
      done();
    });
  });

  it('finds and updates an FormControl object in the db', function(done) {
    this.formControl.insert(function(err, formControl) {
      formControl.name = 'Changing name!';
      FormControl.prototype.update(formControl._id, formControl, function(err, doc) {
        expect(err).to.be.an('undefined');
        expect(doc.name).to.eql('Changing name!');
        done();
      });
    });
  });

  it('gets all the FormControls from the db', function(done) {
    this.formControl.insert(function(err, formControl) {
      FormControl.prototype.getAll(function(err, formControls) {
        expect(err).to.be.an('undefined');
        expect(formControls).to.have.length(1);
        done();
      });
    });
  });

  it('deletes an FormControl from the db', function(done) {
    this.formControl.insert(function(err, formControl) {
      FormControl.prototype.delete(formControl._id, function(err, doc) {
        expect(err).to.be.an('undefined');
        expect(doc).to.have.property('message');
        expect(doc.message).to.eql('Successfully deleted FormControl: ' + formControl._id);
        FormControl.prototype.getAll(function(err, formControls) {
          expect(formControls).to.have.length(0);
          done();
        });
      });
    });
  });
});
