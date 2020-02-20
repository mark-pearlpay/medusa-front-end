'use strict';

/**
 * @ngdoc service
 * @name medusaFrontEndApp.WalletService
 * @description
 * # WalletService
 * Service in the medusaFrontEndApp.
 */
angular.module('medusaFrontEndApp')
  .service('WalletService', ['$timeout', function ($timeout) {
  	this.mockData = [{
  		id: Math.floor(Math.random()*10000) + 1,
		firstName: 'FN1',
		lastName: 'LN1',
		email: 'a@a1.com',
		birthday: '2020-03-03',
		balance: '1000'
	  }, {
	  	id: Math.floor(Math.random()*10000) + 1,
		firstName: 'FN2',
		lastName: 'LN2',
		email: 'a@a2.com',
		birthday: '2020-03-03',
		balance: '1000'
	  }, {
	  	id: Math.floor(Math.random()*10000) + 1,
		firstName: 'FN3',
		lastName: 'LN3',
		email: 'a@a1.com',
		birthday: '2020-03-03',
		balance: '1000'
	  }];

    this.list = () => {
    	let existingList = this.mockData;

        return new Promise((resolve, reject) => {
        	// mock fetch time from backend
        	$timeout( function(){
	            // Do nothing
	        }, 2000 );

        	resolve(existingList);
    	});
    };

    // TODO: implement save or update
    this.save = (wallet) => {
    	let existingList = this.mockData;

    	wallet.id = Math.floor(Math.random()*10000) + 1;
    	existingList.push(wallet);

        return new Promise((resolve, reject) => {
        	// mock fetch time from backend
        	$timeout( function(){
	            // Do Nothing
	        }, 2000 );

        	resolve(existingList);
    	});
    };
  }]);
