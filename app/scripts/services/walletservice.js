'use strict';

/**
 * @ngdoc service
 * @name medusaFrontEndApp.WalletService
 * @description
 * # WalletService
 * Service in the medusaFrontEndApp.
 */
angular.module('medusaFrontEndApp')
  .service('WalletService', ['$timeout', '$http', function ($timeout, $http) {
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
    	return $http.get('http://localhost:8080/wallets')
    		.then((result) => {
    			return result;
    		}, (err) => {
    			return err;
    		});
    };

    // TODO: implement save or update
    this.save = (wallet) => {
    	return $http.post('http://localhost:8080/wallets', wallet)
    		.then((result) => {
    			return result;
    		}, (err) => {
    			return err;
    		});
    };

    this.delete = (wallet) => {
    	return $http.delete('http://localhost:8080/wallets', {
    			data: wallet,
    			headers: {'Content-Type': 'application/json;charset=utf-8'}
    		})
    		.then((result) => {
    			return result;
    		}, (err) => {
    			return err;
    		});
    };
  }]);
