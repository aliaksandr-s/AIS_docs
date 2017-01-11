(function () {
    'use strict';

    angular
        .module('aisApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$state', 'authService'];

    function homeCtrl($state, authService) {
        var vm = this;

        $state.transitionTo('home.users'); 

        vm.currentUser = authService.currentUser();
        vm.isLoggedIn = authService.isLoggedIn();

        if (!vm.isLoggedIn) {
            $state.go('login');
        }

    }
})();