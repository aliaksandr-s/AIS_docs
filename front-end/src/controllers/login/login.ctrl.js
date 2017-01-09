(function () {
    'use strict';

    angular
        .module('aisApp')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$rootScope', '$location', 'authService'];

    function loginCtrl($rootScope, $location, authService) {
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
                        $location.path('/');

                        $rootScope.$emit('isLogined');
                    },
                    function (err) {
                        vm.formError = err.data.message;
                    });
        };

        vm.onSubmit = function () {
            debugger;
            $rootScope.$emit('isLogined');

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