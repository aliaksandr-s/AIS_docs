(function () {
    'use strict';

    angular
        .module('aisApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$state', 'authService', 'userService'];

    function homeCtrl($state, authService, userService) {
        var vm = this;

        // $state.transitionTo('home.clients'); // shows when you go to the state

        vm.currentUser = authService.currentUser();
        vm.isLoggedIn = authService.isLoggedIn();
        
        vm.users = userService.getUsers().then(function (res) {
            console.log(res.data.users)
        });

        if (!vm.isLoggedIn) {
            $state.go('login');
        }

    }
})();