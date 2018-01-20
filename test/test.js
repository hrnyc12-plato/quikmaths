var questions = require('../problemGen.js');
var expect = require('chai').expect;

describe('Difficulty level', function() {
  it('Should have a level 3 for difficulty', function() {
    // This is a fake server request. Normally, the server would provide this,
    // but we want to test our function's behavior totally independent of the server code
    var quesObject = questions.questionGenLevel3();
    var questionString = quesObject.question;

    expect(quesObject).to.be.an('object');
    expect(questionString).to.be.an('string');
  });

  // it('Should send back an object', function() {
  //   var req = new stubs.request('/classes/messages', 'GET');
  //   var res = new stubs.response();

  //   handler.requestHandler(req, res);

  //   var parsedBody = JSON.parse(res._data);
  //   expect(parsedBody).to.be.an('object');
  //   expect(res._ended).to.equal(true);
  // });

  // it('Should send an object containing a `results` array', function() {
  //   var req = new stubs.request('/classes/messages', 'GET');
  //   var res = new stubs.response();

  //   handler.requestHandler(req, res);

  //   var parsedBody = JSON.parse(res._data);
  //   expect(parsedBody).to.have.property('results');
  //   expect(parsedBody.results).to.be.an('array');
  //   expect(res._ended).to.equal(true);
  // });

});