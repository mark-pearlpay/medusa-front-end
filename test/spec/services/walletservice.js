'use strict';

describe('Service: WalletService', function () {

  // load the service's module
  beforeEach(module('medusaFrontEndApp'));

  // instantiate service
  var WalletService;
  beforeEach(inject(function (_WalletService_) {
    WalletService = _WalletService_;
  }));

  it('should do something', function () {
    expect(!!WalletService).toBe(true);
  });

});
