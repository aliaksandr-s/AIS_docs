(function () {
    'use strict';

    angular
        .module('aisApp')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$rootScope', '$state', 'authService'];

    function loginCtrl($rootScope, $state, authService) {
        var vm = this;
        vm.credentials = {
            email: "",
            password: ""
        };

        //logins user
        vm.doLogin = function () {
            vm.formError = "";
            authService
                .login(vm.credentials)
                .then(
                    function () {
                        $state.go('home');

                        $rootScope.$emit('isLogined');
                    },
                    function (err) {
                        vm.formError = err.data.message;
                    });
        };

        vm.onSubmit = function () {
            vm.formError = "";

            if (!vm.credentials.email || !vm.credentials.password) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doLogin();
            }
        };
    }
})();