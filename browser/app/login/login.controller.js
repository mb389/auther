'use strict';

app.controller('LoginCtrl', function ($scope, Auth, $state, User) {
	$scope.loginUser = function (credentials) {
		Auth.login(credentials)
		.then(function (loggedinUser) {
			$state.go('user', {id: loggedinUser._id});
		});
	};
});
