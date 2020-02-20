'use strict';

/**
 * @ngdoc function
 * @name medusaFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the medusaFrontEndApp
 */
angular.module('medusaFrontEndApp')
  .controller('MainCtrl', [
  	'$scope', 'WalletService', 
  	function ($scope, WalletService) {
	    $scope.wallets = [];

	    // load list of wallets
	    WalletService.list().then((data)=>{
	    	$scope.wallets = data;
	    });

	    $scope.saveWallet = () => {
	    	const wallet = {
	    		firstName: $scope.firstName,
				lastName: $scope.lastName,
				email: $scope.email,
				birthday: $scope.birthday,
				balance: $scope.balance
	    	};

	    	WalletService.save(wallet).then((data)=>{
		    	$scope.wallets = data;
		    });
	    };
  	}
]);
