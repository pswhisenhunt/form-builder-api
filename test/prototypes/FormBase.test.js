var expect = require('chai').expect;
var FormBase = require('../../prototypes/FormBase');
var FormControl = require('../../prototypes/FormControl');
var db = 'mongodb://localhost/form-builder';
var mongoose = require('mongoose');
var clear = require('mocha-mongoose')(db);

describe('FormBase(data)', function() {
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
    this.formBase = new FormBase({
      name: 'test-form-1',
      formControls: []
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

  it('inserts a form object into the db without FormControls', function(done) {
    this.formBase.insert(function(err, form) {
      expect(err).to.be.an('undefined');
      FormBase.prototype.getAll(function(err, forms) {
        expect(err).to.be.an('undefined');
        expect(forms).to.have.length(1);
        expect(forms[0]).to.have.property('_id');
      });
      done();
    });
  });

  it('inserts a form base object into the db with FormControls', function(done) {
    this.formControl.insert(function(err, formControl) {
      expect(err).to.be.an('undefined');
      expect(formControl).to.have.property('_id');
      var formBaseWithFormControls = new FormBase({
        name: 'test-with-controls',
        formControls: [formControl._id]
      });
      formBaseWithFormControls.insert(function(err, formBase) {
        expect(err).to.be.an('undefined');
        expect(formBase.formControls).to.have.length(1);
        done();
      });
    });
  });

  it('gets all the form base objects from the db', function(done) {
    this.formBase.insert(function(err, formControl) {
      FormBase.prototype.getAll(function(err, formBases) {
        expect(err).to.be.an('undefined');
        expect(formBases).to.have.length(1);
        done();
      });
    });
  });

  it('finds a form base object from the db and returns it', function(done) {
    this.formBase.insert(function(err, formBase) {
      expect(err).to.be.an('undefined');
      FormBase.prototype.find(formBase._id, function(err, fb) {
        expect(err).to.be.an('undefined');
        expect(fb._id).to.eql(formBase._id);
        done();
      });
    });
  });

  it('finds and updates a form base object from the db', function(done) {
    this.formBase.insert(function(err, formBase) {
      expect(err).to.be.an('undefined');
      formBase.name = "Changing name!";
      FormBase.prototype.update(formBase._id, formBase, function(err, fb) {
        expect(err).to.be.an('undefined');
        expect(fb.name).to.eql("Changing name!");
        done();
      });
    });
  });

  it('deletes the formBase associated with the id passed into the function', function(done) {
    this.formBase.insert(function(err, formBase) {
      expect(err).to.be.an('undefined');
      FormBase.prototype.getAll(function(err, formBases) {
        expect(err).to.be.an('undefined');
        expect(formBases).to.have.length(1);
        FormBase.prototype.delete(formBases[0]._id, function(err, obj) {
          expect(err).to.be.an('undefined');
          expect(obj).to.have.property('message');
          FormBase.prototype.getAll(function(err, formBases) {
            expect(err).to.be.an('undefined');
            expect(formBases).to.have.length(0);
            done();
          });
        });
      });
    });
  });
});
