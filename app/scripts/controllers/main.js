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
	    WalletService.list().then((result)=>{
	    	$scope.wallets = result.data;
	    });

	    $scope.saveWallet = () => {
	    	const payload = {
	    		firstName: $scope.firstName,
				lastName: $scope.lastName,
				email: $scope.email,
				birthday: $scope.birthday,
				balance: $scope.balance
	    	};

	    	WalletService.save(payload).then((result)=>{
		    	$scope.wallets.push(result.data);
		    });
	    };

	    $scope.deleteWallet = (wallet) => {
	    	WalletService.delete(wallet).then((result)=>{
	    		console.log(result)
	    		const data = result.data;
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

	    	WalletService.save(wallet).then((result)=>{
	    		wallet = result.data;
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
