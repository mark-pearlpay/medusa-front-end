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
  	'$scope', 'WalletService', '$timeout',
  	function ($scope, WalletService, $timeout) {
  		$scope.selectedTopUpButtons = {};
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
		    	$scope.wallets.push(data);
		    });
	    };

	    $scope.deleteWallet = (wallet) => {
	    	WalletService.delete(wallet).then((data)=>{
	    		let walletIndex = (i) => i == data.id;
	    		const removeIndex = $scope.wallets.findIndex(walletIndex);
		    	$scope.wallets.splice(removeIndex, 1);
		    });
	    };

	    $scope.topUp = (wallet, index) => {
	    	$scope.toggleTopUpButton(index);

	    	const topUpBalance = wallet.topUpBalance;
	    	delete wallet.topUpBalance

	    	const intBalance = parseInt(wallet.balance) + parseInt(topUpBalance);
    		wallet.balance = intBalance.toString();

	    	WalletService.save(wallet).then((data)=>{
	    		wallet = data;
		    });
	    };

	    $scope.toggleTopUpButton = (index) => {
	    	if(index in $scope.selectedTopUpButtons)
	    		delete $scope.selectedTopUpButtons[index];
	    	else
	    		$scope.selectedTopUpButtons[index] = 1;
	    }

	    $scope.showTopUpButton = function(index) {
           return !$scope.selectedTopUpButtons[index];
   		}

   		$scope.test = function() {
			alert('The form has been test !');
		};
  	}
]);
