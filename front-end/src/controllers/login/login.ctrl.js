(function () {
    'use strict';

    angular
        .module('aisApp')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$rootScope', '$state', 'authService', '$timeout'];

    function loginCtrl($rootScope, $state, authService, $timeout) {
        var vm = this;

        vm.buttonMessage = "Log in";
        vm.buttonClass = "btn-primary"

        vm.credentials = {
            email: "",
            password: ""
        };


        //logins user
        vm.doLogin = function () {
            authService
                .login(vm.credentials)
                .then(
                    function () {
                        $state.go('home');
                        $rootScope.$emit('isLogined');
                    },
                    function (err) {
                        vm.buttonMessage = err.data.message;
                        vm.buttonClass = "btn-danger"

                        $timeout(function () {
                            vm.buttonMessage = "Log in";
                            vm.buttonClass = "btn-primary"
                        }, 1800)

                    });
        };

        vm.onSubmit = function () {

            if (!vm.credentials.email || !vm.credentials.password) {
                vm.buttonMessage = "All fields required, please try again";
                vm.buttonClass = "btn-danger"

                $timeout(function () {
                    vm.buttonMessage = "Log in";
                    vm.buttonClass = "btn-primary"
                }, 1800)

                return false;
            } else {
                vm.doLogin();
            }
        };
    }
})();