var expect = require('chai').expect;
var FormBase = require('../../prototypes/FormBase');
var FormControl = require('../../prototypes/FormControl');
var db = 'mongodb://localhost/form-builder';
var mongoose = require('mongoose');

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
});
