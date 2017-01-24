(function () {
    'use strict';

    angular
        .module('aisApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$state', 'authService'];

    function homeCtrl($state, authService) {
        var vm = this;

        authService.currentUser().profileStatus === 'admin' ? (
            $state.transitionTo('home.users')
        ) : (
            $state.transitionTo('home.documents')
        );


        vm.currentUser = authService.currentUser();
        vm.isLoggedIn = authService.isLoggedIn();

        if (!vm.isLoggedIn) {
            $state.go('login');
        }

        console.log(authService.currentUser().profileStatus)

    }
})();