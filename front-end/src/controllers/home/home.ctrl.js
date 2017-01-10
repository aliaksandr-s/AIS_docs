(function () {
    'use strict';

    angular
        .module('aisApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$state', 'authService'];

    function homeCtrl($scope, $state, authService) {
        var vm = this;

        // $state.transitionTo('home.clients');

        vm.currentUser = authService.currentUser();
        vm.isLoggedIn = authService.isLoggedIn();

        if (!vm.isLoggedIn) {
            $state.go('login');
        }

    }
})();