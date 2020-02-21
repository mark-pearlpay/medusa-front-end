'use strict';

describe('Service: TransactionType', function () {

  // load the service's module
  beforeEach(module('medusaFrontEndApp'));

  // instantiate service
  var TransactionType;
  beforeEach(inject(function (_TransactionType_) {
    TransactionType = _TransactionType_;
  }));

  it('should do something', function () {
    expect(!!TransactionType).toBe(true);
  });

});
